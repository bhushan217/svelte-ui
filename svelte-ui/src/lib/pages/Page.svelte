<script>
	import MaskedInput from '../fields/MaskedInput.svelte';
	let phone = '';
</script>

<div class="form-control">  
  <label class="field-label" for="masked-phone">
    Phone
  </label>
    <MaskedInput required={true} id="masked-phone" mask="+99-999-999-9999" bind:value={phone}
    />
</div>
<div>
	phone = {phone}
</div>