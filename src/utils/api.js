const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse).catch(console.error);
}

function postItems({ name, imageUrl, weatherType }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weatherType }),
  })
    .then(checkResponse)
    .catch(console.error);
}

function removeItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then(checkResponse)
    .catch(console.error);
}

export { checkResponse, getItems, postItems, removeItems };
