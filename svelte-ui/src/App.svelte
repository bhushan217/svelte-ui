<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import Toggle from './lib/fields/Toggle.svelte'
  import Index from './lib/layout/index.svelte';
</script>

<main>
  <Index>
  <div class="card">
    <Counter />
    <Toggle />
  </div>
  </Index>
</main>
