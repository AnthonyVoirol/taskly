fetch('assets/php/action.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Erreur :", data.error);
        } else {
            console.log("Données reçues :", data);
            const main = document.getElementById('main')

            let article = document.createElement('article')

            section.innerText = data.task

            main.appendChild(article)
        }
    })
    .catch(error => console.error("Erreur fetch:", error));


