<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h2, p {
		margin: 0 auto;
	}

	h2 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h2 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Error {status}</title>
</svelte:head>

<h2>{`Error ${status}`}</h2>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
