import { Command, Interaction } from 'detritus-client';
import { Embed, Markup } from 'detritus-client/lib/utils';

import { searchSteam } from '../../../api';
import { EmbedBrands, EmbedColors } from '../../../constants';
import { Paginator, createUserEmbed, editOrReply } from '../../../utils';


export const COMMAND_ID = 'search.steam.community';

export interface CommandArgs {
  as?: string,
  query: string,
}

export async function createMessage(
  context: Command.Context | Interaction.InteractionContext,
  args: CommandArgs,
) {
  const isFromInteraction = (context instanceof Interaction.InteractionContext);

  const { count, results } = await searchSteam(context, {
    query: args.query,
    steamId: args.as,
  });

  if (results.length) {
    const pageLimit = results.length;
    const paginator = new Paginator(context, {
      pageLimit,
      onPage: (page) => {
        const embed = (isFromInteraction) ? new Embed() : createUserEmbed(context.user);
        embed.setColor(EmbedColors.DEFAULT);

        const result = results[page - 1];
        embed.setFooter(
          `Page ${page}/${pageLimit} of Steam Community Results (${count.toLocaleString()} Total Results)`,
          EmbedBrands.STEAM,
        );
        embed.setThumbnail(result.avatar_url);

        embed.setTitle(result.username);
        embed.setUrl(result.url);

        {
          const description: Array<string> = [];

          if (result.real_name) {
            description.push(Markup.escape.all(result.real_name));
          }
          if (result.country) {
            description.push(`Located: ${result.country}`);
          }
          if (description.length) {
            description.push('');
          }

          if (result.past_names.length) {
            description.push(`Also known as ${result.past_names.map((name) => Markup.bold(Markup.codestring(name))).join(', ')}`);
          }
          if (result.in_common.length) {
            description.push(`${result.in_common.map((string) => Markup.bold(string)).join(' and ')} in common`);
          }
          if (result.custom_url) {
            description.push(`**Custom URL**: ${Markup.codestring(result.custom_url)}`);
          }
          if (result.steam_id) {
            description.push(`**ID**: ${Markup.codestring(result.steam_id)}`);
          }
          if (result.steam_id_64) {
            description.push(`**ID64**: ${Markup.codestring(result.steam_id_64)}`);
          }

          if (description.length) {
            embed.setDescription(description.join('\n'));
          }
        }

        return embed;
      },
    });
    return await paginator.start();
  }
  return editOrReply(context, 'Couldn\'t find any steam accounts matching that search term');
}

