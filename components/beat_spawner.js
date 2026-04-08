AFRAME.registerComponent('beat_spawner', {

    //https://aframe.io/docs/1.7.0/core/component.html

    schema: {
        dur_ticks: {type: 'int', default: 10},
    },

    init: function () {
        // create Audio object
        this.songObj = {
            name: "Lord of the Rangs",
            artist: "Kevin MacLeod",
            bpm: 104,
            //ballSpeed: 300, //the dur_ticks thing. will probably change 
            attribution:`"Lord of the Rangs"
                        Kevin MacLeod (incompetech.com)
                        Licensed under Creative Commons: By Attribution 4.0
                        http://creativecommons.org/licenses/by/4.0/` ,      //need to put this somewhere for legal reasons

            //each array will have the delay AFTER the beat in number of quarter notes (first), and where in the circle it will come from (not there yet)
            beatMapArr: [[1,90],[3,180],[1,90],[3,0],[1,90],[3,180],[1,90],[3,270],   //4 bars
                        [1,270],[2,225],[1,225],[1,180],[2,135],[1,135],[1,90],[2,45],[1,45],[1,0],[2,315],[1,315],   //4 bars
                        [1,68],[1,45],[2,22],[1,248],[1,225],[2,202],[1,112],[1,135],[2,157],[1,292],[1,315],[2,338],  //4 bars
                        [1,158],[1,112],[2,135],[1,22],[1,68],[2,45],[1,135],[1,45],[2,90],[1,225],[1,315],[3,270],   //4 and a quarter
                        [2,135],[2,315],[2,225],[2,45],[1,112],[1,112],[2,292],[2,247],[1,68],   //3 and 3 quarters
                        [4,90],[4,180],[4,270],[4,0]   //4 bars
                        ]
        }

        this.beatIndex = 0;
        this.startTime = null;
        this.isPlaying = false;
        this.deltaT = 0; //delta ticks

        this.el.addEventListener("beat_hit", function(event){
            console.log("beat hit event");
            console.log(event.detail);
        });


        this.el.addEventListener('loaded', function(event){
            console.log("sound playing")
            event.srcElement.components.sound__song.playSound(); //note: sound will not play if there was no user interaction, start on the /menu page
            //this.el.components.sound__song.playSound();
        });
    },

    tick: function () {
        this.getCurrentTime();
        if (!this.isPlaying) return;

        //const currentTime = performance.now() - this.startTime; //performance.now() returns a timestamp 

        //! remove this while
        
        //if (currentTime >= nextBeat.timeMs) {
        //    // Time to spawn this beat
        //    this.createBeat(nextBeat.angle);
        //    this.nextBeatIndex++;
        //}
        
        
        this.deltaT++;
    },

    getCurrentTime: function () {
        //console.log(this.el.components.sound__song)
        const audioEl = this.el.components.sound__song.pool.children[0];
        if (!audioEl || !audioEl.isPlaying) return 0; //not playing
        //console.log(audioEl.context.currentTime - audioEl._startedAt)
        return audioEl.context.currentTime - audioEl._startedAt; //returns the time in the audio
    },

    createBeat: function(angleIn){
        //var sceneEl = document.querySelector('a-scene');
        var entityEl = document.createElement("a-entity");

        this.el.appendChild(entityEl);

        entityEl.setAttribute("geometry",{
            primitive: "circle",
            radius: 0.25,
        })

        entityEl.setAttribute("material",{
            color: "#86e0fe",
            transparent: true,
        })

        entityEl.setAttribute("beat_anim",{
            ring: "#StaticRing",
            start_depth: -50,
            angle: angleIn,
            dur_ticks: this.data.dur_ticks,
            grace_ticks_pre: 5,
            grace_ticks_post: 50,
        })
    },

    calculateBeatTimings: function(){
        //converts to seconds
        const quarterNoteMs = (60/this.songObj.bpm) * 1000;

        const beatSchedule = [];
        var accumulatedTime = 0;

        this.songObj.beatMapArr.forEach((beat, index) => {
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

    },
});