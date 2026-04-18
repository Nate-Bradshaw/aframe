window.addEventListener("load", () => {
    const r_scoreTxt = document.querySelector("#scoreTxt")
    const r_resetBtn = document.querySelector("#reset-btn")
    const r_restartBtn = document.querySelector("#restart-button")
    const r_exitBtn = document.querySelector("#exit-button")
    
    const cookieValue = document.cookie.split("; ")[1].split("=")[1] // Grabs the score part of the cookie
    r_scoreTxt.setAttribute("value", `Your final score is: ${cookieValue}`);

    // Reset Button action
    r_resetBtn.addEventListener("click", () => {
      //Get camera and access its look-controls
      const mainCam = document.querySelector('#MainCam');
      const lookControls = mainCam.components['look-controls'];

      if (lookControls) {
        // Reset horizontal rotation (left/right)
        lookControls.yawObject.rotation.y = 0;
      }
    });
    
    // Retry
    r_restartBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Main Menu
    r_exitBtn.addEventListener("click", () => {
        window.location.href = "menu.html";
    });
});
