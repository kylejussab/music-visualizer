//Constructor function for the Ridge Plot visualiser
class RidgePlot
{
    constructor()
    {
        //Name of the visualisation
        this.name = "Ridge Plot";

        //A dummy variable for "hasOwnProperty", if visualisation has this variable, then it calls onResize
        this.changeSize = null;
    }

    onResize()
    {
        //This array holds all the lines drawn
        this.output = [];

        //Adjust the position when the window is resized
        this.startX = width / 5;
        this.endY = height / 5;
        this.startY = height - this.endY;
        this.spectrumWidth = (width / 5) * 3;
        this.speed = 0.7 * (width/1400);
    }

    draw()
    { 
        
        //Changes the colour of the background depending on which button was clicked on
        if(controls.settingsButton.ridgePlotSettings.backgroundNumber == 1)
        {
            background(20,20,20);
            stroke(255);
        }
        else
        {
            background(220,220,220);
            stroke(20);
        }
        
        //Adds a new wave every 20 frames
        strokeWeight(2);

        if(frameCount % 20 == 0)
        {
            this.addWave();
        }

        for(let [i, e] of this.output.entries())
        {
            //Draws the wave
            beginShape();

            for(let f of e)
            {
                //Move the waves up
                f.y -= this.speed;

                //Map the position of the wave to a colour value between 0 and 255
                const blue = map(f.y, this.startY, this.endY, 0, 255);
                const green = map(f.y, this.startY, this.endY, 255, 0);
                
                //Changes the colour of the wave as it raises
                controls.settingsButton.ridgePlotSettings.colour?
                fill(255, green, blue, 200):
                noFill();

                //Draws the line
                vertex(f.x, f.y);
            }

            endShape();

            //If the first line in the array is greater than the end position remove it from the array
            if(e[0].y < this.endY)
            {
                this.output.splice(i, 1);
            }
        }
    }

    addWave()
    {
        //Creates the waves, scales them accordingly, and adds them to the output array
        const w = fourier.waveform();
        const outputWave = [];
        const smallScale = 3;
        const bigScale = 40 * (width/1400);

        for(let [i, e] of w.entries())
        {
            if(i % 20 == 0)
            {
                const x = map(i, 0, 1024, this.startX, this.startX + this.spectrumWidth);

                //Draw smaller changes at the front and ends of the line
                if(i < 1024 * 0.25 || i > 1024 * 0.75)
                {
                    const y = map(e, -1, 1, -smallScale, smallScale);
                    outputWave.push(
                        {x: x, y: this.startY + y}
                    );
                }

                //Draw larger changes near the middle of the line
                else
                {
                    const y = map(e, -1, 1, -bigScale, bigScale);
                    outputWave.push(
                        {x: x, y: this.startY + y}
                    );
                }
            }
        }
        
        //Add the new wave to the output array, for it to be drawn
        this.output.push(outputWave);
    }
}