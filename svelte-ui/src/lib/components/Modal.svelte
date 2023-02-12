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

<div class="modal-background blurred" on:click={close}  on:keypress={close} ></div>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<button class="btn btn-close btn-round"  on:click={close} aria-label="Close Modal">x</button>
	<div class="modal-header bg-{type}">
		<slot name="header"></slot>
	</div>
	<div class="modal-body">
		<slot></slot>
	</div>
  <div class="modal-footer">
    {#each buttons as button (button.label)}
      <button class="btn {button.classes?.join(' ') ?? ''}"  on:click={(e)=>handleAction(button)} on:keypress={(e)=>handleAction(button)}>{button.label}</button>
    {/each}
  </div>
</div>

<style lang="scss">
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4rem);
		max-width: 32rem;
		max-height: calc(100vh - 4rem);
		overflow: auto;
		transform: translate(-50%,-50%);
		border-radius: 0.2rem;
		background: var(--bg-color, #343434);
		.modal-header {
			padding: 1rem;
			border: 1px solid transparent;
			border-bottom: solid 1px var(--shadow-color, #888888);
		}
		.modal-body {
			padding: 1rem;
		}
		.modal-footer {
			padding: 1rem;
			border: 1px solid transparent;
			border-top: solid 1px var(--shadow-color, #888888);
			.btn{
				float: right;
			}
		}
	}

	.btn-close {
		background: var(--bg-color, #343434);
		display: block;
		position: absolute;
		top: var(--base-height);
		right: var(--base-height);
		width: calc(var(--base-height) * 3);
		height: calc(var(--base-height) * 3);
    line-height: var(--line-height);
		border: 0;
		padding: 0;
	}
</style>