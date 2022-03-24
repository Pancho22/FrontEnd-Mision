    const  contenedor  = document.querySelector('[pokemon-contenedor]');
    const  nombrePokemon = document.querySelector('[pokemon-nombre]');
    const tipoPokemon = document.querySelector('[pokemon-tipos]');
    const estadisticasPokemon = document.querySelector('[pokemon-estadisticas]');
    const movimientosPokemon = document.querySelector('[pokemon-movimientos]');
    

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./imagenes/interrogacion.jpeg")
            nombrePokemon.textContent = "Pokemon no encontado";
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            nombrePokemon.textContent = data.name; 
            pokeImage(pokeImg);
            const{stats,types,moves} = data;
            buscarTipos(types);
            buscarEstatus(stats);
            buscarMovimientos(moves);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}
const buscarTipos = types =>{
    tipoPokemon.innerHTML = '' ;
    types.forEach(type =>{
        const tipo = document.createElement("div");
        tipo.textContent = type.type.name;
        tipoPokemon.appendChild(tipo);
    });
}

const buscarEstatus = stats =>{
    estadisticasPokemon.innerHTML = '' ;
    stats.forEach(stat =>{
        const estatus = document.createElement("div");
        const estatusNombre = document.createElement("div");
        const estatusValor = document.createElement("div");
        estatusNombre.textContent = stat.stat.name;
        estatusValor.textContent = stat.base_stat;
        estatus.appendChild(estatusNombre);
        estatus.appendChild(estatusValor);
        estadisticasPokemon.appendChild(estatus);
    });
}
const buscarMovimientos = moves =>{
    movimientosPokemon.innerHTML = '' ;   
    moves.forEach(move =>{ 
        const movimientoNombre = document.createElement("div");
        movimientoNombre.textContent = move.move.name;
        movimientosPokemon.appendChild(movimientoNombre);

    });
}