<script lang="ts">
  export let label = 'Checkbox'

</script>

<label class="field-label">
  {label}
  <input class="field-input" type="checkbox" />
  <div class="toggle"></div>
</label>

<style lang="scss">
  @import '../../styles/scss/styles.scss';
  $width: 48px;
  $height: calc(#{$width}/2);
  $radius: $height;
  .toggle{
    cursor: pointer;
    position: relative;
    @include rect($width, $height, $height);
    // width: var(--width);
    // height: var(--height);
    // border-radius: var(--radius);
    border: solid 1px --text-color;
    background-color: var(--bg-color);
    box-shadow: 1px 1px 2px var(--shadow-color);
    @include duration;

    &::after{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      @include square($height, $height);
      // border-radius: var(--radius);
      background-color: var(--bg-color);
      box-shadow: 1px 1px 4px var(--shadow-color);
    }
    &::before{
      content: ' ON';
      color: --text-color;
      font-size: calc(var(--width) / 4);
      line-height: calc(var(--width) / 3);
      position: absolute;
      left: calc(var(--height) / 8);
      top: calc(var(--height) / 8);
    }
  }

  input {
    opacity: 0;

    &:checked + .toggle{
      background-color: var(--success-color);
      &::after{
        transform: translateX(var(--height));
        //transform: translate3d(100%, 0, 0);
      }
    }

  }
</style>