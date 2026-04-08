console.clear;

// create Audio object


const songObj = {
    name: "Lord of the Rangs",
    artist: "Kevin MacLeod",
    locaton: new Audio("Lord of the Rangs Short.mp3"),
    bpm: 104,
    ballSpeed: 300, //the dur_ticks thing. will probably change 
    attribution:`"Lord of the Rangs"
                Kevin MacLeod (incompetech.com)
                Licensed under Creative Commons: By Attribution 4.0
                http://creativecommons.org/licenses/by/4.0/` ,      //need to put this somewhere for legal reasons

    beatMapArr: [[1,90],[3,180],[1,90],[3,0],[1,90],[3,180],[1,90],[3,270],   //4 bars
                 [1,270],[2,225],[1,225],[1,180],[2,135],[1,135],[1,90],[2,45],[1,45],[1,0],[2,315],[1,315],   //4 bars
                 [1,68],[1,45],[2,22],[1,248],[1,225],[2,202],[1,112],[1,135],[2,157],[1,292],[1,315],[2,338],  //4 bars
                 [1,158],[1,112],[2,135],[1,22],[1,68],[2,45],[1,135],[1,45],[2,90],[1,225],[1,315],[3,270],   //4 and a quarter
                 [2,135],[2,315],[2,225],[2,45],[1,112],[1,112],[2,292],[2,247],[1,68],   //3 and 3 quarters
                 [4,90],[4,180],[4,270],[4,0]   //4 bars
                ]
} //each array will have the delay AFTER the beat in number of quarter notes (first), and where in the circle it will come from (not there yet)

function calculateBeatTimings(songObj){
    const bpm = songObj.bpm;
    const quarterNoteMs = (60/bpm) *1000;

    const beatSchedule = [];
    var accumulatedTime = 0;

    songObj.beatMapArr.forEach((beat, index) => {
        const [delayNotes, angle] = beat;
        accumulatedTime += delayNotes * quarterNoteMs;

        beatSchedule.push({
            timeMs: accumulatedTime,
            angle: angle,
            beatIndex: index,
            delayNotes: delayNotes
        });
        
    });
    return beatSchedule;

}


// onClick (play button) plays the music in time with the beat map

//needs some sort of dellay between the beat map starting and the song starting - needs to be the same as dur_ticks
function playMusic(songObj){
    var song = songObj.locaton; //creats and audio object
    //var bpm = songObj.bpm;
    //var quarterNote = bpm / 4; //the delay between loops will be this number multiplied by the value in the array
    const scene = document.querySelector('a-scene');

    const beatSchedule = calculateBeatTimings(songObj);

    scene.dispatchEvent(new CustomEvent('load-beat-schedule', {
        detail: {
            beats: beatSchedule,
            bpm: songObj.bpm,
            ballSpeed: songObj.ballSpeed
        }
    }));

    song.load();
    setTimeout(() => {   
        song.play();
    }, 100);

    
 


    

//OLD CODE  MIGHT STILL BE USEFULL

// var songDurationS = song.duration;
// var songDurationMs = songDurationS * 1000;

// var startTime = performance.now();
// var currentTime = performance.now();
// var timer = 0;


//while timer < length of song
//     while (timer != songDurationMs){
        
//         timer = loop(startTime, currentTime);
//     }
}

// function loop(startTime, currentTime){
    
//     setTimeout(function() {
//         var randomNumber = Math.floor(Math.random() * 12); //assuming there are 12 lanes for the block to spawn it will pick one at random. the number of lanes can be changed based on difficulty
//         alert(randomNumber);
//         }, 142.75);  // ms between each beat in the song
//     currentTime = performance.now();
//     timer = currentTime - startTime;
//     return timer;
// }

//