var cols = 4;
var rows = 5;

var field = document.getElementById('field');

var mosaicData= {
	rowsData:[],		// Дані про довжину послідовностей в рядку
	colsData:[],		// Дані про довжину послідовностей в колонці
	mosaicHided: [],	// Мета
	mosaicOnScreen: []	// Те, що на екрані
}


function generateMosaic(cols, rows){
	mosaicData.mosaicHided = [
		[1,1,1,0,1],
		[1,0,1,1,1],
		[1,1,0,1,1],
		[0,0,0,1,1],
		[1,0,1,0,0]
	];

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
			//let cellTD = document.createElement()
			//mosaicData.mosaicOnScreen[i][j]= 
		}
	}
}

function createTable(){

	let tableFragment = document.createDocumentFragment();
	let tableTopRow = document.createElement('tr');
	for(let i=0;i<=mosaicData.rowsData.length;i++){
		let tableData = document.createElement('td');
		let rangesInRow = mosaicData.rowsData[i].reduce((res,elem)=>(res+=elem+" "),"");
		tableData.classList.add('table-num');
		tableData.innerHTML = rangesInRow;
		tableTopRow.appendChild(tableData);
	}

	tableFragment.appendChild(tableTopRow);


}

generateMosaic(5,5);
initMosaicOnScreen()
console.log(mosaicData.colsData);
