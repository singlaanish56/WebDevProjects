var numsquares=6;
var colors =[];
var goal;


var squares = document.querySelectorAll(".sqaure");
var colodis = document.getElementById("colo");
var message = document.getElementById("message");
var h1=document.querySelector("h1");
var resetbtn = document.querySelector("#newcolor");
var esybtn = document.querySelector("#easybtn");
var hrdbtn = document.querySelector("#hardbtn");
var modebtns = document.querySelectorAll(".mode");

init();

function init(){
	setmodebtn();
	setupsquares();
	reset();
}

function setmodebtn(){
	for(var i=0;i<modebtns.length;i++){
	modebtns[i].addEventListener("click",function(){
	modebtns[1].classList.remove("selected");
	modebtns[0].classList.remove("selected");
	this.classList.add("selected");	
	numsquares = (this.textContent === "Easy") ? 3 : 6;
	reset();
	});
}
}

function setupsquares(){
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click",function(){
		var clickedcolor = this.style.backgroundColor;

		if(clickedcolor === goal){
			message.textContent="CORRECT!";
			resetbtn.textContent="Play Again";
			changecolors(clickedcolor);
			colodis.textContent=goal;
			h1.style.backgroundColor=goal;
		}
		else{
			message.textContent="TRY AGAIN";
			this.style.backgroundColor="#232323";
		}


			});
		}

}	

function reset(){
	colors=genraterndmcolor(numsquares);
	goal=rndm();
	colodis.textContent=goal;
	resetbtn.textContent="New COLOR";
	message.textContent="";
	for(var i=0;i<squares.length;i++){
		if(colors[i]){
		squares[i].style.display="block";
		squares[i].style.backgroundColor=colors[i];
		}
		else{
			squares[i].style.display="none";
		}
	}

	h1.style.backgroundColor="steelblue";
}


resetbtn.addEventListener("click",function(){
	reset();
});


function changecolors(color){
	for(var i=0;i<squares.length;i++){
		squares[i].style.backgroundColor=color;

	}
}

function rndm(){
	var random = Math.floor((Math.random() * (colors.length)));
	return colors[random];
}

function genraterndmcolor(num){
	var arr = []
	for(var i=0 ; i < num; i++){
		arr.push(rndmcolor());
	}
	return arr;
}

function rndmcolor(){
	var red = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	var blue = Math.floor(Math.random()*256);

	return "rgb("+red+", "+green+", "+blue+")" ;
}