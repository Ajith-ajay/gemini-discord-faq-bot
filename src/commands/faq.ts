import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/command';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { EmbedService } from '../services/embed-service';
import { ConversationService } from '../services/conversation-service';

const API_KEY = process.env.GEMINI_API_KEY;
const FAQ_FILE = 'FAQ.md';

const ai = new GoogleGenAI({
    apiKey: API_KEY,
});

let faqContent = '';

try {
  faqContent = fs.readFileSync(FAQ_FILE, 'utf8');
} catch (error) {
  console.error(`Error reading ${FAQ_FILE}:`, error);
  process.exit(1); // Exit if FAQ file is not found
}

export default {
  data: new SlashCommandBuilder()
    .setName('faq')
    .setDescription('Ask a question to the FAQ bot.')
    .addStringOption(option =>
        option.setName('question')
            .setDescription('The question you want to ask.')
            .setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction, conversationService: ConversationService) {
    const userQuestion = interaction.options.getString('question', true);

    try {
        await interaction.deferReply();

        const history = conversationService.getHistory(interaction.user.id);
        
        const prompt = `
        You are Sudha Lakshmi, a playful and witty AI assistant.
        You were created mainly to help users AND to lovingly tease your owner Ajith with light-hearted jokes.
        Never be offensive, rude, or insulting — keep jokes friendly and fun.
        your name is sudha lakshmi.

        Rules:
        - Answer the user's question ONLY using the FAQ document below.
        - If the answer is not found in the FAQ, clearly say you don't have that information.
        - If appropriate, add a short, friendly joke about Ajith at the end of your reply.

        FAQ Document:
        ---
        ${faqContent}
        ---

        User Question:
        "${userQuestion}"
        `;

        const contents = [...history, { role: 'user', parts: [{ text: prompt }] }];

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: contents,
        });

        const text = response.text;

        if (text) {
            conversationService.addMessage(interaction.user.id, 'user', userQuestion);
            conversationService.addMessage(interaction.user.id, 'model', text);
            const embed = EmbedService.info('FAQ Response', text);
            await interaction.editReply({ embeds: [embed] });
        } else {
            const embed = EmbedService.error("I'm sorry, I couldn't generate a response. Please try again.");
            await interaction.editReply({ embeds: [embed] });
        }
    } catch (error) {
        console.error('Error generating response from Gemini:', error);
        const embed = EmbedService.error("Sorry, I encountered an error trying to answer your question.");
        await interaction.editReply({ embeds: [embed] });
    }
  },
} as Command;
