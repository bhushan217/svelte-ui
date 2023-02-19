<script lang="ts">
import { createEventDispatcher, onDestroy } from 'svelte';
import { is_function } from 'svelte/internal';

const dispatch = createEventDispatcher();
const close = () => dispatch('close');
const action = (data) => dispatch('onAction', data);
export let buttons: Array<{label: string, action: Function, classes?: string[]}> = []
export let type : 'warn' | 'info' | 'danger' = 'info'
let modal: HTMLElement;

const handle_keydown = e => {
  if (e.key === 'Escape') {
    close();
    return;
  }

  if (e.key === 'Tab') {
    // trap focus
    const nodes = modal.querySelectorAll('*');
    const tabbable = Array.from(nodes).filter((node: HTMLElement) => node.tabIndex >= 0);

    let index = tabbable.indexOf(document.activeElement);
    if (index === -1 && e.shiftKey) index = 0;

    index += tabbable.length + (e.shiftKey ? -1 : 1);
    index %= tabbable.length;

    (<HTMLElement>tabbable[index]).focus();
    e.preventDefault();
  }
};
const handleAction =  (async (button)  => {
  if(is_function(button.action)){
    await button.action();
  }
  close();
})
const previously_focused: HTMLElement = typeof document !== 'undefined' && <HTMLElement>document.activeElement;

if (previously_focused) {
  onDestroy(() => {
    previously_focused.focus();
  });
}
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background blurred" on:click={close}  on:keypress={close} >
	<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
		<div class="modal-header bg-{type}">
			<slot name="header"></slot>
			<button class="btn btn-close btn-round"  on:click={close} aria-label="Close Modal">x</button>		
		</div>
		<div class="modal-body">
			<slot></slot>
		</div>
		<div class="modal-footer">
			{#each buttons as button (button.label)}
				<button class="btn {button.classes?.join(' ') ?? ''} ml-auto"  on:click={(e)=>handleAction(button)} on:keypress={(e)=>handleAction(button)}>{button.label}</button>
			{/each}
		</div>
	</div>
</div>
<style lang="scss">
	@use '../../styles/index.scss' as *;
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		@include square(100%);
		// width: 100%;
		// height: 100%;
		background:  var(--blur-bg);
		.modal {
			@extend .centered;
			width: calc(100vw - 4rem);
			max-width: 32rem;
			max-height: calc(100vh - 4rem);
			border-radius: 0.2rem;
			background: var(--bg-color);
			box-shadow: 0 2px .25rem var(--shadow-color);
			@include tranzition;
			.modal-header {
				padding: 1rem;
				border: 1px solid transparent;
				border-bottom: solid 1px var(--shadow-color);
				.btn-close {
					@include absolute('rt', var(--base-height), var(--base-height));
					@include square(calc(var(--base-height) * 3));
					background: var(--bg2-color);
					color: var(--text-color);
					margin-left: var(--base-height);
				}
			}
			.modal-body {
				padding: 1rem;
			}
			.modal-footer {
				padding: .5rem;
				border: 1px solid transparent;
				border-top: solid 1px var(--shadow-color);
				display: flex;
				flex-flow: row nowrap;
				.btn {
					padding: .5rem !important;
					margin: 0 var(--base-height);
					flex: 1;
				}
			}
		}
	}


</style>