import { connectDiscord } from "./discord.js";
import { initDiscordPresence } from "./discord_presence.js";

connectDiscord().then(() => {
    initDiscordPresence();
});

window.requestAnimationFrame(function () {
  new GameManager(
    4,
    KeyboardInputManager,
    HTMLActuator,
    LocalStorageManager
  );
});