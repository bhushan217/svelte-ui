<script lang="ts">
	import svelteLogo from '../../assets/svelte.svg';
	import { layoutStore, type Nav } from '../../stores/layout/layout.store';
	export let searchText = '';
	export const sideNavClicked = (sideNav: Nav) => {
		layoutStore.setSideNavActive(sideNav.title);
	};
</script>

<nav class="page-sidenav" class:hide={!!$layoutStore.isSideNavClosed}>
	<h2 class="logo">
		<img
			src={svelteLogo}
			alt="B2K"
			on:click={layoutStore.toggle}
			on:keypress={layoutStore.toggle}
		/>
	</h2>

	<button class="btn-close" on:click={layoutStore.toggle}>&times;</button>
	<input
		class="search-box"
		type="text"
		bind:value={searchText}
		placeholder="Search.."
		title="Type in a category"
	/>
	<ul class="page-sidenav__container">
		{#each $layoutStore.sideNavs.filter((nav) => !searchText || nav.title
					.toLowerCase()
					.includes(searchText.toLowerCase())) as sideNav}
			<li class:active={!!sideNav.active}>
				<a
					href={sideNav.path.toString()}
					on:click={(e) => {
						sideNavClicked(sideNav);
					}}>{sideNav.title}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	@use '../../styles/index.scss' as *;
	:host {
		--header-height: calc(var(--input-height) * 1);
	}

	// SIDE NAVBAR
	/* The side navigation menu */
	.page-sidenav {
		height: 100vh; /* 100% Full-height */
		width: calc(var(--input-height) * 7); /* 0 width - change this with JavaScript */
		position: fixed; /* Stay in place */
		z-index: 99; /* Stay on top */
		top: 0; /* Stay at the top */
		left: 0;
		background-color: var(--bg2-color); /* Black*/
		overflow-x: hidden; /* Disable horizontal scroll */
		padding-top: 60px; /* Place content 60px from the top */
		transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
		&.hide {
			width: 0;
		}
		.logo {
			@include absolute(0, calc(var(--input-height) * 5));
		}
		.btn-close {
			@include absolute;
			font-size: 3rem;
			background-color: transparent;
			border: 0;
		}
		.search-box {
			height: var(--input-height);
			width: calc(var(--input-height) * 6);
			border: 0;
			border-bottom: solid 1px var(--shadow-color);
			outline: none;
			padding: 0 calc(var(--base-padding-xs) * 3);
			margin-left: var(--base-padding-xs);
		}
		&__container {
			padding: var(--base-padding-xs);
			li {
				border: solid 2px transparent;
				a {
					padding: var(--base-height) var(--base-height) var(--base-height)
						calc(var(--base-height) * 2);
					text-decoration: none;
					font-size: 1.2em;
					color: #818181;
					display: block;
					transition: 0.3s;
					&:hover {
						color: var(--primary);
					}
				}
				&.active,
				&:hover {
					border-left-color: var(--primary);
				}
			}
		}
	}

	@media screen and (max-width: 450px) {
		.sidenav {
			padding-top: 15px;
			a {
				font-size: 18px;
			}
		}
	}
</style>
