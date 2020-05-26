<script context="module">
	import SERVER_LATENCY from '../../env.js';
	import appState from '../../stores/appState.js';
	import browsingState from '../../stores/browsingState.js';
	import postListStore from '../../stores/blog/postListStore.js';

	export async function preload() {
		// fetching the data on server-side
		// or
		// fetching the data on client-side
			// if browsing isn't started from this page
			// and
			// if data isn't cached
			// and
			// if fetching isn't in progress
			// and
			// if disconnection isn't detected
		if (!process.browser) {
			const postListPromise = new Promise( resolve => setTimeout( () => resolve(), SERVER_LATENCY ) ) // emulating latency of server response
				.then( () => this.fetch(`blog.json`) )
				.then( res => res.json() );
			const postList = await postListPromise;

			return { postList };
		}
		else if (browsingState.isSomePageVisited && !postListStore.isSetted && !postListStore.isFetchingInProgress && !appState.isDisconnected) {
			postListStore.fetchPostList(); // with server response latency emulation, check \src\helpers\promiseFactories.js
		}
	}
</script>

<script>
	import Spinner from '../../components/Spinner.svelte';

	export let postList;

	let isFetchingInProgress, isDisconnected, isConnectingInProgress, clickHandler;

	if (process.browser) {
		isFetchingInProgress = postListStore.fetchingStateStore;
		isDisconnected = appState.isDisconnectedStore;
		isConnectingInProgress = appState.isConnectingInProgressStore;

		clickHandler = function () {
			$isConnectingInProgress = true;
			postListStore.fetchPostList() // with server response latency emulation, check \src\helpers\promiseFactories.js
				.finally( () => $isConnectingInProgress = false );
		}

		if (postList) {
			$postListStore = postList;
		}
	}
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

{#if postList || $postListStore}

	<h1>Recent posts</h1>

	<ul>
		{#each postList || $postListStore as item}
			<!-- we're using the non-standard `rel=prefetch` attribute to
					tell Sapper to load the data for the page as soon as
					the user hovers over the link or taps it, instead of
					waiting for the 'click' event -->
			<li><a rel='prefetch' href='blog/{item.slug}'>{item.title}</a></li>
		{/each}
	</ul>

{:else if $isFetchingInProgress}

	<Spinner />

{:else} <!-- display on fetching error when data and server are unavailable -->

	<p>The data is unavailable.</p>

	<button on:click={clickHandler}>Reload</button>
	
{/if}
