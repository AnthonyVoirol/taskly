const btnAccount = document.getElementById("btnAccount");

btnAccount.addEventListener("click", function () {
    AccountDisplay();
})

function AccountDisplay() {
    const display = document.getElementById("display");

    const h1 = document.createElement("h1");
    h1.innerText = "Mon compte";

    const avatar = document.createElement("div");
    const img = document.createElement("img");
    img.classList.add("imgAvatar");
    img.src = pathAvatar;

    const email = document.createElement("input");
    email.value = "monemail@example.com";
    email.readOnly = true;

    const username = document.createElement("input");
    username.value = "monusername";
    username.readOnly = true;

    avatar.appendChild(img);

    display.appendChild(h1);
    display.appendChild(avatar);
    display.appendChild(email);
    display.appendChild(username);
}

function appearanceDisplay() {

};

function notificationDisplay() {

};