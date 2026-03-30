AFRAME.registerComponent('beat_anim', {
    //https://aframe.io/docs/1.7.0/core/component.html
    
    // idea behind this is to move a beat object from a start pos to the edge of a ring
    // once it reaches the edge of the ring, create an event saying this note is at the edge
    // then scale down the note to make it look like its "absorbing" into the ring
    // handelling of weather the note is correct or not will be elsewhere(?)
    
    //see property types in component docs, can do custom types
    schema: {
        ring: {type: 'selector'}, //this should be the ring where the notes need to go
        start_depth: {type: 'number'},
        angle: {type: 'number'}, //float
        //note on angle, this will be what we want the LOCAL angle to be
        //global angle calculations will need to be made
        //this.data.startPos = {0,1,2}
        //this.data.startPos.x = 0 //ect...
    },

    init: function () {
        //vectors are threejs
        var pos = new THREE.Vector3(0, 0, this.data.start_depth);
        pos.add(this.data.ring.object3D.position);
        this.el.setAttribute("position", pos);
        this.radius = this.data.ring.components.geometry.data.radiusInner;
        this.deltaT = 0;
        this.curPos = pos;
        var x = pos.x + (this.radius * Math.cos(THREE.MathUtils.degToRad(this.data.angle)));
        var y = pos.y + (this.radius * Math.sin(THREE.MathUtils.degToRad(this.data.angle)));
        this.endPos = new THREE.Vector3(x, y, this.data.ring.object3D.position.z);

        console.log(this.data.ring.components.geometry.data);
    },

    tick: function () {
        //console.log(this.data.fooI);
        //this.el.setAttribute("beatAnim", {fooI: (this.data.fooI + 1)});
        var pos = this.curPos.lerp(this.endPos, 0.05);
        //if lerp is done:
        //create an event stating that a note has hit ring
        //delete this object

        this.el.setAttribute("position", pos)
    }
});