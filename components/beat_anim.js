AFRAME.registerComponent('beat_anim', {
    //https://aframe.io/docs/1.7.0/core/component.html
    
    // idea behind this is to move a beat object from a start pos to the edge of a ring
    // once it reaches the edge of the ring, create an event saying this note is at the edge
    // then scale down the note to make it look like its "absorbing" into the ring
    // handelling of weather the note is correct or not will be elsewhere(?)
    
    //see property types in component docs, can do custom types
    schema: {
        startPos: {type: 'vec3'},
        ring: {type: 'selector'}, //this should be the ring where the notes need to go
        angle: {type: 'number'} //float
        //note on angle, this will be what we want the LOCAL angle to be
        //global angle calculations will need to be made
        //this.data.startPos = {0,1,2}
        //this.data.startPos.x = 0 //ect...
    },

    init: function () {
        this.el.setAttribute("position", this.data.startPos)
    },

    tick: function () {
        console.log(this.data.fooI);
        this.el.setAttribute("beatAnim", {fooI: (this.data.fooI + 1)});
    }
});