import { Command, Interaction } from 'detritus-client';
import { Embed, Markup } from 'detritus-client/lib/utils';

import { searchSteamProfile } from '../../../api';
import { EmbedBrands, EmbedColors } from '../../../constants';
import { createUserEmbed, editOrReply } from '../../../utils';


export const COMMAND_ID = 'search.steam.profile';

export interface CommandArgs {
  query: string,
}

export async function createMessage(
  context: Command.Context | Interaction.InteractionContext,
  args: CommandArgs,
) {
  const isFromInteraction = (context instanceof Interaction.InteractionContext);

  const profile = await searchSteamProfile(context, args);

  const embed = (isFromInteraction) ? new Embed() : createUserEmbed(context.user);
  switch (profile.state) {
    case 'in-game': {
      embed.setColor(EmbedColors.STEAM_IN_GAME);
    }; break;
    case 'online': {
      embed.setColor(EmbedColors.STEAM_ONLINE);
    }; break;
    default: {
      embed.setColor(EmbedColors.STEAM_OFFLINE);
    };
  }

  embed.setTitle(profile.username);
  embed.setUrl(profile.url);

  embed.setFooter('Steam Community Profile', EmbedBrands.STEAM);
  embed.setThumbnail(profile.avatar.full);

  {
    const description: Array<string> = [];
    description.push(`Currently ${profile.state_message}`);
    description.push('');

    if (profile.custom_url) {
      description.push(`**Custom URL**: ${Markup.codestring(profile.custom_url)}`);
    }
    description.push(`**Joined**: ${profile.member_since}`);
    description.push(`**Limited**: ${(profile.is_limited_account) ? 'Yes' : 'No'}`);
    if (profile.location) {
      description.push(`**Location**: ${profile.location}`);
    }
    description.push(`**ID**: ${Markup.codestring(profile.id)}`);
    description.push(`**ID64**: ${Markup.codestring(profile.id_64)}`);
    description.push(`**Trade Ban**: ${profile.trade_ban_state}`);
    description.push(`**VAC'd**: ${(profile.is_vac_banned) ? 'Yes' : 'No'}`);

    embed.setDescription(description.join('\n'));
  }

  if (profile.in_game) {
    const description: Array<string> = []

    description.push(`**Game**: ${Markup.url(profile.in_game.name, profile.in_game.url)}`);
    if (profile.in_game_ip) {
      description.push(`**Server IP**: ${Markup.codestring(profile.in_game_ip)}`);
    }
    if (profile.in_game.join_link) {
      description.push(`**Server Link**: <${profile.in_game.join_link}>`);
    }

    embed.addField('**In Game**', description.join('\n'));
  }

  if (profile.past_names.length) {
    const description: Array<string> = [];

    for (let { name, timestamp } of profile.past_names) {
      description.push(Markup.codestring(`${name} on ${timestamp}`));
    }

    embed.addField('**Past Names**', description.join('\n'));
  }

  return editOrReply(context, {embed});
}
