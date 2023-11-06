//Constructor function for the Wavepattern visualiser
class WavePattern
{
	constructor()
	{
		//Name of the visualisation
		this.name = "Wavepattern";
	}

	draw()
	{
		push();

		noFill();
		stroke(255, 0, 0);
		strokeWeight(2);

		beginShape();

		//Calculate the waveform from the fft.
		const wave = fourier.waveform();

		for(let [i, e] of wave.entries())
		{
			//All waves must be mapped to the screen
			const x = map(i, 0, wave.length, 0, width);
			const y = map(e, -1, 1, 0, height);
			//Draw the wave form to the screen
			vertex(x, y);
		}

		endShape();

		pop();
	}
}