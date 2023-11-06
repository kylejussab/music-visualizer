/*
Constructor function for Spectrum settings 
The Spectrum settings are as follows;
 - Appearance change (4 separate appearances)
*/
class SpectrumSettings
{
    constructor()
    {
        //Variables to control the position
		this.positionNumber = 1;
    }

    draw()
    {
        //If the Spectrum visualisation is selected, draw all the buttons and text for the settings menu
		if(vis.selectedVisual.name == "Spectrum" && height > 590)
		{
			fill(255);
            textAlign(LEFT);
            textSize(14);
			
			text("Position", 10, 170);
			this.position();
		}
    }

    position()
	{
		//Draws the circles, and fills them in according to which position is selected
		if(this.positionNumber == 1)
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
		else if(this.positionNumber == 2)
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
		else if(this.positionNumber == 3)
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

    positionHitCheck()
	{
		//Calculates the distance between the mouse and each button
		const d1 = dist(mouseX, mouseY, 40, 200);
		const d2 = dist(mouseX, mouseY, 70, 200);
		const d3 = dist(mouseX, mouseY, 100, 200);
		const d4 = dist(mouseX, mouseY, 130, 200);
		
		//Change the position to the button that was clicked on
		if(vis.selectedVisual.name == "Spectrum")
		{
			d1 <= 10? this.positionNumber = 1: 
			d2 <= 10? this.positionNumber = 2: 
			d3 <= 10? this.positionNumber = 3:
			d4 <= 10? this.positionNumber = 4:
			null;
		}
	}
}