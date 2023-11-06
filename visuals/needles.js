//Constructor function for the Needles visualiser
class Needles
{
	constructor()
	{
		//Name of the visualisation
		this.name = "Needles";

		//A dummy variable for "hasOwnProperty", if visualisation has this variable, then it calls onResize
		this.changeSize = null;

		//How large is the arc of the needle plot
		this.minAngle = PI + PI / 10;
		this.maxAngle = TWO_PI - PI / 10;

		this.plotsAcross = 2;
		this.plotsDown = 2;

		//Frequencies used by the energyfunction to retrieve a value for each plot
		this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];
	}

	onResize()
	{
		//Resize the plots sizes when the screen is resized
		this.pad = width / 20;
		this.plotWidth = (width - this.pad) / this.plotsAcross;
		this.plotHeight = (height - this.pad) / this.plotsDown;
		this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;
	}

	draw()
	{
		//Create an array amplitude values from the fft
		fourier.analyze();
		
		//Iterator for selecting frequency bin
		let currentBin = 0;

		angleMode(RADIANS);

		push();
		
		fill(240, 242, 210);

		//Nested for loop to place plots in 2*2 grid
		for (let i = 0; i < this.plotsDown; i++)
		{
			for (let j = 0; j < this.plotsAcross; j++)
			{

				//Calculate the size of the plots
				const x = this.pad + (j * width / 2);
				const y = height / 20 + (i * height / 2);
				const w = this.plotWidth - this.pad;
				const h = this.plotHeight - this.pad;

				//Draw a rectangle at that location and size
				rect(x, y, w, h);

				//Add on the ticks
				this.ticks(x + w/2, y + h, this.frequencyBins[i + j]);

				const energy = fourier.getEnergy(this.frequencyBins[currentBin]);

				//Add the needle
				this.needle(energy, x + w/2, y + h);

				currentBin++;
			}
		}

		pop();
	}

	needle(energy, centreX, bottomY)
	{
		/*
		energy: The energy for the current frequency
		centreX: central x coordinate of the plot rectangle
		bottomY: The bottom y coordinate of the plot rectangle
		*/

		push();

		stroke(51);
		strokeWeight(1);

		//Translate so 0 is at the bottom of the needle
		translate(centreX, bottomY);

		//Map the energy to the angle for the plot
		const theta = map(energy, 0, 255, this.minAngle, this.maxAngle);

		//Calculate x and y coorindates from angle for the length of needle
		const x = this.dialRadius * cos(theta);
		const y = this.dialRadius * sin(theta);

		//Draw the needle
		line(0, 0, x, y);

		pop();
	}

	ticks(centreX, bottomY, freqLabel)
	{
		/*
		centreX: central x coordinate of the plot rectangle
		bottomY: The bottom y coordinate of the plot rectangle
		freqLabel: Label denoting the frequency of the plot
		*/

		//8 ticks from pi to 2pi
		let nextTickAngle = this.minAngle;

		push();

		fill(51);
		translate(centreX, bottomY);

		//Draw the semi circle for the botttom of the needle
		noStroke();
		arc(0, 0, 20, 20, PI, 2 * PI);

		textAlign(CENTER);
		textSize(12);
		text(freqLabel, 0, -(this.plotHeight / 2));

		stroke(51);
		strokeWeight(1);

		for (let i = 0; i < 9; i++)
		{
			//For each tick work out the start and end coordinates of based on its angle from the needle's origin
			const x = this.dialRadius * cos(nextTickAngle);
			const x1 = (this.dialRadius - 5) * cos(nextTickAngle);

			const y = (this.dialRadius) * sin(nextTickAngle);
			const y1 = (this.dialRadius - 5) * sin(nextTickAngle);

			line(x, y, x1, y1);

			nextTickAngle += PI / 10;
		}

		pop();
	}
}