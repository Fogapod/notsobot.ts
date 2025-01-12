import { Interaction } from 'detritus-client';

import { Formatter } from '../../../../../utils';

import { BaseInteractionImageCommandOption } from '../../../basecommand';


export const COMMAND_NAME = 'glitch';

export class ImageGlitchCommand extends BaseInteractionImageCommandOption {
  description = 'Glitch an Image';
  metadata = {
    id: Formatter.Commands.ImageGlitch.COMMAND_ID,
  };
  name = COMMAND_NAME;

  async run(context: Interaction.InteractionContext, args: Formatter.Commands.ImageGlitch.CommandArgs) {
    return Formatter.Commands.ImageGlitch.createMessage(context, args);
  }
}
