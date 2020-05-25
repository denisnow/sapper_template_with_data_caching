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

	div {
		padding: 1em 1.5em;
		float: right;
	}

	.disconnected {
		color: red;
	}

	.connecting {
		color: rgb(8, 88, 88);
	}
</style>

{#if $isConnectingInProgress}
	<div class='connecting'>connecting</div>
{:else if $isDisconnected}
	<div class='disconnected'>disconnected</div>
{/if}

<Nav {segment}/>

<main>
	<slot></slot>
</main>
