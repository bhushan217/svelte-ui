<script>
  import B2kSchemaForm from '../fields/B2kSchemaForm.svelte';
	import MaskedInput from '../fields/MaskedInput.svelte';
	let phone = '+91-900-412-3456';
	let creditCard = '';
  let dob = '';

  import TreeView from '../components/TreeView.svelte'
	import Toggle from '../fields/Toggle.svelte';

  const tree = {
    isRoot: true,
    label: "USA",
    description: 'This  is country',    
    children: [
      {
        label: "Florida",
        description: 'This  is state', 
        children: [
          {
            label: "Jacksonville"
          },
          {
            label: "Orlando",
            description: 'This  is state', 
            children: [
              {label: "Disney World"},
              {label: "Universal Studio"},
              {label: "Sea World"},
            ]
          },
          {label: "Miami"},
        ]
      },
      {
        label: "California",
        description: 'This  is state',
        children: [
          {label: "San Francisco"},
          {label: "Los Angeles"},
          {label: "Sacramento"},
        ]
      },
    ],
  }

  let schema = {
    "title": {
      "label" : "Title",
      "type": "text",
      "section": [0]
    },
    "description": {
      "label" : "Description",
      "type": "textarea",
      "section": [0]
    },
    "agree": {
      "label" : "Agree",
      "type" : "checkbox"
    },
    "list": {
      "label" : "List",
      "type": "array",
      //"section": [0]
    },
    "other": {
      "label" : "Other Info",
      "type" : "object",
      "layout": "grid",
    },
    "age": {
      "label" : "Age",
      "type" : "number"
    },
    "name": {
      "label" : "Name",
      "type" : "text"
    },
    "color": {
      "label" : "Color",
      "type" : "text"
    },
  }
  let formData = {
    title: "",
    description: "",
    agree: true,
    list: ["Item A", "Item B"],
    other: {
      age: 0,
      name: "Lewn",
      color: "Brown"
    }
  }
</script>

<div class="form-group">  
  <MaskedInput required={true} disabled={false} id="masked-phone"
    mask="+##-###-###-####" bind:value={phone} label="phone"/>  
</div>
<div class="form-group">  
  <MaskedInput required={true} disabled={false} id="masked-creditCard"
    mask="####-####-####" bind:value={creditCard} label="Credit Card"/>  
</div>
<div class="form-group">  
  <MaskedInput required={true} disabled={true} id="masked-dob"
    mask="##/##/####" bind:value={dob} label="DOB"/>  
</div>
<div class="form-group">  
  <Toggle label="Agree" disabled={true}/>
</div>


<div class="form-group"> 
  <TreeView {tree} />
</div>

<section class="card">
  <div class="card-header">
    <h1 >B2kSchemaForm Example</h1>
    <p >
      A simple, dynamic form builder for svelte using arbitrary form data from a specified schema.
    </p>
  </div>
  <div class="card-body">
      <B2kSchemaForm {schema} {formData}
        onSubmit={(data) => alert(JSON.stringify(data))}
        onChange={(key, value, oldValue, data) => console.log("changed", {key, value, oldValue, data})}
      />
  </div>
</section>
