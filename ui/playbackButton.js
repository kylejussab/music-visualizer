//Constructor function for the playback button
class PlaybackButton extends Button
{
	constructor(size)
	{
		//Sets the size of the playback button
		super(size);

		//Variable to determine which icon to draw
		this.playing = false;
	}

	//Adjust the position when the window is resized
	posUpdate()
	{	
		this.x = width / 2;

		//If the window is "small" in size, move the playback button to better postion it
		width <= 650? this.y = height - 65: this.y = height - 85;	
	}

	draw()
	{
		//Call the draw function from the parent Button constructor
		super.draw();

		//Draw the white circle
		fill(255);
		ellipse(this.x, this.y + 15, this.size * 2.5)

		fill(0);

		if(this.playing)
		{
			//Pause icon
			//Left rectangle
			rect(this.x - this.size/2, 
				this.y + this.size/4, 
				this.size/2 - 2, 
				this.size);
			
			//Right rectangle
			rect(this.x - this.size/2 + (this.size/2 + 2), 
			this.y + this.size/4, 
			this.size/2 - 2, 
			this.size);
		}
		else
		{	
			//Play icon
			triangle(2 + this.x - this.size/2, this.y + this.size/4, 
					2 + this.x + this.size/2, this.y + this.size * 0.75, 
					2 + this.x - this.size/2, this.y + this.size * 1.25);

		}
	}

	hitCheck()
	{
		//Calculate the distance from the mouse and the button
		const d = dist(mouseX, mouseY, this.x, this.y + 15);

		//If we click on the button, then pause or play the current track
		if(d <= (this.size * 2.5)/2)
		{
			//If the track is playing, pause the track, if not play the track
			tracks[trackNumber].sound.isPlaying()? tracks[trackNumber].sound.pause(): tracks[trackNumber].sound.play();

			//Change this.playing to update the icons for the button
			this.playing = !this.playing;

			return true;
		}
			return false;
	}
}