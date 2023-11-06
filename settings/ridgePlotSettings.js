/*
Constructor function for Ridge Plot settings 
The Ridge Plot settings are as follows;
 - Background change (2 separate backgrounds)
 - Colour option (Toggle whether or not you want it to fill with colour)
*/
class RidgePlotSettings
{
    constructor()
    {
        //Variables to control background and colour options
		this.backgroundNumber = 1;
        this.colour = true;
    }

    draw()
    {
        //If the Ridge Plot visualisation is selected, draw all the buttons and text for the settings menu
		if(vis.selectedVisual.name == "Ridge Plot" && height > 590)
		{
			fill(255);
            textAlign(LEFT);
            textSize(14);
			
			text("Background", 10, 170);
			this.ridgePlotBackground();
			text("Colour", 10, 250);
			this.ridgePlotColour();
		}
    }

    ridgePlotBackground()
	{
		//Draws the circles, and fills them in according to which background is selected
		if(this.backgroundNumber == 1)
		{
			fill(255);
			ellipse(70, 200, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(100, 200, 20);
			noStroke();
			fill(255);
		}
		else
		{
			fill(255);
			ellipse(100, 200, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(70, 200, 20);
			noStroke();
			fill(255);
		}
	}

    backgroundHitCheck()
	{
		//Calculates the distance between the mouse and each button
		const d1 = dist(mouseX, mouseY, 70, 200);
		const d2 = dist(mouseX, mouseY, 100, 200);
		
		//Change the background to the button that was clicked on
		if(vis.selectedVisual.name == "Ridge Plot")
		{
			d1 <= 10? this.backgroundNumber = 1:
			d2 <= 10? this.backgroundNumber = 2:
			null;
		}
	}

    ridgePlotColour()
	{
		//Draws the square, and fills it according to whether colour is on or off
		if(!this.colour)
		{
			noFill();
			stroke(255);
			strokeWeight(2);
			rect(65, 235, 20, 20);
			noStroke();
			fill(255);
		}
		else
		{
			fill(255);
			rect(65, 235, 20, 20);
		}
	}

    colourHitCheck()
	{
		//Toggles the colour when the button is clicked on
		if(mouseX > 65 && mouseX < 85 && mouseY > 235 && mouseY < 255)
		{
			this.colour = !this.colour;
		}
	}
}