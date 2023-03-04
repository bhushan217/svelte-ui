<script>
  import B2kSchemaField from './B2kSchemaField.svelte';
  import B2kButton from './B2kButton.svelte';
  export let value;
  export let key;
  export let update;
  export let schema;
  const add = () => {
    temp_value = [...temp_value,{trait_type: "", value: ""}];
  }
  const remove = (index) => {
    temp_value.splice(index,1);
    update(key,temp_value);
  }
  const update_object = (k,v,i) => {
    temp_value[i][k] = v;
    update(key,temp_value);
  }
  $: temp_value = value;
</script>

<div class="object_array">
  {#each temp_value as value, index}
  <div class="flex">
    <div class="grow flex justify-stretch items-center">
      {#each Object.entries(value) as [k,v]}
      <div class="grow mr-2">
        <B2kSchemaField {schema} update={(k,v) => update_object(k,v,index)} key={k} value={v}/>
      </div>
      {/each}
    </div>
    <B2kButton on:click={() => remove(index)} classes="btn-circle">x</B2kButton>
  </div>
  {:else}
    No Values
  {/each}
  <B2kButton on:click={add} tooltip="Add" classes="btn-circle">+</B2kButton>
</div>