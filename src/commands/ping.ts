import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/command';
import { EmbedService } from '../services/embed-service';
import { ConversationService } from '../services/conversation-service';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: ChatInputCommandInteraction, conversationService: ConversationService) {
    const embed = EmbedService.success('Pong!', `Latency: ${Date.now() - interaction.createdTimestamp}ms`);
    await interaction.reply({ embeds: [embed] });
  },
} as Command;
