<script>
  import B2kSchemaField from './B2kSchemaField.svelte';
  import B2kButton from './B2kButton.svelte';
  export let value;
  export let key;
  export let update;
  export let schema;
  $: temp_value = value;
  const add = () => {
    temp_value = [...temp_value,""];
  }
  const remove = (index) => {
    temp_value.splice(index,1);
    update(key,temp_value);
  }
  const update_array = (k,v,index) => {
    temp_value[index] = v;
    // console.log(temp_value);
    update(key,temp_value);
  }
</script>

<div class="array">
  {#each temp_value as val, index}
  <div class="flex items-center">
    <div class="grow">
      <B2kSchemaField {schema} update={(k,v) => update_array(k,v,index)} value={val}/>      
    </div>
    <B2kButton variant="danger" on:click={() => remove(index)} classes="mt-1 btn-circle">X</B2kButton>
  </div>
  {:else}
  <div> No Values </div>
  {/each}
  <B2kButton on:click={add} tooltip="Add {key}" classes="mt-1 btn-round">+</B2kButton>
</div>