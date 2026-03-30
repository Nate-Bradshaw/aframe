window.addEventListener("load", () => {
  const btn = document.querySelector("#btn");
  const statusText = document.querySelector("#statusText");
  const exampleMenu = document.querySelector("#example-menu")
  const exitBtn = document.querySelector("#exit-button")
  const menuTxt = document.querySelector("#menuText")

  // Start Button action
  btn.addEventListener("click", () => {
    exampleMenu.setAttribute("visible", "true");
    exitBtn.setAttribute("visible", "true");
    menuTxt.setAttribute("visible", "true");
  });

  // Exit Button action
  exitBtn.addEventListener("click", () => {
    exampleMenu.setAttribute("visible", "false");
    exitBtn.setAttribute("visible", "false");
    menuTxt.setAttribute("visible", "false");
  })
});
