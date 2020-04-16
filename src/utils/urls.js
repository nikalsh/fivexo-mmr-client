export let BASE_URL = "http://localhost:8080";
export let BASE_WS_URL = "ws://localhost:8080";


if (process.env.isProd) {
    BASE_URL = "https://fivexo.herokuapp.com";
    BASE_WS_URL = "wss://fivexo.herokuapp.com";
  }
  