import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { CommandHandler } from './services/command-handler';
import { ConversationService } from './services/conversation-service';

// --- Configuration ---
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

// --- Discord Client Setup ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function start() {
    // --- Services ---
    const conversationService = new ConversationService();

    // --- Bot Logic ---
    const commandHandler = new CommandHandler(client, conversationService);
    await commandHandler.loadCommands();
    commandHandler.registerInteractionHandler();

    client.once('clientReady', () => {
      console.log(`Logged in as ${client.user?.tag}!`);
    });

    // --- Start the Bot ---
    if (!BOT_TOKEN) {
      console.error('Please provide a DISCORD_BOT_TOKEN in your .env file.');
      process.exit(1);
    }

    client.login(BOT_TOKEN);
}

start();
