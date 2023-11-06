//Constructor function for the scrubber
class Scrubber
{
    constructor()
	{
		//All variables needed for the scrubber to move and calculate track durations
		this.onScrub = false;
		this.locked;
		this.newPosition;
		this.xOffset;
		this.newTime;
		this.timePlayed = 0;
		this.totalMinutes;
		this.totalSeconds;
		this.playedMinutes;
		this.playedSeconds;
		this.duration;
		this.currentTime;
		this.playedWidth;
	}
	
	draw()
	{
		//Constantly update the y position, to accompany resizing
		this.y = height - 35;

		//Changes the size of the scrubber if the window size is increased
		width >= 1180? this.rectSize = 200: this.rectSize = 120;

		//this.x is the beginning of the rectangle and the beginning of the track
		this.x = width/2 - this.rectSize/2;
		
		//Initialise variables with the current time and duration of the selected track
        this.duration = tracks[trackNumber].sound.duration();
        this.currentTime = tracks[trackNumber].sound.currentTime();

		//Map the tracks duration to a value that fits the length of the scrubber
		//this.timePlayed holds the value of the current time in the track even when paused
        this.playedWidth = map(this.timePlayed, 0, this.duration, 0, this.rectSize);

		//If the user isn't dragging the scrubber head
        if(!this.locked)
        {
            //Set the scrubber heads x position to the mapped width over the length of the scrubber
			this.newPosition = this.playedWidth;
        }
        
		//Defines the this.timePlayed variable
        if(this.currentTime != 0)
        {
            this.timePlayed = this.currentTime;
        }

		//If the track ends, set this.timePlayed back to 0 for the next track
        if(this.timePlayed >= this.duration)
        {
            this.timePlayed = 0;
        }

		//Only if the screen isn't "small" sized draw the scrubber
		if(width > 650)
		{
			//Calculates the distance between the mouse and the scrubber head
			const d = dist(mouseX, mouseY, this.playedWidth + this.x, this.y + 4);

			//If the mouse is on the scrubber head set onScrub to true, otherwise set it to false
			d < 8? this.onScrub = true: this.onScrub = false;
		}

		//A small buffer time; at the end of the track this.timePlayed and this.duration aren't exactly equal		
		if(((this.duration - this.timePlayed) <= 0.02) && (controls.settingsButton.loopButton.isLoop == false))
		{
			//If this is the last track go to the first track
			if(trackNumber == tracks.length - 1)
			{
				tracks[trackNumber].sound.stop();
				trackNumber = 0;
				tracks[trackNumber].sound.play();
			}
			
			//If this isn't the last track, go forward normally
			else
			{
				tracks[trackNumber].sound.stop();
				trackNumber ++;
				tracks[trackNumber].sound.play();	
			}
		}
		
		//If loop is true, start the same song again
		else if(((this.duration - this.timePlayed) <= 0.02) && controls.settingsButton.loopButton.isLoop)
		{
			tracks[trackNumber].sound.stop();
			tracks[trackNumber].sound.play();
		}

		//Only draw the scrubber if the window size isn't "small"
		if(width > 650)
		{
			//Draw the rectangle, this is the part the scrubber head tracks along
			fill(255);
			noStroke();
			rect(this.x, this.y, this.rectSize, 8, 4);
	
			fill(3, 117, 254);

			//Draws the blue rectangle to the left of the scrubber head
			//If the scrubber head is too far to the left, draw it at the beginning of the scrubber
			if(mouseX < this.x && this.locked)
			{
				rect(this.x, this.y, 0, 8, 4);
				ellipse(this.x, this.y + 4, 16);
			}

			//If the scrubber head is too far to the right, draw it at the end of the scrubber
			else if(mouseX > this.x + this.rectSize && this.locked)
			{
				rect(this.x, this.y, this.rectSize, 8, 4);
				ellipse(this.x + this.rectSize, this.y + 4, 16);	
			}

			//Draw the scrubber head where the user releases it
			else
			{
				rect(this.x, this.y, this.newPosition, 8, 4);
				ellipse(this.newPosition + this.x, this.y + 4, 16);
			}
			
			//Variables to calculate the current time, and duration of the track in minutes and seconds
			this.totalMinutes = floor(this.duration / 60);
			this.totalSeconds = floor(this.duration % 60);
			this.playedMinutes = floor(this.timePlayed / 60);
			this.playedSeconds = floor(this.timePlayed % 60);
	
			fill(255);
			textSize(11);
			textAlign(RIGHT);

			//If the seconds in the track are less than 10 place a leading 0, otherwise dont
			this.totalSeconds < 10?
			text(this.totalMinutes + ":0" + this.totalSeconds, this.x + this.rectSize, this.y + 22):
			text(this.totalMinutes + ":" + this.totalSeconds, this.x + this.rectSize, this.y + 22);

			textAlign(LEFT);

			//If the seconds that have played are less than 10 place a leading 0, otherwise dont
			this.playedSeconds < 10?
			text(this.playedMinutes + ":0" + this.playedSeconds, this.x, this.y + 22):
			text(this.playedMinutes + ":" + this.playedSeconds, this.x, this.y + 22);
		}
	}

	//Method to set this.locked to true when we click on the scrubber head
	click()
	{
		if(this.onScrub)
		{
			this.locked = true;
			this.xOffset = mouseX - this.newPosition;
		}
		else
		{
			this.locked = false;
		}
	}
}