const apiUrl = "https://my-json-server.typicode.com/bellynhaoliver/api-project-locar/cars";


document.addEventListener("DOMContentLoaded", function () {
  var vehicles = JSON.parse(localStorage.getItem("vehicles"));
  if (JSON.parse(localStorage.getItem("vehicles")) == []) {
    console.log("entrei")
    fetchVehicles();
  } else 
  if(document.getElementById("vehicle-list")) {
    renderVehicles();
  }
});

function fetchVehicles() {
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
function renderVehicles() {
  var vehicles = JSON.parse(localStorage.getItem("vehicles"));
  const vehicleList = document.getElementById("vehicle-list");
  vehicleList.innerHTML = "";

  vehicles.forEach(vehicle => {
    const vehicleCard = document.createElement("div");
    vehicleCard.className = "col-12 vehicle-card card";

    vehicleCard.innerHTML = `
      <div class="row no-gutters">
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${vehicle.marca} ${vehicle.modelo}</h5>
            <p class="card-text">
              <span class="text-especificacoes">Ano:
                <span>${vehicle.ano}</span>
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
          <img src="${vehicle.imagem}" alt="${vehicle.modelo}" class="img-fluid">
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

  console.log(JSON.parse(localStorage.getItem("vehicles")))

  let vehicles = JSON.parse(localStorage.getItem("vehicles"));

  vehicles.push(newVehicle);
  localStorage.setItem("vehicles", JSON.stringify(vehicles));

  alert("Veículo cadastrado com sucesso!");

  document.getElementById("vehicle-form").reset();
  window.location.href = "../pages/listVehicles.html";
};
