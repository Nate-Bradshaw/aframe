AFRAME.registerComponent('beat_spawner', {

    //https://aframe.io/docs/1.7.0/core/component.html

    schema: {
        dur_ticks: {type: 'int', default: 10},
    },

    init: function () {
        this.createBeat(45);
        this.deltaT = 0;
        this.el.addEventListener("remove_beat_object", function(event){
            console.log("remove child ig");
            console.log(event.detail.el);
        });
    },

    tick: function () {
        //this.createBeat(0);
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
        })

        entityEl.setAttribute("beat_anim",{
            ring: "#StaticRing",
            start_depth: -50,
            angle: angleIn,
            dur_ticks: this.data.dur_ticks,
            grace_ticks_pre: 5,
            grace_ticks_post: 100,
        })
    }

});