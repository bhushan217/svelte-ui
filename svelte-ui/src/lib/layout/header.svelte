<script lang="ts">
	import b2kLogo from '../../assets/images/icons/logo.svg';
	import { layoutStore, routerLink } from '../../stores/layout/layout.store';
	import Sidenav from './sidenav.svelte';

</script>

<Sidenav />
<header class="page-header">
	<div class="page-header__wrapper">
		<div class="logo">
			<img class="centered" src={b2kLogo} alt="Logo" 
				width="48px" height="48px"
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
	<div class="right-menu ml-auto ">
		<div class="global-search">
			<input class="search-input" />
		</div>
		<a href="./#help" class="button">Help</a>
		<div class="profile">&nbsp;</div>
	</div>
</header>

<style lang="scss">
	@use '../../styles/index.scss' as *;
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
				position: relative;
			}
			.topnav {
				text-align: left;
				display: flex;
				&__container {
					margin: 0 1rem;
					li {
						display: inline-block;
						border: solid 2px transparent;
						padding: 0;
						margin-left: var(--base-padding);
						a {
							padding: calc(var(--base-height) * 2) var(--base-height) ;
							font-size: 1.2em;
							color: var(--text-color);
							@include tranzition;
							&:hover {
                text-shadow: 1px 0px 1px var(--bg2-color);
							}
						}
						&:hover {
							border-bottom: solid 2px var(--text-color);
						}
						&.active {
							border-bottom-color: var(--text2-color);
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
				position: relative;
				&::after {
					content: "????";
					font-family: Android!important;
					position: absolute;
					top: 0;
					right: 0;
					background-color: var(--bg-color);
					border-radius: 0 var(--input-height) var(--input-height) 0;
					padding: var(--base-height) calc(var(--input-height) / 6);
					padding-left: 0;
				}
				input.search-input {
					border: solid 1px transparent;
					border-radius: var(--input-height);
					padding: calc(var(--base-height));
					padding-right: var(--input-height);
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
				mask-image: url('./images/icon/profile.svg') no-repeat 100% 100%;
				-webkit-mask-image: url('./images/icon/profile.svg');
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
