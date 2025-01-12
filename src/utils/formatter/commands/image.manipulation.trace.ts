import { Command, Interaction } from 'detritus-client';

import { imageManipulationTrace } from '../../../api';
import { imageReply } from '../../../utils';


export const COMMAND_ID = 'image.manipulation.trace';

export interface CommandArgs {
  url: string,
}

export async function createMessage(
  context: Command.Context | Interaction.InteractionContext,
  args: CommandArgs,
) {
  const response = await imageManipulationTrace(context, args);
  return imageReply(context, response);
}
