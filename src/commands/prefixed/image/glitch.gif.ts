import { Command, CommandClient } from 'detritus-client';

import { CommandCategories } from '../../../constants';
import { Formatter } from '../../../utils';

import { BaseImageCommand } from '../basecommand';


export const COMMAND_NAME = 'glitch gif';

export default class GlitchGifCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: COMMAND_NAME,

      args: [
        {name: 'amount', type: Number},
        {name: 'iterations', type: Number},
        {name: 'seed', type: Number},
        //{name: 'type'}, // theres glitch2, but maybe get rid of it?
      ],
      metadata: {
        category: CommandCategories.IMAGE,
        description: 'Glitch an Image/Gif',
        examples: [
          COMMAND_NAME,
          `${COMMAND_NAME} notsobot`,
          `${COMMAND_NAME} notsobot -seed 68`,
        ],
        id: Formatter.Commands.ImageManipulationGlitchGif.COMMAND_ID,
        usage: '?<emoji,user:id|mention|name,url> (-amount <number>) (-iterations <number>) (-seed <number>)', // (-type <glitch-type>)
      },
    });
  }

  async run(context: Command.Context, args: Formatter.Commands.ImageManipulationGlitchGif.CommandArgs) {
    return Formatter.Commands.ImageManipulationGlitchGif.createMessage(context, args);
  }
}