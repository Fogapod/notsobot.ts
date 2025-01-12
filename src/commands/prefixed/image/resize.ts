import { Command, CommandClient } from 'detritus-client';

import { CommandCategories } from '../../../constants';
import { Formatter } from '../../../utils';

import { BaseImageCommand } from '../basecommand';


export interface CommandArgsBefore {
  convert?: string,
  scale: number,
  size?: string,
  url?: null | string,
}

export const COMMAND_NAME = 'resize';

export default class ResizeCommand extends BaseImageCommand<Formatter.Commands.ImageToolsResize.CommandArgs> {
  constructor(client: CommandClient) {
    super(client, {
      name: COMMAND_NAME,

      aliases: ['enlarge', 'rescale'],
      args: [
        {name: 'convert'},
        {name: 'scale', default: 2, type: 'float'},
        {name: 'size'},
      ],
      metadata: {
        category: CommandCategories.IMAGE,
        description: 'Resize an image',
        examples: [
          COMMAND_NAME,
          `${COMMAND_NAME} notsobot`,
          `${COMMAND_NAME} notsobot -convert jpeg`,
          `${COMMAND_NAME} 👌🏿 -scale 2`,
          `${COMMAND_NAME} https://cdn.notsobot.com/brands/notsobot.png -convert webp -size 2048`,
        ],
        id: Formatter.Commands.ImageToolsResize.COMMAND_ID,
        usage: '?<emoji,user:id|mention|name,url> (-convert <format>) (-scale <number>) (-size <number>)',
      },
    });
  }

  async run(context: Command.Context, args: Formatter.Commands.ImageToolsResize.CommandArgs) {
    return Formatter.Commands.ImageToolsResize.createMessage(context, args);
  }
}
