const apiUrl = "https://my-json-server.typicode.com/bellynhaoliver/api-project-locar/cars";


document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.endsWith("index.html")) {
    const vehicles = localStorage.getItem("vehicles");
    if (!vehicles) {
      fetchVehicles();
    }
  }

  if (window.location.pathname.endsWith("listVehicles.html")) {
    renderVehicles();
  }

  if (window.location.pathname.endsWith("removeVehicle.html")) {
    renderVehicles(true);
  }

});

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

// Função para renderizar os veículos na página
function renderVehicles(pageRemoveVehicles) {
  var vehicles = JSON.parse(localStorage.getItem("vehicles"));
  const vehicleList = document.getElementById("vehicle-list");
  vehicleList.innerHTML = "";

  vehicles.forEach((vehicle, index) => {
    const vehicleCard = document.createElement("div");
    vehicleCard.className = "col-12 vehicle-card card";

    vehicleCard.innerHTML = `
      <div class="row no-gutters">
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${vehicle.marca} ${vehicle.modelo}</h5>
            <p class="card-text">
              <span class="text-especificacoes">Ano:
                <span>${vehicle.anoFabricacao}</span>
              </span><br>
              <span class="text-especificacoes">Cor:
                <span>${vehicle.cor}</span>
              </span><br>
              <span class="text-especificacoes">Tipo:
                <span>${vehicle.tipo}</span>
              </span><br>
              <span class="text-especificacoes">Quilometragem:
                <span>${vehicle.quilometragem} km</span>
              </span><br>
              <span class="text-especificacoes">Número de Portas:
                <span>${vehicle.numeroDePortas}</span>
              </span><br>
            </p>
          </div>
        </div>

        <div class="col-md-4">
          <img src="${vehicle.urlImagem}" alt="${vehicle.modelo}" class="img-fluid">
          ${pageRemoveVehicles == true ? (
          `<div>
            <button type="submit" onclick="removeVehicle(${index})" class="btn btn-removeVehicle">Excluir</button>
           </div>`
          ) : ("")}
        </div>
      </div>
    `;

    vehicleList.appendChild(vehicleCard);
  });
}

// Função para cadastrar um veículo
function createVehicle() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const anoFabricacao = document.getElementById("anoFabricacao").value;
  const cor = document.getElementById("cor").value;
  const tipo = document.getElementById("tipo").value;
  const quilometragem = document.getElementById("quilometragem").value;
  const numeroDePortas = document.getElementById("numeroDePortas").value;
  const urlImagem = document.getElementById("urlImagem").value;

  if (!marca || !modelo || !anoFabricacao || !cor || !tipo || !quilometragem || !numeroDePortas || !urlImagem) {
    alert("Por favor, é necessário preencher todos os campos para cadastrar o veículo.");
    return;
  }

  const newVehicle = {
    marca,
    modelo,
    anoFabricacao,
    cor,
    tipo,
    quilometragem,
    numeroDePortas,
    urlImagem
  };

  let vehicles = JSON.parse(localStorage.getItem("vehicles"));

  vehicles.push(newVehicle);
  localStorage.setItem("vehicles", JSON.stringify(vehicles));

  alert("Veículo cadastrado com sucesso!");

  document.getElementById("vehicle-form").reset();
  window.location.href = "../pages/listVehicles.html";
};

// Função para excluir um veículo
function removeVehicle(index) {
  const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

  if (index >= 0 && index < vehicles.length) {
    vehicles.splice(index, 1);

    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    alert("Veículo excluído com sucesso!");
    renderVehicles(true);
  } 
}