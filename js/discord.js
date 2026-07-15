import { DiscordSDK } from "@discord/embedded-app-sdk";

export const discordSdk = new DiscordSDK("1526142293093122158");

export let discordUser = null;

let startTime = Math.floor(Date.now() / 1000);


// Connect Discord
export async function connectDiscord() {

    await discordSdk.ready();

    console.log("Discord Connected!");

    discordUser = await discordSdk.commands.getUser();

    console.log("User:", discordUser.username);


    // Send user to leaderboard
    if (window.setDiscordUser) {
        window.setDiscordUser(discordUser);
    }


    // Initial presence
    updatePresence(0, 2);


    return discordUser;
}



// Update Discord Rich Presence
export async function updatePresence(score, tile) {

    try {

        await discordSdk.commands.setActivity({

            activity: {

                details: `Score: ${score}`,

                state: `Highest tile: ${tile}`,

                timestamps: {
                    start: startTime
                },

                assets: {

                    large_image: "2048-logo",

                    large_text: "2048"

                }

            }

        });


        console.log("Presence updated");

    } catch (err) {

        console.error("Presence failed:", err);

    }

}



connectDiscord();