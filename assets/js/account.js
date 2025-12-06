function OpenSettingAccount() {
  const avatarImg = document.getElementById("avatar");
  
  const lastUpdate = localStorage.getItem("avatarTimestamp");
  if (lastUpdate && avatarImg) {
    const currentSrc = avatarImg.src.split("?")[0];
    avatarImg.src = currentSrc + "?t=" + lastUpdate;
  }
  
  avatarImg.addEventListener("click", () => {
    const menu = document.getElementById("profileMenu");
    menu.classList.toggle("show");
  });
  
  document.addEventListener("click", (e) => {
    const avatar = document.getElementById("avatar");
    const menu = document.getElementById("profileMenu");
    if (!avatar.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("show");
    }
  });
}