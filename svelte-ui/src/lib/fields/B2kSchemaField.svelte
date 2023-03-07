<script lang="ts">
  import {onMount, getContext} from 'svelte';
  import B2kArrayField from './B2kArrayField.svelte';
  import B2kObjectArrayField from './B2kObjectArrayField.svelte';
  import B2kObjectField from './B2kObjectField.svelte';
  import B2kFormGroup from './B2kFormGroup.svelte';
  import type {B2kSchema} from './b2k.interface';
	import Toggle from './Toggle.svelte';
  onMount(()=>{
    
  })
  export let key = undefined;
  export let value;
  export let update;
  export let config = {};
  export let schema: B2kSchema;
  export let mainSchema;
  $: type = schema.type ?? "text";
  $: label = schema.label ?? key;
  $: options = schema.options ?? [];
  $: layout = schema.layout ?? "";
  $: isGroup = (type === 'object' || type === 'array' || type === 'object_array')
  let inputStyle = "form-control "
  const updateVal = (key, e) => update(key,e.target.value)
  console.log({schema, key,type,value,})
</script>

<div class="form-group">
  <B2kFormGroup {label} {isGroup}>
    {#if type === "text"}
      <input data-key={key} on:input={(e) => updateVal(key,e)}
       class={inputStyle} type="text" value={value??''}/>
    {:else if type === "textarea"}
      <textarea data-key={key} rows="3" on:input={(e) => updateVal(key,e)}
         class={inputStyle} value={value??''}/>
    {:else if type === "number"}
      <input data-key={key} on:input={(e) => updateVal(key,e)} 
      class={inputStyle} type="number" value={value ? parseInt(value) :null}/>
    {:else if type === "checkbox"}
      <Toggle {key} checked={value} 
      on:checked={(e) => update(key, e.detail)}></Toggle>
    {:else if type === "date"}
      <input class={inputStyle} on:input={(e) => updateVal(key,e)} 
      type="datetime-local" value={value}>
    {:else if type === "select"}
      <select data-key={key} on:change={(e) => updateVal(key,e)} 
        class={inputStyle} value={value}>
        {#each options as option}
          <option value="{option.id}" selected={value===option.id}>{option.text}</option>
        {/each}
      </select>
    {:else if type === "object"}
      <B2kObjectField {schema} {mainSchema} {update} {key} {layout}  value = {value ?? {}}/>
    {:else if type === "array"}
      <B2kArrayField {schema} {mainSchema} {update} {key}  value = {value ?? []} />
    {:else if type === "object_array"}
      <B2kObjectArrayField {schema} {mainSchema} {update} {key} value = {value ?? []}/>
    {/if}
  </B2kFormGroup>
</div>