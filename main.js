	var ship = $('#ship');
	var moon = $('#moon');
	var monsters = $('.monster');
	var gameArea = $('#gameArea');
	var monsterImages = ["img/girlmonster.png", 
						"img/greenmonster.png", 
						"img/bluemonster.png", 
						"img/purplemonster.png"];

	//timer variabler
	var timer;
	var timerCount = 0;
	var monsterCount = 0;

$(document).ready(function(){

	//anropning av funktioner
	movingStars();
	movingMoon();
	movingMonster();
	upAndDown();
	
	timer=window.setInterval("updateTimer()", 1000);
	window.requestAnimationFrame(gameLoop);


});

function upAndDown(){
	var shipSpeed = 15;
	//tar fram nuvarnde top positionen
	var shipTop = ship.position().top;

	$(document).keydown(function(e) {

		//Up Arrow ökar positionen med 1 px
		if(e.keyCode == 38) {
			shipTop -= shipSpeed;
			ship.css({'top': shipTop + 'px'}).animate('easing', 'linear');
			crashRoof(ship, gameArea);	
		}

		//Down Arrow minskar positionen med 1 px
		else if(e.keyCode == 40) {
			shipTop += shipSpeed;
			ship.css({'top': shipTop + 'px'});
			crashFloor(ship, gameArea);
		}
	});
}
function crashMonster(monster) {
	//kollar vart fronten på skeppet är i för position
	var shipWidth = $(ship).width();
	var shipFront = ship.position().left + shipWidth;

	if($(monster).position().left <= shipFront) {
		console.log(isCollide(rect(ship), rect(monster)));	
	}
}

//startar om monstret med ny position och bild
function hitWall(monster) {
	randomStart();
	var wall = -150;
	if($(monster).position().left <= wall) {
		$(monster).stop(monster).css('left', '1650px');
		console.log('wall');	
		movingMonster();
	}
}



//GameOver om man crashar i taket
function crashRoof() {
	//hämtar topvärdet på skeppet
	var shipTop = ship.position().top;
	//hämtar topvärdet på spelytan
	var gameAreaTop = gameArea.position().top;

	if(shipTop <= gameAreaTop) {
		clearInterval(timer);
		console.log("game over");
	}
}

//GameOver om man crashar i golvet
function crashFloor() {
	//hämtar topvärdet på skeppet
	var shipTop = ship.position().top;
	//hämtar höjden på skeppet
	var shipHeight = ship.height();
	//hämtar topvärdet på spelytan
	var gameAreaTop = gameArea.position().top;
	//hämtar höjden på spelytan
	var gameAreaHeight = gameArea.height();

	var shipBottom = shipHeight + shipTop;
	var gameAreaBottom = gameAreaHeight + gameAreaTop;

	if(shipBottom >= gameAreaBottom) {
		clearInterval(timer);
		console.log("game over");
	}
}

//stjärnorna rör sig från höger till vänster
function movingStars() {
	$(function(){
        var x = 0;
        setInterval(function(){
            x -= 1;
            $('#gameArea').css('background-position', x + 'px 0');
        }, 5);
    })    
}

function updateTimer() {
	timerCount++;

	var time = "";
	var minutes = Math.floor(timerCount/60);

	if(minutes < 10) {
		time = "Time " + "0" + minutes + ":";
	}
	else {
		time = "Time " + minutes + ":";
	}

	var seconds = timerCount - (minutes*60);
	if(seconds < 10) {
		time += "0" + seconds;
	}
	else {
		time += seconds;
	}

	$('#timer').html(time);
}

function updateCounter() {
	monsterCount++;
}

//månen rör sig från höger till vänster
function movingMoon() {
	$(function(){
        var x = 0;
        setInterval(function(){
            x -= 1;
            $('#moon').css('background-position', x + 'px 0');
        }, 40);
    })    
}
/*function movingMoon() {
	randomPosition();
	$(function(){
        var x = 0;
        setInterval(function(){       	
            x -= 1;
            $('#moon').css('background-position-x', x + 'px');
            var xPos = $("#moon").css('background-position-x');
            xPos = xPos.replace("px", "");
            console.log(xPos);
            if(xPos%1300 == 0) {
            	console.log("update");
            	$('#moon').css('top', (Math.random() * 500) + 'px');
            }
        }, 5);

    });
    
}*/

//divar får ny position varje gång den uppdateras
function randomPosition(div) {
	gaTop = $('#gameArea').offset().top;  // gameArea top
	gaHeight = $('#gameArea').height();   // gameArea height
	
	$(div).each(function() {
	   	dragheight = $(this).height(); //your draggable height
	   	randomtop = gaTop + Math.floor((Math.random() * (gaHeight - dragheight))+1);
	  
	   		$(this).css({'top':randomtop});
	});
}


//slumpar ut monster i div
function randomMonsters(monster){
    randomMonster = Math.floor((Math.random() * monsterImages.length));
    $(monster).css('background-image', 'url("' + monsterImages[randomMonster] + '")');
	randomPosition(monster);
}

/*function randomStart() {
	var randomDiv = Math.floor(Math.random() * 100);
	var randomDivStart = monsterImages[Math.floor(Math.random()*monsterImages.length)];
	

	var div ="<div class='monster'></div>";
	var $div = $(div);
	var totalHits = 0;



var game = setInterval(function(){
    time = time + 3;
    
    for(i=0;i<5;i++){
       
    var numLeft = Math.floor(Math.random()*300);
    var colorRand = colors[Math.floor(Math.random()*colors.length)];
        
        var cloneDiv = $div.clone(true);
        cloneDiv.css({
            "background-image":monsterImages,
            "bottom":-numBottom,
            "left":numLeft
        }).appendTo("#monster1");
        
        cloneDiv.animate({
            bottom:"700px"
        },20000,function(){
            cloneDiv.remove();
        });
}
*/

//monstret rör sig från höger till vänster
function movingMonster() {
	$.each(monsters, function(index, monster){
		randomMonsters(monster);
		$(monster).animate({left:'-200px'}, 10000);
	});
}

// kollar om två divar kolliderar
function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

// ger divarna en numrär position
function rect(obj) {
  return {
    x : parseInt($(obj).css('left')),
    y : parseInt($(obj).css('top')),
    width : $(obj).width(),
    height : $(obj).height()
  };
}
function gameLoop() {
	$.each(monsters, function(index, monster){
		
		crashMonster(monster);
		hitWall(monster);
		
  		//resetMonster(monster);
	});
  	
 	window.requestAnimationFrame(gameLoop);
}

/*function resetMonster() {
	var monsterWidth = $(monster) 

}*/



