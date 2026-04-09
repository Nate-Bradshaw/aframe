AFRAME.registerComponent('beat_anim', {
    //https://aframe.io/docs/1.7.0/core/component.html
    
    // idea behind this is to move a beat object from a start pos to the edge of a ring
    // once it reaches the edge of the ring, create an event saying this note is at the edge
    // then scale down the note to make it look like its "absorbing" into the ring
    // handelling of checking if the note is correct or not will be elsewhere(?)
    
    //see property types in component docs, can do custom types
    schema: {
        ring: {type: 'selector'}, //this should be the ring where the notes need to go
        start_depth: {type: 'number'},
        angle: {type: 'number'}, //float
        dur: {type: 'int', default: 10}, //int, duration in miliseconds (changed to sec from tick to be fps independant)
        grace_time_pre: {type: 'int', default: 200}, //this is the grace before the beat hits the ring in ms
        grace_time_post: {type: 'int', default: 500}, //this is the grace after the beat hits the ring in ms
        //TODO: figure out what tps we are running
        //feels like its at 60 per second
    },

    init: function () {
        this.ready = false;
    },

    lateInit: function () {
        //vectors are threejs
        this.startPos = new THREE.Vector3(0, 0, this.data.start_depth);
        this.startPos.add(this.data.ring.object3D.position);
        this.el.setAttribute("position", this.startPos);

        this.radius = this.data.ring.components.geometry.data.radiusInner;
        this.elapsed = 0; //time, in miliseconds, that has elapsed

        var x = this.startPos.x + (this.radius * Math.cos(THREE.MathUtils.degToRad(this.data.angle)));
        var y = this.startPos.y + (this.radius * Math.sin(THREE.MathUtils.degToRad(this.data.angle)));
        this.endPos = new THREE.Vector3(x, y, this.data.ring.object3D.position.z);

        this.alphaElapsed = 0;

        this.gazeActive = false;

        this.running = true;

        this.el.addEventListener("looked_at", function(event){
            if(gazeActive){
                //idea here is: if looked at in the gaze window, the beat_spawner gets notified for score ect
                //colour change for feedback
                //! untested until gaze interaction with beats is done
                this.el.emit("beat_hit", {hit: true, accurracy: Math.abs(this.accumulatedT - this.data.dur)}, true);
                gazeActive = false;
                this.el.components.material.color = "#00ff95";
            }
        })
    },

    tick: function (time, timeDelta) {
        if(!this.ready){
            this.lateInit();
            this.ready = true;
        }

        this.elapsed += timeDelta;

        const t = Math.min(this.elapsed / this.data.dur, 1);
        

        if (this.running) {
            //still running
            this.el.object3D.position.lerpVectors(this.startPos, this.endPos, t);
            
            if(this.elapsed >= this.data.dur - this.data.grace_time_pre) {this.gazeActive = true;}
            if(t==1) {this.running = false;}
        }
        else{
            //fade the object out
            this.alphaElapsed += timeDelta;
            const alphaT = Math.min(this.alphaElapsed / this.data.grace_time_post, 1);

            this.el.setAttribute("material", "opacity", THREE.MathUtils.lerp(1, 0, alphaT));
            //fading alpha, gaze active still during this till deletion
            if(this.elapsed >= this.data.dur + this.data.grace_time_post){
                //destroy this, tell the beat spawner beat was missed
                this.el.emit("beat_hit", {hit: false, accurracy: 0}, true);
                this.el.parentNode.removeChild(this.el);
            }
        }
    }
});