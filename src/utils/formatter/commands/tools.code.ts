import { Command, Interaction } from 'detritus-client';
import { MessageFlags } from 'detritus-client/lib/constants';
import { Embed, Markup } from 'detritus-client/lib/utils';

import { utilitiesCodeRun } from '../../../api';
import {
  EmbedBrands,
  EmbedColors,
} from '../../../constants';
import { createUserEmbed, editOrReply } from '../..';


export const COMMAND_ID = 'tools code';

export interface CommandArgs {
  code: string,
  language: string,
}

export async function createMessage(
  context: Command.Context | Interaction.InteractionContext,
  args: CommandArgs,
) {
  const isFromInteraction = (context instanceof Interaction.InteractionContext);

  let guild: any = context.guild;
  if (guild) {
    guild = guild.toJSON();
    guild.members = [];
    guild.presences = [];
    guild.voice_states = [];
  }
  const { content, error, stats } = await utilitiesCodeRun(context, {
    code: args.code,
    input: JSON.stringify({
      channel: context.channel,
      channel_id: context.channelId,
      guild,
      guild_id: context.guildId,
      member: context.member,
      member_bot: context.me,
      message: (context instanceof Command.Context) ? context.message : null,
      user: context.user,
      user_bot: context.client.user,
    }),
    language: args.language,
  });

  const embed = (isFromInteraction) ? new Embed() : createUserEmbed(context.user);
  embed.setColor(EmbedColors.DEFAULT);

  let footer = 'Code Execution';
  if (stats.time_service && 1000 <= stats.time_service) {
    const seconds = (stats.time_service / 1000).toFixed(1);
    footer = `${footer}, took ${seconds} seconds`;
  }
  embed.setFooter(footer, EmbedBrands.NOTSOBOT);

  const language = args.language.toLowerCase().replace('_plus_plus', '++').replace('_sharp', '#').split('_').shift()!;
  if (error) {
    embed.setColor(EmbedColors.ERROR);
    embed.setDescription(Markup.codeblock(error, {language}));
  } else if (content) {
    embed.setDescription(Markup.codeblock(content, {language}));
  } else {
    embed.setDescription('No Content');
  }

  return editOrReply(context, {embed});
}