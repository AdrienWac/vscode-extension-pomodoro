import * as assert from 'assert';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { Helper } from '../../helper';

suite('Helper Test', () => {

	const configurations = vscode.workspace.getConfiguration('pomodoroTimer');

	let datasProvider = [
		{
			description: 'Extract simple path value ',
			object: {'key': 'index'},
			path: 'key',
			exceptedResult: 'index'
		},
		{
			description: 'Extract path value with 2 keys',
			object: configurations,
			path: 'work.duration',
			exceptedResult: configurations.work.duration
		}, 
		{
			description: 'Extract path value with more 2 keys',
			object: { 'keyFirstLevel': { 'keySecondLevel': { 'keyThirdLevel': 'ValueToExtract' } } },
			path: 'keyFirstLevel.keySecondLevel.keyThirdLevel',
			exceptedResult: 'ValueToExtract'
		},
		{
			description: 'Extract path value with pattern key',
			object: { 'keyFirstLevel': { 'keySecondLevel': { 'keyThirdLevel': 'ValueToExtract' } }, 'secondKeyFirstLevel': { 'keySecondLevel': { 'keyThirdLevel': 'secondvalueToExtract' } } },
			path: '{s}.keySecondLevel.{s}',
			exceptedResult: ['ValueToExtract','secondvalueToExtract']
		}
	];

	datasProvider.forEach(provider => {
		test(provider.description, () => {
			assert.deepStrictEqual(provider.exceptedResult, Helper.extract(provider.object, provider.path));
			// assert.strictEqual(provider.exceptedResult, Helper.extract(provider.object, provider.path));
		});
	});

});
