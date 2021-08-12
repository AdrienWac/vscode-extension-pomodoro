import * as assert from 'assert';
import { eventNames } from 'node:process';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { MediatorTimer } from '../../mediatorTimer';

suite('Ajout event Mediator Timer Test', () => {

	let mediatorTimer = new MediatorTimer();

	let datasProvider = [
		{
			description: 'Add event with priority',
			events: {
				0: {
					libelleEvent: 'first',
					callback: () => {return 1;},
					options: {priority: 2}
				},
				1: {
					libelleEvent: 'second',
					callback: () => { return 2; },
					options: { priority: 1 }
				},
				2: {
					libelleEvent: 'third',
					callback: () => { return 3; },
					options: { priority: 1 }
				},
			},
			exceptedResult: {numberEvent : 3, byPriority: {2: 1, 1:2}}
		},
		{
			description: 'Add event without priority',
			events: {
				0: {
					libelleEvent: 'first',
					callback: () => { return 1; },
					options: {}
				},
				1: {
					libelleEvent: 'second',
					callback: () => { return 2; },
					options: {}
				},
			},
			exceptedResult: { numberEvent: 2, byPriority: { 10: 2} }
		},
		{
			description: 'Add event without option',
			events: {
				0: {
					libelleEvent: 'first',
					callback: () => { return 1; }
				},
				1: {
					libelleEvent: 'second',
					callback: () => { return 2; },
					options: { priority: 1 }
				},
				2: {
					libelleEvent: 'third',
					callback: () => { return 3; },
					options: { priority: 1 }
				},
			},
			exceptedResult: { numberEvent: 3, byPriority: { 10: 1, 1: 2 } }
		}
	];

	datasProvider.forEach(provider => {
		test(provider.description, () => {
			testAddEvent(provider.events, provider.exceptedResult);
		});
	});

	function testAddEvent(events: { [key: string]: any }, exceptedResult: {[key: string]: any}) {
		
		events.forEach((event: any) => {
			mediatorTimer.addEvent(event.libelleEvent, event.callback, event.options);
		});

		let eventStackMediatorTimer = mediatorTimer.getEventStack();

		// Faire un object length value sur eventStackMediatorTimer pour avoir le nombre de callback par 
		// priority

		// Faire la somme de cet object length value pour avoir le nombre total de callback

	}

});
