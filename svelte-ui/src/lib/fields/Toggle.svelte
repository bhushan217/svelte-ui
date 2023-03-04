<script lang="ts" context="module">
	let mid = 0
</script>
<script lang="ts">
	import {createEventDispatcher, onMount} from 'svelte'
	export let label = '';
	export let key = '';
  export let checked = false;
  export let disabled = false;
	export let value = checked;
	let id = ++mid;

	onMount(()=>{
		//id = mid++
	})

	const dispatcher = createEventDispatcher()
	let cb;
	const onChange = () => {
		dispatcher('checked',checked)
	} 
	const toggleCheck = () => {
		checked = !checked
		value = checked
		dispatcher('checked',checked)
	}
</script>

<label class="form-label" data-testid="toggle-compnent"
 for="toggle-input-{id}">{label}</label>
<div class="form-control" >
	<input name={key} id="toggle-input-{id}" bind:this={cb} class="field-input"
	 {checked} type="checkbox" {disabled} {value} on:change={onChange}/>
	<div class="toggle" class:disabled on:click={toggleCheck} on:keypress={toggleCheck}/>
</div>

<style lang="scss">
	@use '../../styles' as *;
  $width:  calc(var(--input-height) * 2 - var(--base-padding));
  $height:  var(--input-height);
  $heightP: calc(var(--input-height) - var(--base-padding));
  $basePadding: var(--base-padding);
  $padding:  calc(var(--base-padding-xs) /2);

  $textColor: var(--text-color);
  $primary: var(--primary);
  $bgColor: var(--input-bg);
  $shadowColor:  var(--shadow-color);

  .form-control{
		align-items: center;
		.toggle {
			cursor: pointer;
			position: relative;
			@include rect( $width,  $height,  $height);
			border: solid 1px  var(--border-color);
			background-color:  $bgColor;
			@include shadowHover;
			&:after {
				content: 'OFF';
				font-size: .7em;
				text-align: center;
				// align-self: center;
				vertical-align: middle;
				@include absolute('lt', $padding, $padding);
				background-color: $textColor;
				color: $bgColor;
				@include square($heightP, $heightP);
				line-height: #{$heightP};
				@include tranzition;
			}
		}

		input {
			display: none;

			&:checked + .toggle {
				background-color: var(--success);
				&:after {
					content: ' ON ';
					transform: translateX(#{$heightP});
					background-color: $bgColor;
					color: $textColor;
				}
			}
		}
		&.disabled{
			.toggle {
				cursor: not-allowed;
				background-color:  var(--disabled-color) ;
			}
			input {
				&:checked + .toggle {
					background-color: var(--disabled-color);
				}
			}
		}
  }
</style>
