//Constructor function for the loop button
class LoopButton
{
    constructor()
    {
       //Position variables and loop boolean
		this.x = 70;
		this.y = 120;
        this.isLoop = false;
    }

    draw()
    {
		//If loop is true, change the stroke colour to blue, otherwise make it white
		this.isLoop? stroke(4, 116, 254): stroke(255);

		//Code to draw the loop button
		strokeWeight(3)
		line(this.x, this.y, this.x + 20, this.y);
		line(this.x, this.y, this.x, this.y + 6);
		line(this.x + 20, this.y, this.x + 15, this.y - 4);
		line(this.x + 20, this.y, this.x + 15, this.y + 4);

		line(this.x + 21, this.y + 13, this.x + 21, this.y + 7);
		line(this.x + 21, this.y + 13, this.x + 1, this.y + 13);
		line(this.x + 1, this.y + 13, this.x + 6, this.y + 9);
		line(this.x + 1, this.y + 13, this.x + 6, this.y + 17);
		noStroke();
    }

    hitCheck()
    {
        //If the button is clicked on, toggle loop on and off
		if(mouseX > 70 && mouseX < 92 && mouseY > 120 && mouseY < 135)
		{
			this.isLoop = !this.isLoop			
		}
    }

}