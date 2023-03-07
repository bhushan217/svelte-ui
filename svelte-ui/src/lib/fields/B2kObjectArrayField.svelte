<script>
  import B2kSchemaField from './B2kSchemaField.svelte';
  import B2kButton from './B2kButton.svelte';
  export let value;
  export let key;
  export let update;
  export let schema;
  export let mainSchema;
  $: schemaRefs = schema.schemaRefs;
  const add = () => {
    const newVal = {}
    schemaRefs.forEach(element => {
      newVal[element] = null;
    });
    //temp_value.push(newVal);
    console.log({action: 'add', temp_value, newVal, value})
    temp_value = [...temp_value, newVal]
  }
  const remove = (index) => {
    temp_value.splice(index,1);
    update(key,temp_value);
  }
  const update_object = (k,v,i) => {
    temp_value[i][k] = v;
    update(key,temp_value);
  }
  $: temp_value = value || [];
  console.log({key,value,temp_value})
</script>

<div class="object_array">
  {#each temp_value as tempVal, index}
  <div class="flex">
    <div class="grow flex justify-stretch">
      {#each Object.entries(tempVal) as [k,val], ind}
      <div class="grow mr-2">
        <B2kSchemaField schema = {mainSchema[k]} {mainSchema} update={(k,val) => update_object(k,val,index)} key={k} value={val}/>
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