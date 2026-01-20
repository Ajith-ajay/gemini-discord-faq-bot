import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/command';
import { EmbedService } from '../services/embed-service';
import { ConversationService } from '../services/conversation-service';

export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears your conversation history.'),
  async execute(interaction: ChatInputCommandInteraction, conversationService: ConversationService) {
    conversationService.clearHistory(interaction.user.id);
    const embed = EmbedService.success('Conversation Cleared', 'Your conversation history has been cleared.');
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
} as Command;
