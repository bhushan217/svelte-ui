<script>
  export let classes = "";
  export let label;
  export let isGroup
</script>

<div class="form-group {classes} ">
  {#if label}
    <span class="field-label {isGroup ? "font-bold mb-2" : ""}">{label}</span>
  {/if}
  <slot/>
</div>