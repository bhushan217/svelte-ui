<script lang="ts">
	import b2kLogo from '../../../public/images/icons/logo.svg';
	import { chatStore } from '../../stores/chat/chat.store';
	import { layoutStore, routerLink } from '../../stores/layout/layout.store';
	export let searchText = '';

	let inputField, messagesEl
	const sendMessage = (e) => {
		if(e.keyCode === 13){
			const text = inputField.value
			chatStore.sendMessage({text, email:'guest@dummy.in'})
			messagesEl.scroll({
				top: messagesEl.scrollHeight + messagesEl.clientHeight ,
				behavior: 'instant'
			})
			inputField.value = ''
		}
	}
</script>
<nav class="page-sidenav" class:hide={!!$layoutStore.isSideNavClosed}>
	<button class="btn-close ml-auto" 
	on:click={layoutStore.toggle}>&times;</button>
	<h2 class="logo">
		<img class="mr-auto" src={b2kLogo} width="48px" alt="B2K" 
		on:click={layoutStore.toggle}
		on:keypress={layoutStore.toggle}/>
	</h2>
	<input class="search-box" type="text" bind:value={searchText}
		placeholder="Search.." title="Type in a category"/>
	<ul class="page-sidenav__container">
		{#each $layoutStore.routes.filter(
			(nav) => (nav.types?.includes('side') && 
				(!searchText || nav.title.toLowerCase().includes(searchText.toLowerCase()) )
			)).sort((n1, n2) => n1.path.toString().localeCompare(n2.path.toString())) as sideNav}
			<li class:active={!!sideNav.active}>
				<a  use:routerLink={sideNav}
				 href={sideNav.path.toString()}>{sideNav.title}</a
				>
			</li>
		{/each}
	</ul>
	<div class="messanger">
		<div class="messages" bind:this={messagesEl}>
			{#each $chatStore.messages as message, i (i)}
				<div class="message" class:active={!!message.text} class:me={i % 2 === 0}>
					{message.text}
				</div>
			{/each}
		</div>		
		<div class="input-msg"><input type="text" on:keyup={sendMessage} bind:this={inputField} placeholder={$chatStore.isOffline ? 'Offline' : 'Enter Message'} /></div>
	</div>
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
		transition: .3s; /* 0.5 second transition effect to slide in the sidenav */
		box-shadow: .5rem 5rem .5rem var(--shadow-color);
		&.hide {
			width: 0;
		}
		.logo {
			background-color: var(--tertiary);
			position: relative;
			height: 4rem;
			margin-bottom: 2rem;
			border: solid 1px transparent;
		}
		.btn-close {
			@include absolute('rt');
			font-size: 2rem;
			background-color: transparent;
			border: 0;
			z-index: 2;
			padding: 0 0.5rem;
		}
		.search-box {
			padding: 0;
		}
		&__container {
			padding: var(--base-padding-xs);
			li {
				border: solid 2px transparent;
				box-shadow: 0 1px 1px var(--shadow-color);
				a {
					padding: var(--base-height) var(--base-height) var(--base-height)	calc(var(--base-height) * 2);
					text-decoration: none;
					font-size: 1.2em;
					color: var(--text2-color);
					display: block;
					transition: 0.3s;
    			min-width: 12rem;
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
		.messanger {			
			//background-color: transparent;
			border: 0;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%; /* or whatever */
			.messages {
				overflow: auto;  /* or hidden or auto */
				max-height: 12rem;
				min-width: 12rem;
    		padding-bottom: var(--input-height);
				.message{
					background-color: var(--bg-color);
					border-radius: 0 .25rem;
					margin-bottom: .25rem;
					padding: .25rem;
					margin-right: var(--input-height);
				}
				.message.me{
					background-color: var(--primary);
					margin-left: var(--input-height);
					margin-right: 0;
				}
				.message:last-child{
					border-bottom: dashed 1px var(--shadow-color);
				}
				&::-webkit-scrollbar {
					width: .25rem;
				}
				&::-webkit-scrollbar-track {
					background: var(--bg2-color);
				}
				&::-webkit-scrollbar-thumb {
					background: var(--shadow-color);
					cursor: pointer;
				}
				&::-webkit-scrollbar-thumb:hover {
					background: var(--primary);
				}
			}
		}
	}

	@media screen and (max-width: 450px) {
		.page-sidenav {
			padding-top: 2px;
			a {
				font-size: .8rem;
			}
		}
	}
</style>
