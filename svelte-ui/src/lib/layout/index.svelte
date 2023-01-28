<script lang="ts">
	import Header from './header.svelte';
	import Footer from './footer.svelte';
</script>

<div class="wrapper">
	<Header />
	<main class="page-main">
		<slot />
	</main>
	<Footer />
</div>

<style lang="scss">
	@use '../../styles/index.scss' as *;

	.wrapper {
		display: flex;
		flex-direction: column;
	}

	.wrapper > * {
		padding: 20px;
	}

	.page-main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
		min-height: 350px;
		background-color: var(--main-purple-color);
		background-blend-mode: luminosity;
		color: var(--main-white-color);
	}

	.page-main div {
		max-width: 500px;
	}

	.page-main h1 {
		margin-bottom: 20px;
	}

	.page-main p + p {
		margin-top: 10px;
	}
</style>
