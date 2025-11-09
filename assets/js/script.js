let tasks = [];

async function init() {
  tasks = await recupTasks();
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
      return [];
    } else {
      return data.tasks;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    return [];
  }
}

function showTask(tasks) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  tasks.forEach((task) => {
    const article = document.createElement("article");
    // Remplace la partie article.innerHTML par :
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header");

    const taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.textContent = task.task;

    const taskBadge = document.createElement("span");
    taskBadge.classList.add("task-badge", task.importance);
    taskBadge.textContent = task.importance.replace("_", " ");

    taskHeader.appendChild(taskName);
    taskHeader.appendChild(taskBadge);

    const taskDesc = document.createElement("div");
    taskDesc.classList.add("task-desc");
    taskDesc.textContent = task.description;

    const taskDeadline = document.createElement("div");
    taskDeadline.classList.add("task-deadline");
    taskDeadline.textContent = new Date(task.deadLine).toLocaleDateString(
      "fr-FR",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    taskContent.appendChild(taskHeader);
    taskContent.appendChild(taskDesc);
    taskContent.appendChild(taskDeadline);

    article.appendChild(taskContent);

    const status = document.createElement("input");
    status.type = "checkbox";
    status.checked = task.isDone;

    status.addEventListener("change", async () => {
      article.classList.toggle("isDone", status.checked);
      
      try {
        const response = await fetch("assets/php/API.php", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: task.id, isDone: status.checked }),
          credentials: "include",
        });

        const data = await response.json();
        if (data.error) console.error("Erreur mise à jour status:", data.error);
      } catch (err) {
        console.error("Erreur fetch status:", err);
      }
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.addEventListener("click", () => showEditTask(task, article));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.addEventListener("click", () => deleteTask(task, article));

    article.appendChild(status);
    article.appendChild(editBtn);
    article.appendChild(deleteBtn);
    main.appendChild(article);
  });
}

async function addTask() {
  const main = document.getElementById("main");
  const form = document.createElement("section");
  form.classList.add("formAdd");

  const addDisplay = document.createElement("article");
  addDisplay.classList.add("addDisplay");

  addDisplay.innerHTML = `
    <form class="add">
      <label for="nameAdd">Nom</label>
      <input type="text" id="nameAdd" required>

      <select name="importance" id="importance">
        <option value="important">important</option>
        <option value="normal">normal</option>
        <option value="peu_important">peu important</option>
      </select>

      <label for="descriptionAdd">Description</label>
      <textarea id="descriptionAdd" required></textarea>

      <label for="deadLine">À faire jusqu'à</label>
      <input type="date" id="deadLine" required>
    </form>
  `;

  let addBtn = document.createElement("article");
  addBtn.classList.add("addBtn");

  let addButton = document.createElement("button");
  addButton.innerText = "Ajouter la tâche";

  addButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const name = document.getElementById("nameAdd").value;
    const importance = document.getElementById("importance").value;
    const description = document.getElementById("descriptionAdd").value;
    const deadLine = document.getElementById("deadLine").value;

    const taskData = {
      task: name,
      importance,
      description,
      deadLine,
    };

    const result = await sendTaskData(taskData);

    if (result.success) {
      tasks = await recupTasks();
      showTask(tasks);
      form.remove();
    } else {
      showNotification("Erreur lors de l'ajout de la tâche.");
    }
  });

  let exitButton = document.createElement("button");
  exitButton.innerText = "Exit";
  exitButton.addEventListener("click", function () {
    form.remove();
  });

  addBtn.appendChild(addButton);
  addBtn.appendChild(exitButton);
  addDisplay.appendChild(addBtn);
  form.appendChild(addDisplay);
  main.appendChild(form);
}

async function sendTaskData(taskData) {
  try {
    const response = await fetch("assets/php/API.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erreur HTTP: " + response.status);
    }

    const data = await response.json();

    if (data.error) {
      console.error("Erreur côté serveur:", data.error);
      return { success: false };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    return { success: false };
  }
}

function showEditTask(task, article) {
  article.innerHTML = "";

  // Inputs pour édition
  const taskInput = document.createElement("input");
  taskInput.value = task.task;

  const descInput = document.createElement("textarea");
  descInput.value = task.description;

  const deadLineInput = document.createElement("input");
  deadLineInput.type = "date";
  deadLineInput.value = task.deadLine;

  const selectImportance = ["important", "normal", "peu_important"];
  const importanceSelect = document.createElement("select");
  selectImportance.forEach((imp) => {
    const option = document.createElement("option");
    option.value = imp;
    option.text = imp.replace("_", " ");
    importanceSelect.appendChild(option);
  });
  importanceSelect.value = task.importance;

  // Bouton mettre à jour
  const updateBtn = document.createElement("button");
  updateBtn.innerText = "Mettre à jour";
  updateBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const taskData = {
      id: task.id,
      task: taskInput.value,
      description: descInput.value,
      deadLine: deadLineInput.value,
      importance: importanceSelect.value,
    };

    const result = await updateTaskData(taskData);

    if (result.success) {
      renderTaskArticle(task, article);
    } else {
      showNotification("Erreur lors de la modification de la tâche.");
    }
  });

  // Bouton exit
  const exitBtn = document.createElement("button");
  exitBtn.innerText = "Exit";
  exitBtn.addEventListener("click", () => {
    renderTaskArticle(task, article);
  });

  article.appendChild(taskInput);
  article.appendChild(descInput);
  article.appendChild(deadLineInput);
  article.appendChild(importanceSelect);
  article.appendChild(updateBtn);
  article.appendChild(exitBtn);
}

// Fonction pour reconstruire un article sans recharger tout
function renderTaskArticle(task, article) {
  article.innerHTML = "";

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task-header");

  const taskName = document.createElement("div");
  taskName.classList.add("task-name");
  taskName.textContent = task.task;

  const taskBadge = document.createElement("span");
  taskBadge.classList.add("task-badge", task.importance);
  taskBadge.textContent = task.importance.replace("_", " ");

  taskHeader.appendChild(taskName);
  taskHeader.appendChild(taskBadge);

  const taskDesc = document.createElement("div");
  taskDesc.classList.add("task-desc");
  taskDesc.textContent = task.description;

  const taskDeadline = document.createElement("div");
  taskDeadline.classList.add("task-deadline");
  taskDeadline.textContent = new Date(task.deadLine).toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  taskContent.appendChild(taskHeader);
  taskContent.appendChild(taskDesc);
  taskContent.appendChild(taskDeadline);

  article.appendChild(taskContent);

  const status = document.createElement("input");
  status.type = "checkbox";
  status.checked = task.isDone;
  status.addEventListener("change", async () => {
    try {
      const response = await fetch("assets/php/API.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, isDone: status.checked }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.error) console.error("Erreur mise à jour status:", data.error);
      article.classList.toggle("isDone", status.checked);
    } catch (err) {
      console.error("Erreur fetch status:", err);
    }
  });

  const editBtn = document.createElement("button");
  editBtn.innerText = "✏️";
  editBtn.addEventListener("click", () => showEditTask(task, article));

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "🗑️";
  deleteBtn.addEventListener("click", () => deleteTask(task, article));

  article.appendChild(status);
  article.appendChild(editBtn);
  article.appendChild(deleteBtn);
}

async function updateTaskData(taskData) {
  try {
    const response = await fetch("assets/php/API.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
      credentials: "include",
    });

    const text = await response.text();

    const data = JSON.parse(text);
    if (data.error) {
      console.error("Erreur côté serveur:", data.error);
      return { success: false };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    return { success: false };
  }
}

async function deleteTask(task, article) {
  const taskData = { id: task.id };
  try {
    const response = await fetch("assets/php/API.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
      credentials: "include",
    });

    const data = await response.json();

    if (data.error) {
      console.error("Erreur côté serveur:", data.error);
      showNotification("Erreur lors de la suppression de la tâche.");
      return { success: false };
    } else {
      showNotification("Tâche supprimée !");

      tasks = await recupTasks();
      showTask(tasks);
      return { success: true };
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    showNotification("Erreur lors de la suppression de la tâche.");
    return { success: false };
  }
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
