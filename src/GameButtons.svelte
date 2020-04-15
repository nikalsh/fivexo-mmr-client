<script>
  import { queue } from "./utils/websockets.js";
  import { queueStore } from "./stores.js";
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

  onDestroy(queueStoreUnsubscribe)

  function play() {
    init = !init;
    queue();
  }
</script>

<style>

</style>

<main>
  <button disabled={disable} on:click={() => play()}>PLAY</button>
</main>
