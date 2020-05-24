import appState from '../stores/appState.js';

let addDisconnectionHandler;

if (process.browser) {
	addDisconnectionHandler = promise => {
		promise.catch( () => {
			if (!appState.isDisconnected) appState.isDisconnectedStore.set(true);
		} );
	};
}

export default addDisconnectionHandler;
