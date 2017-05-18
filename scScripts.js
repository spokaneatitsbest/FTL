// StarCatcher Scripts for the game made by Soft Dev 2117
    // when the web page window loads up, the game scripts will be read
    
window.onload = function() {
    //load canvas
    function thingthatplayssound(path,vol) {
        var snd = new Audio(path);
        snd.volume = vol;
        snd.play();
    }
    function cloaksound(state) {
        if (state == 0) {
            thingthatplayssound("audio/teleport/cloak.ogg", 0.3);
        } else {
            thingthatplayssound("audio/teleport/uncloak.ogg", 0.3);
        }
    }
    thingthatplayssound("audio/music/bp_MUS_ShrikeBATTLE.ogg",1);
    var gameon = true;
    var star = {
    _x: null,
    _y: null,
    _xSpeed: null,
    _ySpeed: null,

    //Create new star object with given starting position and speed
    //class functions exist to set other private variables
    //All inputs are double and function returns a new star
    create: function (x, y, xSpeed, ySpeed) {
        var obj = Object.create(this);
        obj._x = x;
        obj._y = y;
        obj._xSpeed=xSpeed;
        obj._ySpeed=ySpeed;
        obj._width=50;
        obj._height=50;
        obj._img = new Image();
        rand = Math.floor((Math.random() * 6) + 1);
        obj._img.src='images/Asteroid/asteroid'+rand+'.png';
        return obj;
    },
    setSize: function(width, height){
        this._width = width;
        this._height = height;
    },
    setImage: function(img){
        this._img.src=img;
    },



    //Update the new x and y of the star based on the speed.
    //drawing functionality is left for calling class
    //no input or return
    update: function () {
        this._x+=this._xSpeed;
        this._y+=this._ySpeed;
    },
};

 var weapon = {
    _x: null,
    _y: null,
    _xSpeed: null,
    _ySpeed: null,

    //Create new star object with given starting position and speed
    //class functions exist to set other private variables
    //All inputs are double and function returns a new star
    create: function (x, y, xSpeed, ySpeed) {
        var obj = Object.create(this);
        obj._x = x;
        obj._y = y;
        obj._xSpeed=xSpeed;
        obj._ySpeed=ySpeed;
        obj._width=10;
        obj._height=10;
        obj._img = new Image();
        obj._img.src='images/l1.png';
        return obj;
    },
    setSize: function(width, height){
        this._width = width;
        this._height = height;
    },
    setImage: function(img){
        this._img.src=img;
    },



    //Update the new x and y of the star based on the speed.
    //drawing functionality is left for calling class
    //no input or return
    update: function () {
        this._x+=this._xSpeed;
        this._y+=this._ySpeed;
    },
};
     
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d"),
        w = canvas.width = 1500,
        h = canvas.height = 700;

    //load images and define health
    var ship1 = new Image();
    ship1.src="images/Starship/0/STARSHIP0.png"
    var ship1cloak = 0;
    var ship2 = new Image();
    ship2.src="images/Starship/3/STARSHIP3.png"
    var ship2cloak = 0;
    var background = new Image();
    var p1lvs = 4;
    var p2lvs = 4;
    //background.src="images/low_asteroid.png"
    background.src="images/low_sun.png"
    //background.src="images/bg_blueStarcluster.png"
    // our stars are created using a single array with a class of information
    var starCount=10;
    var starArray=[];
    var weaponArray=[];

    // Create an array of stars
    for (var i = 0; i < starCount; i++) {
        // this assigns each element in the array all the information for the star by 
        // using the 'star' class, pass the starting x,y locations 
        //  and speeds into the array.
        starArray.push(star.create(20,i+50,Math.random()*5,Math.random()*5));
        
    }
         
  //  weaponArray.push(weapon.create(20,50,1,0));
    // using arrays to keep tract of star speeds and positions
    starSpeed = new Array(8,3);
    starPos = new Array();
    var starVisible = 1;
    weaponSpeed = new Array(1,0);
    weaponPos = new Array();

    // moving stars and ships around the screen 
    var p1x=w/2+100, p1y=h/2, p2x=w/2-100, p2y=h/2;
    starPos[0] = starPos[1] = 10; //sx is not used and out, starPos array in


    // moving stars around the screen and update the players movement


    function starsUpdate () {
        ctx.drawImage(background,0,0,w,h);

    //  draw star on screen only if visible
        for (var i = 0; i < starCount; i++) {
            starArray[i].update();
            ctx.drawImage(starArray[i]._img, starArray[i]._x, starArray[i]._y, starArray[i]._width, starArray[i]._height);
            if (starArray[i]._x>w || starArray[i]._x<0) {starArray[i]._xSpeed = -starArray[i]._xSpeed}
            if (starArray[i]._y>h || starArray[i]._y<0) {starArray[i]._ySpeed = -starArray[i]._ySpeed}
        if (Math.abs(p1x-starArray[i]._x)<40 && Math.abs(p1y-starArray[i]._y)<40) {if (ship1cloak == 0){if (fuel1 > 0){starArray[i]._x = Math.floor((Math.random()*6)*200); starArray[i]._y = Math.floor((Math.random()*6)*100); hyperJump(1,1);} else {hyperJump(1,1)}} } //player 1 collide
            

        if (Math.abs(p2x-starArray[i]._x)<40 && Math.abs(p2y-starArray[i]._y)<40) {if (ship2cloak == 0){if (fuel2 > 0){starArray[i]._x = Math.floor((Math.random()*6)*200); starArray[i]._y = Math.floor((Math.random()*6)*100);hyperJump(2,1);} else {hyperJump(2,1)}}  }//player 2 collide
      if(weaponstat == true){
            for (var k = 0; k < weapcount; k++){
                if (Math.abs(weaponArray[k]._x-starArray[i]._x)<40 && Math.abs(weaponArray[k]._y-starArray[i]._y)<40) {
                    starArray[i]._x = Math.floor((Math.random()*6)*200); 
                    starArray[i]._y = Math.floor((Math.random()*6)*100); 
                    starArray[i].xSpeed = starArray[i].xSpeed - 1; 
                    starArray[i].ySpeed = starArray[i].ySpeed - 1; 
                    weaponArray[k]._x = w+10; weaponArray[k]._y = h+10; 
                    weaponArray[k]._xSpeed = 0; 
                    weaponArray[k]._ySpeed = 0}
                }
            } //missile collide
        }//endFor

    } //starsUpdate close!
    //___________________________________________________________________________________________________________________________
    

     function weaponUpdate () {

    //  draw star on screen only if visible
        for (i = 0; i < weapcount; i++) {
            weaponArray[i].update();
            ctx.drawImage(weaponArray[i]._img, weaponArray[i]._x, weaponArray[i]._y, weaponArray[i]._width, weaponArray[i]._height);
            if (weaponArray[i]._x>w || weaponArray[i]._x<0) {weaponArray[i]._xSpeed = 0}
            if (weaponArray[i]._y>h || weaponArray[i]._y<0) {weaponArray[i]._ySpeed = 0}
    //    if (Math.abs(p1x-starArray[i]._x)<40 && Math.abs(p1y-starArray[i]._y)<40) {if (ship1cloak == 0){if (fuel1 > 0){starArray[i]._x = Math.floor((Math.random()*6)*200); starArray[i]._y = Math.floor((Math.random()*6)*100); hyperJump(1);}} } //player 1 collide
            

}

    } //starsUpdate close!



    var fuel1 = 20;
    var fuel2 = 20;
function hyperJump(pnum, exec) { //HYPERJUMP!
    if (pnum == 1) {if (fuel1 > 0) {thingthatplayssound("audio/teleport/teleport.ogg",0.3); p1x = Math.floor((Math.random() * 6)*200); p1y = Math.floor((Math.random() * 6)*100); fuel1 = fuel1-1; console.log(fuel1); $("#f1").text(fuel1);} else {if (exec == 0){$("#f1").text("0");} else {
window.location.href = 'end.html' + '#' + fuel1 + '#' + p1AMMO + '#' + fuel2 + '#' + p2AMMO; console.log("end");}}}
    if (pnum == 2) {if (fuel2 > 0) {thingthatplayssound("audio/teleport/teleport.ogg",0.3); p2x = Math.floor((Math.random() * 6)*200); p2y = Math.floor((Math.random() * 6)*100); fuel2 = fuel2 -1; console.log(fuel2); $("#f2").text(fuel2);} else {if (exec == 0){$("#f2").text("0");} else {
window.location.href = 'end.html' + '#' + fuel1 + '#' + p1AMMO + '#' + fuel2 + '#' + p2AMMO; console.log("end");}}}
}
 //____________________________________________________________________________________________________________________________
//Listens to app for keyboard actions
    addEventListener("keydown", function (e) {

        if (e.keyCode == 38) { //  (key: up arrow)
            p1y-=10;
        }
        if (e.keyCode == 40) { //  (key: down arrow)
            p1y+=10;
        }
        if (e.keyCode == 37) { //  (key: left arrow)
            p1x-=10;
        }
        
        if (e.keyCode == 39) { //  (key: right)
            p1x+=10;
        }//player1
        if (e.keyCode == 87) { //  (key: w)
            p2y-=10;
        }
        if (e.keyCode == 83) { //  (key: s)
            p2y+=10;
        }
        if (e.keyCode == 65) { //  (key: a)
            p2x-=10;
        }
        if (e.keyCode == 68) { //  (key: d)
            p2x+=10;
        }

    }, false);
           
               // a new array is made to keep track of a button being held down
    var keysDown = [];

    // if the key is held down, the keycode is placed in array
    // then it is deleted upon keyup command.  
    // playerUpdate will now control player movements and use the keysDown array

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
function playPause() {if (gameon == false) {gameon = true; main(); $("#playb").text("Press to Pause")/*(key: space bar to start game)*/} else {gameon = false; $("#playb").text("Press to Play")}}
var weaponstat = false;
var weapcount = 0;
var p1canFire = true;
var p2canFire = true;
var p1AMMO = 200;
var p2AMMO = 200;
function weapcreate(xsp,ysp,plr) {
        if (plr == 0) {
            if(p1canFire == true) {

            weapcount = weapcount + 1;
            weaponArray.push(weapon.create(p1x+46,p1y+46,xsp,ysp))
            weaponUpdate();
            weaponstat = true;
            p1AMMO = p1AMMO - 1;
            thingthatplayssound('audio/weapons/bp_missile_small.ogg',1);
        }
    } else {
        if(p2canFire == true) {
            weapcount = weapcount + 1;
            weaponArray.push(weapon.create(p2x+46,p2y+46,xsp,ysp))
            weaponUpdate();
            weaponstat = true;
            p2AMMO = p2AMMO - 1;
            thingthatplayssound('audio/weapons/bp_missile_small.ogg',1);
    }
    }
    $("#1AMMO").text(p1AMMO); 
    $("#2AMMO").text(p2AMMO);
} //function close



    //  player 2 movement keyboard commands
    addEventListener("keyup", function (e) {
        // start the game with keyboard command
        if (e.keyCode == 16) {
      /*      weapcount = weapcount + 1;
            weaponArray.push(weapon.create(p1x,p1y,8,3))
            weaponUpdate();
            weaponstat = true; */
       } 
       if (e.keyCode == 27) {
        playPause();
       }
       if (e.keyCode == 32) {}

        if (e.keyCode == 87) { //  (key: w )
            p2y-=10;
        }
        else if (e.keyCode == 83) { //  (key: s)
            p2y+=10;
        }
        else if (e.keyCode == 65) { //  (key: a)
            p2x-=10;
        }
        else if (e.keyCode == 68) { //  (key: d)
            p2x+=10;
        }
        if (e.keyCode == 81) { //cloak
        
        }
     
        if (e.keyCode == 33) { //cloak
        
        }
        if (e.keyCode == 69) { //hyperjump
            hyperJump(2,0);
        }
        if (e.keyCode == 34) { //hyperjump
            hyperJump(1,0);
        }
        if (e.keyCode == 17) {
            ship1cloak = 0;
        }
        //take keycode out of array (not being held down anymore)
        delete keysDown[e.keyCode];
    }, false); 

            //player movement
            var p1direcpast;
            var p2direcpast;

            //PLAYERUPDATE!_______________________________________________________________
    function playerUpdate() {
        //player two hodling down a key using the array keysDown
        if (87 in keysDown) {// P2 holding down the w key
            p2y -= 5;
            ship2.src="images/Starship/3/STARSHIP3U.png"
            p2direcpast = "up";

        }

        if (83 in keysDown) { // P2 holding down (key: s)
            p2y += 5;
            ship2.src="images/Starship/3/STARSHIP3D.png"
            p2direcpast = "down";
        }
        if (65 in keysDown) { // P2 holding down (key: a)
            p2x -= 5;
            ship2.src="images/Starship/3/STARSHIP3L.png"
            p2direcpast = "left";

        }
        if (68 in keysDown) { // P2 holding down (key: d)
            p2x += 5;
            ship2.src="images/Starship/3/STARSHIP3.png"
            p2direcpast = "right";
        }

        // player one hodling key down
        if (37 in keysDown) { // P2 holding down (key: left arrow)
            p1x -= 5;
            ship1.src="images/Starship/0/STARSHIP0.png"
            p1direcpast = "left";
        }
        if (38 in keysDown) { // P2 holding down (key: up arrow)
            p1y -= 5;
            ship1.src="images/Starship/0/STARSHIP0U.png"
            p1direcpast= "up";
        }
        if (39 in keysDown) { // P2 holding down (key: right arrow)
            p1x += 5;
            ship1.src="images/Starship/0/STARSHIP0R.png"
            p1direcpast = "right";
        }
        if (40 in keysDown) { // P2 holding down (key: down arrow)
            p1y += 5;
            ship1.src="images/Starship/0/STARSHIP0D.png"
            p1direcpast = "down";
        }


 //________________________________________________________________________________________________________________
        if (81 in keysDown && ship2cloak <= 0) {
        
            if (65 in keysDown) {cloaksound(0); ship2.src="images/Starship/3/STARSHIP3CLOAK.png"; ship2cloak = 600;} //left
            if (68 in keysDown) {cloaksound(0); ship2.src="images/Starship/3/STARSHIP3CLOAKL.png"; ship2cloak = 600;} //right
            if (87 in keysDown) {cloaksound(0); ship2.src="images/Starship/3/STARSHIP3CLOAKU.png"; ship2cloak = 600;} //up
            if (83 in keysDown) {cloaksound(0); ship2.src="images/Starship/3/STARSHIP3CLOAKD.png"; ship2cloak = 600;} //down
        
        } else {
            if (68 in keysDown) {if (ship2cloak == 1){cloaksound(1); ship2.src="images/Starship/3/STARSHIP3.png";} else { if (ship2cloak > 1) {ship2.src="images/Starship/3/STARSHIP3CLOAKL.png";}}} //right
            if (65 in keysDown) {if (ship2cloak == 1){cloaksound(1); ship2.src="images/Starship/3/STARSHIP3L.png";} else { if (ship2cloak > 1) {ship2.src="images/Starship/3/STARSHIP3CLOAK.png";}}} //left
            if (87 in keysDown) {if (ship2cloak == 1){cloaksound(1); ship2.src="images/Starship/3/STARSHIP3U.png";} else { if (ship2cloak > 1) {ship2.src="images/Starship/3/STARSHIP3CLOAKU.png";}}} //up
            if (83 in keysDown) {if (ship2cloak == 1){cloaksound(1); ship2.src="images/Starship/3/STARSHIP3D.png";} else { if (ship2cloak > 1) {ship2.src="images/Starship/3/STARSHIP3CLOAKD.png";}}} //down
         }

       if (33 in keysDown && ship1cloak <= 0) {
        
            if (37 in keysDown) {ship1.src="images/Starship/0/STARSHIP0CLOAK.png"; ship1cloak = 600;} //left
            if (39 in keysDown) {ship1.src="images/Starship/0/STARSHIP0CLOAKR.png"; ship1cloak = 600;} //right
            if (38 in keysDown) {ship1.src="images/Starship/0/STARSHIP0CLOAKD.png"; ship1cloak = 600;} //down
            if (40 in keysDown) {ship1.src="images/Starship/0/STARSHIP0CLOAKU.png"; ship1cloak = 600;} //opposite of down
        
        } else {
            if (39 in keysDown) {if (ship1cloak == 1){ship1.src="images/Starship/0/STARSHIP0.png";} else { if (ship1cloak > 1) {ship1.src="images/Starship/0/STARSHIP0CLOAKR.png";}}} //right
            if (37 in keysDown) {if (ship1cloak == 1){ship1.src="images/Starship/0/STARSHIP0R.png";} else { if (ship1cloak > 1) {ship1.src="images/Starship/0/STARSHIP0CLOAK.png";}}} //left
            if (40 in keysDown) {if (ship1cloak == 1){ship1.src="images/Starship/0/STARSHIP0D.png";} else { if (ship1cloak > 1) {ship1.src="images/Starship/0/STARSHIP0CLOAKD.png";}}} //down
            if (38 in keysDown) {if (ship1cloak == 1){ship1.src="images/Starship/0/STARSHIP0U.png";} else { if (ship1cloak > 1) {ship1.src="images/Starship/0/STARSHIP0CLOAKU.png";}}} //not down down
         }


      /*  if (33 in keysDown) {
            if (37 in keysDown) {if (ship1cloak == 0){cloaksound(0);} ship1.src="images/Starship/0/STARSHIP0CLOAK.png"; ship1cloak = 1;} //left
            if (39 in keysDown) {if (ship1cloak == 0){cloaksound(0);} ship1.src="images/Starship/0/STARSHIP0CLOAKR.png"; ship1cloak = 1;} //right
            if (40 in keysDown) {if (ship1cloak == 0){cloaksound(0);} ship1.src="images/Starship/0/STARSHIP0CLOAKD.png"; ship1cloak = 1;} //down
            if (38 in keysDown) {if (ship1cloak == 0){cloaksound(0);} ship1.src="images/Starship/0/STARSHIP0CLOAKU.png"; ship1cloak = 1;} //up
        } else {
            if (39 in keysDown) {if (ship1cloak == 1){cloaksound(1);} ship1.src="images/Starship/0/STARSHIP0R.png"; ship1cloak = 0;} //right
            if (37 in keysDown) {if (ship1cloak == 1){cloaksound(1);} ship1.src="images/Starship/0/STARSHIP0.png"; ship1cloak = 0;} //left
            if (40 in keysDown) {if (ship1cloak == 1){cloaksound(1);} ship1.src="images/Starship/0/STARSHIP0D.png"; ship1cloak = 0;} //down
            if (38 in keysDown) {if (ship1cloak == 1){cloaksound(1);} ship1.src="images/Starship/0/STARSHIP0U.png"; ship1cloak = 0;} //up

        }
*/
        //WEAPONS!___________________________________________________________________________________
        if (16 in keysDown) {if (p1AMMO > 0) {
            if (ship1cloak != 0) {} else {
            if (p1direcpast == "left") {weapcreate(-8,0,0);} //left
            if (p1direcpast == "right") {weapcreate(8,0,0);} //right
            if (p1direcpast == "down") {weapcreate(0,8,0);} //down
            if (p1direcpast == "up") {weapcreate(0,-8,0);} //up
            p1canFire = false;
        }
        }} else {p1canFire = true;}
        if (32 in keysDown) {if (p2AMMO > 0) {
            if (ship2cloak != 0) {} else {
            if (p2direcpast == "left") {weapcreate(-8,0,1);} //left
            if (p2direcpast == "right") {weapcreate(8,0,1);} //right
            if (p2direcpast == "down") {weapcreate(0,8,1);} //down
            if (p2direcpast == "up") {weapcreate(0,-8,1);} //up
            p2canFire = false;
        }
        }} else {p2canFire = true;}

        //WIDTH!______________________________________________________________________________________

        if (p1x>w) {p1x = 0}
        if (p1x<0) {p1x = w}
        if (p1y>h) {p1y = 0}
        if (p1y<0) {p1y = h}
        if (p2x>w) {p2x = 0}
        if (p2x<0) {p2x = w}
        if (p2y>h) {p2y = 0}
        if (p2y<0) {p2y = h}
        ctx.drawImage(ship1, p1x, p1y, 92, 92);
        ctx.drawImage(ship2, p2x, p2y, 92, 92);
    }
      
//Main___________________________________________________________________________________________________
    function main(){
       ctx.clearRect(0,0,w,h);
        starsUpdate();
        playerUpdate();
     if(weaponstat == true) {weaponUpdate();}
          if (gameon == true) {requestAnimationFrame(main);}
    if (ship2cloak >= 1) {ship2cloak = ship2cloak - 1; if (ship2cloak == 1){cloaksound(1); ship2.src="images/Starship/3/STARSHIP3.png";}}
     if (ship1cloak >= 1) {ship1cloak = ship1cloak - 1; if (ship1cloak == 1){cloaksound(1); ship1.src="images/Starship/0/STARSHIP0.png";}}
    }  
    main();
    $("#playb").click(function(){playPause()});
    
} //close window.onload            


            


