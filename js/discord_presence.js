import { discordSdk } from "./discord.js";

let startTime = Math.floor(Date.now() / 1000);


window.updatePresence = async function(score, tile) {

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

        console.error("Presence error:", err);

    }

};