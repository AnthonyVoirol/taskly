fetch('assets/php/action.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Erreur :", data.error);
        } else {
            console.log("Données reçues :", data);

            const main = document.getElementById('main');

            const article = document.createElement('article');
            article.innerText = `${data.id} : ${data.description}`;

            main.appendChild(article);
        }
    })
    .catch(error => console.error("Erreur fetch:", error));
