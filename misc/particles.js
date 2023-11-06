//Constructor function for particles
class Particles
{
    constructor(particles)
    {
        //The number of particles that will be drawn to the screen
        this.numParticles = particles;

        //The arrays for the the particle positions and directions
        this.particlePositionsX = [];
        this.particlePositionsY = [];
        this.particleDirectionsX = [];
	    this.particleDirectionsY = [];
    }

    int()
    {
        //Initialise all the arrays with random directions, and place all the particles in the center of the screen
        for(let i = 0; i < this.numParticles; i++)
        {
            this.particlePositionsX.push(width / 2);
            this.particlePositionsY.push(height / 2);
            this.particleDirectionsX.push(random(-1, 1));
            this.particleDirectionsY.push(random(-1, 1));
        }
    }

    draw(speed)
    {
        fill(255, 255, 255, 150);
        noStroke();
        
        //Calculates the total distance from the center to the end of the canvas
		this.maxDist = dist(0, 0, width / 2, height / 2);

        for(let i = 0; i < this.numParticles; i++)
        {
            //Calculates each individual particles distance from the center to the edge
            //Speeds up the particle if it gets closer to the edge and by the tracks sound
            const d = dist(width/2, height/2, this.particlePositionsX[i], this.particlePositionsY[i]);
            const r = d / 60;
            const s = d * 2 / this.maxDist  + speed;
            ellipse(this.particlePositionsX[i], this.particlePositionsY[i], r);
            
            //Changes the particles position
            this.particlePositionsX[i] += this.particleDirectionsX[i] * s;
            this.particlePositionsY[i] += this.particleDirectionsY[i] * s;

            //If it gets to the edge of the screen, move it back to the center
            if (d > this.maxDist)
            {
                this.particlePositionsX[i] = width / 2;
                this.particlePositionsY[i] = height / 2;
            }
        }
    }
}