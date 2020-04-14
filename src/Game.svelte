<script>
  import { gameStore, gameSocketStore, gameCharacterStore } from "./stores.js";
  import { onDestroy } from "svelte";

  let rows = 15;
  let cols = 15;
  let grid;

  let character, turn;

  const gameCharacterStoreUnsubscribe = gameCharacterStore.subscribe(characterStore => {
    if (characterStore !== undefined) {
      character = characterStore.character;
      turn = characterStore.turn;
    }
  });

const gameStoreUnsubscribe = gameStore.subscribe(game => {
  if (game !== undefined) {
    grid = game.grid;
  }
})

  const retardedBooleanExpression = (character, turn) =>
    !!!character && !!!turn ? true : character !== turn;

  const myTurn = (character, turn) => !retardedBooleanExpression(character, turn)

  onDestroy(gameCharacterStoreUnsubscribe, gameStoreUnsubscribe);

  function initGrid() {
    grid = [...Array(rows)].map(x => Array(cols).fill(" "));
  }

  function handleClick(i, j) {
    if (myTurn(character, turn)) {
      $gameSocketStore.send(i + " " + j);
      grid[i][j] = $gameCharacterStore.character;
      console.log(i + " " + j);
    }
  }

  initGrid();
</script>

<style>
  main {
    margin: 0;
    color: white;
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
  <h1>Five In A Row</h1>
  {#each grid as row, i}
    {#each row as col, j}
      <button
        class:enabled={myTurn(character, turn)}
        disabled={!myTurn(character, turn)}
        on:click={() => handleClick(i, j)}>
        {grid[i][j]}
      </button>
    {/each}
    <br />
  {/each}
</main>
