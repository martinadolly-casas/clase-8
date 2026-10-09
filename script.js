const tbodyAmerica = document.querySelector("#america");
            const tbodyEuropa = document.querySelector("#europa");
            const tbodyOtros = document.querySelector("#otros");

            const ENDPOINT = "https://api.myjson.online/v1/records/e4b9ef04-7e6f-4292-909a-b4e384be8eb2";

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
                    const escuelas = datos.data;

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
                    console.error("Algo salió mal:", error);
                });

            function bolitas(x) {
                var visual = "";
                for (let i = 0; i < x; i++) {
                    visual += " ● ";
                }
                return "<span>" + visual + "</span>";
            }
