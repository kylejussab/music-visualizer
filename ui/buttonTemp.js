//Parent constructor for all buttons
class Button
{
    constructor(size)
    {
        this.size = size;
    }

    posUpdate()
    {
        this.y = height - 80;
    }

    draw()
    {
        this.posUpdate();
    }
}