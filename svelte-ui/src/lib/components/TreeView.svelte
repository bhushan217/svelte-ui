<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	}
</script>
<script>
//	import { slide } from 'svelte/transition'
	export let tree
	const {label,description, isRoot, children} = tree

	let expanded = _expansionState[label] || false
	const toggleExpansion = () => {
		expanded = _expansionState[label] = !expanded
	}
	$: arrowDown = expanded
</script>

	<ul class="tree-continer" class:isRoot>
		{#if children}
			<li on:click={toggleExpansion} on:keyup={toggleExpansion}
       class="tree-node has-child" class:arrowDown>
				<div class="tree-node-header">{label}</div>
				<div class="tree-node-body">{description??'Amit'}</div>
			</li>
			{#if expanded}
				{#each children as child}
					<svelte:self tree={child} />
				{/each}
			{/if}
		{:else}
			<li class="tree-node no-child">
				{label}
			</li>
		{/if}
  </ul>

<style lang="scss">
	@use '../../styles' as *;
  .tree-continer {
    width: 100%;
		user-select: none;
		padding-left: .7rem;
    &:not(.isRoot) {
      border-left: 1px solid var(--input-bg);
    }
    .tree-node{
      padding: .3rem .8rem;
      position: relative;
      &.has-child:before {
        content: ' ';
        @include absolute('lt', .2rem, .6rem);
        margin-left: -.3rem;
        font-size: .5rem;
        cursor: pointer;
        display: inline-block;
        width: 1em;
        height: 1em;
        border-style: solid;
        border-width: 2px 2px 0 0;
        border-color: var(--primary, #888);
        transform: rotate(45deg);
        @include tranzition;
      }
      &.has-child.arrowDown:before {
        transform: rotate(135deg);
      }
      .tree-node-header{
        //background-color: var(--accent);
        font-weight: 700;
        display: inline-block;
      }
      .tree-node-body{
        //background-color: var(--tertiary);
        display: inline-block;
        font-size: .7em;
        color: var(--accent);
      }
    }
  }
</style>
