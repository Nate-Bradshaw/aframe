window.addEventListener("load", () => {
  // Loading each UI element using its ID
  const instuctionbtn = document.querySelector("#instruction-btn")
  const switchBtn = document.querySelector("#switch-button")
  const exampleMenu = document.querySelector("#example-menu")
  const exitBtn = document.querySelector("#exit-button")
  const menuTxt = document.querySelector("#menuText")

  // Start Button action
  instuctionbtn.addEventListener("click", () => {
    toggle_clickable(switchBtn, false);
    toggle_clickable(instuctionbtn, false);
    toggle_clickable(exitBtn, true);
    exampleMenu.setAttribute("visible", "true");
    menuTxt.setAttribute("visible", "true");
  });

  // Exit Button action
  exitBtn.addEventListener("click", () => {
    exampleMenu.setAttribute("visible", "false");
    menuTxt.setAttribute("visible", "false");
    toggle_clickable(exitBtn, false);
    toggle_clickable(switchBtn, true);
    toggle_clickable(instuctionbtn, true);
  });

  // Switches to the game
  switchBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

function toggle_clickable(btn, state) {
  if (state) {
    btn.setAttribute("visible", "true");
    btn.setAttribute("class", "clickable");
  } else {
    btn.setAttribute("visible", "false");
    btn.setAttribute("class", "not-clickable");
  }
}