<script>
  let rows = 15;
  let cols = 15;
  let grid;
  let game = true

  initGrid();

  function initGrid() {
    grid = [...Array(rows)].map(x => Array(cols).fill(" "));
  }

  function handleClick(i, j) {
    grid[i][j] = "X"
    console.log(i + " " + j);
    
  }
</script>

<style>
  main {
    margin: 0;
  }
  button {
    margin: 0;
    text-align: center;
    width: 40px;
    height: 40px;
    font-weight: 600;
    vertical-align: top;
  }

  .enabled {
    cursor: pointer;
  }
</style>

<main>

  {#each grid as row, i}
    {#each row as col, j}
      <button
      class:enabled={game}
      disabled={!game} 
      on:click={() => handleClick(i, j)}>{grid[i][j]}</button>
    {/each}
    <br />
  {/each}

</main>
