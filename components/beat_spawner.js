AFRAME.registerComponent('beat_spawner', {

    //https://aframe.io/docs/1.7.0/core/component.html

    schema: {
        dur_ticks: {type: 'int', default: 10},
    },

    init: function () {
        this.beatSchedule= [];
        this.nextBeatIndex = 0;
        this.startTime = null;
        this.isPlaying = false
        //this.createBeat(45);
        this.deltaT = 0;
        this.bpm=104;
        this.ballspeed=300;

        this.el.sceneEl.addEventListener('load-beat-schedule', (event) => {
            this.beatSchedule = event.detail.beats;
            this.bpm = event.detail.bpm;
            this.ballSpeed = event.detail.ballSpeed;
            this.nextBeatIndex = 0;
            this.startTime = performance.now() + 100; // 100ms delay
            this.isPlaying = true;
            
        });

        this.el.addEventListener("beat_hit", function(event){
            console.log("beat hit event");
            console.log(event.detail);
        });
    },

    tick: function () {
        if (!this.isPlaying) return;

        const currentTime= performance.now() - this.startTime;

       while (this.nextBeatIndex < this.beatSchedule.length) {
            const nextBeat = this.beatSchedule[this.nextBeatIndex];
            
            if (currentTime >= nextBeat.timeMs) {
                // Time to spawn this beat
                this.createBeat(nextBeat.angle);
                this.nextBeatIndex++;
            }
            else {
                break;
            }
        }
        
        this.deltaT++;
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
    }

});