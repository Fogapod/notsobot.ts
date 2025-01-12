import { Collections, Command, Interaction } from 'detritus-client';
import { Embed, Markup } from 'detritus-client/lib/utils';

import { GuildSettingsPrefix } from '../../../api/structures/guildsettings';
import { EmbedColors } from '../../../constants';
import GuildSettingsStore from '../../../stores/guildsettings';
import { createUserEmbed, editOrReply } from '../../tools';


export const COMMAND_ID = 'prefixes.list';

export function formatPrefixes(
  context: Command.Context | Interaction.InteractionContext,
  prefixes: Collections.BaseCollection<string, GuildSettingsPrefix>,
  embed?: Embed,
): Embed {
  if (!embed) {
    embed = new Embed();
  }
  if (prefixes.length) {
    let i = 1;
    const description = prefixes.map((prefix) => {
      return [
        `${i++}. **${Markup.escape.all(prefix.prefix)}** added ${prefix.addedAtText}`,
        `-> By <@${prefix.userId}>`,
      ].join('\n');
    });
    embed.setDescription(description.join('\n'));
  } else {
    const description: Array<string> = [];
    if (context.commandClient) {
      const prefixes = Array.from(context.commandClient.prefixes.custom);
      for (let i = 0; i < prefixes.length; i++) {
        const prefix = prefixes[0];
        description.push(`${i + 1}. **${Markup.escape.all(prefix)}**`);
      }
    }

    embed.setDescription([
      'Using the default prefixes:\n',
      description.join('\n'),
    ].join('\n'));
  }
  return embed;
}


export async function createMessage(
  context: Command.Context | Interaction.InteractionContext,
) {
  const isFromInteraction = (context instanceof Interaction.InteractionContext);

  const guildId = context.guildId!;

  const embed = (isFromInteraction) ? new Embed() : createUserEmbed(context.user);
  embed.setColor(EmbedColors.DEFAULT);
  embed.setTitle('Showing prefixes');

  const settings = await GuildSettingsStore.getOrFetch(context, guildId);
  if (settings) {
    formatPrefixes(context, settings.prefixes, embed);
  }

  return editOrReply(context, {embed});
}
