//Handles the onscreen menu, keyboard and mouse controls
class ControlsAndInput
{
	constructor()
	{
		//Make all new buttons, from all ui constructor functions
		this.playbackButton = new PlaybackButton(20);
		this.visMenuButton = new VisMenuButton();
		this.trackMenuButton = new TrackMenuButton();
		this.fullscreenButton = new FullscreenButton();
		this.settingsButton = new SettingsButton();
		this.scrubber = new Scrubber();
		this.prevButton = new PrevButton(15);
		this.nextButton = new NextButton(15);
	}

	//Draws UI and buttons
	draw()
	{
		push();

		//Sets the fill colour to a transparant black for the main rectangle
		fill(0, 0, 0, 200)
		noStroke();
		
		//Center rectangle hosts the playback button, scrubber, next and previous buttons, track and visualisation text, and visualistaion menu button
		rect(width * (width/10000), 
			height - 110, 
			(width - (width * (width/10000)*2)), 
			height, 30);

		//Draws all buttons
		this.playbackButton.draw();
		this.fullscreenButton.draw();
		this.settingsButton.draw();
		this.scrubber.draw();
		this.visMenuButton.draw();
		this.trackMenuButton.draw();
		this.prevButton.draw();
		this.nextButton.draw();

		//Set the fill colour back to white
		fill(255);

		//Draws the text in the main UI rectangle
		width <= 1180? textSize(16): textSize(20);

		//Draws the track name
		textAlign(RIGHT);
		text(tracks[trackNumber].name, 
			width/2 - (80 * width/1100) - 30, 
			height - 55);

		//Draws the visualisation name
		textAlign(LEFT);
		text(vis.selectedVisual.name, 
			(width * 0.5) + (80 * width/1100) + 30, 
			height - 45);

		//Draws the artist name
		width <= 1180? textSize(12): textSize(16);

		fill(200);
		textAlign(RIGHT);
		text(tracks[trackNumber].artist, 
			width/2 - (80 * width/1100) - 30,
			height - 35);

		pop();
	}

	
	//Check if various buttons have been clicked
	mousePressed()
	{
		//Check is the playback button has been hit, return true
		if(this.playbackButton.hitCheck())
		{
			return;
		}

		//Check is the vis menu button has been hit, return true
		else if(this.visMenuButton.hitCheck())
		{
			return;
		}

		//Check is the track menu button has been hit, return true
		else if(this.trackMenuButton.hitCheck())
		{
			return;
		}

		//Check is the next button has been hit, return true
		else if(this.prevButton.hitCheck())
		{
			return;
		}

		//Check is the previous button has been hit, return true
		else if(this.nextButton.hitCheck())
		{
			return;
		}

		//Check is the fullscreen button has been hit, return true
		else if(this.fullscreenButton.hitCheck())
		{
			return;
		}

		//Check is the settings button has been hit, return true
		else if(this.settingsButton.hitCheck())
		{
			return;
		}
		
		//Check is the loop button has been hit, return true
		else if(this.settingsButton.loopButton.hitCheck())
		{
			return;
		}
		
		//Check is the background buttons for Trap Nation have been hit, return true
		else if(this.settingsButton.trapNationSettings.backgroundHitCheck())
		{
			return;
		}
		
		//Check is the cycle background button for Trap Nation has been hit, return true
		else if(this.settingsButton.trapNationSettings.cycleHitCheck())
		{
			return;
		}

		//Check is the appearance buttons for Trap Nation have been hit, return true
		else if(this.settingsButton.trapNationSettings.appearanceHitCheck())
		{
			return;
		}

		//Check is the appearance fill buttons for Trap Nation have been hit, return true
		else if(this.settingsButton.trapNationSettings.appearanceFillHitCheck())
		{
			return;
		}
		
		//Check is the background buttons for Ridge Plot have been hit, return true	
		else if(this.settingsButton.ridgePlotSettings.backgroundHitCheck())
		{
			return;
		}
		
		//Check is the colour button for Ridge Plot has been hit, return true
		else if(this.settingsButton.ridgePlotSettings.colourHitCheck())
		{
			return;
		}

		//Check is the colour button for Waves has been hit, return true
		else if(this.settingsButton.wavesSettings.colourHitCheck())
		{
			return;
		}

		//Check is the positions buttons for Spectrum have been hit, return true
		else if(this.settingsButton.spectrumSettings.positionHitCheck())
		{
			return;
		}

		//If the menu is open and the mouse is clicked, change the visualisation to what was clicked on
		else if(this.visMenuButton.hoverOver)
		{
			vis.selectVisual(vis.visuals[this.visMenuButton.ID].name);
		}

		//If the menu is open and the mouse is clicked, change the track to what was clicked on
		else if(this.trackMenuButton.hoverOver)
		{
			if(tracks[trackNumber].sound.isPlaying())
			{
				//Stop the current track playing
                tracks[trackNumber].sound.stop();

				//Change the track
				trackNumber = this.trackMenuButton.ID;

				//Play the new track
                tracks[trackNumber].sound.play();
			}
			else
			{
				trackNumber = this.trackMenuButton.ID;
			}
		}
	}

	//Changes visualisations, when you press a number key
	keyPressed(keycode)
	{
		//If the key that's pressed is between 1 and 9
		if(keycode > 48 && keycode < 58)
		{
			//visNumber finds the number of the key pressed 
			const visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
		}
	}
}
