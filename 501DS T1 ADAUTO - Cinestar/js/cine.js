const getCine = async () => {
    let id = new URLSearchParams(window.location.search).get('id');
    const response = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}`);

    if (response.status == 200) {
        const data = await response.json();
        const cine = data.data;

        console.log(cine);

        document.getElementById('name_cine').textContent = cine.RazonSocial;
        document.getElementById('cine_img').src = `img/cine/${cine.id}.2.jpg`;
        document.getElementById('img_juegos').src = `img/cine/${cine.id}.3.jpg`;

        let datosCineHtml = `
            <p>${cine.Direccion}</p>
            <p>Teléfono: ${cine.Telefonos}</p>
            <br>
        `;
        document.getElementById('datos_cine').innerHTML = datosCineHtml;

        let tarifasHtml = '';
        cine.tarifas.forEach((tarifa, index) => {
            tarifasHtml += `
                <div class="fila ${index % 2 !== 0 ? 'impar' : ''}">
                    <div class="celda-titulo">${tarifa.DiasSemana}</div>
                    <div class="celda">${tarifa.Precio}</div>
                </div>
            `;
        });
        document.getElementById('tabla').innerHTML = tarifasHtml;

        let horariosHtml = `
            <div class="fila">
                <div class="celda-cabecera">Películas</div>
                <div class="celda-cabecera">Horarios</div>
            </div>
        `;
        cine.peliculas.forEach((pelicula, index) => {
            horariosHtml += `
                <div class="fila ${index % 2 !== 0 ? 'impar' : ''}">
                    <div class="celda-titulo">${pelicula.Titulo}</div>
                    <div class="celda">${pelicula.Horarios}</div>
                </div>
            `;
        });
        document.getElementById('tabla_horario').innerHTML = horariosHtml;
    }
};
getCine()

