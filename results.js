window.addEventListener("load", () => {
    const scoreTxt = document.querySelector("#scoreTxt")
    const resetBtn = document.querySelector("#reset-btn")
    const restartBtn = document.querySelector("#restart-button")
    const exitBtn = document.querySelector("#exit-button")
    
    const cookieValue = document.cookie
        .split("=");
    scoreTxt.setAttribute("value", `Your final score is: ${cookieValue[1]}`);

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
    
    // Retry
    restartBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Main Menu
    exitBtn.addEventListener("click", () => {
        window.location.href = "menu.html";
    });
});
