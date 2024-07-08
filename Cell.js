class Cell 
{
 	constructor(cellX, cellY, status, cellWidth, numRows, columns) 
 	{
 		this.cellX = cellX;
 		this.cellY = cellY;
 		this.status = status;
 		this.cellWidth = cellWidth;
 		this.numRows = numRows;
 		this.columns = columns;
 		this.nextStatus = this.status;
 		this.time = 0;
 		this.fillCol = color(255);
 		this.strokeCol = color(255);
 		this.fillDeadCol = color(0);
  	}
  	view()
  	{
  		strokeWeight(0.1);
  		stroke(this.strokeCol);
  		if(this.status)
  		{
			//fill(70, 144, 225);
			fill(this.fillCol);
			square(this.cellX, this.cellY, this.cellWidth, 3);
  		}
  		else
  		{
  			fill(this.fillDeadCol);
  			square(this.cellX, this.cellY, this.cellWidth);
  		}
  	}
  	calcNeighbs(cells, i, j)
  	{
  		this.neighbs = 0; 

  		if(i > 0)
  		{
  			if(j > 0 && cells[i - 1][j - 1].status)
  				this.neighbs++;
  			if(cells[i - 1][j].status)
  				this.neighbs++;
  			if(j < this.columns - 1 && cells[i - 1][j + 1].status)
  				this.neighbs++;
  		}
  		if(j < this.columns - 1)
		{
  			if(cells[i][j + 1].status)
  				this.neighbs++;
  			if(i < this.numRows - 1 && cells[i + 1][j + 1].status)
  				this.neighbs++;
  		}
  		if(i < this.numRows - 1)
  		{
  			if(cells[i + 1][j].status)
  				this.neighbs++;
  		}
  		if(j > 0)
  		{
  			if(i < this.numRows - 1 && cells[i + 1][j - 1].status)
  				this.neighbs++;
  			if(cells[i][j - 1].status)
  				this.neighbs++;
  		}
 	}
 	update()
 	{
  		if(this.status)
  		{
  			if(!(this.neighbs == 2 || this.neighbs == 3))
  				this.status = false;
  		}
  		else
  		{
  			if(this.neighbs == 3)
  				this.status = true;
  		}
 	}
 	clicked(x, y)
 	{
 		if(x > this.cellX && y > this.cellY && x < this.cellX + 
 			cellWidth && y < this.cellY + cellWidth)
 			return true;
 		else
 			return false;
 	}
 	setColor(colMode)
 	{
 		switch (colMode) {
 			case 0:
 				this.fillCol = color(0, random(255), random(255));
 				this.strokeCol = color(255);
 				this.fillDeadCol = color(0);
 				break;
 			case 1:
 				this.fillCol = color(random(255), 0, random(255));
 				this.strokeCol = color(255);
 				this.fillDeadCol = color(0);
 				break;
 			case 2:
 				this.fillCol = color(255);
 				this.strokeCol = color(255);
 				 this.fillDeadCol = color(0);
 				break;
 			case 3:
 				this.fillCol = color(0);
 				this.strokeCol = color(0);
 				this.fillDeadCol = color(255);
 				break;
 		}
 	}
}