function OpenSettingAccount(main) {
  const avatar = document.getElementById("avatar");

  avatar.addEventListener("click", function(){
    console.log("Ca marche");
    const p = document.createElement("p");
    p.textContent = "test";

    main.appendChild(p);
  })
}
