import { DiscordSDK } from "@discord/embedded-app-sdk";

export const discordSdk = new DiscordSDK("1526142293093122158");

export async function connectDiscord() {
    await discordSdk.ready();

    console.log("Discord Connected!");

    const user = await discordSdk.commands.getUser();

    console.log("User:", user.username);

    return user;
}