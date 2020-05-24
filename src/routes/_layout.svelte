<script>
	import Nav from '../components/Nav.svelte';
	import browsingState from '../stores/browsingState.js';

	export let segment;

	if (process.browser && !browsingState.isSomePageVisited) {
		browsingState.isSomePageVisited = true;
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
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
