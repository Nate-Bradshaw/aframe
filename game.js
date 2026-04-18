window.addEventListener("load", () => {
    //main menu is always the first loaded
    
    const resetBtn = document.querySelector("#reset-btn")
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

    // Loading each UI element using its ID

    //main menu
    const menuScene = document.querySelector("#scene-menu")
    const instructionbtn = document.querySelector("#instruction-btn")
    const switchBtn = document.querySelector("#switch-button")
    const exampleMenu = document.querySelector("#example-menu")
    const exitBtn = document.querySelector("#exit-button")
    const menuTxt = document.querySelector("#menuText")
    const instructionTxt = document.querySelector("#gameInstructions")
    const easyTxt = document.querySelector("#easyTxt")
    const normalTxt = document.querySelector("#normalTxt")
    const hardTxt = document.querySelector("#hardTxt")
    const exitTxt = document.querySelector("#exitTxt")
    const menuImage = document.querySelector("#menuImage")
    const easyBtn = document.querySelector("#easy")
    const normalBtn = document.querySelector("#normal")
    const hardBtn = document.querySelector("#hard")

    //game
    const gameScene = document.querySelector("#scene-game")
    const beatSpawner = document.querySelector("#BeatSpawner")


    // How To Play Button action
    instructionbtn.addEventListener("click", () => {
        exampleMenu.setAttribute("visible", true);
        menuTxt.setAttribute("visible", true);
        instructionTxt.setAttribute("visible", true);
        menuImage.setAttribute("visible", true);
        exitTxt.setAttribute("visible", true);
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
        easyTxt.setAttribute("visible", false);
        normalTxt.setAttribute("visible", false);
        hardTxt.setAttribute("visible", false);
        exitTxt.setAttribute("visible", false);
        toggle_clickable(exitBtn, false);
        toggle_clickable(easyBtn, false);
        toggle_clickable(normalBtn, false);
        toggle_clickable(hardBtn, false);
        toggle_clickable(switchBtn, true);
        toggle_clickable(instructionbtn, true);
    });

    // Switches to the difficulty selector
    switchBtn.addEventListener("click", () => {
        // window.location.href = "index.html";
        exampleMenu.setAttribute("visible", true);
        easyTxt.setAttribute("visible", true);
        normalTxt.setAttribute("visible", true);
        hardTxt.setAttribute("visible", true);
        exitTxt.setAttribute("visible", true);
        toggle_clickable(easyBtn, true);
        toggle_clickable(normalBtn, true);
        toggle_clickable(hardBtn, true);
        toggle_clickable(exitBtn, true);
        toggle_clickable(switchBtn, false);
        toggle_clickable(instructionbtn, false);
    });

    easyBtn.addEventListener("click", () => {
        menuScene.setAttribute("visible", false)
        gameScene.setAttribute("visible", true)
        toggle_clickable(easyBtn, false);
        toggle_clickable(normalBtn, false);
        toggle_clickable(hardBtn, false);
        toggle_clickable(exitBtn, false);
        beatSpawner.emit("activate", {difficulty: 0})
    });

    normalBtn.addEventListener("click", () => {
        //do not repeat yourself is a very well know coding rule
        menuScene.setAttribute("visible", false)
        gameScene.setAttribute("visible", true)
        toggle_clickable(easyBtn, false);
        toggle_clickable(normalBtn, false);
        toggle_clickable(hardBtn, false);
        toggle_clickable(exitBtn, false);
        beatSpawner.emit("activate", {difficulty: 1})
    });

    hardBtn.addEventListener("click", () => {
        menuScene.setAttribute("visible", false)
        gameScene.setAttribute("visible", true)
        toggle_clickable(easyBtn, false);
        toggle_clickable(normalBtn, false);
        toggle_clickable(hardBtn, false);
        toggle_clickable(exitBtn, false);
        beatSpawner.emit("activate", {difficulty: 2})
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