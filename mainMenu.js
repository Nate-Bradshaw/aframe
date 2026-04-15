window.addEventListener("load", () => {
  // Loading each UI element using its ID
  const instructionbtn = document.querySelector("#instruction-btn")
  const switchBtn = document.querySelector("#switch-button")
  const exampleMenu = document.querySelector("#example-menu")
  const exitBtn = document.querySelector("#exit-button")
  const menuTxt = document.querySelector("#menuText")
  const instructionTxt = document.querySelector("#gameInstructions")
  const resetBtn = document.querySelector("#reset-btn")
  const menuImage = document.querySelector("#menuImage")

  // Start Button action
  instructionbtn.addEventListener("click", () => {
    exampleMenu.setAttribute("visible", true);
    menuTxt.setAttribute("visible", true);
    instructionTxt.setAttribute("visible", true);
    menuImage.setAttribute("visible", true);
    toggle_clickable(switchBtn, false);
    toggle_clickable(instructionbtn, false);
    toggle_clickable(exitBtn, true);
  });

  // Exit Button action
  exitBtn.addEventListener("click", () => {
    exampleMenu.setAttribute("visible", false);
    menuTxt.setAttribute("visible", false);
    instructionTxt.setAttribute("visible", false);
    menuImage.setAttribute("visible", false);
    toggle_clickable(exitBtn, false);
    toggle_clickable(switchBtn, true);
    toggle_clickable(instructionbtn, true);
  });

  // Reset Button action
   resetBtn.addEventListener("click", () => {
      //Get camera and access its look-controls
      const mainCam = document.querySelector('#MainCam');
      const lookControls = mainCam.components['look-controls'];

      if (lookControls) {
        // Reset horizontal rotation (left/right)
        lookControls.yawObject.rotation.y = 0;
      }
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
};