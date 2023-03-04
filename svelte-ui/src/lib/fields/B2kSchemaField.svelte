<script>
  import {onMount, getContext} from 'svelte';
  import B2kArrayField from './B2kArrayField.svelte';
  import B2kObjectArrayField from './B2kObjectArrayField.svelte';
  import B2kObjectField from './B2kObjectField.svelte';
  import B2kFormGroup from './B2kFormGroup.svelte';
	import Toggle from './Toggle.svelte';
  onMount(()=>{
    
  })
  export let key = undefined;
  export let value;
  export let update;
  export let config = {};
  export let schema;
  $: type = schema[key]?.["type"] ?? "text";
  $: label = schema[key]?.["label"] ?? key;
  $: layout = schema[key]?.["layout"] ?? "";
  $: isGroup = (type === 'object' || type === 'array' || type === 'object_array')
  let inputStyle = "form-control "
  const updateVal = (key, e) => update(key,e.target.value)
</script>

<div class="form-group">
  <B2kFormGroup {label} {isGroup}>
    {#if type === "text"}
      <input data-key={key} on:input={(e) => updateVal(key,e)} class={inputStyle} type="text" value={value}/>
    {:else if type === "textarea"}
      <textarea data-key={key} rows="3" on:input={(e) => updateVal(key,e)} class={inputStyle} value={value}/>
    {:else if type === "number"}
      <input data-key={key} on:input={(e) => updateVal(key,e)} class={inputStyle} type="number" value={parseInt(value)}/>
    {:else if type === "checkbox"}
      <Toggle {key} checked={value} on:checked={(e) => update(key, e.detail)}></Toggle>
    {:else if type === "date"}
      <input class={inputStyle} on:input={(e) => updateVal(key,e)} type="datetime-local" value={value}>
    {:else if type === "array"}
      <B2kArrayField {schema} {update} {key} {value} />
    {:else if type === "object_array"}
      <B2kObjectArrayField {schema} {update} {key} {value}/>
    {:else if type === "object"}
      <B2kObjectField {schema} {update} {key} {layout} {value}/>
    {/if}
  </B2kFormGroup>
</div>