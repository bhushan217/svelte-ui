<script lang="ts">
	import svelteLogo from '../../assets/images/svelte.svg';
	import { chatStore } from '../../stores/chat/chat.store';
	import { layoutStore, routerLink } from '../../stores/layout/layout.store';
	export let searchText = '';

	let inputField, messagesEl
	const sendMessage = (e) => {
		if(e.keyCode === 13){
			const text = inputField.value
			chatStore.sendMessage({text, email:'guest@dummy.in'})
			messagesEl.scroll({
				top: messagesEl.scrollHeight + messagesEl.clientHeight + 40,
				behavior: 'instant'
			})
			inputField.value = ''
		}
	}
</script>
<nav class="page-sidenav" class:hide={!!$layoutStore.isSideNavClosed}>
	<h2 class="logo">
		<img src={svelteLogo} alt="B2K" on:click={layoutStore.toggle}
			on:keypress={layoutStore.toggle}/>
	</h2>
	<button class="btn-close" on:click={layoutStore.toggle}>&times;</button>
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
		.messanger {			
			//background-color: transparent;
			border: 0;
			margin: 0;
			padding: 0;
			position: absolute;
			bottom: calc(var(--input-height) * 3);
			left: 0;
			width: 100%; /* or whatever */
			.messages {
				overflow: auto;  /* or hidden or auto */
				max-height: 200px;
				// margin-bottom: calc(var(--input-height) * 2);
				.message{
					background-color: var(--bg-color);
					border-radius: 0 4px;
					margin-bottom: 4px;
					padding: 4px;
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
					width: 4px;
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
			.input-msg{
				input{
					width: 95%;
					height: var(--input-height);
					outline: none;
					border: 0;
					border-bottom: solid 1px var(--shadow-color);
				}
			}
		}
	}

	@media screen and (max-width: 450px) {
		.page-sidenav {
			padding-top: 15px;
			a {
				font-size: 18px;
			}
		}
	}
</style>
