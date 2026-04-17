AFRAME.registerComponent('beat_spawner', {
    

    //https://aframe.io/docs/1.7.0/core/component.html

    schema: {
        dur: {type: 'int', default: 1000}, //miliseconds
        counter: {type: 'selector'}
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
            // [beats since last note, angle]
            
            // limit angles to increments of 45 degrees
            //45, 90, 135, 180, 225, 270, 315

            beatMapArrEasy: [[1,90],[3,180],[2,270],[3,180],[2,0],[3,180],[2,270],   //4 bars
                        [3,0],[2,90],[1,180],[2,270],[3,359],[1,90],[3,0],[0.5,45],[0.5,50],   //4 bars  
                        [2,90],[1,10],[2,0],[3,250],[1,225],[1,225],[0.5,0],[0.5,135],[2,180],[3,270],  //4 bars  
                        [1,225],[1,0],[1,180],[1,200],[3,90],[2,45],[1,100],[1,45],[2,90],[4,320],   //4 and a quarter  
                        [3,0],[3,359],[3,10],[0.5,270],[1,360],[0.5,0],[1,3],[2,225],[1,0],   //3 and 3 quarters                          
                        [4,90],[4,270],[4,90],[4,270]   //4 bars
                        ],                         

            beatMapArrMed: [[1,90],[3,180],[1,90],[3,0],[1,90],[3,180],[1,90],[3,270],   //4 bars
                        [1,270],[2,135],[1,225],[1,180],[2,135],[1,135],[1,90],[2,45],[1,45],[0.5,0],[2,315],[1,270],   //4 bars
                        [1,90],[1,45],[2,0],[1,225],[1,225],[2,180],[1,0],[1,135],[2,180],[1,0],[1,315],[2,270],  //4 bars
                        [1,225],[1,135],[2,0],[1,180],[1,0],[2,45],[1,135],[1,45],[2,90],[1,225],[1,315],[3,270],   //4 and a quarter
                        [2,135],[2,315],[2,225],[2,45],[1,360],[1,90],[2,315],[2,225],[1,90],   //3 and 3 quarters
                        [4,90],[4,180],[4,270],[4,0]   //4 bars
                        ],

            beatMapArrHard: [[1,180],[3,180],[1,90],[3,0],[1,90],[3,180],[1,90],[3,270],   //4 bars
                        [1,270],[2,135],[1,225],[1,180],[2,135],[1,135],[1,90],[2,45],[1,45],[0.5,0],[2,315],[1,270],   //4 bars
                        [1,90],[1,45],[2,0],[1,225],[1,225],[2,180],[1,0],[1,135],[2,180],[1,0],[1,315],[2,270],  //4 bars
                        [1,225],[1,135],[2,0],[1,180],[1,0],[2,45],[1,135],[1,45],[2,90],[1,225],[1,315],[3,270],   //4 and a quarter
                        [2,135],[2,315],[2,225],[2,45],[1,360],[1,90],[2,315],[2,225],[1,90],   //3 and 3 quarters
                        [4,90],[4,180],[4,270],[4,0]   //4 bars
                        ],
            

            // beatMapArr: [[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],]
        }

        this.beatIndex = parseInt(0);
        this.startTime = null;
        this.mmisPlaying = false;
        this.elapsed = 0; //time elapsed in ms
        this.returnedNotes = 0;

        this.difficulty = document.cookie.split("; ")[0].split("=")[1] // Grabs the difficulty part of the cookie

        console.log(`Difficulty = ${this.difficulty}`)

        this.el.addEventListener("beat_hit", (event) => {
            //console.log("beat hit event");
            //console.log(event.detail);
            this.returnedNotes++;
            if(event.detail.hit){
                this.data.counter.setAttribute('text__counter', 'value', parseInt(this.data.counter.components.text__counter.data.value) + 1);
            }
        });


        this.el.addEventListener('loaded', function(event){
            console.log("sound playing")
            event.srcElement.components.sound__song.playSound(); //note: sound will not play if there was no user interaction, start on the /menu page
            //this.el.components.sound__song.playSound();
            //event.srcElement.components.beat_spawner.createBeat(0);
            event.srcElement.components.beat_spawner.beats = event.srcElement.components.beat_spawner.calculateBeatTimings();
            event.srcElement.components.beat_spawner.mIsPlaying = true;
        });

    },

    tick: function (time, timeDelta) {
        if (!this.mIsPlaying){
            if(this.beatIndex == this.returnedNotes){
                //change back to menu scene
                const score = this.data.counter.getAttribute('text__counter', 'value') // Grabs score
                document.cookie = "score=" + score.value + "; path=/; Max-Age=3600"; // Creates cookie that lasts an hour

                setTimeout(() => {
                    window.location.href = "results.html";
                }, 100); // Allows for cookie creation before reroute
            }
            return;
        }
            
        this.elapsed += timeDelta;

        if(this.beatIndex == this.beats.length){
            this.mIsPlaying = false;
            return;
        }

        if(this.elapsed >= this.beats[this.beatIndex].timeMs + this.data.dur){
            this.createBeat(this.beats[this.beatIndex].angle, this.elapsed)
            this.beatIndex++;
        }
    },

    getCurrentTime: function () {
        //console.log(this.el.components.sound__song)
        const audioEl = this.el.components.sound__song.pool.children[0];
        if (!audioEl || !audioEl.mIsPlaying) return 0; //not playing
        //console.log(audioEl.context.currentTime - audioEl._startedAt)
        return audioEl.context.currentTime - audioEl._startedAt; //returns the time in the audio
    },

    createBeat: function(angleIn, i){
        //var sceneEl = document.querySelector('a-scene');
        var entityEl = document.createElement("a-entity");

        this.el.appendChild(entityEl);

        entityEl.setAttribute("geometry",{
            primitive: "circle",
            radius: 0.25,
        })

        entityEl.setAttribute("material",{
            color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
            transparent: true,
        })

        entityEl.setAttribute("beat_anim",{
            ring: "#StaticRing",
            cursor: "#cursor",
            start_depth: -50,
            angle: angleIn,
            dur: this.data.dur,
            grace_time_pre: 50,
            grace_time_post: 500,
        })

        entityEl.setAttribute('id', i.toString());
    },

    calculateBeatTimings: function(){
        //converts to seconds
        const quarterNoteMs = (60/this.songObj.bpm) * 1000;

        const beatSchedule = [];
        var accumulatedTime = 0;
        var beatarr;

        switch (this.difficulty) {
            case "easy":
                beatarr = this.songObj.beatMapArrEasy;
                break;
            case "normal":
                beatarr = this.songObj.beatMapArrMed;
                break;
            case "hard":
                beatarr = this.songObj.beatMapArrHard;
                break;
            default:
                beatarr = this.songObj.beatMapArrEasy;
                break;
        }

        beatarr.forEach((beat, index) => {
            const [delayNotes, angle] = beat;
            accumulatedTime += delayNotes * quarterNoteMs;

            beatSchedule.push({
                timeMs: accumulatedTime,
                angle: angle,
                //beatIndex: index,
                //delayNotes: delayNotes
                //dont need above, the index is the beatindex and delay notes isnt needed with the ms
            });
            
        });
        return beatSchedule;

    },
});