import { Command, CommandClient } from 'detritus-client';

import { imageOverlayFlagUSSR } from '../../../api';
import { CommandCategories } from '../../../constants';
import { imageReply } from '../../../utils';

import { BaseImageCommand } from '../basecommand';


export interface CommandArgsBefore {
  url?: null | string,
}

export interface CommandArgs {
  url: string,
}

export const COMMAND_NAME = 'overlay ussr';

export default class OverlayUSSRCommand extends BaseImageCommand<CommandArgs> {
  constructor(client: CommandClient) {
    super(client, {
      name: COMMAND_NAME,

      aliases: ['o ussr', 'ussr'],
      metadata: {
        description: 'Overlay a USSR flag over an image',
        examples: [
          COMMAND_NAME,
          `${COMMAND_NAME} notsobot`,
        ],
        category: CommandCategories.IMAGE,
        usage: '?<emoji,user:id|mention|name,url>',
      },
    });
  }

  async run(context: Command.Context, args: CommandArgs) {
    const response = await imageOverlayFlagUSSR(context, args);
    return imageReply(context, response);
  }
}
