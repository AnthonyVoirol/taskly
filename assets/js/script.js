async function init() {
  const tasks = await recupTasks();
  if (tasks) {
    showTask(tasks);
  }

  const btnAdd = document.getElementById("addTask");
  btnAdd.addEventListener("click", function () {
    addTask();
  });
}

init();

async function recupTasks() {
  try {
    const response = await fetch("assets/php/API.php", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erreur HTTP: " + response.status);
    }

    const data = await response.json();

    if (data.error) {
      console.error("Erreur côté serveur:", data.error);
      return null;
    } else {
      console.log("Tâches récupérées:", data.tasks);
      return data.tasks;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    return null;
  }
}

function showTask(tasks) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  tasks.forEach((task) => {
    const article = document.createElement("article");
    article.innerText = `${task.id} : ${task.task} - ${task.description}`;
    main.appendChild(article);
  });
}

function addTask() {
  const form = document.createElement("section");
  form.classList.add("formAdd");

  const addDisplay = document.createElement("article");
  addDisplay.classList.add("addDisplay");

  addDisplay.innerHTML = `
    <form class="add">
      <label for="nameaAd">Nom</label>
      <input type="text" id="nameadd" value="${recette.nom}">

      <label for="descriptionAdd">Description</label>
      <textarea id="descriptionAdd">${recette.description}</textarea>

      <label for="nbPeopleadd">Nombre de personnes</label>
      <input type="number" id="nbPeopleadd" min="0" value="${recette.nombrePersonnes}">

      <label for="preparationAdd">Préparation</label>
      <textarea id="preparationAdd">${recette.preparation}</textarea>
    </form>
  `;

  let addBtn = document.createElement("article");
  addBtn.classList.add("addBtn");

  let updateButton = document.createElement("button");
  updateButton.innerText = "add";
  updateButton.addEventListener("click", function () {
    add(document.getElementsByClassName("add")[0], recette);
  });

  let exitButton = document.createElement("button");
  exitButton.innerText = "Exit";
  exitButton.addEventListener("click", function () {
    form.remove();
  });

  addBtn.appendChild(updateButton);
  addBtn.appendChild(exitButton);

  addDisplay.appendChild(addBtn);
  form.appendChild(addDisplay);
  app.appendChild(form);
}

function showNotification(message) {
  const existing = document.getElementById("notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.id = "notification";
  notification.className = "notification";
  notification.innerHTML = `<span>${message}</span>`;

  const progress = document.createElement("div");
  progress.className = "notification-progress";
  notification.appendChild(progress);

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 100);
  setTimeout(() => hideNotification(), 3000);

  notification.addEventListener("click", hideNotification);
}

function hideNotification() {
  const notification = document.getElementById("notification");
  if (notification) {
    notification.classList.add("hide");
    setTimeout(() => notification.remove(), 400);
  }
}
