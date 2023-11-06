//Constructor function for the Ridge Plot visualiser
class Noise
{
    constructor()
    {
        //Name of the visualisation
        this.name = "Noise";

        //Variables to control the speed and movement of the line
        this.speed = 0;
        this.noiseStep = 0.01;
    }

    draw()
    {
        //Call analyze before getEnergy
        fourier.analyze();
        let b = fourier.getEnergy("bass");

        //Draw the background and the lines
        this.drawBackground();
        this.noiseLine(b);

        //Set the values from the sliders to the variables for the settings
        controls.settingsButton.noiseSettings.speedIncrement = controls.settingsButton.noiseSettings.noiseSpeedSlider.value();
		controls.settingsButton.noiseSettings.columnLength = controls.settingsButton.noiseSettings.noiseColumnSlider.value();
    }

    noiseLine(energy)
    {
        noFill();

        stroke(0);
        strokeWeight(3);

        //Add speed everytime the bass is over 220
        if(energy > 220)
        {
            this.speed += controls.settingsButton.noiseSettings.speedIncrement;
        }

        //Top row
        //Create columnLength many noise lines
        for(let i = 0; i < controls.settingsButton.noiseSettings.columnLength; i++)
        {
            //Create 3 noise lines in the same place
            for(let j = 0; j < 3; j++)
            {
                //Creates 1 noise line
                beginShape();

                for(let k = 0; k < 150; k++)
                {
                    const x = map(noise(k * this.noiseStep + this.speed + 4000 + (j * 1500) + (i * 500)),
                            0, 
                            1, 
                            (width/2) + ((width/2) * (1/controls.settingsButton.noiseSettings.columnLength) * i),
                            (width/2) + (width/2) * (1/controls.settingsButton.noiseSettings.columnLength) + ((width/2) * (1/controls.settingsButton.noiseSettings.columnLength) * i));
                    const y = map(noise(k * this.noiseStep + this.speed + 5500 + (j * 1500) + (i * 500)), 0, 1, 0, height * 0.5);

                    vertex(x, y);
                }

                endShape();
            }
        }

        //Bottom row
        //Create columnLength many noise lines
        for(let i = 0; i < controls.settingsButton.noiseSettings.columnLength; i++)
        {
            //Create 3 noise lines in the same place
            for(let j = 0; j < 3; j++)
            {
                //Creates 1 noise line
                beginShape();

                for(let k = 0; k < 150; k++)
                {
                    const x = map(noise(k * this.noiseStep + this.speed + (j * 1500) + (i * 500)),
                            0, 
                            1, 
                            (width/2) + ((width/2) * (1/controls.settingsButton.noiseSettings.columnLength) * i),
                            (width/2) + (width/2) * (1/controls.settingsButton.noiseSettings.columnLength) + ((width/2) * (1/controls.settingsButton.noiseSettings.columnLength) * i));
                    const y = map(noise(k * this.noiseStep + this.speed + 1000 + (j * 1500) + (i * 500)), 0, 1, height * 0.5, height);

                    vertex(x, y);
                }
                
                endShape();
            }
        }
    }

    drawBackground()
    {
        //Draws background
        noStroke();
        fill(72, 61, 139);
        rect(0, 0, width, height);

        fill(139, 69, 19);
        beginShape();
        vertex(width * 0.47, 0);
        vertex(width, 0);
        vertex(width, height);
        vertex(width * 0.43, height);
        endShape(CLOSE);

        fill(200);
        beginShape();
        vertex(width * 0.5, height * 0.06);
        vertex(width, height * 0.06);
        vertex(width, height * 0.94);
        vertex(width * 0.46, height * 0.94);
        endShape(CLOSE);

        //Draw image, and scale correctly
        if(height <= 450)
        {
            image(noiseImage, 0, height - 300, 300, 300);
        }
        else if (height > 450 && height < 700)
        {
            width < 700? 
            image(noiseImage, 0, height - 300, 300, 300): 
            image(noiseImage, 0, height - 450, 450, 450);
        }
        else
        {
            width < 700?
            image(noiseImage, 0, height - 300, 300, 300):
            image(noiseImage, 0, height - 600, 600, 600);
        }
    }
}