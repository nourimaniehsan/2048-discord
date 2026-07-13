import { DiscordSDK } from "@discord/embedded-app-sdk";

const discordSdk = new DiscordSDK("1526142293093122158");

async function connectDiscord() {
    await discordSdk.ready();

    console.log("Discord Connected!");

    const user = await discordSdk.commands.getUser();

    console.log("User:", user.username);
}

connectDiscord();