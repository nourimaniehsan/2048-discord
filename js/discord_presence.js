import { discordSdk } from "./discord.js";

let startTime = Math.floor(Date.now() / 1000);

export async function initDiscordPresence() {
    await updatePresence(0, 2);
}

export async function updatePresence(score, tile) {

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
}