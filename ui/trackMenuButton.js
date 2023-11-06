//Constructor function for the visualisation menu button
class TrackMenuButton extends Button
{
	constructor()
	{
		super();

		//All the variabes needed
		this.buttonOffset;
		this.open = false;
		this.ID = 0;
		this.hoverOver = false;
	}

	posUpdate()
	{
		//Adjust the position when the window is resized
		this.buttonOffset = (width * 0.32)
		this.y = height - 45;
	}

	draw()
	{
		//Call the draw function from the parent Button constructor
		super.draw();

		if(width > 1000)
		{
			if(!this.open)
			{
				//Closed (Arrow point upwards)
				beginShape();
				vertex(width/2 - this.buttonOffset, this.y);
				vertex(width/2 - this.buttonOffset + 15, this.y - 15);
				vertex(width/2 - this.buttonOffset + 30, this.y);
				vertex(width/2 - this.buttonOffset + 27, this.y + 3);
				vertex(width/2 - this.buttonOffset + 15, this.y - 9);
				vertex(width/2 - this.buttonOffset + 3, this.y + 3);
				endShape(CLOSE);
			}
			else
			{
				//Open (Arrow point downwards)
				beginShape();
				vertex(width/2 - this.buttonOffset, this.y - 13);
				vertex(width/2 - this.buttonOffset + 15, this.y + 2);
				vertex(width/2 - this.buttonOffset + 30, this.y - 13);
				vertex(width/2 - this.buttonOffset + 27, this.y - 16);
				vertex(width/2 - this.buttonOffset + 15, this.y - 4);
				vertex(width/2 - this.buttonOffset + 3, this.y - 16);
				endShape(CLOSE);

				//Draw the menu
				fill(0, 0, 0, 200)
				rect((width * 0.32) - 100, height - 240, 180, 130, 20);
				//Draws out all visualisation names when the menu is open
				for(let [i, e] of tracks.entries())
				{
					textSize(14);
					fill(255);
					text([i + 1] + ") " + e.name, 
						(width * 0.32) - 90, 
						(height - 210) + i * 20);
				}
		
				//When the menu is drawn, allow the clicks to change the visualisation
				this.click();			
			}
		}
	}

	hitCheck()
	{
		if(width > 1000)
		{
			if((mouseX > (width/2 - this.buttonOffset)) 
			&& (mouseX < (width/2 - this.buttonOffset + 30)) 
			&& (mouseY > this.y - 15) 
			&& (mouseY < this.y + 3))
			{
				//If the button was clicked, change whether the menu is open or not
				this.open = !this.open;
				return true;
			}
				return false;
			}	
	}

	click()
	{
		//Check if the mouse is over a visualisation name, and set this.ID to the visualisation the mouse is over
		if(mouseX > (width * 0.32) - 90 
			&& mouseX < (width * 0.32) + 5 
			&& mouseY > (height - 220) 
			&& mouseY < (height - 206))
		{
			this.hoverOver = true;
			this.ID = 0;
		}
		else if(mouseX > (width * 0.32) - 90 
				&& mouseX < (width * 0.32) + 5 
				&& mouseY > (height - 200) 
				&& mouseY < (height - 186))
		{
			this.hoverOver = true;
			this.ID = 1;
		}
		else if(mouseX > (width * 0.32) - 90 
				&& mouseX < (width * 0.32) + 5 
				&& mouseY > (height - 180) 
				&& mouseY < (height - 166))
		{
			this.hoverOver = true;
			this.ID = 2;
		}
		else if(mouseX > (width * 0.32) - 90 
				&& mouseX < (width * 0.32) + 5 
				&& mouseY > (height - 160) 
				&& mouseY < (height - 146))
		{
			this.hoverOver = true;
			this.ID = 3;
		}
		else if(mouseX > (width * 0.32) - 90 
				&& mouseX < (width * 0.32) + 5 
				&& mouseY > (height - 140) 
				&& mouseY < (height - 126))
		{
			this.hoverOver = true;
			this.ID = 4;
		}
		else
		{
			this.hoverOver = false;
		}
	}
}