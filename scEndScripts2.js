window.onscroll = function () {
window.scrollTo(0,0);
}
window.onload = function() {
    //load canvas
var hashScoreVal = window.location.hash.substring(1).split("#");
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d"),
        w = canvas.width = 1500,
        h = canvas.height = 1500;

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
        obj._img.src='images/STARSHIP/0/BREAK/Lanius'+rand+'.png';
        return obj;
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
     

var Federation = {
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
        obj._img.src='images/STARSHIP/3/BREAK/Federation('+rand+').png';
        console.log(rand);
        return obj;
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

console.log(hashScoreVal);
               // our stars are created using a single array with a class of information
    var background = new Image();
        background.src="images/low_sun.png"
    var ship1 = new Image();
    ship1.src="images/Starship/0/STARSHIP0R.png"
    var ship1cloak = 0;
    var ship2 = new Image();
    ship2.src="images/Starship/3/STARSHIP3L.png"
var starCount = 10;
var FederationCount = 10;
    var FederationArray=[];
    var starArray=[];
if (hashScoreVal[0] == 0) {
    starCount = 10;
    FederationCount = 0;
    for (var i = 0; i < starCount; i++) {
        starArray.push(star.create(20,i+50,Math.random()-0.5,Math.random()-0.5));
    }
    console.log("completestar", starCount, FederationCount);
} else {
    starCount = 0;
    FederationCount = 10;
    for (var i = 0; i < FederationCount; i++) {
        FederationArray.push(Federation.create(1400,i+50,Math.random()-0.5,Math.random()-0.5));
        console.log("completefederation", starCount, FederationCount);
    }

}
           

    // moving stars around the screen and update the players movement
    function starsUpdate () {
    //ctx.drawImage(background,0,0,w,h);
    //  draw star on screen only if visible
        for (var i = 0; i < starCount; i++) {
            starArray[i].update();
            ctx.drawImage(starArray[i]._img, starArray[i]._x, starArray[i]._y, starArray[i]._width, starArray[i]._height);
            if (starArray[i]._x>w || starArray[i]._x<0) {starArray[i]._xSpeed = -starArray[i]._xSpeed}
            if (starArray[i]._y>h || starArray[i]._y<0) {starArray[i]._ySpeed = -starArray[i]._ySpeed}
        }//endFor
           
    }
    function FederationUpdate () {
    //ctx.drawImage(background,0,0,w,h);
    //  draw star on screen only if visible
        for (var i = 0; i < FederationCount; i++) {
            FederationArray[i].update();
            ctx.drawImage(FederationArray[i]._img, FederationArray[i]._x, FederationArray[i]._y, FederationArray[i]._width, FederationArray[i]._height);
            if (FederationArray[i]._x>w || FederationArray[i]._x<0) {FederationArray[i]._xSpeed = -FederationArray[i]._xSpeed}
            if (FederationArray[i]._y>h || FederationArray[i]._y<0) {FederationArray[i]._ySpeed = -FederationArray[i]._ySpeed}

        }//enFederation

           
    }
    //Our main function which clears the screens 
    //  and redraws it all again through function updates,
    //  then calls itself out again
    function main(){
        ctx.clearRect(0,0,w,h);
        ctx.drawImage(background,0,0,w,h);
        starsUpdate();
        FederationUpdate();
                if (FederationCount == 0) {
        ctx.drawImage(ship2, 1300, 40, 92, 92);
        console.log("surviv");
        } else {
        ctx.drawImage(ship1, 40, 40, 92, 92);
        console.log("surviv");
        
        } 

        requestAnimationFrame(main);
                hashScoreVal = window.location.hash.substring(1).split("#");
 $("#fuelp1").text(hashScoreVal[0]);


$("#ammop1").text(hashScoreVal[1]);
$("#fuelp2").text(hashScoreVal[2]);
$("#ammop2").text(hashScoreVal[3]);
console.log("completed");
    }
    main();
}                 
