<script context="module">
	import SERVER_LATENCY from '../../env.js';
	import appState from '../../stores/appState.js';
	import browsingState from '../../stores/browsingState.js';
	import postListStore from '../../stores/blog/postListStore.js';
	import postCollection from '../../stores/blog/postCollection.js';

	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		if (!process.browser) {
			const responsePromise = new Promise( resolve => setTimeout( () => resolve(), SERVER_LATENCY ) ) // emulating latency of server response
				.then( () => this.fetch(`blog/${params.slug}.json`) );
			const res = await responsePromise;
			const post = await res.json();

			if (res.status === 200) {
				return { post };
			} else {
				this.error(res.status, post.message);
			}
		}
		else if (browsingState.isSomePageVisited && !postCollection.has(params.slug) && !appState.isDisconnected) {
			postCollection.fetchPost(params.slug); // with server response latency emulation, check \src\helpers\promiseFactories.js
		}
	}
</script>

<script>
	import { stores } from '@sapper/app';
	import Spinner from '../../components/Spinner.svelte';

	export let post;

	let title, slug, page, clickHandler, isFetchingInProgress, isDisconnected, isConnectingInProgress;

	if (process.browser) {
		isDisconnected = appState.isDisconnectedStore;
		isConnectingInProgress = appState.isConnectingInProgressStore;

		clickHandler = function () {
			$isConnectingInProgress = true;
			postCollection.fetchPost(slug) // with server response latency emulation, check \src\helpers\promiseFactories.js
				.then( () => post = postCollection.get(slug) )
				.finally( () => $isConnectingInProgress = false );
		}

		if (post) {
			postCollection.set(post.slug, post);
		}
		else {
			( { page } = stores() );
			slug = $page.params.slug;
			title = $postListStore.find( item => item.slug === slug ).title;

			if (postCollection.has(slug)) {
				const valueFromCollection = postCollection.get(slug);

				if (valueFromCollection instanceof Promise) {
					isFetchingInProgress = true;
					valueFromCollection
						.then( postValue => post = postValue )
						.finally( () => isFetchingInProgress = false );
				}
				else {
					post = valueFromCollection;
				}
			}
		}
	}

	$: {
		if (process.browser && !post && !postCollection.has(slug) && !$isDisconnected && !$isConnectingInProgress) {
			if (!postCollection.has(slug)) {
				isFetchingInProgress = true;
				postCollection.fetchPost(slug) // with server response latency emulation, check \src\helpers\promiseFactories.js
					.then( () => post = postCollection.get(slug) )
					.finally( () => isFetchingInProgress = false );
			}
		}
	}
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title>{title || post.title}</title>
</svelte:head>

{#if post}

	<h1>{post.title}</h1>

	<div class='content'>
		{@html post.html}
	</div>

{:else if isFetchingInProgress || $isConnectingInProgress}

	<Spinner />

{:else} <!-- display on fetching error when data and server are unavailable -->

	<p>The data is unavailable.</p>

	<button on:click={clickHandler}>Reload</button>

{/if}
