import dotenv from 'dotenv';
import path from 'path';

const cwd = process.cwd();
dotenv.config({
	path: [
		path.resolve(cwd, '.env'),
		path.resolve(cwd, '../.env')
	]
});
