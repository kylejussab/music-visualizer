//Constructor function for the next button
class NextButton extends Button
{
	constructor(size)
	{
        //Sets the size for the button
		super(size);
	}

    //Adjust the position when the window is resized
    posUpdate()
    {
        //Call the posUpdate function from the parent Button constructor
        super.posUpdate();

        this.x = width/2 + 50;
    }

    draw()
    {
        //Call the draw function from the parent Button constructor
        super.draw();

        //If the window is not "small" in size draw the buttons
        if(width > 650)
        {
            fill(255);
            
            //Draws the next button
            rect(this.x + this.size/2, this.y + 4, 2, this.size);
            triangle(this.x - this.size/2, this.y + this.size/4, 
                    this.x + this.size/2, this.y + this.size * 0.75, 
                    this.x - this.size/2, this.y + this.size * 1.25);
        }
    }

    hitCheck()
    {
        //If the next button is clicked go to the track after the current track
        if((mouseX > (this.x - this.size/2)) && 
        (mouseX < (this.x + this.size + 2)) && 
        (mouseY > this.y) && 
        (mouseY < (this.y + this.size * 1.25)))
        {	
            //If the track is playing, stop it, go forward one track, and play it
            if(tracks[trackNumber].sound.isPlaying())
            {
                //Stop the current track playing
                tracks[trackNumber].sound.stop();

                //If pressed while the last track is selected, go to the first track in the array
                trackNumber == tracks.length - 1? trackNumber = 0: trackNumber ++;

                //Play the new track
                tracks[trackNumber].sound.play();
            }

            //If the track isn't playing, go forward one track
            else
            {
                //If pressed while the last track is selected, go to the first track in the array
                trackNumber == tracks.length - 1? trackNumber = 0: trackNumber ++;
            }
        }				
    }
}