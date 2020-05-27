<script>
	import Nav from '../components/Nav.svelte';
	import appState from '../stores/appState.js';
	import browsingState from '../stores/browsingState.js';

	export let segment;

	let isDisconnected, isConnectingInProgress;

	if (process.browser) {
		if (!browsingState.isSomePageVisited) {
			browsingState.isSomePageVisited = true;
		}
		isDisconnected = appState.isDisconnectedStore;
		isConnectingInProgress = appState.isConnectingInProgressStore;
	}
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	p {
		margin: 0;
		padding: 1em 1.5em;
		float: right;
	}

	.disconnected {
		color: red;
	}

	.connecting {
		color: rgb(8, 88, 88);
	}

	:global(h2) {
		font-size: 2em;
		margin: .67em 0;
	}

	:global(.visuallyHidden:not(:focus):not(:active)) {
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		padding: 0 !important;
		border: 0 !important;
		clip: rect(1px, 1px, 1px, 1px);
		overflow: hidden;
		white-space: nowrap !important;
	}
</style>

<h1 class='visuallyHidden'>Sapper project template</h1>

{#if $isConnectingInProgress}
	<p class='connecting'>connecting</p>
{:else if $isDisconnected}
	<p class='disconnected'>disconnected</p>
{/if}

<Nav {segment}/>

<main>
	<slot></slot>
</main>
