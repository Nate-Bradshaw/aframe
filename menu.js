window.addEventListener("load", () => {
  // Loading each UI element using its ID
  const btn = document.querySelector("#btn")
  const switchBtn = document.querySelector("#switch-button")
  const exampleMenu = document.querySelector("#example-menu")
  const exitBtn = document.querySelector("#exit-button")
  const menuTxt = document.querySelector("#menuText")

  // Start Button action
  btn.addEventListener("click", () => {
    exampleMenu.setAttribute("visible", "true");
    exitBtn.setAttribute("visible", "true");
    menuTxt.setAttribute("visible", "true");
    switchBtn.setAttribute("visible", "false");
  });

  // Exit Button action
  exitBtn.addEventListener("click", () => {
    exampleMenu.setAttribute("visible", "false");
    exitBtn.setAttribute("visible", "false");
    menuTxt.setAttribute("visible", "false");
    switchBtn.setAttribute("visible", "true");
  });

  // Switches to the game
  switchBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
