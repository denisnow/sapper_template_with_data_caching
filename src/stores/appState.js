import { writable } from 'svelte/store';

let appState;

if (process.browser) {

	const { set, subscribe } = writable(undefined);

	appState = {
		// isDisconnected: false,
		// isConnectingInProgress: false,
		isDisconnectedStore: {
			subscribe,
			set: function (value) {
				appState.isDisconnected = value;
				set(value);
			}
		}
	};

	{
		const { set, subscribe } = writable(undefined);

		appState.isConnectingInProgressStore = {
			subscribe,
			set: function (value) {
				appState.isConnectingInProgress = value;
				set(value);
			}
		};
	}
}

export default appState;
