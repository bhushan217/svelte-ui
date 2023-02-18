<script>
	import MaskedInput from '../fields/MaskedInput.svelte';
	let phone = '';

  import TreeView from '../components/TreeView.svelte'

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
</script>

<div class="form-group">  
  <label class="field-label" for="masked-phone">
    Phone
  </label>
    <MaskedInput required={true} id="masked-phone" mask="+99-999-999-9999" bind:value={phone}
    />
  <div class="description">
    phone = {phone}
  </div>
</div>


<div class="form-group"> 
  <TreeView {tree} />
</div>

<style lang="scss">
  .form-group{
    margin-top: 1rem;
    border-bottom: solid 1px var(--shadow-color);
    @extend .shadow !optional;
    .description{
      
    }
  }
</style>