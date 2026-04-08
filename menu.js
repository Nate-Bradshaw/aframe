window.addEventListener("load", () => {
  // Loading each UI element using its ID
  const instructionbtn = document.querySelector("#instruction-btn")
  const switchBtn = document.querySelector("#switch-button")
  const exampleMenu = document.querySelector("#example-menu")
  const exitBtn = document.querySelector("#exit-button")
  const menuTxt = document.querySelector("#menuText")
  const instructionTxt = document.querySelector("#gameInstructions")

  console.log(instructionTxt)

  // Start Button action
  instructionbtn.addEventListener("click", () => {
    exampleMenu.setAttribute("visible", true);
    menuTxt.setAttribute("visible", true);
    instructionTxt.setAttribute("visible", true);
    toggle_clickable(switchBtn, false);
    toggle_clickable(instructionbtn, false);
    toggle_clickable(exitBtn, true);
  });

  // Exit Button action
  exitBtn.addEventListener("click", () => {
    exampleMenu.setAttribute("visible", false);
    menuTxt.setAttribute("visible", false);
    instructionTxt.setAttribute("visible", false);
    toggle_clickable(exitBtn, false);
    toggle_clickable(switchBtn, true);
    toggle_clickable(instructionbtn, true);
  });

  // Switches to the game
  switchBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

function toggle_clickable(btn, state) {
  if (state) {
    btn.setAttribute("visible", true);
    btn.setAttribute("class", "clickable");
  } else {
    btn.setAttribute("visible", false);
    btn.setAttribute("class", "not-clickable");
  }
}