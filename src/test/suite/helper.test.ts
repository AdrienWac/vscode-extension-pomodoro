import * as assert from 'assert';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { Helper } from '../../helper';

suite('Helper Test', () => {

	const configurations = vscode.workspace.getConfiguration('pomodoroTimer');

	let data = [
		{
			object: configurations,
			path: 'work.duration.default',
			exceptedResult: configurations.work.duration
		}
	];



	test('Extract configuration value', () => {

		data.forEach((item) => {
			assert.strictEqual(item.exceptedResult, Helper.extract(item.object, item.path));
		})

	});

});
