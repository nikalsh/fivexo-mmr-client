import axios from "axios";
import { BASE_URL, BASE_WS_URL } from "./urls";

export async function getNewId() {
  const res = await axios.get(BASE_URL + "/api/player/new");
  return res.data.id;
}

export async function getStatsById(id) {
  const res = await axios.get(BASE_URL + `/api/player/${id}`);
  return res.data;
}

export async function updateName(id, name) {
    const res = await axios.put(BASE_URL + `/api/player/${id}/${name}`)
    return res.data;
}

export async function getAllPlayers() {
    const res = await axios.get(BASE_URL + "/api/player")
    return res.data
}
