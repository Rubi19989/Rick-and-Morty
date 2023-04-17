const API = "https://rickandmortyapi.com/api";
const container = document.querySelector("#container")
let characters  = `${API}/character`;
const buscar = document.querySelector("#buscar")
let items;
const inputBuscar = document.querySelector("#inputBuscar")
const siguiente = document.querySelector("#siguiente")
const regresar = document.querySelector("#regresar")


const dibujarCards = (results) =>{
    let cardAcumuladas = "";
    for(i=0; i< results.length; i++){

        let card =`
        <div class = "col-4 text-center my-2  text-light">
             <div class="card  bg-dark bg-opacity-10 " style="width: 18rem; ">
                 <img src="${results[i].image}" class="card-img-top" alt="Imagenes de ricki and morty"
                  style="width 4rem">
                 <div class="card-body">
                    <h6 class="card-title">Name: ${results[i].name}</h6>
                    <p class="card-text">
                    Species:  ${results[i].species}
                    <br>
                    Gender:  ${results[i].gender}
                    <br>
                    Status:  ${results[i].status}
                    <br>
                    Dimension:  ${results[i].origin.name}
                    </p>
                 </div>
             </div>
         </div>`
            cardAcumuladas += card
     }
     container.innerHTML = cardAcumuladas;
     console.log(results)
}


const buscarAction = () => {
    characters = `${API}/character/?name=${inputBuscar.value}`
    cargarDatos();


}

buscar.addEventListener("click", buscarAction)

siguiente.addEventListener("click", () =>{
    if(items.info.next)
    {
    siguiente.disabled = true;
    characters = items.info.next;
    cargarDatos()
    }
})


regresar.addEventListener("click", () => {
    if(items.info.prev){
        characters = items.info.prev ? items.info.prev : regresar.disabled = true;
        cargarDatos()
    }

})

const cargarDatos = () => {
    window.fetch(characters)
    .then((response) => response.json())
    .then((responseJson) => {
        dibujarCards(responseJson.results)
        items = responseJson;
        siguiente.disabled = false;
    })
}

cargarDatos();