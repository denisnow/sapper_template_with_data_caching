let browsingState;

if (process.browser) {
	browsingState = { isSomePageVisited: false };
	// value of 'isSomePageVisited' property will be changed on entering the first page,
	// check \src\routes\_layout.svelte
}

export default browsingState;
