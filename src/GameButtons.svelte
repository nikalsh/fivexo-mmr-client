<script>
  import { playerStore, gameStore } from "./stores.js";
  import { queue } from "./utils/websockets.js";

  function play() {
    queue();
  }
</script>

<style>

</style>

<main>
  <button on:click={() => play()}>PLAY</button>
</main>
