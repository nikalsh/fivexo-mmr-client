import * as urls from "./urls.js";
import {
  gameCharacterStore,
  playerStore,
  queueStore,
  gameStore,
  gameSocketStore,
} from "../stores.js";
import { get } from "svelte/store";

let queueSocket;
let gameSocket;

export function queue() {
  if (!queueSocketManager.connected) {
    queueSocket = queueSocketManager().open();
  }

  queueSocket.onmessage = function (m) {
    try {
      console.log(JSON.parse(m.data));
      queueStore.set(JSON.parse(m.data));
      console.log(get(queueStore).id);

      game();
      queueSocketManager.connected = false
      queueSocketManager.socket.close();
    } catch (err) {
      console.log(m.data);
    }
  };

  queueSocket.onopen = function () {
    queueSocket.send("queue");
  };

  queueSocket.onclose = function () {
    console.log("websocket closed");
    queueSocketManager.connected = false;
  };
}

function game() {
  if (!gameSocketManager.connected) {
    gameSocket = gameSocketManager().open();
  }

  gameSocket.onmessage = function (m) {
    try {

    if (JSON.parse(m.data).hasOwnProperty("character") && JSON.parse(m.data).hasOwnProperty("turn")) {
        gameCharacterStore.set(JSON.parse(m.data));
      } 

      else {
        gameStore.set(JSON.parse(m.data))
        const gcs = get(gameCharacterStore)
        gcs.turn = get(gameStore).turn
        gameCharacterStore.set(gcs)
      }
      console.log(JSON.parse(m.data));
    } catch (err) {
    console.log(err);
    
    }
  };

  gameSocket.onopen = function (m) {
      gameSocketStore.set(gameSocket)
    console.log("game socket opened");
  };

  gameSocket.onclose = function () {
    gameSocketManager.connected = false;
  };
}

function queueSocketManager() {
  return {
    connected: false,
    open: () => {
      queueSocketManager.connected = true;
      return new WebSocket(`${urls.BASE_WS_URL}/queue/${get(playerStore).id}`);
    },
  };
}

function gameSocketManager() {
  return {
    connected: false,
    open: () => {
      gameSocketManager.connected = true;
      return new WebSocket(
        `${urls.BASE_WS_URL}/play/${get(queueStore).id}/${get(playerStore).id}`
      );
    },
  };
}
