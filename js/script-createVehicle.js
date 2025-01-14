function createVehicle() {
  console.log(JSON.parse(localStorage.getItem("vehicles")));

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const anoFabricacao = document.getElementById("anoFabricacao").value;
  const cor = document.getElementById("cor").value;
  const tipo = document.getElementById("tipo").value;
  const quilometragem = document.getElementById("quilometragem").value;
  const numeroDePortas = document.getElementById("numeroDePortas").value;
  const urlImagem = document.getElementById("urlImagem").value;

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

  let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

  vehicles.push(newVehicle);

  localStorage.setItem("vehicles", JSON.stringify(vehicles));

  alert("Veículo cadastrado com sucesso!");
  
  window.location.href = "../pages/listVehicles.html";
}