<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	export let label = '';
  export let checked = false;
  export let disabled = false;

	const dispatcher = createEventDispatcher()
	let cb;
	const onChange = () => {
		dispatcher('checked',checked)
	} 
</script>

<label class="field-label" data-testid="toggle-compnent">{label} 
	<input bind:this={cb} class="field-input" {checked} type="checkbox" {disabled} value="Y" on:change={onChange}/>
	<div class="toggle" />
</label>

<style lang="scss">
	@use '../../styles' as *;
  $width:  calc(var(--input-height) * 2 - var(--base-padding));
  $height:  var(--input-height);
  $heightP: calc(var(--input-height) - var(--base-padding));
  $basePadding: var(--base-padding);
  $padding:  calc(var(--base-padding-xs) /2 + 1px);

  $textColor: var(--text-color);
  $primary: var(--primary);
  $bgColor: var(--bg-color);
  $shadowColor:  var(--shadow-color);

  .field-label{    
    //border-bottom: solid $padding  $textColor;
    padding: $padding;
  }
	.toggle {
		cursor: pointer;
		position: relative;
		@include rect( $width,  $height,  $height);
		//border: solid $padding  $textColor;
		background-color:  $bgColor;
		@include shadowHover;

		&::after {
			content: ' ';
			@include absolute('lt', $padding, $padding);
			background-color: $textColor;
			@include square($heightP, $heightP);
			@include tranzition;
		}
	}

	input {
		display: none;

		&:checked + .toggle {
			background-color: var(--success);
			&::after {
				transform: translateX(#{calc($heightP * 1)});
			  background-color: $bgColor;
			}
		}
	}
</style>
