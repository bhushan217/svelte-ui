<script>
  import { tick } from 'svelte';
 
  export let id;
  export let mask;
  export let value;
  export let required = false
  export let disabled = false
  let textbox;
  $: isRequired = !!textbox?.hasAttribute('required')
  $: isValid = mask.length === value.length
  $: cssClass = isRequired && !disabled ? isValid ? 'valid' : 'error invalid' : '';
  const maskValue = (value) => {
    let masked = ''
    let i = makeDigiter(value);
    if (! i.more) {
      return masked;
    }
    for (const m of mask) {
      if (m === '#' && i.next()) {
        // consume digit
        masked += i.value;
      } else if (i.more) {
        // use mask character
        masked += m;
      } else {
        // ran out of digits
        break;
      }
    }
    return masked;
  }
 
  const makeDigiter = (value) => {
    const digits = getDigits(value);
    const { length } = digits;
    let i = 0;
 
    return {
      more: (i < length),
      value: null,
      next() {
        if (this.more) {
          this.value = digits[i];
          i += 1;
          this.more = i < length;
          return true;
        } else {
          return false;
        }
      }
    };
  }
 
  const getDigits = (value) => {
    let digits = '';
    for (const c of value) {
      if (c >= '0' && c <= '9') {
        digits += c;
      }
     }
    return digits;
  }
 
  const handleInput = ({ target: input, inputType}) => {
    const {
      selectionStart: oldStart,
      selectionEnd: oldEnd,
      value: { length: oldLength }
    } = input;
    let [start, end] = [oldStart, oldEnd];
 
    value = fixIt(input, value, maskValue(input.value));
    
    const { length } = value;
    switch (inputType) {
      case 'insertText':
        const adjust = length - oldLength;
        if (adjust > 0) {
          start += adjust;
        } else if (isRightOfMask(start)) {
          start += 1;
        } 
        break;
 
      case 'deleteContentBackward':
        if(isRightOfMask(start)) {
          // Immediately to the right of non-digit
          // character, move to right of next digit
          // to the left. 
          // (TODO: more than one adjacent mask character)
          start -= 1;
        }
        break;
 
      case 'deleteContentForward':
        if (start === length && isRightOfMask(start)) {
          // End of content, immediately to the right of non-digit
          // character, move to right of last digit 
          // (TODO: more than one adjacent mask character)
          start -= 1;
        }
        break;
    }
 
    if (oldStart === oldEnd) {
      end = start;
    }
    queueRestoreSelection(input, start, end);
  }
 
  const queueRestoreSelection = async (input, start, end) => {
    await tick();
    input.setSelectionRange(start, end);
  }
   
  const isRightOfMask = (position) => {
    return  position > 1 && mask[position - 1] !== '9';
  }
   
  const fixIt = (input, state, sanitized) => {
    if (state === sanitized && sanitized !== input.value) {
      // Because 'SvelteDOMSetProperty' isn't fired
      input.value = sanitized;
    }
    return sanitized;
  }
 </script>
 
 <input autocomplete="off" {id} bind:this={textbox} type="text"
  maxLength={mask.length} on:input={handleInput}
  placeholder={mask} value={value} {required} {disabled} validity={cssClass}
  class="form-control {cssClass}"/>