//Constructor function for the Spectrum visualiser
class Spectrum
{
	constructor()
	{
		//Name of the visualisation
		this.name = "Spectrum";
	}

	draw()
	{
		push();

		const spectrum = fourier.analyze();
		noStroke();

		if(controls.settingsButton.spectrumSettings.positionNumber == 1)
		{
			//Left to right
			for(let [i, e] of spectrum.entries())
			{
				const g = map(e, 0, 255, 255, 0);
				fill(e, g, 0);

				const y = map(i, 0, spectrum.length, 0, height);
				const w = map(e, 0, 255, 0, width);
				rect(0, y, w, height/spectrum.length);
			}
		}
		else if(controls.settingsButton.spectrumSettings.positionNumber == 2)
		{
			//Bottom to top
			for(let [i, e] of spectrum.entries())
			{
				const g = map(e, 0, 255, 255, 0);
				fill(e, g, 0);
				
				const x = map(i, 0, spectrum.length, 0, width);
				const h = -height + map(e, 0, 255, height, 0);
				rect(x, height, width / spectrum.length, h);
			}
		}
		else if(controls.settingsButton.spectrumSettings.positionNumber == 3)
		{
			//Right to left
			for(let [i, e] of spectrum.entries())
			{
				const g = map(e, 0, 255, 255, 0);
				fill(e, g, 0);

				const y = map(i, 0, spectrum.length, 0, height);
				const w = map(e, 0, 255, 0, width);
				rect(width, y, -w, height/spectrum.length);
			}
		}
		else
		{
			//Top to bottom
			for(let [i, e] of spectrum.entries())
			{
				const g = map(e, 0, 255, 255, 0);
				fill(e, g, 0);
				
				const x = map(i, 0, spectrum.length, 0, width);
				const h = map(e, 0, 255, 0, height);
				rect(x, 0, width / spectrum.length, h);
			}
		}
		
		pop();
	}
}