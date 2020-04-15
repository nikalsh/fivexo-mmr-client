<script>
  import * as requests from "./utils/requests.js";

  let leaderboard;

  function getWinPercent(player) {
    const winPercent = calculateWinPercent(player);
    return isNaN(winPercent) ? 0 : winPercent;
  }

  function calculateWinPercent(player) {
    return Math.trunc(
      (player.wins / (player.wins + player.losses + player.ties)) * 100
    );
  }

  async function updateLeaderboard() {
    return requests.fetchAllStats();
  }

  setInterval(async () => {
    let res = await updateLeaderboard();
    leaderboard = res.data;
  }, 1000);
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 100vh;
    margin: 0 auto;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    /* padding: 150px; */
    box-shadow: 10px 10px 1px black;
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  {#if !leaderboard}
    <p>Loading leaderboard..</p>
  {:else}
    <table class="leaderboard">
      <tr>
        <th>Level</th>
        <th>Name</th>
        <th>Wins</th>
        <th>Losses</th>
        <th>Ties</th>
        <th>Games</th>
        <th>Win%</th>
        <th>MMR</th>
      </tr>
      {#each leaderboard as player, i}
        <tr>
          <td class={i === 0 ? 'goldentext' : 'bold'}>{player.level}</td>
          <td class="bold">{player.name}</td>
          <td class="greentext">{player.wins}</td>
          <td class="redtext">{player.losses}</td>
          <td class="redtext">{player.ties}</td>
          <td class="bold">{player.wins + player.losses + player.ties}</td>
          <td class="greentext">{getWinPercent(player)}%</td>
          <td class="bold">{player.experience}</td>
        </tr>
      {/each}
    </table>
  {/if}
</main>
