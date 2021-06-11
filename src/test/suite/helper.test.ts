import * as assert from 'assert';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
import { Helper } from '../../helper';

suite('Helper Test', () => {
	// vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual('oui', Helper.extract({test:'oui'}, 'non'));
	});

});
