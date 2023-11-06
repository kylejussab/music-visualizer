//Container function for the visualisations
class Visualisations
{
	constructor()
	{
		//Array to store visualisations
		this.visuals = [];

		//Currently selected vis
		this.selectedVisual = null;
	}

	//Method to add a new visualisation to the array
	add(vis)
	{
		this.visuals.push(vis);

		//If selectedVisual is null set the new visual as the current visualiation
		if(this.selectedVisual == null)
		{
			this.selectVisual(vis.name);
		}
	}

	//Select a visualisation using its name property
	selectVisual(visName)
	{
		for(let e of this.visuals)
		{
			//If the name of the new visualisation is the same as one in the array, change selectedVisual
			if(visName == e.name)
			{
				this.selectedVisual = e;

				//If the visualisation has an onResize method then call it
				if(e.hasOwnProperty('changeSize'))
				{
					e.onResize();
				}
			}
		}
	}
}
