import { DiscordSDK } from "@discord/embedded-app-sdk";

export let discordSdk = null;

export let discordUser = {
    username: "LocalTest",
    id: "local-test"
};


export async function connectDiscord() {

    try {

        discordSdk = new DiscordSDK("1526142293093122158");

        await discordSdk.ready();

        console.log("Discord Connected!");

        discordUser = await discordSdk.commands.getUser();

        console.log("User:", discordUser.username);


        window.dispatchEvent(
            new CustomEvent("discord-user-ready", {
                detail: discordUser
            })
        );


    } catch (err) {

        console.warn("Not inside Discord Activity, using local user:", err);


        window.dispatchEvent(
            new CustomEvent("discord-user-ready", {
                detail: discordUser
            })
        );

    }

}


connectDiscord();