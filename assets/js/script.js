/*fetch('assets/php/action.php')
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
*/









function showNotification(message) {
    const existing = document.getElementById('notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = 'notification';
    notification.innerHTML = `<span>${message}</span>`;
    
    const progress = document.createElement('div');
    progress.className = 'notification-progress';
    notification.appendChild(progress);
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => hideNotification(), 3000);
    
    notification.addEventListener('click', hideNotification);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 400);
    }
}