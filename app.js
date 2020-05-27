var cols = 4;
var rows = 5;

var hp = 3;
var score =0;
var gameOver = false;

var tableFragment; 

var mosaicData= {
	rowsData:[],		// Дані про довжину послідовностей в рядку
	colsData:[],		// Дані про довжину послідовностей в колонці
	mosaicHided: [],	// Мета
	mosaicOnScreen: [],	// Те, що на екрані
	amountToFind:0		// Кількість одиничок, яка залишилась
}


function generateMosaic(cols, rows){
	mosaicData.mosaicHided = [
		[1,1,1,0,1],
		[1,0,1,1,1],
		[1,1,0,1,1],
		[0,0,0,1,1],
		[1,0,1,0,0]
	];

	mosaicData.amountToFind = mosaicData.mosaicHided.reduce(function(count, arr){
		return count+=(arr.filter(element=>element===1)).length;
	},0);

	console.log(mosaicData.amountToFind);

	let arr = mosaicData.mosaicHided;

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

	for(let i=0;i<mosaicData.mosaicHided.length;i++){
		mosaicData.mosaicOnScreen[i]=[];
		for(let j=0;j<mosaicData.mosaicHided[0].length;j++){
			mosaicData.mosaicOnScreen[i][j]=0;
		}
	}
}

function createTable(){

	tableFragment = document.createDocumentFragment();
	let tableTopRow = document.createElement('tr');
	tableTopRow.appendChild(document.createElement('td'));
	for(let i=0;i<=mosaicData.colsData.length;i++){
		if(typeof mosaicData.colsData[i] !== "undefined"){
			let tableData = document.createElement('td');
			let rangesInCol = mosaicData.colsData[i];//.reduce(function(res,elem){return res += elem+" ";},"");
			tableData.classList.add('table-num');
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
		tableData.innerHTML = rangesInRow;
		tableRow.appendChild(tableData);

		for(let j=0;j<mosaicData.mosaicOnScreen[0].length;j++){
			let tableData = document.createElement('td');
			tableData.classList.add('table-mosaic-cell');
			tableData.addEventListener("click",clicked);
			mosaicData.mosaicOnScreen[i][j] = tableData;
			
			tableRow.appendChild(tableData);
		}
		tableFragment.appendChild(tableRow);
	}

	$("#field").append(tableFragment);
}

function clicked(){
	let rInd=this.parentNode.rowIndex-1;
	let cInd=this.cellIndex-1;

	if(mosaicData.mosaicHided[rInd][cInd]==1){
		mosaicData.mosaicOnScreen[rInd][cInd].classList.toggle('painted');
		mosaicData.amountToFind--;

		if(mosaicData.amountToFind===0){
			$(".score").html(++score);
		}

	}else{
		mosaicData.mosaicOnScreen[rInd][cInd].classList.toggle('mis-painted');
		$(".hp").html(--hp);

		if(hp===0){
			gameOver=true;
		}
	}
	mosaicData.mosaicOnScreen[rInd][cInd].classList.add("animate__animated");
	mosaicData.mosaicOnScreen[rInd][cInd].classList.add("animate__fadeIn");

}


generateMosaic(5,5);
initMosaicOnScreen()
createTable();
