AFRAME.registerComponent('beatAnim', {
    //https://aframe.io/docs/1.7.0/core/component.html
    
    // idea behind this is to move a beat object from a start pos to the edge of a ring
    // once it reaches the edge of the ring, create an event saying this note is at the edge
    // then scale down the note to make it look like its "absorbing" into the ring
    // handelling of weather the note is correct or not will be elsewhere(?)
    
    //see property types in component docs, can do custom types
    schema: {
        message: {type: 'string', default: 'Hello, World!'},
        startPos: {type: 'vec3', default: { x: 0, y: 0, z: 0 }}
        //this.data.startPos = {0,1,2}
        //this.data.startPos.x = 0 //ect...
    },

    init: function () {
        console.log(this.data.message);
    },

    tick: function () {
        console.log(this.data.fooI);
        this.el.setAttribute("beatAnim", {fooI: (this.data.fooI + 1)});
    }
});