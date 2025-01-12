import { Interaction } from 'detritus-client';
import { ApplicationCommandOptionTypes } from 'detritus-client/lib/constants';

import { Formatter, Parameters } from '../../../../../utils';

import { BaseInteractionCommandOption } from '../../../basecommand';


export class TagListServerCommand extends BaseInteractionCommandOption {
  description = 'List the Server\'s Tags';
  metadata = {
    id: Formatter.Commands.TagListServer.COMMAND_ID,
  };
  name = 'server';

  constructor() {
    super({
      options: [
        {
          name: 'content',
          description: 'Match the tag\'s content',
          value: Parameters.string({maxLength: 1000}),
        },
        {
          name: 'name',
          description: 'Match the tag\'s name',
          value: Parameters.string({maxLength: 64}),
        },
        {
          name: 'user',
          description: 'User to list tags for',
          type: ApplicationCommandOptionTypes.USER,
        },
      ],
    });
  }

  async run(context: Interaction.InteractionContext, args: Formatter.Commands.TagListServer.CommandArgs) {
    return Formatter.Commands.TagListServer.createMessage(context, args);
  }
}
