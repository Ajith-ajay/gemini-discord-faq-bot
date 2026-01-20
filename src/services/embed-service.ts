import { EmbedBuilder, ColorResolvable } from 'discord.js';

export class EmbedService {
  public static success(title: string, description: string): EmbedBuilder {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor('#00FF00'); // Green
  }

  public static error(description: string): EmbedBuilder {
    return new EmbedBuilder()
      .setTitle('Error')
      .setDescription(description)
      .setColor('#FF0000'); // Red
  }

  public static info(title: string, description: string): EmbedBuilder {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor('#0099FF'); // Blue
  }
}
