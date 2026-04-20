CM3202 Emerging Technologies Group 6 accessible vr game

running on Apache using XAMPP (https://www.apachefriends.org/)

the folder "aframe" and repository is placed in C:\xampp\htdocs\aframe\

and once apache is running, the game can be played on localhost using "http://localhost/aframe/game.html"


song used is "Lord of the Rangs" by Kevin MacLeod (incompetech.com), Licensed under Creative Commons: By Attribution 4.0  http://creativecommons.org/licenses/by/4.0/

Image Kevin_Macleod.jpg, Kevin MacLeod - YouTube: https://www.youtube.com/watch?v=hSCql_stqag Licensed under Creative Commons: By Attribution 3.0 https://creativecommons.org/licenses/by/3.0/

Other images are screenshots of the game produced by ourselves.


game.html contains all of the a-frame entities and their attached components and their values. These entities are split into 3 separate parent entities which act as scene containers for a main menu, game and results scene. There are also some entities that are global to all these scenes, such as the camera, floor, skybox and view reset circle.

game.js contains all the button and scene switching logic, enabling and disabling the view and hitbox of different entities and handling what happens when a button is clicked.

components/ contains the two custom components written for this project

components/beat_anim.js contains the functionality for the beat circles moving from far back towards the ring presented to the player. This component also checks for if the user is looking at the beat and sends an event to beat_spawner.js on despawn.

components/beat_spawner.js is a component sitting on an empty entity in the scene. This component contains the beatmaps for the song and converts them to ms based on the bpm. It then plays the song and spawns the beat a certain amount of ms before its matching beat (matching with the travel time of the beat towards the ring) and listens for an event telling it if the beat was successfully looked at or not by the user. This component also updates the score counter and changes the scene when the last beat is hit or the song ends.
