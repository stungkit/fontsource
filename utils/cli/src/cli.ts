import 'dotenv/config';

import { cac } from 'cac';
import consola from 'consola';
import { fetchAPI, fetchVariable, parseLicenses, parsev1, parsev2, parseVariable } from 'google-font-metadata';
import colors from 'picocolors';

import { version } from '../package.json';

const cli = cac('fontsource');

cli
	.command('fetch [key]', 'Fetch parsing metadata for all fonts')
	.option('-f, --force', 'Force rebuild all packages')
	.action(async (key: string, options) => {
		try {
			const finalKey = key ?? process.env.GOOGLE_FONT_API_KEY;
			if (!finalKey) {
				throw new Error('No API key provided.');
			}
			if (options.force) {
					consola.info(
						`Parsing all metadata... ${colors.bold(colors.red('[FORCE]'))}`
					);
				} else {
					consola.info('Parsing all metadata...');
				}
			await Promise.all([fetchAPI(finalKey), fetchVariable()]);
			await parsev1(options.force, false);
			await parsev2(options.force, false);
			await parseVariable(false);
			await parseLicenses();
		} catch (error) {
			consola.error(error);
		}
	});

cli
	.command('build [...fonts]', 'Build font packages')
	.option('--google', 'Only build Google Fonts')
	.option('--generic', 'Only build Generic Fonts')
	.option('-f, --force', 'Force rebuild all packages')
	.action(async (fonts: string[], options) => {
		try {
			if (fonts) {
				console.log('build');
			} else {
				console.log(options);
			}
		} catch (error) {
			consola.error(error);
		}
	});

cli.help();
cli.version(version);

cli.parse();
