import { Command, Interaction } from 'detritus-client';

import { imageToolsGifSpeed } from '../../../api';
import { imageReply } from '../../../utils';


export const COMMAND_ID = 'image.gif.speed';

export interface CommandArgs {
  speed: number,
  url: string,
}

export async function createMessage(
  context: Command.Context | Interaction.InteractionContext,
  args: CommandArgs,
) {
  const response = await imageToolsGifSpeed(context, args);
  return imageReply(context, response);
}
