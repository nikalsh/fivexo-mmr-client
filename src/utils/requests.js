import axios from "axios";
import { BASE_URL, BASE_WS_URL } from "./urls";

export async function fetchNewId() {
  return axios.get(BASE_URL + "/api/player/new");
}

export async function fetchStatsById(id) {
  return axios.get(BASE_URL + `/api/player/${id}`);
}

export async function setNewName(id, name) {
  return axios.put(BASE_URL + `/api/player/${id}/${name}`);
}

export async function fetchAllStats() {
    return axios.get(BASE_URL + "/api/player")
}
