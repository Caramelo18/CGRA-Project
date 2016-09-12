/**
 * MySSphere
 * @constructor
 */
 
 function MySSphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySSphere.prototype = Object.create(CGFobject.prototype);
 MySSphere.prototype.constructor = MySSphere;

 MySSphere.prototype.initBuffers = function() {
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
	this.texCoords = [];
	
	
	var fi = Math.PI / (2 * this.stacks);
	var teta = (2 * Math.PI) / this.slices;
	var rect = Math.PI / 2;
	
	for(var i = 0; i < this.stacks; i++)
	{
		for(var j = 0; j < this.slices; j++)
		{
			var x = Math.sin(rect - fi * i) * Math.cos(teta * j);
			var y = Math.sin(rect - fi * i) * Math.sin(teta * j);
			var z = Math.cos(rect - fi * i);
			
			this.vertices.push(x, y, z);
			this.normals.push(x, y, z);
			this.texCoords.push(j/this.slices, i/this.stacks);
		}
	}
	
	
	var count = this.stacks * this.slices;
	

	var top = count;
	this.vertices.push(0,0,1);
	this.normals.push(0,0,1);
	
	for(var i = 0; i < this.stacks; i++)
	{
		this.vertices.push(Math.sin(rect - fi * i), 0, Math.cos(rect - fi * i));
		this.texCoords.push(0, i/this.stacks);
	}	
	
	
	this.texCoords.push(1,1);
	for(var i = 0; i < this.stacks - 1; i++)
	{
		for(var j = 0; j < this.slices - 1; j++)
		{
			this.indices.push(i * this.slices + j);
			this.indices.push(i * this.slices + j + 1);
			this.indices.push((i+1) * this.slices + j);
			this.indices.push((i+1) * this.slices + j);
			this.indices.push(i * this.slices + j + 1);
			this.indices.push((i+1) * this.slices + j+1);
		}
		this.indices.push((i + 1) * this.slices - 1);
		this.indices.push(i * this.slices);
		this.indices.push((i + 2) * this.slices - 1);
		this.indices.push((i + 2) * this.slices - 1);
		this.indices.push(i * this.slices);
		this.indices.push((i + 1) * this.slices);
	}
	
	var x = (this.stacks - 1) * this.slices;
	for(x; x < this.slices * this.stacks; x++)
	{
		this.indices.push(x, x + 1, top );
	}
	this.indices.push(this.stacks  * this.slices - 1, (this.stacks - 1) * this.slices, top);
	
	
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 
