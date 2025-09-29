fetch('assets/php/getData.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Erreur :", data.error);
        } else {
            console.log("Données reçues :", data);
            document.getElementById("main").innerHTML = `<p>${data.nom}</p>`;
        }
    })
    .catch(error => console.error("Erreur fetch:", error));