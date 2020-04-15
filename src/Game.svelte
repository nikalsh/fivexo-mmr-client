<script>
  import { queueStore, gameStore, gameSocketStore, gameCharacterStore } from "./stores.js";
  import { onDestroy } from "svelte";

  let rows = 15;
  let cols = 15;
  let grid;

  let character,
    turn = false;
  let gameOver = false;

  const gameCharacterStoreUnsubscribe = gameCharacterStore.subscribe(
    characterStore => {
      if (characterStore) {
        character = characterStore.character;
        turn = characterStore.turn;
      }
    }
  );



  const gameStoreUnsubscribe = gameStore.subscribe(game => {
    if (game) {
      grid = game.grid;
      gameOver = game.gameOver;
      if (!!gameOver) {

        // $queueStore.set(undefined)
        // $gameSocketStore.close();
      }
    }
  });

  const canPlace = (character, turn, gameOver) =>
    ((myTurn(character, turn) && !gameOver));

  const myTurn = (character, turn) =>
    !!character && !!turn && turn == character;

  onDestroy(gameCharacterStoreUnsubscribe, gameStoreUnsubscribe);

  function initGrid() {
    grid = [...Array(rows)].map(x => Array(cols).fill(""));
  }

  function handleClick(character, turn, gameOver, i, j) {
    if (canPlace(character, turn, gameOver) && grid[i][j] === "") {
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
    background-color: pink;
  }
</style>

<main>
  <h1>Five In A Row</h1>
  {#each grid as row, i}
    {#each row as col, j}
      <button
        class:enabled={canPlace(character, turn, gameOver)}
        disabled={!canPlace(character, turn, gameOver)}
        on:click={() => handleClick(character, turn, gameOver, i, j)}>
        {grid[i][j]}
      </button>
    {/each}
    <br />
  {/each}
</main>
