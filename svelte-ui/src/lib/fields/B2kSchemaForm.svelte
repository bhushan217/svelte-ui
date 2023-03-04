<script lang="ts">
  import {onMount} from 'svelte'
  import B2kSchemaField from './B2kSchemaField.svelte';
  import B2kButton from './B2kButton.svelte';
  export let schema;
  export let formData;
  export let onSubmit;
  export let onChange;
  export let section = false;
  export let layout = "";
  export let config = {
    submitLabel: 'Submit'
  };
  const update = (key,value) => {
    const oldValue = formData[key]
    formData[key] = value;
    if (onChange !== undefined) {
      onChange(key, value, oldValue, formData);
    }
  }
  const submit = () => {
    onSubmit(formData);
  }
  onMount(() => {
  });
  $: filteredData = (section) ? formData.filter((a) => a["section"] === section) : formData
</script>

<div class="{layout} card">
  {#each Object.entries(filteredData) as [key,value]}
    <B2kSchemaField {schema} {update} {key} {value} {config}/>
  {:else}
    No Data
  {/each}
  <div class="w-full flex items-end justify-end">
    <B2kButton on:click={submit}>{config.submitLabel}</B2kButton>
  </div>
</div>

<style media="screen" lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem 1rem;
  grid-auto-flow: row;
}
</style>