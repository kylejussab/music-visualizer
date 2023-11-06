/*
Constructor function for the settings button
The settings button opens its own menu and has the following that are usable/visable in every visualisation:
 - A volume Slider
 - A loop button
 - A track list
There are also visualisation specific settings which only appear when vis.selectedVisual is that specific visualisation
More on what these settings do, in their corresponding file in the settings folder
*/
class SettingsButton
{
	constructor()
	{
		//The variable that handles when the menu is open or not
		this.showMenu = false;

		//Add all the buttons and sliders for the settings menu
		this.volume = new VolumeSlider();
		this.loopButton = new LoopButton();
		this.trapNationSettings = new TrapNationSettings();
		this.ridgePlotSettings = new RidgePlotSettings();
		this.noiseSettings = new NoiseSettings();
		this.wavesSettings = new WavesSettings();
		this.spectrumSettings = new SpectrumSettings();
	}
	
	draw()
	{
		//Changes the colour of the cog based on whether or not the background in RP is light or dark
		noFill();
		controls.settingsButton.ridgePlotSettings.backgroundNumber == 2 && vis.selectedVisual.name == "Ridge Plot"?
		stroke(20): stroke(255);

		//Cog drawing code
		strokeWeight(2);
		ellipse(25, 24.5, 10);
		line(23, 12, 27, 12);
		line(38, 23, 38, 27);
		line(34, 15, 36, 18);
		line(27, 12, 29, 16);
		line(29, 16, 34, 15);
		line(36, 18, 33, 22);
		line(33, 22, 38, 23);
		line(23, 37, 27, 37);
		line(13, 23, 13, 27);
		line(34, 32, 32, 34);
		line(38, 27, 33, 29);
		line(33, 29, 34, 32);
		line(32, 34, 28, 33);
		line(28, 33, 27, 37);
		line(16, 32, 18, 34);
		line(23, 37, 22, 33);
		line(22, 33, 18, 34);
		line(16, 32, 17, 29);
		line(17, 29, 13, 27);
		line(15, 18, 18, 15);
		line(13, 23, 17, 22);
		line(17, 22, 15, 18);
		line(18, 15, 21, 17);
		line(21, 17, 23, 12);
		strokeWeight(0);

		if(this.showMenu)
		{
			this.drawMenu();
		}
		else
		{
			//Hide all the sliders
			this.volume.volumeSlider.hide();
			this.noiseSettings.noiseSpeedSlider.hide();
			this.noiseSettings.noiseColumnSlider.hide();
			
		}
	}

	//If the settings button is clicked on, collapse or expand the menu
	hitCheck()
	{
		const d = dist(mouseX, mouseY, 25, 25);

		if(d < 12)
		{
			this.showMenu = !this.showMenu;
		}
	}

	//Draws the box for the menu, and all the relevant buttons and sliders
	drawMenu()
	{
		
		//The semi-transparant black rect for the menu
		fill(0, 0, 0, 200);
		height > 380? rect(0, 50, 170, height/1.5, 20): rect(0, 50, 170, height/2, 20);

		//Draws all the buttons for the menu
		this.volume.draw();
		this.loopButton.draw();
		this.trapNationSettings.draw();
		this.ridgePlotSettings.draw();
		this.noiseSettings.draw();
		this.wavesSettings.draw();
		this.spectrumSettings.draw();
		
		//Draws the track list
		if(height > 400)
		{
			fill(255);
			textAlign(LEFT);
			textSize(14);
			text("Additional help", 10, (50 + height/1.5) - 160);
			
			//Line between heading and track names
			rect(10, (50 + height/1.5) - 147, 150, 3);

			//Additional help text
			textSize(12);
			text("- Visualisation settings", 10, (50 + height/1.5) - 120);
			text("appear according to your", 10, (50 + height/1.5) - 100);
			text("window size.", 10, (50 + height/1.5) - 80);
			text("- Scrubber head only", 10, (50 + height/1.5) - 60);
			text("scrubs while song is", 10, (50 + height/1.5) - 40);
			text("playing.", 10, (50 + height/1.5) - 20);
		}
	}
}