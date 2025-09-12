import { checkResponse } from "./checkResponse";

const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse).catch(console.error);
}

export { getItems };
