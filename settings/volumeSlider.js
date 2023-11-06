//Constructor function for the volume slider
class VolumeSlider
{
    constructor()
    {
        //Creates and styles the slider
        this.volumeSlider = createSlider(0, 1, 1, 0.1);
		this.volumeSlider.position(10, 85);
		this.volumeSlider.addClass("sliderStyle");
    }
    
    draw()
    {
        fill(255);
		textAlign(LEFT);
		textSize(14);
		text("Volume", 10, 80);
        
        //If the settings menu is open, show the slider, otherwise hide it
        controls.settingsButton.showMenu? this.volumeSlider.show(): this.volumeSlider.hide();
    }
}