import SERVER_LATENCY from '../env.js';
import addConnectionEstablishmentHandler from './addConnectionEstablishmentHandler.js';
import addDisconnectionHandler from './addDisconnectionHandler.js';

let createPostListPromise, createPostPromise;

if (process.browser) {

	const createResponsePromise = href => {
		const responsePromise = new Promise( resolve => setTimeout( () => resolve(), SERVER_LATENCY ) ).then( () => fetch(href) ); // whith server response latency emulation

		addConnectionEstablishmentHandler(responsePromise);
		return responsePromise;
	}

	createPostListPromise = () => {
		const postListPromise = createResponsePromise(`blog.json`).then( res => res.json() );

		addDisconnectionHandler(postListPromise);
		return postListPromise;
	}

	createPostPromise = slug => {
		const postPromise = createResponsePromise(`blog/${slug}.json`).then( res => res.json() );

		addDisconnectionHandler(postPromise);
		return postPromise;
	}
}

export { createPostListPromise, createPostPromise };
