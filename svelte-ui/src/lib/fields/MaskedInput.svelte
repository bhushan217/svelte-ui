<script>
  import { onMount, tick } from 'svelte';
  let maskedValue;
  export let label;
  export let id;
  export let mask;
  export let value;
  
  export let required = false
  export let disabled = false
  let textbox;
  $: isRequired = !!textbox?.hasAttribute('required')
  $: isValid = mask.length === value.length
  $: cssClass = isRequired && !disabled ? isValid ? 'valid' : 'error invalid' : '';
  const DIGIT = "#";
  const ALPHA = "A";
  const ALPHA_NUM = "_";
  const maskFun = () => {
      if (!value) return "";
      if (!mask) throw new ReferenceError("mask missing");
      const alphaNumChars = [...unmask()],
          output = [...unmask()];
      for (let i = 0; i < mask.length && output[i]; i++) {
          if ((alphaNumChars[i] === DIGIT && /\D/.test(output[i]) )
          || (alphaNumChars[i] === ALPHA && !/[a-z]/i.test(output[i])) 
          || (alphaNumChars[i] === ALPHA_NUM && /\W/i.test(output[i]))
          ) {
            output.splice(i, 1);
          } else if (/\W/g.test(mask[i])) {
            output.splice(i, 0, mask[i]) && alphaNumChars.splice(i, 0, mask[i]);
          }
        }
        console.log({alphaNumChars, output})
      return output.join("");
  };
  const unmask = () => {
      if (!value) return "";
      maskedValue = value.replace(/\W/ig, "");
      return mask ? maskedValue.slice(0, mask.replace(/\W/ig, "").length) : maskedValue;
  };
  const decimal = ( locale = "en-us", {
      style = "decimal",
      ...options
  } = {}) => {
      if (typeof value === "undefined" || value === "") return "";
      return new Intl.NumberFormat(locale, {
          style,
          ...options
      }).format(parseFloat(value));
  };
  const unmaskNumber = () => {
      if (!value || !mask) return value
      let output = value.replace(/\D/g, "")
      if (mask === "currency" && output > 0) {
          let output = [...parseFloat(value.replace(/\D/g, "")).toString()]
          if (output.length === 1) output.unshift("0")
          output.splice(-2, 0, ".")
          return output.join("")
      }
      return output;
  }
  const currency = (locale, defaults = {
      style: "currency",
      currency: "INR"
  }) => {
      return decimal(locale, defaults)
  }
  // const setValue = () => maskFun();
  const maskInput = () => {
    if (!mask) throw ReferenceError("Missing second parameter pattern.");
    value && maskFun();
  };
  onMount(() => {
    //console.log(textbox, mask)
    maskInput()
  })
  //on:input={handleInput}
 </script>
 
 <label class="field-label" for="masked-creditCard">
  {label} {!value ? '' : `(${mask || ''})` } {maskedValue||''}
</label>
 <input autocomplete="off" {id} bind:this={textbox} type="text"
  maxLength={mask.length} minLength={mask.length} on:input={maskFun}
  placeholder={mask} {value} {required} {disabled} data-validity={cssClass}
  class="form-control {cssClass}"/>
<div class="description">
  CC = {value}
</div>