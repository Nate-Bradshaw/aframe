//scenes
var menuScene
var gameScene
var resultScene

//reset view button
var resetBtn

//main menu
var instructionbtn
var switchBtn
var exampleMenu
var exitBtn
var menuTxt
var instructionTxt
var easyTxt
var normalTxt
var hardTxt
var exitTxt
var menuImage
var easyBtn
var normalBtn
var hardBtn

//game
var beatSpawner

//results
var r_scoreTxt
var r_restartBtn
var r_exitBtn
var currDif = 0

window.addEventListener("load", () => {
    get_refs()
    menu_scene_settup()
    //main menu is always the first loaded
    
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

    // How To Play Button action
    instructionbtn.addEventListener("click", () => {
        exampleMenu.setAttribute("visible", true);
        menuTxt.setAttribute("visible", true);
        instructionTxt1.setAttribute("visible", true);
        menuImage1.setAttribute("visible", true);
        instructionTxt2.setAttribute("visible", true);
        menuImage2.setAttribute("visible", true);
        instructionTxt3.setAttribute("visible", true);
        exitTxt.setAttribute("visible", true);
        toggle_clickable(switchBtn, false);
        toggle_clickable(instructionbtn, false);
        toggle_clickable(exitBtn, true);
    });

    // Exit Button action
    exitBtn.addEventListener("click", () => {
        exampleMenu.setAttribute("visible", false);
        menuTxt.setAttribute("visible", false);
        instructionTxt1.setAttribute("visible", false);
        menuImage1.setAttribute("visible", false);
        instructionTxt2.setAttribute("visible", false);
        menuImage2.setAttribute("visible", false);
        instructionTxt3.setAttribute("visible", false);
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
        game_scene_settup(0)
    });

    normalBtn.addEventListener("click", () => {
        game_scene_settup(1)
    });

    hardBtn.addEventListener("click", () => {
        game_scene_settup(2)
    });

    //result page buttons

    // Retry
    r_restartBtn.addEventListener("click", () => {
        game_scene_settup(currDif)
    });

    // Main Menu
    r_exitBtn.addEventListener("click", () => {
        console.log("foo")
        menu_scene_settup()
    });
});

window.addEventListener("change_score_scene", (event) => {
    result_scene_settup(event.detail)
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

function get_refs(){
    //scenes
    menuScene = document.querySelector("#scene-menu")
    gameScene = document.querySelector("#scene-game")
    resultScene = document.querySelector("#scene-result")

    //reset veiw button
    resetBtn = document.querySelector("#reset-btn")

    //main menu
    instructionbtn = document.querySelector("#instruction-btn")
    switchBtn = document.querySelector("#switch-button")
    exampleMenu = document.querySelector("#example-menu")
    exitBtn = document.querySelector("#exit-button")
    menuTxt = document.querySelector("#menuText")
    instructionTxt1 = document.querySelector("#gamePara1")
    instructionTxt2 = document.querySelector("#gamePara2")
    instructionTxt3 = document.querySelector("#gamePara3")
    easyTxt = document.querySelector("#easyTxt")
    normalTxt = document.querySelector("#normalTxt")
    hardTxt = document.querySelector("#hardTxt")
    exitTxt = document.querySelector("#exitTxt")
    menuImage1 = document.querySelector("#menuImage1")
    menuImage2 = document.querySelector("#menuImage2")
    easyBtn = document.querySelector("#easy")
    normalBtn = document.querySelector("#normal")
    hardBtn = document.querySelector("#hard")

    //game
    beatSpawner = document.querySelector("#BeatSpawner")

    //results
    r_scoreTxt = document.querySelector("#r_scoreTxt")
    r_restartBtn = document.querySelector("#r_restart-button")
    r_exitBtn = document.querySelector("#r_exit-button")
}

function menu_scene_settup(){
    console.log("switching to menu")
    menuScene.setAttribute("visible", true)
    gameScene.setAttribute("visible", false)
    resultScene.setAttribute("visible", false)

    //turn off result buttons
    toggle_clickable(r_scoreTxt, false);
    toggle_clickable(r_restartBtn, false);
    toggle_clickable(r_exitBtn, false);

    exampleMenu.setAttribute("visible", false);
    menuTxt.setAttribute("visible", false);
    instructionTxt1.setAttribute("visible", false);
    menuImage1.setAttribute("visible", false);
    instructionTxt2.setAttribute("visible", false);
    menuImage2.setAttribute("visible", false);
    instructionTxt3.setAttribute("visible", false);
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
}

function game_scene_settup(difficulty){
    console.log("switching to game")

    currDif = difficulty
    menuScene.setAttribute("visible", false)
    gameScene.setAttribute("visible", true)
    resultScene.setAttribute("visible", false)

    //turn off menu buttons
    toggle_clickable(easyBtn, false);
    toggle_clickable(normalBtn, false);
    toggle_clickable(hardBtn, false);
    toggle_clickable(exitBtn, false);
    toggle_clickable(switchBtn, false);
    toggle_clickable(instructionbtn, false);

    //turn off result buttons
    toggle_clickable(r_scoreTxt, false);
    toggle_clickable(r_restartBtn, false);
    toggle_clickable(r_exitBtn, false);

    beatSpawner.emit("activate", {difficulty: difficulty})
}

function result_scene_settup(detail){
    console.log("switching to result")
    console.log(detail)

    menuScene.setAttribute("visible", false)
    gameScene.setAttribute("visible", false)
    resultScene.setAttribute("visible", true)

    //turn off menu buttons
    toggle_clickable(easyBtn, false);
    toggle_clickable(normalBtn, false);
    toggle_clickable(hardBtn, false);
    toggle_clickable(exitBtn, false);
    toggle_clickable(switchBtn, false);
    toggle_clickable(instructionbtn, false);

    toggle_clickable(r_scoreTxt, true);
    toggle_clickable(r_restartBtn, true);
    toggle_clickable(r_exitBtn, true);

    r_scoreTxt.setAttribute("value", `Your final score is: ${detail.score}`);
}