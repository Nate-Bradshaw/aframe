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
        dur_ticks: {type: 'int', default: 10}, //int, docs say the ticks are at either 60 or 120 per second
        grace_ticks_pre: {type: 'int', default: 2}, //this is the grace before the beat hits the ring
        grace_ticks_post: {type: 'int', default: 5}, //this is the grace after the beat hits the ring
        //TODO: figure out what tps we are running
        //feels like its at 60 per second
    },

    init: function () {
        //vectors are threejs
        var pos = new THREE.Vector3(0, 0, this.data.start_depth);
        pos.add(this.data.ring.object3D.position);
        this.el.setAttribute("position", pos);
        this.radius = this.data.ring.components.geometry.data.radiusInner;
        this.deltaT = 0; //delta ticks, not time, ticks because thats what t means, ticks. not time.

        var x = pos.x + (this.radius * Math.cos(THREE.MathUtils.degToRad(this.data.angle)));
        var y = pos.y + (this.radius * Math.sin(THREE.MathUtils.degToRad(this.data.angle)));
        var endPos = new THREE.Vector3(x, y, this.data.ring.object3D.position.z);

        this.step = (endPos.sub(pos)).divideScalar(this.data.dur_ticks);
        console.log(this.step);

        console.log(this.data.ring.components.geometry.data);

        this.gazeActive = false;
    },

    tick: function () {
        var pos = this.el.object3D.position;

        if(this.deltaT < this.data.dur_ticks){
            pos.add(this.step);
            this.el.setAttribute("position", pos)
            if(this.deltaT == this.data.dur_ticks - this.data.grace_ticks_pre){
                this.gazeActive = true;
            }
        }
        else{
            //fading alpha, gaze active still during this till deletion
            if(this.deltaT == this.data.dur_ticks + this.data.grace_ticks_post){
                //destroy this, done by sending an event to parent object that then removes this
                console.log("should emit")
                this.el.emit("remove_beat_object", {el: this.el}, true);
            }
        }
        this.deltaT++;
        //get the vector between start pos and end pos

        //var pos = this.curPos.lerp(this.endPos, 0.05);
        //if object is on ring:
        //create an event stating that a note has hit ring
        //delete this object

        //this.el.setAttribute("position", pos)
    }
});