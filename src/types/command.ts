import { ChatInputCommandInteraction } from 'discord.js';
import { ConversationService } from '../services/conversation-service';

export interface Command {
  data: {
    name: string;
    description: string;
    toJSON: () => any;
  };
  execute: (interaction: ChatInputCommandInteraction, conversationService: ConversationService) => Promise<void>;
}
