<script lang="ts">
	import B2kSchemaForm from "../fields/B2kSchemaForm.svelte";

  let schema = {
    "fields": {
      "type": "object_array",
      "schemaRefs": ["key","label", "type"]
    }, 
    "key": {
      "label" : "Key",
      "type": "text",
      "isRef": true
    }, 
    "label": {
      "label" : "Label",
      "type": "text",
      "isRef": true
    },
    "type": {
      "label" : "Type",
      "type": "select",
      "options": [
        {id:'text', text:'Text'},
        {id:'checkbox', text:'checkbox'},
        {id:'number', text:'number'},
        {id:'textarea', text:'textarea'},
        {id:'date', text:'date'},
        {id:'datetime', text:'datetime'},
        {id:'select', text:'select'},
        {id:'object', text:'object'},
        {id:'array', text:'array'},
        {id:'object_array', text:'object_array'},
      ],
      "isRef": true
    },
    "options": {
      "type": "object_array",
      "schemaRefs": ["id", "text"],
      "isRef": true
    },
    "id": {
      "label": "Id",
      "type": "text",
      "isRef": true
    },
    "text": {
      "label": "Text",
      "type": "text",
      "isRef": true
    }
  }
  let formData = {
    fields: [
      {
        key: 'name',
        label: 'Name',
        type: 'text'
      },
      {
        key: 'desc',
        label: 'Description',
        type: 'textarea'
      },
      {
        key: 'sex',
        label: 'Gender',
        type: 'select',
        options: [
          { id: 'M', text:'Male'},
          { id: 'F', text:'Female'}
        ]
      },
    ],
  }
  $: previewSchema = formData.fields.reduce( (a,v) => ({...a, [v.key]: v}), {})
  let formVal = {}

</script>
<section class="card">
  <div class="card-header">
    <h1 >B2kSchemaForm Builder</h1>
    <p >
      A simple, dynamic form builder for svelte using form data from a specified schema.
    </p>
  </div>
  <div class="card-body">
      <B2kSchemaForm {schema} {formData} config={{submitLabel: 'Preview'}}
        onSubmit={(data) => previewSchema = formData.fields.reduce( (a,v) => ({...a, [v.key]: v}), {})}
        onChange={(key, value, oldValue, data) => console.log("changed", {key, value, oldValue, data})}
      />
  </div>

  <div class="card-footer mt-1">
    <h2>Preview Form</h2>
    <B2kSchemaForm schema={previewSchema} formData={formVal}  config={{submitLabel: 'Show Json in alert'}}
      onSubmit={(data) => alert(JSON.stringify(data))}
      onChange={(key, value, oldValue, data) => console.log("changed", {key, value, oldValue, data})}
    />
  </div>
</section>
<style lang="scss">
  .card-footer{

  }
</style>