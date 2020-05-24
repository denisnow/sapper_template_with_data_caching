import { createPostPromise } from '../../helpers/promiseFactories.js';

let postCollection;

if (process.browser) {
	postCollection = new Map();
	postCollection.fetchPost = async function (slug) {
		const postPromise = createPostPromise(slug);

		postCollection.set(slug, postPromise);
		try {
			postCollection.set(slug, await postPromise);
		}
		catch {
			postCollection.delete(slug);
		}
	};
}

export default postCollection;
