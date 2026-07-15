import { createClient } from "@supabase/supabase-js";

console.log("LEADERBOARD JS STARTED");


const SUPABASE_URL = "https://jypmpeutoahrggixwuwn.supabase.co";
const SUPABASE_KEY = "sb_publishable_hzOEGW4h6VU8MT1exrm9KA_LHsBbQFv";


const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


let discordUser = {
  username: "Guest",
  id: "test-user"
};


// Receive Discord user from discord.js
window.addEventListener("discord-user-ready", (event) => {

  discordUser.username = event.detail.username;
  discordUser.id = event.detail.id;

  console.log("Discord user loaded:", discordUser);

});



async function submitScore(score) {

  const { data: existing, error: findError } = await supabaseClient
    .from("leaderboard")
    .select("score")
    .eq("discord_id", discordUser.id)
    .single();


  if (findError && findError.code !== "PGRST116") {
    console.error("CHECK FAILED:", findError);
    return;
  }



  // Existing player
  if (existing) {

    if (score <= existing.score) {
      console.log("Not a better score, ignoring");
      return;
    }


    const { error } = await supabaseClient
      .from("leaderboard")
      .update({
        username: discordUser.username,
        score: score,
        created_at: new Date().toISOString()
      })
      .eq("discord_id", discordUser.id);


    if (error) {
      console.error("UPDATE FAILED:", error);
      return;
    }


    console.log("BEST SCORE UPDATED");

  }



  // New player
  else {

    const { error } = await supabaseClient
      .from("leaderboard")
      .insert({
        username: discordUser.username,
        discord_id: discordUser.id,
        score: score,
        created_at: new Date().toISOString()
      });


    if (error) {
      console.error("INSERT FAILED:", error);
      return;
    }


    console.log("NEW SCORE SAVED");

  }


  loadLeaderboard();

}




async function loadLeaderboard() {

  const box = document.querySelector("#leaderboard");

  if (!box) return;


  box.innerHTML = "Loading leaderboard...";


  const { data, error } = await supabaseClient
    .from("leaderboard")
    .select("*")
    .order("score", { ascending: false })
    .limit(10);



  if (error) {

    console.error("LOAD FAILED:", error);

    box.innerHTML = "Leaderboard error";

    return;
  }



  if (!data || data.length === 0) {

    box.innerHTML = "No scores yet";

    return;

  }



  box.innerHTML = `
    <h3>Global Leaderboard</h3>

    ${data.map((x, i) => `
      <div class="leaderboard-entry">
        #${i + 1} ${x.username}
        — ${x.score}
        <br>
        <small>${new Date(x.created_at).toLocaleDateString()}</small>
      </div>
    `).join("")}
  `;

}



window.submitScore = submitScore;


loadLeaderboard();


console.log("LEADERBOARD JS FINISHED");