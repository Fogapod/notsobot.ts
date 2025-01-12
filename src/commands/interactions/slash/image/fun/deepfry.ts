import { Interaction } from 'detritus-client';

import { Formatter } from '../../../../../utils';

import { BaseInteractionImageCommandOption } from '../../../basecommand';


export const COMMAND_NAME = 'deepfry';

export class ImageDeepfryCommand extends BaseInteractionImageCommandOption {
  description = 'Deepfry an Image';
  metadata = {
    id: Formatter.Commands.ImageDeepfry.COMMAND_ID,
  };
  name = COMMAND_NAME;

  constructor() {
    super({
      options: [
        {name: 'scale', description: 'Deepfry Scale', type: Number},
      ],
    });
  }

  async run(context: Interaction.InteractionContext, args: Formatter.Commands.ImageDeepfry.CommandArgs) {
    return Formatter.Commands.ImageDeepfry.createMessage(context, args);
  }
}
