<script>
  export let classes = ''
  export let variant = 'primary';
  export let disabled = false;
  export let label = '';
  let baseStyle = `btn bg-${variant} ${classes} ${disabled ? 'disabled' : ''}`
  export let tooltip = label
</script>
<button title={tooltip} {disabled} value="{label}" on:click class={baseStyle}><slot/></button>
