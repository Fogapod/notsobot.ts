import { Command, CommandClient } from 'detritus-client';

import { CommandCategories } from '../../../constants';
import { Formatter, Parameters } from '../../../utils';

import { BaseCommand } from '../basecommand';


export interface CommandArgs {
  url: string,
}

export const COMMAND_NAME = 'screenshot';

export default class ScreenshotCommand extends BaseCommand<CommandArgs> {
  constructor(client: CommandClient) {
    super(client, {
      name: COMMAND_NAME,

      aliases: ['ss'],
      label: 'url',
      metadata: {
        category: CommandCategories.TOOLS,
        description: 'Take a screenshot of a website',
        examples: [
          `${COMMAND_NAME} https://discordapp.com`,
        ],
        id: Formatter.Commands.ToolsScreenshot.COMMAND_ID,
        usage: '<url>',
      },
      type: Parameters.url,
    });
  }

  onBeforeRun(context: Command.Context, args: CommandArgs) {
    return !!args.url;
  }

  async run(context: Command.Context, args: CommandArgs) {
    return Formatter.Commands.ToolsScreenshot.createMessage(context, args);
  }
}
