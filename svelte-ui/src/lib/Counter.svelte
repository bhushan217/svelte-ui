<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment} data-tesetid="counter-component">
  count is {count}
</button>
