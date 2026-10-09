const tbodyAmerica = document.querySelector("#america");
            const tbodyEuropa = document.querySelector("#europa");
            const tbodyOtros = document.querySelector("#otros");

            const ENDPOINT = "https://api.myjson.online/v1/records/076f7b35-1f65-4a33-a723-0e972db628f0";

            const paisesAmerica = ["Argentina", "Brazil", "Canada", "Chile", "Colombia", "Mexico", "United States"];
            const paisesEuropa = ["Austria", "Belgium", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Ireland", "Italy", "Netherlands", "Sweden", "Switzerland", "United Kingdom"];

            let htmlAmerica = "";
            let htmlEuropa = "";
            let htmlOtros = "";

            var cuenta_america = 0;
            var cuenta_europa = 0;
            var cuenta_otros = 0;

            fetch(ENDPOINT)
                .then((respuesta) => {
                    if (!respuesta.ok) {
                        throw new Error("Error HTTP: " + respuesta.status);
                    }
                    return respuesta.json();
                })
                .then((datos) => {
                    const escuelas = Array.isArray(datos) ? datos
                        : Array.isArray(datos.data) ? datos.data
                        : Array.isArray(datos.data?.data) ? datos.data.data
                        : Array.isArray(datos.data?.content) ? datos.data.content
                        : null;

                    if (!escuelas) {
                        throw new Error("No se encontró una lista de universidades en el JSON.");
                    }

                    escuelas.forEach((e) => {
                        const esAmericana = paisesAmerica.some((pais) => e.location.includes(pais));
                        const esEuropea = paisesEuropa.some((pais) => e.location.includes(pais));

                        const pais = e.location.split(", ").pop();
                        const fila = `<tr><td>${e.rank}</td><td>${e.name}</td><td>${pais}</td></tr>`;

                        if (esAmericana) {
                            htmlAmerica += fila;
                            cuenta_america = cuenta_america + 1;
                        } else if (esEuropea) {
                            htmlEuropa += fila;
                            cuenta_europa = cuenta_europa + 1;
                        } else {
                            htmlOtros += fila;
                            cuenta_otros = cuenta_otros + 1;
                        }
                    });

                    tbodyAmerica.innerHTML = htmlAmerica;
                    tbodyEuropa.innerHTML = htmlEuropa;
                    tbodyOtros.innerHTML = htmlOtros;

                    document.querySelector("#bolitas_americanas").innerHTML = bolitas(cuenta_america);
                    document.querySelector("#bolitas_europeas").innerHTML = bolitas(cuenta_europa);
                    document.querySelector("#bolitas_otras").innerHTML = bolitas(cuenta_otros);
                })
                .catch((error) => {
                    console.error("No fue posible cargar las universidades:", error);
                    const aviso = '<tr><td colspan="3">No se pudieron cargar los datos. Revisa el enlace y el formato del JSON.</td></tr>';
                    tbodyAmerica.innerHTML = aviso;
                    tbodyEuropa.innerHTML = aviso;
                    tbodyOtros.innerHTML = aviso;
                });

            function bolitas(x) {
                return Array.from({length: x}, () => '<span class="institucion-icono" aria-label="Una institución"></span>').join('');
            }
