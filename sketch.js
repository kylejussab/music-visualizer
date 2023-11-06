//Global controls variable 
let controls = null;

//Global visualisation controls
let vis = null;

//Sound variables
let fourier;
let amplitude;

//Array to hold track objects that contain the tracks name, artist, and the sound file
let tracks;

//The index of the track currently in the tracks array
let trackNumber;

//Variable to store image for noise visualisation
let noiseImage;

function preload()
{
	//Loads the songs in the assets folder into the 'tracks' array, giving each track a name and an artist as well as the sound file itself
	tracks = [
		{name: "Down to Earth", artist: "tobylane", sound: loadSound('assets/down_to_earth.mp3')},
		{name: "Epic", artist: "Twisterium", sound: loadSound('assets/epic_twisterium.mp3')},
		{name: "Fluidity", artist: "tobylane", sound: loadSound('assets/fluidity.mp3')},
		{name: "Tales", artist: "bbfeft", sound: loadSound('assets/tales.mp3')},
		{name: "Upbeat Energetic Trap", artist: "Lesfm", sound: loadSound('assets/upbeat_energetic_trap.mp3')}]

	//Load the image of the girl for the noise visualisation
	noiseImage = loadImage('assets/noise_image.png');
}

function setup()
{
	//Creates a usable canvas the size of the window of the browser
	createCanvas(windowWidth, windowHeight);
	
	//Initialise the track number to 0
	trackNumber = 0;

	//Instantiate the controls object
	controls = new ControlsAndInput();

	//Instantiate the fft object
	fourier = new p5.FFT();
	amplitude = new p5.Amplitude();

	//Create a new visualisation container and add all visualisations
	vis = new Visualisations();
	vis.add(new TrapNation());
	vis.add(new RidgePlot());
	vis.add(new Noise());
	vis.add(new Waves());
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
}

function draw()
{
	//Give the background a grey colour
	background(20, 20, 20);

	//Draw the selected visualisation, by default the first added visualisation is selected
	vis.selectedVisual.draw();

	//Draws all elements created in the controlAndInput.js
	controls.draw();
	
	//Constantly set the volume of the track is set to the value of the volume slider
	tracks[trackNumber].sound.setVolume(controls.settingsButton.volume.volumeSlider.value());
}

function mouseClicked()
{
	controls.mousePressed();
}

function keyPressed()
{
	controls.keyPressed(keyCode);
}

function windowResized()
{
	//Maintains the aspect ratio of visualisations
	resizeCanvas(windowWidth, windowHeight);

	if(vis.selectedVisual.hasOwnProperty('changeSize'))
	{
		vis.selectedVisual.onResize();
	}
}

//All functions below this point handle clicking and dragging the track scrubber
function mousePressed()
{
	controls.scrubber.click();
}

function mouseDragged()
{
	if(controls.scrubber.locked)
	{
		//If the mouse is dragged too far to the left, stop the scrubber head from following the mouse
		mouseX < controls.scrubber.x && controls.scrubber.onScrub?
		controls.scrubber.newPosition = controls.scrubber.x:

		//If the mouse is dragged too far to the right, stop the scrubber head from following the mouse
		mouseX > controls.scrubber.x + controls.scrubber.rectSize && controls.scrubber.onScrub?
		controls.scrubber.newPosition = controls.scrubber.x + controls.scrubber.rectSize:

		//Set the position of the scrubber head to where the mouse is
		controls.scrubber.newPosition = mouseX - controls.scrubber.xOffset;
	}
} 

function mouseReleased()
{
	if(controls.scrubber.locked)
	{
		//If we're off the slider on the left side, set the time of the track to the beginning
		mouseX < controls.scrubber.x?
		controls.scrubber.newTime = 0:

		//If we're off the slider on the right side, set the time of the track to a few milliseconds before the end
		mouseX > controls.scrubber.x + controls.scrubber.rectSize?
		controls.scrubber.newTime = controls.scrubber.duration - 0.5:

		//Set the time of the track to the calculated position		
		controls.scrubber.newTime = (controls.scrubber.newPosition / controls.scrubber.rectSize) * controls.scrubber.duration;

		//Only if the song is playing scrub through the track
		if(controls.playbackButton.playing == true)
		{
			tracks[trackNumber].sound.jump(controls.scrubber.newTime);
		}
	}

	//After the track has been scrubbed, set locked to false as we are no longer on the scrubber head
	controls.scrubber.locked = false;
}
