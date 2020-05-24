import appState from '../stores/appState.js';

let addConnectionEstablishmentHandler;

if (process.browser) {
	addConnectionEstablishmentHandler = promise => {
		promise.then( () => {
			if (appState.isDisconnected) appState.isDisconnectedStore.set(false);
		} );
	};
}

export default addConnectionEstablishmentHandler;
