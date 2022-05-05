import { Command, Interaction } from 'detritus-client';

import { imageManipulationGold } from '../../../api';
import { imageReply } from '../../../utils';


export const COMMAND_ID = 'image.gold';

export interface CommandArgs {
  url: string,
}

export async function createMessage(
  context: Command.Context | Interaction.InteractionContext,
  args: CommandArgs,
) {
  const response = await imageManipulationGold(context, args);
  return imageReply(context, response);
}