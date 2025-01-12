import { Interaction } from 'detritus-client';

import { Formatter } from '../../../../../utils';

import { BaseInteractionImageCommandOption } from '../../../basecommand';


export const COMMAND_NAME = 'explode';

export class ImageExplodeCommand extends BaseInteractionImageCommandOption {
  description = 'Explode an Image from the center';
  metadata = {
    id: Formatter.Commands.ImageExplode.COMMAND_ID,
  };
  name = COMMAND_NAME;

  constructor() {
    super({
      options: [
        {name: 'scale', description: 'Explode Scale', type: Number},
      ],
    });
  }

  async run(context: Interaction.InteractionContext, args: Formatter.Commands.ImageExplode.CommandArgs) {
    return Formatter.Commands.ImageExplode.createMessage(context, args);
  }
}
