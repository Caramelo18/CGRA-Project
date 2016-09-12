/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {


    this.vertices = [];
    this.indices = [];
    this.normals = [];
	this.texCoords = [];

    var increase = 2 * Math.PI / this.slices;

	var up = this.slices;
	var down = 0;
	
	for(var i = 0; i < this.slices; i++)
	{
		var actualDegree = i * 2 * Math.PI / this.slices;
        var x = Math.cos(actualDegree);
        var y = Math.sin(actualDegree);
		this.vertices.push(x);
        this.vertices.push(y);
        this.vertices.push(0);
		
		this.texCoords.push(i/this.slices, 0);
		
		this.normals.push(x);
        this.normals.push(y);
        this.normals.push(0);
		
		
	}
    for (var j = 1; j <= this.stacks; j++) 
	{
		this.vertices.push(Math.cos(0));
        this.vertices.push(Math.sin(0));
        this.vertices.push(j / this.stacks);
		this.normals.push(Math.cos(0));
        this.normals.push(Math.sin(0));
        this.normals.push(0);
        for (var i = 1; i < this.slices; i++) 
		{

            var actualDegree = i * 2 * Math.PI / this.slices;
            var x = Math.cos(actualDegree);
            var y = Math.sin(actualDegree);

			this.vertices.push(x);
            this.vertices.push(y);
            this.vertices.push(j / this.stacks);
			
			this.texCoords.push(i/this.slices, j/this.stacks);

            this.normals.push(x);
            this.normals.push(y);
            this.normals.push(0);


            this.indices.push(up);
            this.indices.push(down + 1);
            this.indices.push(up + 1);
            this.indices.push(down);
            this.indices.push(down + 1);
            this.indices.push(up);
			up++;
			down++;

        }
		up++;
		down++;
		this.indices.push(up - 1);
        this.indices.push(down - this.slices);
        this.indices.push(up - this.slices);
        this.indices.push(down - 1);
        this.indices.push(down - this.slices);
        this.indices.push(up - 1);
		this.texCoords.push(1, j/this.stacks);
    }
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};