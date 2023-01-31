<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import { layoutStore } from '../../stores/layout/layout.store';
	import Pnf404 from './pnf404.svelte';
	import Toggle from '../fields/Toggle.svelte';
	import Counter from '../Counter.svelte';
	import type { Nav } from '../../stores/models/nav.interface';
	import Todos from '../pages/Todos.svelte';
	let routeComponent = Pnf404
	const routes: Nav[] = [
    {
      path: 'toggle',
      title: 'Toggle',
      component: Toggle,
      types: ['top','side'],
			order: -1
    },
    {
      path: 'counter',
      title: 'Counter',
      component: Counter,
      types: ['top','side'],
			order: 1
    },
    {
      path: '/todos',
      title: 'Todos',
			component: Todos,
      types: ['top'],
			order: 2
    },
		{
			path:'#about',
			title: 'About Us',
			types:['side']
		}
  ]
	layoutStore.addRoutes(routes);
	const unsubscribe = layoutStore.subscribe( state => {
		if(state.currentNav){
			routeComponent = state.currentNav.component;
		}
	})

	onMount(async () => {

	})
	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="wrapper" data-testid="home-page">
	<Header />
	<main class="page-main">
		
		<div class="card" data-testid="toggle-component">
			 <svelte:component this={routeComponent}/>
		</div>
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

</style>
