/*
Constructor function for Noise settings
The Noise settings are as follows;
 - Speed slider (makes the lines move faster or slower)
 - Columns slider (adjust the number of columns of lines)
*/
class NoiseSettings
{
    constructor()
    {
        //Variables to control columns and speed of the noise
		this.columnLength;
        this.speedIncrement;
        
		//Create and style the speed slider
        this.noiseSpeedSlider = createSlider(0.01, 0.05, 0.02, 0.01);
		this.noiseSpeedSlider.position(10, 175);
		this.noiseSpeedSlider.addClass("sliderStyle");

		//Create and style the column slider
		this.noiseColumnSlider = createSlider(2, 8, 3, 1);
		this.noiseColumnSlider.position(10, 225);
		this.noiseColumnSlider.addClass("sliderStyle");
    }

    draw()
    {
        //If the Noise visualisation is selected, draw the sliders
		if(vis.selectedVisual.name == "Noise" && height > 590)
		{
			fill(255);
            textAlign(LEFT);
            textSize(14);
            
            text("Speed", 10, 170);
			this.noiseSpeedSlider.show();
			text("Number of columns", 10, 220);
			this.noiseColumnSlider.show();
		}

		//Otherwise hide the sliders
		else
		{
			this.noiseSpeedSlider.hide();
			this.noiseColumnSlider.hide();
		}
    }
}