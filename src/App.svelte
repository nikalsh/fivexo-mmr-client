<script>
  import Leaderboard from "./Leaderboard.svelte";
  import Game from "./Game.svelte";
  import PlayerBox from "./PlayerBox.svelte";
  import OpponentBox from "./OpponentBox.svelte";
  import GameButtons from "./GameButtons.svelte";
  import { onMount } from "svelte";
  import * as requests from "./utils/requests.js";
  import { playerStore, gameStore } from "./stores.js";
  import * as cookies from "./utils/cookies.js";
  import { get } from "svelte/store";

  let renderGame = true;

  console.log("Rendergame: " + renderGame);

  onMount(async () => {
    await init();
  });

  async function init() {
    if (cookies.playerIdMissing()) {
      const res = await requests.fetchNewId();
      const player = res.data;
      cookies.setCookie("playerId", player.id, 360);
      playerStore.set(player);
    } else {
      const playerIdCookie = cookies.getCookie("playerId");
      const res = await requests.fetchStatsById(playerIdCookie);
      console.log(res.data);
      const player = res.data;
      playerStore.set(player);
    }
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    display: inline;
  }

  :root {
    background-color: darkslategray;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .container {
    height: 80%;
    width: 100%;
    display: flex;
  }
  .leftThing {
    position: relative;

    width: 25%;
    /* background-color: blue; */
    text-align: center;
  }
  .content {
    width: 50%;
    /* background-color: green; */
  }
  .rightThing {
    width: 25%;
    /* background-color: yellow; */
  }

  .vertical {
    float: bottom;
    margin-left: auto;
    height: 50%;
  }
</style>

<main>
  <div class="container">

    <div class="leftThing">
      <PlayerBox />

    </div>

    <div class="content">
        <Game />
      <GameButtons bind:init={renderGame} />
      {$gameStore}
    </div>

    <div class="rightThing">

      <OpponentBox />

    </div>

  </div>

  <Leaderboard />

</main>
