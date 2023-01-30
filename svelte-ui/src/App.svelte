<script lang="ts">
  import Index from './lib/layout/index.svelte';  
	import { onWindowLoad } from './stores/layout/layout.store';
</script>
  <svelte:window on:load={onWindowLoad}/>
<main>
  <Index />
</main>
