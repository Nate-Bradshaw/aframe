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
            
            beatMapArr: [[1,90],[3,180],[1,90],[3,0],[1,90],[3,180],[1,90],[3,270],   //4 bars
                        [1,270],[2,225],[1,225],[1,180],[2,135],[1,135],[1,90],[2,45],[1,45],[0.5,0],[2,315],[1,315],   //4 bars
                        [1,68],[1,45],[2,22],[1,248],[1,225],[2,202],[1,112],[1,135],[2,157],[1,292],[1,315],[2,338],  //4 bars
                        [1,158],[1,112],[2,135],[1,22],[1,68],[2,45],[1,135],[1,45],[2,90],[1,225],[1,315],[3,270],   //4 and a quarter
                        [2,135],[2,315],[2,225],[2,45],[1,112],[1,112],[2,292],[2,247],[1,68],   //3 and 3 quarters
                        [4,90],[4,180],[4,270],[4,0]   //4 bars
                        ]
            

            // beatMapArr: [[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],[0.5,0],]
        }

        this.beatIndex = parseInt(0);
        this.startTime = null;
        this.isPlaying = false;
        this.elapsed = 0; //time elapsed in ms

        this.el.addEventListener("beat_hit", (event) => {
            //console.log("beat hit event");
            //console.log(event.detail);
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
            isPlaying = true;
        });

    },

    tick: function (time, timeDelta) {
        if (!this.isPlaying) return;
        
        this.elapsed += timeDelta;

        //console.log(this.elapsed);
        //console.log(this.beatIndex);
        //console.log(this.beats);
        //console.log(this.beats[this.beatIndex].timeMs);
        //console.log(this.data.dur);
        //console.log(this.beats[this.beatIndex].timeMs + this.data.dur);

        if(this.beatIndex == this.beats.length){
            this.isPlaying = false;
            return;
        }

        if(this.elapsed >= this.beats[this.beatIndex].timeMs + this.data.dur){
            this.createBeat(this.beats[this.beatIndex].angle, this.elapsed)
            this.beatIndex++;
        }


        
        this.deltaT++;
    },

    getCurrentTime: function () {
        //console.log(this.el.components.sound__song)
        const audioEl = this.el.components.sound__song.pool.children[0];
        if (!audioEl || !audioEl.isPlaying) return 0; //not playing
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

        this.songObj.beatMapArr.forEach((beat, index) => {
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