/*
Constructor function for the Trap Nation visualiser
This visualisation took inspiration from the popular YouTube channel Trap Nation, the link to their YouTube channel is as follows:
- https://www.youtube.com/channel/UCa10nxShhzNrCE1o2ZOPztg
*/
class TrapNation
{
    constructor()
    {
        //Name of the visualisation
        this.name = "Trap Nation";

        //Sets the scale for the main circle
        this.scale = (width + height) / 100;

        //Array for the second appearance
        this.appArray = [];

        //Call the particles constructor in the beginning, before the circles
        this.particles = new Particles(150);
        this.particles.int();
    }

    draw()
    {
        //Analyze must be called before get energy
        fourier.analyze();

        //Gets the amplitude level and puts it in a variable 
		const amp = map(amplitude.getLevel(), 0, 0.15, 10, 250);

        let bass = fourier.getEnergy("bass");

        //Maps bass to a smaller value
        bass = map(bass, 0, 255, 0, 120);

        //Set the particle speed, based on the amp value
        const particleSpeed = map(amp, 0, 255, 0.01, 3);
        
        noStroke();

        //Draw the backgrounds
        this.background(controls.settingsButton.trapNationSettings.backgroundNumber);

        //Draw the particles
        this.particles.draw(particleSpeed);

        //Code here
        this.appearance(controls.settingsButton.trapNationSettings.appearanceNumber)

        //Bass (middle) circle
        fill(255);
        ellipse(width / 2, height / 2, this.scale + 200 + bass);
        fill(25,25,25);
        ellipse(width / 2, height / 2, this.scale + 190 + bass);

        //If the cycle background option is on, cycle through the background every 12 seconds
		if(controls.settingsButton.trapNationSettings.cycleBackground && vis.selectedVisual.name == "Trap Nation")
		{
			if((frameCount % (12 * 30)) == 0)
			{
				controls.settingsButton.trapNationSettings.backgroundNumber == 4?
                controls.settingsButton.trapNationSettings.backgroundNumber = 1:
                controls.settingsButton.trapNationSettings.backgroundNumber ++
			}
		}
    }

    appearance(appearanceNumber)
    {
        if(appearanceNumber == 1)
        {
            const mid = fourier.getEnergy("mid");
            const highMid = fourier.getEnergy("highMid");

            //Green outer cirlces
            fill(0,255,0);
            ellipse(width / 2 - 75, height / 2, this.scale + 50 + mid);
            ellipse(width / 2 - 60, height / 2 + 50, this.scale + 50 + mid);
            ellipse(width / 2, height / 2 + 75, this.scale + 50 + mid);
            ellipse(width / 2 + 60, height / 2 + 50, this.scale + 50 + mid);
            ellipse(width / 2 + 75, height / 2, this.scale + 50 + mid);
            ellipse(width / 2 + 60, height / 2 - 50, this.scale + 50 + mid);
            ellipse(width / 2, height / 2 - 75, this.scale + 50 + mid);
            ellipse(width / 2 - 60, height / 2 - 50, this.scale + 50 + mid);

            //Blue outer circles
            fill(0,0,255);
            ellipse(width / 2 - 75, height / 2, this.scale + 40 + mid);
            ellipse(width / 2 - 60, height / 2 + 50, this.scale + 40 + mid);
            ellipse(width / 2, height / 2 + 75, this.scale + 40 + mid);
            ellipse(width / 2 + 60, height / 2 + 50, this.scale + 40 + mid);
            ellipse(width / 2 + 75, height / 2, this.scale + 40 + mid);
            ellipse(width / 2 + 60, height / 2 - 50, this.scale + 40 + mid);
            ellipse(width / 2, height / 2 - 75, this.scale + 40 + mid);
            ellipse(width / 2 - 60, height / 2 - 50, this.scale + 40 + mid);

            //Red outer circles
            fill(255, 0, 0); 
            ellipse(width / 2 - 75, height / 2, this.scale + 50 + highMid);
            ellipse(width / 2 - 60, height / 2 + 50, this.scale + 50 + highMid);
            ellipse(width / 2, height / 2 + 75, this.scale + 50 + highMid);
            ellipse(width / 2 + 60, height / 2 + 50, this.scale + 50 + highMid);
            ellipse(width / 2 + 75, height / 2, this.scale + 50 + highMid);
            ellipse(width / 2 + 60, height / 2 - 50, this.scale + 50 + highMid);
            ellipse(width / 2, height / 2 - 75, this.scale + 50 + highMid);
            ellipse(width / 2 - 60, height / 2 - 50, this.scale + 50 + highMid);

            //White outer circles
            fill(255);
            ellipse(width / 2 - 75, height / 2, this.scale + 45 + highMid);
            ellipse(width / 2 - 60, height / 2 + 50, this.scale + 45 + highMid);
            ellipse(width / 2, height / 2 + 75, this.scale + 45 + highMid);
            ellipse(width / 2 + 60, height / 2 + 50, this.scale + 45 + highMid);
            ellipse(width / 2 + 75, height / 2, this.scale + 45 + highMid);
            ellipse(width / 2 + 60, height / 2 - 50, this.scale + 45 + highMid);
            ellipse(width / 2, height / 2 - 75, this.scale + 45 + highMid);
            ellipse(width / 2 - 60, height / 2 - 50, this.scale + 45 + highMid);
            }
        else
        {
            //Adds amplitudes to the array
            const line = amplitude.getLevel();
            this.appArray.push(line);

            angleMode(DEGREES);

            push();
            translate(width/2, height/2);
            beginShape();
            for(let i = 0; i < 360; i++)
            {
                stroke(255);
                strokeWeight(5);
                //Scales the amplitudes
                const rotate = map(this.appArray[i], 0, 1, 90 + this.scale, 450);

                //Rotates all vertecies
                const x = rotate * cos(i);
                const y = rotate * sin(i);

                const col = lerpColor(color(255,0,0), color(255,0,255), this.appArray[i])

                if(controls.settingsButton.trapNationSettings.appearanceColour == false)
                {
                    fill(255, 255, 255, 100);
                }
                else
                {
                    fill(col);
                }
                
                vertex(x, y);
            }
            endShape();
            noStroke();
            pop();

            if(this.appArray.length > 360)
            {
                this.appArray.splice(0, 1);
            }
        }
    }

    background(backgroundNumber)
    {
        //Draws first background
        if(backgroundNumber == 1)
        {
            //Background
            fill(231, 92, 81);
            rect(0, 0, width, height);

            //Sun
            fill(244, 104, 73);
            ellipse(width / 2, height / 2.5, width / 2.5);

            //Mountains
            fill(205, 47, 70);
            beginShape();
            vertex(0, height / 2.5);
            vertex(width / 30, height * 0.43);
            vertex(width / 18, height * 0.38);
            vertex(width / 6, height * 0.42);
            vertex(width / 5, height * 0.36);
            vertex(width / 4.8, height * 0.3);
            vertex(width / 3.2, height * 0.4);
            vertex(width / 3, height * 0.37);
            vertex(width / 1.8, height * 0.5);
            vertex(width / 1.7, height * 0.47);
            vertex(width / 1.6, height * 0.52);
            vertex(width / 1.3, height * 0.4);
            vertex(width / 1.25, height * 0.4);
            vertex(width / 1.09, height * 0.2);
            vertex(width, height / 4.5);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            fill(172, 32, 67);
            beginShape();
            vertex(0, height / 1.6);
            vertex(width / 36, height * 0.57);
            vertex(width / 16, height * 0.66);
            vertex(width / 7, height * 0.63);
            vertex(width / 5, height * 0.67);
            vertex(width / 3.5, height * 0.63);
            vertex(width / 3, height * 0.68);
            vertex(width / 2.4, height * 0.62);
            vertex(width / 2.45, height * 0.55);
            vertex(width / 1.7, height * 0.68);
            vertex(width / 1.5, height * 0.65);
            vertex(width / 1.3, height * 0.7);
            vertex(width / 1.28, height * 0.65);
            vertex(width / 1.05, height * 0.5);
            vertex(width, height / 1.7);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            fill(138, 13, 45);
            beginShape();
            vertex(0, height / 1.3);
            vertex(width / 16, height * 0.75)
            vertex(width / 3.5, height * 0.8);
            vertex(width / 2.6, height * 0.74);
            vertex(width / 1.8, height * 0.85);
            vertex(width / 1.6, height * 0.74);
            vertex(width / 1.4, height * 0.72);
            vertex(width / 1.35, height * 0.77);
            vertex(width / 1.32, height * 0.77);
            vertex(width / 1.28, height * 0.8);
            vertex(width / 1.15, height * 0.75);
            vertex(width / 1.05, height * 0.81);
            vertex(width, height / 1.3);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            fill(101, 5, 33);
            beginShape();
            vertex(0, height * 0.85);
            vertex(width / 26, height * 0.84);
            vertex(width / 8, height * 0.94);
            vertex(width / 2.5, height * 0.83);
            vertex(width / 1.6, height * 0.9);
            vertex(width / 1.4, height * 0.81);
            vertex(width / 1.2, height * 0.87);
            vertex(width, height * 0.85);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            fill(50, 1, 22);
            beginShape();
            vertex(0, height * 0.95);
            vertex(width / 12, height * 0.92);
            vertex(width / 2.5 , height * 0.96);
            vertex(width / 1.5 , height * 0.92);
            vertex(width, height * 0.95);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);
        }

        //Draws 2nd background
        if(backgroundNumber == 2)
        {
            fill(87, 179, 164);
            rect(0, 0, width, height);

            //sun
            fill(178, 212, 188);
            ellipse(width * 0.75, height * 0.7, width / 2.8);

            //mountains
            fill(71, 225, 210);
            beginShape()
            vertex(0, height * 0.6);
            vertex(width * 0.06, height * 0.5);
            vertex(width * 0.09, height * 0.5);
            vertex(width * 0.13, height * 0.6);
            vertex(width * 0.16, height * 0.55);
            vertex(width * 0.18, height * 0.56);
            vertex(width * 0.2, height * 0.58);
            vertex(width * 0.24, height * 0.66);
            vertex(width * 0.35, height * 0.65);
            vertex(width * 0.4, height * 0.6);
            vertex(width * 0.5, height * 0.65);
            vertex(width * 0.6, height * 0.65);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            //orange
            fill(245, 140, 133);
            beginShape();
            vertex(0, height * 0.7);
            vertex(width * 0.2, height * 0.68);
            vertex(width * 0.4, height * 0.72);
            vertex(width, height * 0.68);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            //water
            fill(204, 246, 226);
            beginShape();
            vertex(0, height * 0.75);
            vertex(width * 0.2, height * 0.7);
            vertex(width * 0.35, height * 0.73);
            vertex(width * 0.45, height * 0.73);
            vertex(width * 0.7, height * 0.71);
            vertex(width * 0.83, height * 0.72);
            vertex(width * 0.9, height * 0.715);
            vertex(width * 0.7, height * 0.74)
            vertex(width, height * 0.75);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            //startPink
            fill(213, 56, 103);
            beginShape();
            vertex(0, height * 0.78);
            vertex(width * 0.16, height * 0.73);
            vertex(width * 0.2, height * 0.74);
            vertex(width * 0.3, height * 0.73);
            vertex(width * 0.62, height * 0.72);
            vertex(width * 0.84, height * 0.78);
            vertex(width, height * 0.78);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            //midground mountains
            fill(0, 118, 130);
            beginShape();
            vertex(0, height * 0.25);
            vertex(width * 0.02, height * 0.32);
            vertex(width * 0.04, height * 0.35);
            vertex(width * 0.025, height * 0.45);
            vertex(0, height * 0.5);
            vertex(width * 0.025, height * 0.53);
            vertex(width * 0.02, height * 0.6);
            vertex(0, height * 0.63);
            vertex(0, height * 0.67);
            vertex(width * 0.02, height * 0.66);
            vertex(width * 0.06, height * 0.7);
            vertex(width * 0.05, height * 0.78);
            vertex(width * 0.13, height * 0.79);
            vertex(width * 0.18, height * 0.88);
            vertex(0, height * 0.88);
            endShape(CLOSE);

            beginShape();
            vertex(width * 0.3, height * 0.73);
            vertex(width * 0.51, height * 0.37);
            vertex(width * 0.52, height * 0.42);
            vertex(width * 0.52, height * 0.54);
            vertex(width * 0.6, height * 0.76);
            vertex(width * 0.35, height * 0.75);
            endShape(CLOSE);

            beginShape();
            vertex(width * 0.84, height * 0.78);
            vertex(width, height * 0.45);
            vertex(width, height * 0.55);
            vertex(width * 0.97, height * 0.65);
            vertex(width * 0.99, height * 0.67);
            vertex(width, height * 0.64);
            vertex(width, height * 0.79);
            endShape(CLOSE);

            //forgroundPink
            fill(176, 46, 84);
            beginShape();
            vertex(0, height * 0.86);
            vertex(width * 0.08, height * 0.85);
            vertex(width * 0.13, height * 0.86);
            vertex(width * 0.2, height * 0.83);
            vertex(width * 0.28, height * 0.85);
            vertex(width * 0.34, height * 0.8);
            vertex(width * 0.62, height * 0.88);
            vertex(width * 0.68, height * 0.84);
            vertex(width * 0.8, height * 0.9);
            vertex(width, height * 0.8);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);
        }

        //Draws 3rd background
        if(backgroundNumber == 3)
        {
            //background
            fill(29, 23, 116);
            rect(0, 0, width, height);

            //Standing rock background
            fill(45, 68, 204);
            beginShape();
            vertex(width * 0.17, height * 0.48);
            vertex(width * 0.175, height * 0.38);
            vertex(width * 0.21, height * 0.36);
            vertex(width * 0.19, height * 0.38);
            vertex(width * 0.185, height * 0.6);
            endShape(CLOSE);

            fill(75, 113, 219);
            beginShape()
            vertex(width * 0.185, height * 0.6);
            vertex(width * 0.19, height * 0.38);
            vertex(width * 0.21, height * 0.36);
            vertex(width * 0.25, height * 0.65);
            endShape(CLOSE);

            fill(45, 68, 204);
            beginShape()
            vertex(width * 0.21, height * 0.6);
            vertex(width * 0.215, height * 0.53);
            vertex(width * 0.23, height * 0.5);
            vertex(width * 0.23, height * 0.545);
            endShape(CLOSE);

            fill(147, 156, 253);
            beginShape();
            vertex(width * 0.23, height * 0.5);
            vertex(width * 0.275, height * 0.56);
            vertex(width * 0.23, height * 0.545);
            endShape(CLOSE);

            fill(75, 113, 219);
            beginShape();
            vertex(width * 0.21, height * 0.6);
            vertex(width * 0.23, height * 0.545);
            vertex(width * 0.275, height * 0.56);
            vertex(width * 0.3, height * 0.68);
            vertex(width * 0.21, height * 0.69);
            endShape(CLOSE);

            fill(148, 154, 255);
            beginShape();
            vertex(width * 0.3, height * 0.678);
            vertex(width * 0.32, height * 0.677);
            vertex(width * 0.335, height * 0.69);
            vertex(width * 0.25, height * 0.715);
            vertex(width * 0.23, height * 0.69);
            endShape(CLOSE);

            fill(61, 60, 165);
            beginShape();
            vertex(width * 0.25, height * 0.715);
            vertex(width * 0.335, height * 0.69);
            vertex(width * 0.335, height * 0.74);
            vertex(width * 0.25, height * 0.74);
            endShape(CLOSE);

            //1st standing rock
            fill(41, 42, 146);
            beginShape();
            vertex(0, height * 0.7);
            vertex(0, height * 0.55);
            vertex(width * 0.02, height * 0.35);
            vertex(width * 0.04, height * 0.3);
            vertex(width * 0.06, height * 0.2);
            vertex(width * 0.09, height * 0.18);
            vertex(width * 0.07, height * 0.21);
            vertex(width * 0.06, height * 0.32);
            vertex(width * 0.05, height * 0.35);
            vertex(width * 0.048, height * 0.5);
            vertex(width * 0.015, height * 0.7);
            endShape(CLOSE);

            fill(49, 122, 202);
            beginShape();
            vertex(width * 0.015, height * 0.7);
            vertex(width * 0.048, height * 0.5);
            vertex(width * 0.05, height * 0.35);
            vertex(width * 0.06, height * 0.32);
            vertex(width * 0.07, height * 0.21);
            vertex(width * 0.09, height * 0.18);
            vertex(width * 0.11, height * 0.32);
            vertex(width * 0.14, height * 0.34);
            vertex(width * 0.17, height * 0.48);
            vertex(width * 0.17, height * 0.7);
            endShape(CLOSE);

            fill(18, 49, 136);
            beginShape();
            vertex(width * 0.11, height * 0.32);
            vertex(width * 0.135, height * 0.46);
            vertex(width * 0.118, height * 0.325);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.06, height * 0.32);
            vertex(width * 0.068, height * 0.39);
            vertex(width * 0.057, height * 0.33);
            endShape(CLOSE);

            //2nd standing rock
            fill(41, 42, 146);
            beginShape();
            vertex(width * 0.018, height * 0.7);
            vertex(width * 0.06, height * 0.55);
            vertex(width * 0.17, height * 0.48);
            vertex(width * 0.1, height * 0.56);
            vertex(width * 0.087, height * 0.61);
            vertex(width * 0.07, height * 0.63);
            vertex(width * 0.06, height * 0.705);
            endShape(CLOSE);

            fill(49, 122, 202);
            beginShape();
            vertex(width * 0.06, height * 0.705);
            vertex(width * 0.07, height * 0.63);
            vertex(width * 0.087, height * 0.61);
            vertex(width * 0.1, height * 0.56);
            vertex(width * 0.17, height * 0.48);
            vertex(width * 0.21, height * 0.6);
            vertex(width * 0.21, height * 0.715);
            endShape(CLOSE);

            fill(18, 49, 136);
            beginShape();
            vertex(width * 0.1, height * 0.56);
            vertex(width * 0.125, height * 0.6);
            vertex(width * 0.125, height * 0.67);
            vertex(width * 0.12, height * 0.605);
            vertex(width * 0.095, height * 0.575);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.145, height * 0.505);
            vertex(width * 0.14, height * 0.6);
            vertex(width * 0.135, height * 0.52);
            endShape(CLOSE);

            //3rd standing rock
            fill(41, 42, 146);
            beginShape();
            vertex(width * 0.13, height * 0.71);
            vertex(width * 0.175, height * 0.62);
            vertex(width * 0.21, height * 0.6);
            vertex(width * 0.24, height * 0.63);
            vertex(width * 0.19, height * 0.64);
            vertex(width * 0.17, height * 0.715);
            endShape(CLOSE);

            fill(49, 122, 202);
            beginShape();
            vertex(width * 0.17, height * 0.715);
            vertex(width * 0.19, height * 0.64);
            vertex(width * 0.24, height * 0.63);
            vertex(width * 0.27, height * 0.735);
            endShape(CLOSE);

            fill(18, 49, 136);
            beginShape();
            vertex(width * 0.22, height * 0.634);
            vertex(width * 0.22, height * 0.7);
            vertex(width * 0.21, height * 0.636);
            vertex(width * 0.2, height * 0.625);
            endShape(CLOSE);

            //Floor left
            fill(73, 96, 182);
            beginShape();
            vertex(0, height * 0.68);
            vertex(width * 0.17, height * 0.715);
            vertex(width * 0.23, height * 0.705);
            vertex(width * 0.26, height * 0.725);
            vertex(width * 0.3, height * 0.715);
            vertex(width * 0.39, height * 0.74);
            vertex(width * 0.275, height * 0.82);
            vertex(width * 0.17, height * 0.825);
            vertex(width * 0.06, height * 0.9);
            vertex(0, height * 0.91)
            endShape(CLOSE);

            fill(70, 107, 188);
            beginShape();
            vertex(width * 0.275, height * 0.82);
            vertex(width * 0.39, height * 0.74);
            vertex(width * 0.39, height);
            vertex(width * 0.27, height);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.06, height * 0.9);
            vertex(width * 0.17, height * 0.825);
            vertex(width * 0.165, height);
            vertex(width * 0.06, height);
            endShape(CLOSE);

            fill(18, 49, 136);
            beginShape();
            vertex(0, height * 0.91)
            vertex(width * 0.06, height * 0.9);
            vertex(width * 0.06, height);
            vertex(0, height);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.17, height * 0.825);
            vertex(width * 0.275, height * 0.82);
            vertex(width * 0.27, height);
            vertex(width * 0.165, height);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.13, height * 0.85);
            vertex(width * 0.12, height)
            vertex(width * 0.115, height * 0.86);
            vertex(width * 0.09, height * 0.85);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.17, height * 0.825);
            vertex(width * 0.115, height * 0.826);
            vertex(width * 0.02, height * 0.78)
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.34, height * 0.775);
            vertex(width * 0.335, height * 0.85);
            vertex(width * 0.33, height * 0.78);
            vertex(width * 0.28, height * 0.77);
            endShape(CLOSE);

            //Floor right
            fill(18, 49, 136);
            beginShape();
            vertex(width * 0.23, height);
            vertex(width * 0.28, height * 0.98);
            vertex(width * 0.28, height);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.34, height * 0.95);
            vertex(width * 0.36, height * 0.95);
            vertex(width * 0.36, height);
            vertex(width * 0.34, height);
            endShape(CLOSE)
            beginShape();
            vertex(width * 0.43, height * 0.91);
            vertex(width * 0.47, height * 0.9);
            vertex(width * 0.47, height);
            vertex(width * 0.43, height);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.875, height * 0.875);
            vertex(width * 0.89, height * 0.895);
            vertex(width * 0.89, height);
            vertex(width * 0.7, height);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.83, height * 0.8);
            vertex(width * 0.83, height);
            vertex(width * 0.43, height);
            vertex(width * 0.43, height * 0.92);
            endShape(CLOSE);

            fill(70, 107, 188);
            beginShape();
            vertex(width * 0.28, height * 0.98);
            vertex(width * 0.34, height * 0.95);
            vertex(width * 0.34, height);
            vertex(width * 0.28, height);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.36, height * 0.95);
            vertex(width * 0.43, height * 0.91);
            vertex(width * 0.43, height);
            vertex(width * 0.36, height);
            endShape(CLOSE);
            
            fill(56, 223, 248);
            beginShape();
            vertex(width * 0.06, height);
            vertex(width * 0.25, height * 0.87);
            vertex(width * 0.355, height * 0.84);
            vertex(width * 0.37, height * 0.8);
            vertex(width * 0.39, height * 0.78);
            vertex(width * 0.55, height * 0.76);
            vertex(width * 0.58, height * 0.8);
            vertex(width * 0.8, height * 0.78);
            vertex(width * 0.83, height * 0.8);
            vertex(width * 0.77, height * 0.83);
            vertex(width * 0.7, height * 0.84);
            vertex(width * 0.62, height * 0.88);
            vertex(width * 0.58, height * 0.88);
            vertex(width * 0.48, height * 0.97);
            vertex(width * 0.58, height * 0.89);
            vertex(width * 0.63, height * 0.895);
            vertex(width * 0.71, height * 0.85);
            vertex(width * 0.78, height * 0.84);
            vertex(width * 0.83, height * 0.86);
            vertex(width * 0.86, height * 0.85);
            vertex(width * 0.875, height * 0.875);
            vertex(width * 0.855, height * 0.89);
            vertex(width * 0.89, height * 0.895);
            vertex(width * 0.76, height);
            vertex(width * 0.35, height);
            vertex(width * 0.37, height * 0.97);
            vertex(width * 0.47, height * 0.9);
            vertex(width * 0.43, height * 0.91);
            vertex(width * 0.36, height * 0.95);
            vertex(width * 0.34, height * 0.95);
            vertex(width * 0.28, height * 0.98);
            vertex(width * 0.23, height);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.8, height);
            vertex(width * 0.91, height * 0.9);
            vertex(width * 0.895, height * 0.895);
            vertex(width * 0.91, height * 0.88);
            vertex(width, height * 0.89);
            vertex(width, height);
            endShape(CLOSE);

            fill(18, 49, 136);
            beginShape();
            vertex(width * 0.355, height * 0.84);
            vertex(width * 0.385, height * 0.83);
            vertex(width * 0.46, height * 0.83);
            vertex(width * 0.39, height * 0.82);
            vertex(width * 0.37, height * 0.8);
            endShape(CLOSE);

            //Planets
            fill(129, 219, 253, 60);
            ellipse(width * 0.85, height * 0.3, width / 1.1);
            fill(129, 219, 253, 60);
            ellipse(width * 0.85, height * 0.3, width / 3);
            fill(56, 164, 253);
            ellipse(width * 0.85, height * 0.3, width / 4.5);
            fill(168, 240, 254, 200);
            ellipse(width * 0.84, height * 0.29, width / 4.7);
            fill(255)
            ellipse(width * 0.8, height * 0.2, width / 25);

            fill(193, 79, 229, 30);
            ellipse(width * 0.18, height * 0.18, width / 1.7);
            fill(193, 79, 229, 30);
            ellipse(width * 0.18, height * 0.18, width / 5.5);
            fill(193, 79, 229);
            ellipse(width * 0.18, height * 0.18, width / 9);
            fill(188, 185, 250, 200);
            ellipse(width * 0.19, height * 0.17, width / 9.2);
            fill(255)
            ellipse(width * 0.2, height * 0.12, width / 40);

            fill(50, 190, 226, 40);
            ellipse(width * 0.4, height * 0.5, width / 3.5);
            fill(50, 190, 226, 40);
            ellipse(width * 0.4, height * 0.5, width / 7);
            fill(5, 133, 221);
            ellipse(width * 0.4, height * 0.5, width / 14);
            fill(50, 190, 226, 200);
            ellipse(width * 0.41, height * 0.49, width / 14);
            fill(255)
            ellipse(width * 0.425, height * 0.47, width / 50);
        }
        
        //Draws 4th background
        if(backgroundNumber == 4)
        {
            //background
            fill(163, 239, 171);
            rect(0, 0, width, height);

            fill(223, 246, 196);
            beginShape();
            vertex(width * 0.47, height * 0.4);
            vertex(width * 0.52, height * 0.37);
            vertex(width * 0.54, height * 0.34);
            vertex(width * 0.58, height * 0.33);
            vertex(width * 0.7, height * 0.7);
            endShape(CLOSE);

            fill(205, 246, 172);
            beginShape();
            vertex(width * 0.43, height * 0.44);
            vertex(width * 0.47, height * 0.4);
            vertex(width * 0.53, height * 0.38);
            vertex(width * 0.55, height * 0.35);
            vertex(width * 0.58, height * 0.33);
            vertex(width * 0.595, height * 0.33);
            vertex(width * 0.62, height * 0.36);
            vertex(width * 0.66, height * 0.38);
            vertex(width * 0.75, height * 0.7);
            endShape(CLOSE);

            fill(147, 241, 143);
            beginShape();
            vertex(width * 0.595, height * 0.33);
            vertex(width * 0.62, height * 0.36);
            vertex(width * 0.66, height * 0.38);
            vertex(width * 0.75, height * 0.7);
            vertex(width * 0.4, height * 0.7);
            vertex(width * 0.63, height * 0.49);
            vertex(width * 0.635, height * 0.46);
            vertex(width * 0.655, height * 0.43);
            endShape(CLOSE);

            fill(125, 214, 156);
            beginShape();
            vertex(width * 0.6, height * 0.55);
            vertex(width * 0.7, height * 0.43);
            vertex(width * 0.74, height * 0.45);
            vertex(width * 0.83, height * 0.33);
            vertex(width * 0.85, height * 0.325);
            vertex(width * 0.89, height * 0.38);
            vertex(width * 0.94, height * 0.32);
            vertex(width * 0.95, height * 0.35);
            vertex(width * 0.985, height * 0.35);
            vertex(width, height * 0.33);
            vertex(width, height);
            endShape(CLOSE);

            fill(7, 188, 137);
            beginShape();
            vertex(width * 0.89, height * 0.38);
            vertex(width * 0.85, height * 0.43);
            vertex(width * 0.815, height * 0.52);
            vertex(width * 0.78, height * 0.58);
            vertex(width * 0.81, height * 0.5);
            vertex(width * 0.808, height * 0.47);
            vertex(width * 0.82, height * 0.42);
            vertex(width * 0.84, height * 0.4);
            vertex(width * 0.86, height * 0.34);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.985, height * 0.35);
            vertex(width, height * 0.33);
            vertex(width, height * 0.8);
            vertex(width * 0.8, height * 0.8);
            vertex(width * 0.87, height * 0.6);
            vertex(width * 0.92, height * 0.53);
            vertex(width * 0.935, height * 0.46);
            vertex(width * 0.97, height * 0.4);
            endShape(CLOSE);

            fill(118, 220, 146);
            beginShape();
            vertex(0, height * 0.43);
            vertex(width * 0.04, height * 0.4);
            vertex(width * 0.14, height * 0.36);
            vertex(width * 0.22, height * 0.31);
            vertex(width * 0.24, height * 0.27);
            vertex(width * 0.29, height * 0.28);
            vertex(width * 0.5, height);
            vertex(0, height);
            endShape(CLOSE);

            fill(35, 191, 92);
            beginShape();
            vertex(0, height * 0.45);
            vertex(width * 0.08, height * 0.44);
            vertex(width * 0.24, height * 0.3);
            vertex(width * 0.32, height * 0.27);
            vertex(width * 0.36, height * 0.29);
            vertex(width * 0.47, height * 0.44);
            vertex(width * 0.6, height * 0.55);
            vertex(width, height * 0.75);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            fill(0, 150, 91);
            beginShape();
            vertex(width * 0.47, height * 0.44);
            vertex(width * 0.6, height * 0.55);
            vertex(width, height * 0.75);
            vertex(width * 0.58, height * 0.6);
            vertex(width * 0.45, height * 0.46);
            vertex(width * 0.42, height * 0.373);
            endShape(CLOSE);

            fill(0, 169, 96);
            beginShape();
            vertex(0, height * 0.5);
            vertex(width * 0.08, height * 0.47);
            vertex(width * 0.12, height * 0.44);
            vertex(width * 0.15, height * 0.44);
            vertex(width * 0.2, height * 0.47);
            vertex(width * 0.24, height * 0.54);
            vertex(width * 0.27, height * 0.555);
            vertex(width * 0.31, height * 0.62);
            vertex(width * 0.8, height);
            vertex(0, height);
            endShape(CLOSE);

            fill(1, 149, 99);
            beginShape();
            vertex(0, height * 0.9);
            vertex(width * 0.24, height * 0.68);
            vertex(width * 0.245, height * 0.6);
            vertex(width * 0.27, height * 0.555);
            vertex(width * 0.31, height * 0.62);
            vertex(width * 0.8, height);
            vertex(0, height);
            endShape(CLOSE);

            fill(0, 76, 76);
            beginShape();
            vertex(0, height * 0.95);
            vertex(width * 0.1, height * 0.85);
            vertex(width * 0.26, height * 0.75);
            vertex(width * 0.3, height * 0.7);
            vertex(width * 0.37, height * 0.67);
            vertex(width * 0.42, height * 0.62);
            vertex(width * 0.44, height * 0.61);
            vertex(width * 0.45, height * 0.63);
            vertex(width * 0.475, height * 0.63);
            vertex(width * 0.485, height * 0.645);
            vertex(width * 0.51, height * 0.65);
            vertex(width * 0.52, height * 0.665);
            vertex(width * 0.53, height * 0.65);
            vertex(width * 0.545, height * 0.65);
            vertex(width * 0.58, height * 0.62);
            vertex(width * 0.6, height * 0.62);
            vertex(width * 0.67, height * 0.645);
            vertex(width * 0.69, height * 0.645);
            vertex(width * 0.8, height * 0.57);
            vertex(width * 0.96, height * 0.55);
            vertex(width, height * 0.5);
            vertex(width, height);
            vertex(0, height);
            endShape(CLOSE);

            fill(2, 72, 69);
            beginShape();
            vertex(width * 0.44, height * 0.61);
            vertex(width * 0.45, height * 0.63);
            vertex(width * 0.475, height * 0.63);
            vertex(width * 0.485, height * 0.645);
            vertex(width * 0.51, height * 0.65);
            vertex(width * 0.52, height * 0.665);
            vertex(width * 0.48, height * 0.68);
            vertex(width * 0.42, height * 0.73);
            vertex(width * 0.41, height * 0.8);
            vertex(width * 0.25, height * 0.93);
            vertex(width * 0.37, height * 0.78);
            vertex(width * 0.38, height * 0.72);
            vertex(width * 0.42, height * 0.68);
            endShape(CLOSE);
            beginShape();
            vertex(width * 0.6, height * 0.62);
            vertex(width * 0.67, height * 0.645);
            vertex(width * 0.69, height * 0.645);
            vertex(width * 0.6, height * 0.77);
            vertex(width * 0.45, height * 0.94);
            vertex(width * 0.57, height * 0.76);
            endShape(CLOSE);

            fill(1, 34, 39);
            beginShape();
            vertex(width * 0.65, height);
            vertex(width * 0.7, height * 0.98);
            vertex(width * 0.72, height * 0.96);
            vertex(width * 0.725, height * 0.93);
            vertex(width * 0.73, height * 0.98);
            vertex(width * 0.765, height * 0.955);
            vertex(width * 0.775, height * 0.955);
            vertex(width * 0.79, height * 0.88);
            vertex(width * 0.81, height * 0.87);
            vertex(width * 0.82, height * 0.82);
            vertex(width * 0.835, height * 0.77);
            vertex(width * 0.836, height * 0.8);
            vertex(width * 0.86, height * 0.93);
            vertex(width * 0.865, height * 0.9);
            vertex(width * 0.88, height * 0.88);
            vertex(width * 0.88, height * 0.84);
            vertex(width * 0.89, height * 0.82);
            vertex(width * 0.89, height * 0.79);
            vertex(width * 0.9, height * 0.77);
            vertex(width * 0.905, height * 0.72);
            vertex(width * 0.91, height * 0.77);
            vertex(width * 0.92, height * 0.8);
            vertex(width * 0.92, height * 0.83);
            vertex(width * 0.925, height * 0.84);
            vertex(width * 0.925, height * 0.86);
            vertex(width * 0.935, height * 0.77);
            vertex(width * 0.95, height * 0.74);
            vertex(width * 0.96, height * 0.74);
            vertex(width * 0.985, height * 0.61);
            vertex(width, height * 0.7);
            vertex(width, height);
            endShape(CLOSE);

            fill(248, 252, 215);
            ellipse(width * 0.12, height * 0.17, width / 10);
        }
    }
}