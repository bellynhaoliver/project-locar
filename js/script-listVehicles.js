function renderVehicles() {
  
  console.log(JSON.parse(localStorage.getItem("vehicles")))
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

document.addEventListener('DOMContentLoaded', renderVehicles);