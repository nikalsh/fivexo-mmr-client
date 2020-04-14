<script>
  import { onDestroy, onMount } from "svelte";
  import { playerStore } from "./stores.js";
  import * as requests from "./utils/requests.js";

  let player;
  let name;
  let showOptions = false;

  const unsubscribe = playerStore.subscribe(storedPlayer => {
    player = storedPlayer;
    name = storedPlayer.name;
  });

  onDestroy(unsubscribe);


  console.log($playerStore);
  

  async function setName(name) {
    if (name) {
      let res = await requests.setNewName(player.id, name);
      playerStore.set(res.data);
    }
  }

  async function resetId() {
    let res = await requests.fetchNewId();
    playerStore.set(res.data);
  }
</script>

<style>
  p {
    color: white;
  }

  button.link {
    background: none;
    border: none;
    cursor: pointer;
    color: white;
  }

  button.link:hover {
    text-decoration: underline;
  }

  table {
    display: inline-block;
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    /* padding: 150px; */
    box-shadow: 10px 10px 1px black;
    /* margin-left: auto; */
    /* margin-right: auto; */
  }

  .wrapper {
    margin: 0;
    position: absolute;
    height: 100%;
    top: 75%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  tr:nth-child(odd) {
    background-color: white;
  }

  .greentext {
    color: green;
    font-weight: bold;
  }

  .redtext {
    color: red;
    font-weight: bold;
  }

  .goldentext {
    color: goldenrod;
    font-weight: bold;
  }

  .bold {
    font-weight: bold;
  }
</style>

<gui>

  <div class="wrapper">
    <p>You</p>
    <table>

      <tr>
        <td class="bold">Name</td>
        <td>{player.name}</td>
      </tr>
      <tr>
        <td class="bold">ID</td>
        <td>{player.id}</td>
      </tr>
      <tr>
        <td class="bold">Level</td>
        <td>{player.level}</td>
      </tr>
      <tr>
        <td class="bold">Wins</td>
        <td>{player.wins}</td>
      </tr>
      <tr>
        <td class="bold">Losses</td>
        <td>{player.losses}</td>
      </tr>
      <tr>
        <td class="bold">Ties</td>
        <td>{player.ties}</td>
      </tr>
      <tr>
        <td class="bold">MMR</td>
        <td>{player.experience}</td>
      </tr>

    </table>

    <p>
      <button
        on:click={() => {
          showOptions = !showOptions;
        }}
        class="link">
        Clicky
      </button>
    </p>

    {#if showOptions}
      <p>
        Name
        <input bind:value={name} />
      </p>

      <button on:click={() => setName(name)}>Save</button>
      <button on:click={resetId}>Reset ID</button>
    {/if}

  </div>

</gui>
