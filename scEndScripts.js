// StarCatcher Scripts for the game made by Soft Dev 2117
    // when the web page window loads up, the game scripts will be read
    
window.onload = function() {

      
//Main___________________________________________________________________________________________________
    function main(){
        hashScoreVal = window.location.hash.substring(1).split("#");
 $("#fuelp1").text(hashScoreVal[0]);


$("#ammop1").text(hashScoreVal[1]);
$("#fuelp2").text(hashScoreVal[2]);
$("#ammop2").text(hashScoreVal[3]);
console.log("completed");
    }  
    main();

    
} //close window.onload            


