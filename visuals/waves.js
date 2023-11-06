/*
Constructor function for the Waves visualisation
This code was adapted from Daniel Shiffman's (The Coding Train) brightness mirror code, the link to the p5.editor is as follows:
 - https://editor.p5js.org/codingtrain/sketches/nFOs57gVh
The link to the YouTube video I watched as inspiration is as follows:
 - https://www.youtube.com/watch?v=rNqaw8LT2ZU
*/
class Waves
{
    constructor()
    {
        //Name of the visualisation
        this.name = "Waves";

        //Sets video size, scale and creates a capture from the webcam
        this.video = createCapture(VIDEO);
        this.video.size(40, 30);
        this.vScale = 16;
        this.waves = [];
    }

    draw()
    {
        const waveform = fourier.waveform();

        //Adds different values from waveform to waves and keeps the length of waves the same as the videos width
        for(let i = 0; i < 40; i++)
        {
            const wave = map(waveform[i * 25], -1, 1, height, height/2);
            
            this.waves.length >= this.video.width?
            this.waves.splice(i, 1, wave):
            this.waves.push(wave);
        }
        
        //This takes the information from the camera
        this.video.loadPixels();

        //Draws a grid of rectangles, that change is size according to the brightness, and the value its corresponding value in waves
        for (let y = 0; y < this.video.height; y++)
        {
            for (let x = 0; x < floor(this.video.width); x++)
            {
                const sizeWScale = floor((width / this.vScale) * 0.4);
                const sizeHScale = floor((height / this.vScale) * 0.54);
    
                //Brightness is calculated according to the r, g, b values of each pixel taken from the camera
                const index = (this.video.width - x + 1 + (y * this.video.width)) * 4;
                const r = this.video.pixels[index + 0];
                const g = this.video.pixels[index + 1];
                const b = this.video.pixels[index + 2];
                const bright = (r + g + b) / 3;
                const w = map(bright, 0, 255, 0, sizeHScale);

                noStroke();
                rectMode(CENTER);
    
                //If the rectangle is in the range of the waveforms highest point
                if(y * sizeHScale > this.waves[x])
                {
                    //Change the colour according to the users settings
                    controls.settingsButton.wavesSettings.colourNumber == 1?
                    fill(255, 150, 150):
                    controls.settingsButton.wavesSettings.colourNumber == 2?
                    fill(150, 255, 150):
                    fill(150, 150, 255);
                    
                    //Scale those rectangles with the brightness AND the track sound
                    rect(x * sizeWScale + 10, y * sizeHScale + 10, w + 8, w + 8);
                }

                //If the rectangles aren't within the range of the waveforms
                else
                {
                    //Scale the rectangles only by the brightness
                    fill(180);
                    rect(x * sizeWScale + 10, y * sizeHScale + 10, w, w);
                }
                
                rectMode(CORNER);
            }
        }
    }
}