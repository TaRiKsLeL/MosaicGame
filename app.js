var hp = 3;
var score =0;

let mosaicIndex=0;
let playedAlready=[];
let mosaicsDataBase = [];

var mosaicData= {
	rowsData:[],		// Дані про довжину послідовностей в рядку
	colsData:[],		// Дані про довжину послідовностей в колонці
	mosaicHidden: [],	// Мета
	mosaicOnScreen: [],	// Те, що на екрані
	amountToFind:0		// Кількість одиничок, яка залишилась
}

function fillMosaicData(){

	do{
		mosaicIndex = Math.floor(Math.random()*mosaicsDataBase.length);
	}while(playedAlready.includes(mosaicIndex));

	mosaicData.mosaicHidden = mosaicsDataBase[mosaicIndex];

	//Рахую кількість елементів, які потрібно знайти 
	mosaicData.amountToFind = mosaicData.mosaicHidden.reduce(function(count, arr){
		return count+=(arr.filter(element=>element===1)).length;
	},0);

	let arr = mosaicData.mosaicHidden;

	// Збираємо інформацію по довжину послідовностей в рядках і заносимо в масив
	let inRowCounter=0;

	for(let i=0;i<arr.length;i++){
		inRowCounter=0;
		mosaicData.rowsData[i]=[];
		for(let j=0;j<arr[0].length;j++){
			if(arr[i][j]===1){
				inRowCounter++;
			}else{
				if(inRowCounter!==0){
					mosaicData.rowsData[i].push(inRowCounter);
					inRowCounter=0;
				}
			}
			if(j+1===arr[0].length && inRowCounter!==0){
				mosaicData.rowsData[i].push(inRowCounter);
				inRowCounter=0;
			}
		}
	}

	// Збираємо інформацію по довжину послідовностей в колонках і заносимо в масив
	let inColCounter=0;

	for(let i=0;i<arr.length;i++){
		inRowCounter=0;
		mosaicData.colsData[i]=[];
		for(let j=0;j<arr[0].length;j++){
			if(arr[j][i]===1){
				inColCounter++;
			}else{
				if(inColCounter!==0){
					mosaicData.colsData[i].push(inColCounter);
					inColCounter=0;
				}
			}
			if(j+1===arr[0].length && inColCounter!==0){
				mosaicData.colsData[i].push(inColCounter);
				inColCounter=0;
			}
		}
	}
}

function initMosaicOnScreen(){

	for(let i=0;i<mosaicData.mosaicHidden.length;i++){
		mosaicData.mosaicOnScreen[i]=[];
		for(let j=0;j<mosaicData.mosaicHidden[0].length;j++){
			mosaicData.mosaicOnScreen[i][j]=0;
		}
	}
}

function createTable(){

	let tableFragment = document.createDocumentFragment();
	let tableTopRow = document.createElement('tr');
	tableTopRow.appendChild(document.createElement('td'));
	for(let i=0;i<=mosaicData.colsData.length;i++){
		if(typeof mosaicData.colsData[i] !== "undefined"){
			let tableData = document.createElement('td');
			let rangesInCol = mosaicData.colsData[i];//.reduce(function(res,elem){return res += elem+" ";},"");
			tableData.classList.add('table-num');
			tableData.classList.add('border-radius-top');
			tableData.innerHTML = rangesInCol;
			tableTopRow.appendChild(tableData);
		}
	}

	tableFragment.appendChild(tableTopRow);

	for(let i=0;i<mosaicData.mosaicOnScreen.length;i++){

		let tableRow = document.createElement('tr');
		let tableData = document.createElement('td');
		let rangesInRow = mosaicData.rowsData[i].reduce(function(res,elem){return res += elem+" ";},"");
		tableData.classList.add('table-num');
		tableData.classList.add('border-radius-left');
		tableData.innerHTML = rangesInRow;
		tableRow.appendChild(tableData);

		for(let j=0;j<mosaicData.mosaicOnScreen[0].length;j++){
			let tableData = document.createElement('td');
			tableData.classList.add('table-mosaic-cell');
			tableData.addEventListener("click",clicked);
			mosaicData.mosaicOnScreen[i][j] = tableData;
			
			if(i+1===mosaicData.mosaicOnScreen.length && j+1===mosaicData.mosaicOnScreen[0].length){
				tableData.classList.add('border-right-bottom-corner');
			}

			tableRow.appendChild(tableData);
		}
		tableFragment.appendChild(tableRow);
	}
	
	$("#field").addClass("animate__animated");
	$("#field").addClass("animate__fadeInDown");
	$("#field").append(tableFragment);
}

function clicked(){
	let rInd=this.parentNode.rowIndex-1;
	let cInd=this.cellIndex-1;

	//Якщо елемент вже був нажатий, включити анімацію і вийти з функції
	if(mosaicData.mosaicOnScreen[rInd][cInd].classList.contains('painted') ||
	mosaicData.mosaicOnScreen[rInd][cInd].classList.contains('mis-painted')){
		mosaicData.mosaicOnScreen[rInd][cInd].classList.remove("animate__fadeIn");
		mosaicData.mosaicOnScreen[rInd][cInd].classList.toggle("animate__headShake");
		console.log(mosaicData.mosaicOnScreen[rInd][cInd].classList);
		return;
	}
	 
	if(mosaicData.mosaicHidden[rInd][cInd]==1){
		mosaicData.mosaicOnScreen[rInd][cInd].classList.add('painted');
		mosaicData.amountToFind--;

		if(mosaicData.amountToFind===0){
			hp=3;
			score++;

			playedAlready.push(mosaicIndex);
			if(mosaicsDataBase.length===score){
				alert("WIN! Який молодець ;)");

				return;
			}
			$(".hp").html(`♥ ${hp}`);
			$(".score").html(`Розгадано мозаїк: ${score}/${mosaicsDataBase.length}`);
			nextMap();
		}

	}else{
		mosaicData.mosaicOnScreen[rInd][cInd].classList.add('mis-painted');
		--hp;

		if(hp===0){
			nextMap();
			alert("ОЙ. Прийдеться cпочатку");
			hp=3;
			score=0;
			$(".score").html(`Розгадано мозаїк: ${score}/${mosaicsDataBase.length}`);
		}
		$(".hp").html(`♥ ${hp}`);
	}
	mosaicData.mosaicOnScreen[rInd][cInd].classList.add("animate__animated");
	mosaicData.mosaicOnScreen[rInd][cInd].classList.add("animate__fadeIn");

}

$('input[type="range"]').on('input',function changeCellsSize(){
	$('.table-mosaic-cell, .table-num').css('width',$(this).val());
	$('.table-mosaic-cell, .table-num').css('height',$(this).val());
});

function nextMap(){
	mosaicData.rowsData=[];
	mosaicData.colsData=[];
	mosaicData.mosaicHidden = [];
	mosaicData.mosaicOnScreen = [];
	mosaicData.amountToFind = 0;

	$('#field').empty();
	fillMosaicData();
	initMosaicOnScreen();
	createTable();
}

function restartGame(){
	hp=0;
	score=0;
	playedAlready=[];
	nextMap();
}

const initialTODO = async (jsonFile) => {		
	const response = await fetch(jsonFile);
	mosaicsDataBase = await response.json();
	fillMosaicData();
	initMosaicOnScreen();
	createTable();
}
	
initialTODO('mosaics.json');
	


