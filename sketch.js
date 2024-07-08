let rows, columns;
let cells = [];
let cellWidth, cellHeight, numRows = 50;
let isPlay = false;
let colMode = 2;
let nCols = 4;
function setup() 
{
	frameRate(30);
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight - 4);

	background(0);

	cellWidth = height / numRows;
	rows = numRows, columns = width / cellWidth;
	let cellX = 0, cellY = 0;
	for (var i = 0; i < rows; i++) 
	{
		let row = [];
		for (var j = 0; j < columns; j++)
		{
			let status = false;
			row[j] = new Cell(cellX, cellY, status, cellWidth, rows, columns);
			row[j].view();

			cellX += cellWidth;
		}
		cells[i] = row;
		cellY += cellWidth;
		cellX = 0;
	}
	colorCells(colMode);
}

function draw()
{
	if(isPlay)
	{
		background(0);

		for (var i = 0; i < rows; i++) 
		{
			for (var j = 0; j < columns; j++)
			{
				cells[i][j].calcNeighbs(cells, i, j);
			}
		}
		for (var i = 0; i < rows; i++) 
		{
			for (var j = 0; j < columns; j++)
			{
				cells[i][j].update();
				cells[i][j].view();
			}
		}
	}
	
	if(mouseIsPressed)
	{
		for (var i = 0; i < rows; i++) 
		{
			for (var j = 0; j < columns; j++)
			{
				if(cells[i][j].clicked(mouseX, mouseY) && millis() > cells[i][j].time + 500)
				{
 					cells[i][j].time = millis();
					cells[i][j].status = !cells[i][j].status;
					cells[i][j].view();
				}
			}
		}
	}
}

function keyPressed() 
{
  	if (keyCode === 32)
   		isPlay = !isPlay;

   	if (keyCode === 86)
   		clearGame();

   	if (keyCode === LEFT_ARROW)
   	{
   		colMode = (colMode - 1 + nCols) % nCols;
   	}
   	if (keyCode === RIGHT_ARROW)
   	{
   		colMode = (colMode + 1 + nCols) % nCols;
   	}
   	if(keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)
   	{
   		colorCells(colMode);
   		for (var i = 0; i < rows; i++) 
		{
			for (var j = 0; j < columns; j++)
			{
				cells[i][j].view();
			}
		}
   	}
}

function clearGame()
{
	for (var i = 0; i < rows; i++) 
	{
		for (var j = 0; j < columns; j++)
		{
			cells[i][j].status = false;
			cells[i][j].view();
		}
	}
	isPlay = false;
}
function colorCells(colMode)
{
	for (var i = 0; i < rows; i++) 
	{
		for (var j = 0; j < columns; j++)
		{
			cells[i][j].setColor(colMode);
		}
	}
}