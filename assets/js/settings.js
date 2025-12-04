const btnAccount = document.getElementById("btnAccount");
const btnAppearance = document.getElementById("btnAppearance");
const btnNotification = document.getElementById("btnNotification");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

showView(AccountDisplay);

btnAccount.addEventListener("click", () => showView(AccountDisplay));
btnAppearance.addEventListener("click", () => showView(AppearanceDisplay));
btnNotification.addEventListener("click", () => showView(NotificationDisplay));

function showView(viewFunction) {
  const display = document.getElementById("display");
  display.innerHTML = "";
  viewFunction(display);
}

function AccountDisplay(display) {
  const h1 = document.createElement("h1");
  h1.innerText = "Mon compte";

  const avatar = document.createElement("div");
  const img = document.createElement("img");
  img.classList.add("imgAvatar");
  img.src = pathAvatar;

  const usernameInput = document.createElement("input");
  usernameInput.value = username;
  usernameInput.readOnly = true;

  avatar.appendChild(img);

  display.appendChild(h1);
  display.appendChild(avatar);
  display.appendChild(usernameInput);
}

function AppearanceDisplay(display) {
  const h1 = document.createElement("h1");
  h1.innerText = "Apparence";

  const themeContainer = document.createElement("div");

  const themeWhiteBtn = document.createElement("button");
  themeWhiteBtn.innerText = "Thème clair";

  const themeBlackBtn = document.createElement("button");
  themeBlackBtn.innerText = "Thème sombre";
  //few other themes soon

  themeWhiteBtn.addEventListener("click", function () {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  });

  themeBlackBtn.addEventListener("click", function () {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  });

  themeContainer.appendChild(themeWhiteBtn);
  themeContainer.appendChild(themeBlackBtn);

  display.appendChild(h1);
  display.appendChild(themeContainer);
}

function NotificationDisplay(display) {
  const h1 = document.createElement("h1");
  h1.innerText = "Notification";

  //settings notif
  display.appendChild(h1);
}
