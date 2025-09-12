const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  //return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse).catch();
}

export { checkResponse, getItems };
