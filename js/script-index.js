const apiUrl = "https://my-json-server.typicode.com/bellynhaoliver/api-project-locar/cars";

async function fetchVehicles() {
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao buscar os veículos");
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem("vehicles", JSON.stringify(data));
    })
    .catch(error => console.error("Erro:", error));
}

document.addEventListener('DOMContentLoaded', fetchVehicles);