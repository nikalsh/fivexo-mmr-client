<script>
  import { queue } from "./utils/websockets.js";
  import { queueStore, gameStore } from "./stores.js";
  import { onDestroy } from "svelte"
  export let init;

  let disable = false;

  const queueStoreUnsubscribe = queueStore.subscribe(queueStore => {
    if (queueStore !== undefined) {
      disable = queueStore.gameFound;
    } else {
      disable = false
    }
  });

  const gameStoreUnsubscribe = gameStore.subscribe(game => {
    if (game !== undefined) {
      disable = !game.gameOver
    }
  })

  onDestroy(queueStoreUnsubscribe, gameStore)

  function play() {
    queue();
    init = !init;

 
  }
</script>

<style>

</style>

<main>
  <button disabled={disable} on:click={() => play()}>PLAY</button>
</main>
