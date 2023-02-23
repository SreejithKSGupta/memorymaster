let gamecards = gclass('gamecard');
let firstcard=null
let secondcard=null
let moves=0, gamescore=0,level=3,i;
let arr;
setnewgame();



function setnewgame(){
    gamescore=0;
    moves=0;
    gid("levl").innerHTML=level;
    gid('gamebody').innerHTML='';
    gid('moves').innerHTML=moves;
    setgamecardwidth();
    arr = createarray(level);
    arr = shuffle(arr);
    setgamecards(arr);
    setlistners();
}
function setgamecardwidth(){
    let gwidth = 90/level;
    document.documentElement.style.setProperty('--gamecardwidth',gwidth+'%');  
}
function createarray(level){
    let gamearray = new Array(level*2);
    for( i=0;i<level;i++){
        let num = Math.floor(Math.random()*level);
        if(gamearray.includes(num)){          
            i--;
           continue;
        }
        gamearray[i]=num;
        gamearray[i+level]=gamearray[i];
    } 
    return gamearray;
}
function shuffle(array) {
   for( i=0;i<level;i++){
       let j = Math.floor(Math.random()*level*2);
       let k = Math.floor(Math.random()*level)*2;
       let temp = array[j];
       array[j] = array[k];
       array[k] = temp;
   }
   return array;
}
function setgamecards(array){
    for(i=0;i<level*2;i++){
         var gcard='<div class="gamecard col" >' +array[i]+'</div>';
            gid('gamebody').innerHTML+=gcard;
    }
}
function setlistners(){
    for(i=0;i<gamecards.length;i++){
        gamecards[i].addEventListener('click',function(){
            console.log("firstcard");
            moves++;
            if(firstcard==null){
                this.classList.toggle('flip');
                firstcard=this;
            }
            else{
                secondcard=this;
                console.log("secondcard");
                this.classList.toggle('flip');
                if(firstcard.innerHTML==secondcard.innerHTML){
                    firstcard.style.pointerEvents = 'none';
                    secondcard.style.pointerEvents = 'none';
                    firstcard.classList.add('completed');
                    secondcard.classList.add('completed');
                    gamescore++;
                    firstcard=null;
                    secondcard=null;
                    moves=moves-2;
                    if(gamescore==level){
                        gid('gamebody').innerHTML='<div class="resultscreen col">Game Completed<div id="nextbtn" onclick="nextlevel()">Next</div></div>';
                    }
                }
                else{
                    setTimeout(function(){
                        firstcard.classList.toggle('flip');
                        secondcard.classList.toggle('flip');
                        firstcard=null;
                        secondcard=null;
                    },600);
                }
             }  
            if(moves==level*2){
                gid('gamebody').innerHTML='<div class="resultscreen col">Game Over<div id="nextbtn" onclick="setnewgame()">Try Again</div></div>';
            }
            gid('moves').innerHTML=moves;
            }                ); }}

            
function nextlevel(){
    level++;
    setnewgame();
}
function retrylevel(){
    setnewgame();
}
function gid(item){
    return document.getElementById(item);
}
function gclass(item){
    return document.getElementsByClassName(item);
}