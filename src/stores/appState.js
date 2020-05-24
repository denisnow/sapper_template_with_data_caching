import { writable } from 'svelte/store';

let appState;

if (process.browser) {
	appState = {
		// isDisconnected: false,
		// isConnectingInProgress: false,
	};

	const { set, subscribe } = writable(undefined);

	appState.isDisconnectedStore = {
		subscribe,
		set: function (value) {
			appState.isDisconnected = value;
			set(value);
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
