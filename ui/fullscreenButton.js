//Constructor function for the fullscreen button
class FullscreenButton
{
	draw()
	{
		//Changes the colour of the fullscreen button if the colour of the ridge plot background is white
		controls.settingsButton.ridgePlotSettings.backgroundNumber == 2 && vis.selectedVisual.name == "Ridge Plot"? 
		fill(20): fill(255);

		//Change the icon when in fullscreen
		if(!fullscreen())
		{
			//Big fullscreen button with arrows facing outward
			//Top right arrow
			beginShape()
			vertex(width - 32, 17);
			vertex(width - 17, 17);
			vertex(width - 17, 32);
			vertex(width - 20, 32);
			vertex(width - 20, 21);
			vertex(width - 27, 29); 
			vertex(width - 29, 27);
			vertex(width - 22, 20);
			vertex(width - 32, 20);
			endShape(CLOSE)
	
			//Bottom left arrow
			beginShape()
			vertex(width - 43, 28);
			vertex(width - 43, 43);
			vertex(width - 28, 43);
			vertex(width - 28, 40);
			vertex(width - 39, 40);
			vertex(width - 32, 34);
			vertex(width - 34, 32);
			vertex(width - 40, 38);
			vertex(width - 40, 28);
			endShape(CLOSE)
		}
		else
		{
			//Small fullscreen button with arrows facing inward
			//Top right arrow
			beginShape()
			vertex(width - 29, 14);
			vertex(width - 29, 29);
			vertex(width - 14, 29);
			vertex(width - 14, 26);
			vertex(width - 25, 26);
			vertex(width - 18, 20);
			vertex(width - 20, 18);
			vertex(width - 26, 24);
			vertex(width - 26, 14);
			endShape(CLOSE)

			//Bottom left arrow
			beginShape()
			vertex(width - 46, 31);
			vertex(width - 31, 31);
			vertex(width - 31, 46);
			vertex(width - 34, 46);
			vertex(width - 34, 35);
			vertex(width - 41, 43); 
			vertex(width - 43, 41);
			vertex(width - 36, 34);
			vertex(width - 46, 34);
			endShape(CLOSE)
		}
	}

	hitCheck()
	{
		//Toggle fullscreen when the button is clicked
		if((mouseX > width - 43) && (mouseX < width - 17) && (mouseY > 17) && (mouseY < 43))
		{
			//If the mouse is clicked while over the fullscreen button, change to fullscreen and vice versa
			const fs = fullscreen();
			fullscreen(!fs);
		}
	}
}