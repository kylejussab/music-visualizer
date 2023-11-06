/*
Constructor function for the Waves settings function
The Waves settings are as follows;
 - Colour change (3 separate colours)
*/
class WavesSettings
{
    constructor()
    {
        //Variable to control the colour options
		this.colourNumber = 3;
    }

    draw()
    {
        //If the Waves visualisation is selected, draw all the buttons and text for the settings menu
		if(vis.selectedVisual.name == "Waves" && height > 590)
		{
			fill(255);
            textAlign(LEFT);
            textSize(14);
            
            text("Colour", 10, 170);
			this.wavesColour();
		}
    }

    wavesColour()
	{
		//Draws the circles, and fills them in according to which colour is selected
		if(this.colourNumber == 1)
		{
			fill(255);
			ellipse(55, 200, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(85, 200, 20);
			ellipse(115, 200, 20);
			noStroke();
			fill(255);
		}

		else if(this.colourNumber == 2)
		{
			fill(255);
			ellipse(85, 200, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(55, 200, 20);
			ellipse(115, 200, 20);
			noStroke();
			fill(255);
		}

		else
		{
			fill(255);
			ellipse(115, 200, 20);
			noFill();
			strokeWeight(2);
			stroke(255)
			ellipse(55, 200, 20);
			ellipse(85, 200, 20);
			noStroke();
			fill(255);
		}
	}

    colourHitCheck()
	{
		//Calculates the distance between the mouse and each button
		const d1 = dist(mouseX, mouseY, 55, 200);
		const d2 = dist(mouseX, mouseY, 85, 200);
		const d3 = dist(mouseX, mouseY, 115, 200);
		
		//Change the colour to the button that was clicked on
		if(vis.selectedVisual.name == "Waves")
		{
			d1 <= 10? this.colourNumber = 1:
			d2 <= 10? this.colourNumber = 2:
			d3 <= 10? this.colourNumber = 3:
			null;
		}
	}
}