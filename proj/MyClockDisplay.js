/**
 * MyClockDisplay
 * @constructor
 */
function MyClockDisplay(scene, slices) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.initBuffers();
};

MyClockDisplay.prototype = Object.create(CGFobject.prototype);
MyClockDisplay.prototype.constructor = MyClockDisplay;

MyClockDisplay.prototype.initBuffers = function() {
    /*		
     * TODO:
     * Replace the following lines in order to build a prism with a **single mesh**.
     *
     * How can the vertices, indices and normals arrays be defined to
     * build a prism with varying number of slices and stacks?
     */

    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var increase = 2 * Math.PI / this.slices;

	
	
	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, -1);
	
	this.texCoords = [];
	this.texCoords.push(0.5, 0.5);
	
	for(var i = 0; i < this.slices; i++)
	{
		var actualDegree = i * 2 * Math.PI / this.slices;
        var x = Math.cos(actualDegree);
        var y = Math.sin(actualDegree);
		this.vertices.push(x, y, 0);
		this.texCoords.push(x*0.5 + 0.5,y*0.5 + 0.5);
		this.normals.push(0, 0, -1);
		
		if(i == this.slices - 1)
			this.indices.push(i + 1, 0, 1);
		else
			this.indices.push(i + 1, 0, i + 2);
	}
	
	
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};