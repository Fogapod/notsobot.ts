import { Command, CommandClient } from 'detritus-client';

import { CommandCategories } from '../../../constants';

import { BaseImageCommand } from '../basecommand';


export interface CommandArgsBefore {
  type?: string,
  url?: null | string,
}

export interface CommandArgs {
  type?: string,
  url: string,
}

export const COMMAND_NAME = 'triggered';

export default class TriggeredCommand extends BaseImageCommand<CommandArgs> {
  constructor(client: CommandClient) {
    super(client, {
      name: COMMAND_NAME,

      args: [
        {name: 'type'},
      ],
      metadata: {
        examples: [
          COMMAND_NAME,
          `${COMMAND_NAME} notsobot`,
          `${COMMAND_NAME} notsobot -type 2`,
        ],
        category: CommandCategories.IMAGE,
        usage: '?<emoji,user:id|mention|name,url> (-type <triggered-type>)',
      },
    });
  }

  async run(context: Command.Context, args: CommandArgs) {

  }
}
