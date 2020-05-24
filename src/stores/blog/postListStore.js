import { writable } from 'svelte/store';
import { createPostListPromise } from '../../helpers/promiseFactories.js';

let postListStore;

if (process.browser) {
	const { set, subscribe } = writable(undefined);

	postListStore = {
		subscribe,
		// isSetted: false,
		// isFetchingInProgress: false,
		set: function (postList) {
			set(postList);
			this.isSetted = true;
		},
		fetchPostList: async function () {
			this.fetchingStateStore.set(true);

			const postListPromise = createPostListPromise();

			try {
				this.set(await postListPromise);
			}
			finally {
				this.fetchingStateStore.set(false);
			}
		}
	};

	{
		const { set, subscribe } = writable(false);

		postListStore.fetchingStateStore = {
			subscribe,
			set: function (value) {
				postListStore.isFetchingInProgress = value;
				set(value);
			}
		};
	}
}

export default postListStore;
