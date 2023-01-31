<script lang="ts">
	import svelteLogo from '../../assets/images/svelte.svg';
	import { layoutStore, routerLink } from '../../stores/layout/layout.store';
	import Sidenav from './sidenav.svelte';

</script>

<Sidenav />
<header class="page-header">
	<div class="page-header__wrapper">
		<div class="logo">
			<img
				src={svelteLogo}
				alt="Logo"
				on:click={layoutStore.toggle}
				on:keypress={layoutStore.toggle}
			/>
		</div>
		<div class="topnav">
			<ul class="topnav__container">
				{#each $layoutStore.routes.filter(nav => nav.types?.includes('top')) as topNav}
					<li class:active={!!topNav.active}>
						<a use:routerLink={topNav} 
						href={topNav.path.toString()}>{topNav.title}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="right-menu">
		<div class="global-search">
			<input class="search-input" />
		</div>
		<a href="./#help" class="button">Help</a>
		<div class="profile">&nbsp;</div>
	</div>
</header>

<style lang="scss">
	//@use '../../styles/index.scss' as *;
	:host {
		--header-height: calc(var(--input-height) * 1);
	}
	// HEADER
	.page-header {
		background: var(--primary);
		box-shadow: 0 1px 2px var(--shadow-color);
		max-height: var(--header-height);
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		&__wrapper {
			display: flex;
			// align-items: center;
			.logo {
				width: 100px;
				text-align: left;
				text-align: center;
			}
			.topnav {
				text-align: left;
				//flex-grow: 1;
				display: flex;
				//justify-content: space-between;
				&__container {
					margin: 1em 0 auto 0;
					li {
						display: inline-block;
						border: solid 2px transparent;
						padding: 0;
						a {
							display: inline-block;
							padding: calc(var(--base-height) * 2) var(--base-height) ;
              //var(--base-height) var(--base-height) ;
							text-decoration: none;
							font-size: 1.2em;
							color: var(--text-color);
							transition: 0.3s;
							&:hover {
                text-shadow: 1px 0px 1px;
							}
						}
						&.active {
							border-bottom-color: var(--secondary);
						}
					}
				}
			}
		}
		.right-menu{		
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			.global-search {
				margin: auto;
				flex-grow: 1;
				input.search-input {
					border: solid 1px transparent;
					border-radius: var(--input-height);
					padding: calc(var(--base-height));
					outline: none;
				}
			}
			.profile{
				flex-grow: 1;
				background-color: var(--tertiary);
				border: solid 1px var(--text-color);
				border-radius: 50%;
				padding: 6px;			
				background-color: var(--text-color);
				width: 24px;
				height: 24px;
				cursor: pointer;
				mask-size: cover;
				-webkit-mask-size: cover;
				mask-image: url({/src/assets/images/profile.svg}) no-repeat 100% 100%;
				-webkit-mask-image: url(/src/assets/images/profile.svg);
				&:hover{
					background-color: var(--text-color);
				}
			}
		}
	}
	
	@media all and  (min-width: 960px) {
		.page-header {
			align-items: flex-start;
			
			.logo {
        order: 0;
    	}
			.topnav {
				order: 1;
			}
			.right-menu{
				order: 2;
			}
		}
	}
	@media (max-width: 600px) {
		.page-header {
			align-items: center;
			flex-direction: column;
			.logo {
        flex: 1;
    	}
			.topnav {
				order: 1;
				flex-grow: 1;
			}
			.right-menu{
				order: 2;
			}
		}
	}
</style>
