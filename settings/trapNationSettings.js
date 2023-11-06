/*
Constructor function for the Trap Nation settings function
The Trap Nation settings are as follows;
 - Background change (4 separate backgrounds)
 - Cycle background button (cycles through all 4 backgrounds)
*/
class TrapNationSettings
{
    constructor()
    {
        //Variables to control background and cycle options
		this.backgroundNumber = 1;
        this.cycleBackground = false;
		this.appearanceNumber = 1;
		this.appearanceColour = false;
    }

    draw()
    {
        //If the Trap Nation visualisation is selected, draw all the buttons and text for the settings menu
		if(vis.selectedVisual.name == "Trap Nation")
		{
			fill(255);
            textAlign(LEFT);
            textSize(14);
            
			if(height > 590)
			{
				text("Background", 10, 170);
				this.trapNationBackground();
				text("Cycle background", 10, 250);
				this.cycleThrough();
			}
			if(height > 700)
			{
				text("Appearance", 10, 295);
				this.appearance();
			}
			if(height > 750 && this.appearanceNumber == 2)
			{
				text("Fill", 10, 370);
				this.appearanceFill();
			}
		}
    }

    trapNationBackground()
	{
		//Draws the circles, and fills them in according to which background is selected
		if(this.backgroundNumber == 1)
		{
			fill(255);
			ellipse(40, 200, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(70, 200, 20);
			ellipse(100, 200, 20);
			ellipse(130, 200, 20);
			noStroke();
			fill(255);
		}
		else if(this.backgroundNumber == 2)
		{
			fill(255);
			ellipse(70, 200, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(40, 200, 20);
			ellipse(100, 200, 20);
			ellipse(130, 200, 20);
			noStroke();
			fill(255);
		}
		else if(this.backgroundNumber == 3)
		{
			fill(255);
			ellipse(100, 200, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(40, 200, 20);
			ellipse(70, 200, 20);
			ellipse(130, 200, 20);
			noStroke();
			fill(255);
		}
		else
		{
			fill(255);
			ellipse(130, 200, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(40, 200, 20);
			ellipse(70, 200, 20);
			ellipse(100, 200, 20);
			noStroke();
			fill(255);
		}
	}

    backgroundHitCheck()
	{
		//Calculates the distance between the mouse and each button
		const d1 = dist(mouseX, mouseY, 40, 200);
		const d2 = dist(mouseX, mouseY, 70, 200);
		const d3 = dist(mouseX, mouseY, 100, 200);
		const d4 = dist(mouseX, mouseY, 130, 200);
		
		//Change the background to the button that was clicked on
		//If cycleBackground was on, turn it off
		if(vis.selectedVisual.name == "Trap Nation")
		{
			d1 <= 10? this.backgroundNumber = 1: 
			d2 <= 10? this.backgroundNumber = 2: 
			d3 <= 10? this.backgroundNumber = 3:
			d4 <= 10? this.backgroundNumber = 4:
			null;
		}
	}

    cycleThrough()
	{
		//Draws the square, and fills it according to whether cycle is on or off
		if(!this.cycleBackground)
		{
			noFill();
			stroke(255);
			strokeWeight(2);
			rect(135, 235, 20, 20);
			noStroke();
			fill(255);
		}
		else
		{
			fill(255);
			rect(135, 235, 20, 20);
		}
	}

    cycleHitCheck()
	{
		//Toggles the cycle when the button is clicked on
		if(mouseX > 135 && mouseX < 155 && mouseY > 235 && mouseY < 255)
		{
			this.cycleBackground = !this.cycleBackground;
		}
	}

	appearance()
	{
		//Draws the circles, and fills them in according to which appearance is selected
		if(this.appearanceNumber == 1)
		{
			fill(255);
			ellipse(70, 325, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(100, 325, 20);
			noStroke();
			fill(255);
		}
		else
		{
			fill(255);
			ellipse(100, 325, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(70, 325, 20);
			noStroke();
			fill(255);
		}
	}

	appearanceHitCheck()
	{
		//Calculates the distance between the mouse and each button
		const d1 = dist(mouseX, mouseY, 70, 325);
		const d2 = dist(mouseX, mouseY, 100, 325);

		//Change the appearance to the button that was clicked on
		if(vis.selectedVisual.name == "Trap Nation")
		{
			d1 <= 10? this.appearanceNumber = 1: 
			d2 <= 10? this.appearanceNumber = 2: 
			null;
		}
	}

	appearanceFill()
	{
		//Draws the square, and fills it according to whether fill is on or off
		if(!this.appearanceColour)
		{
			noFill();
			stroke(255);
			strokeWeight(2);
			rect(40, 355, 20, 20);
			noStroke();
			fill(255)
		}
		else
		{
			fill(255);
			rect(40, 355, 20, 20);
		}
	}

	appearanceFillHitCheck()
	{
		//Toggles the fill when the button is clicked on
		if(mouseX > 40 && mouseX < 60 && mouseY > 355 && mouseY < 375)
		{
			this.appearanceColour = !this.appearanceColour;
		}
	}
}