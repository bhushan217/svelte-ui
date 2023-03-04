<script>
  import B2kSchemaField from './B2kSchemaField.svelte';
  //import B2kButton from './B2kButton.svelte';
  export let value;
  export let key;
  export let update;
  export let layout;
  export let schema;
  const add = () => {
    temp_value = [...temp_value,""];
  }
  const remove = (index) => {
    temp_value.splice(index,1);
    update(key,temp_value);
  }
  const update_object = (k,v) => {
    temp_value[k] = v;
    //console.log("Updating Object: ");
    //console.log(k,v);
    update(key,temp_value);
  }
  $: temp_value = Object.assign({}, value);
  //$: console.log(temp_value);
</script>

<div class="object {layout === "grid" ? "grid" : ""} mb-6">
  {#each Object.entries(temp_value) as [key, value], index}
  <div class="flex items-center">
    <div class="grow">
      <B2kSchemaField {schema} update={(key,value) => update_object(key,value)} {key} {value}/>
    </div>
  </div>
  {:else}
    No Values
  {/each}
</div>

<style media="screen">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px 16px;
  grid-auto-flow: row;
}
@media (max-width: 767px) {
  .grid{
    grid-template-columns: 1fr;
  }
}
</style>