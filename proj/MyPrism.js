/**
 * MyPrism
 * @constructor
 */
 
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() 
 {

 	this.vertices = [];
	this.indices = [];
	this.normals = [];
	
	var n = 0;
	
	var increase = 2*Math.PI / this.slices;
	
	for(var i = 0; i < this.slices; i++)
	{
		for(var j = 0; j < this.stacks; j++)
		{
			var actualDegree = i*2*Math.PI/this.slices;
			var x = Math.cos(actualDegree);
			var y = Math.sin(actualDegree);
			
			this.vertices.push(x);
			this.vertices.push(y);
			this.vertices.push((j+1)/this.stacks);
			this.vertices.push(x);
			this.vertices.push(y);
			this.vertices.push(j/this.stacks);
					

		
			this.normals.push(Math.cos(actualDegree + increase));
			this.normals.push(Math.sin(actualDegree + increase));
			this.normals.push(0);
			this.normals.push(Math.cos(actualDegree + increase));
			this.normals.push(Math.sin(actualDegree + increase));
			this.normals.push(0);
			this.normals.push(Math.cos(actualDegree + increase));
			this.normals.push(Math.sin(actualDegree + increase));
			this.normals.push(0);
			this.normals.push(Math.cos(actualDegree + increase));
			this.normals.push(Math.sin(actualDegree + increase));
			this.normals.push(0);
			
			
			x = Math.cos((i+1)*2*Math.PI/this.slices);
			y = Math.sin((i+1)*2*Math.PI/this.slices);
			
			this.vertices.push(x);
			this.vertices.push(y);
			this.vertices.push((j+1)/this.stacks);
			this.vertices.push(x);
			this.vertices.push(y);
			this.vertices.push(j/this.stacks);
			

			this.indices.push(n++);
			this.indices.push(n++);
			this.indices.push(n++);
			this.indices.push(n--);
			this.indices.push(n--);
			this.indices.push(n++);
			n+=2;
		}
	}

 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 
