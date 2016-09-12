/**
 * MyDroneLeg
 * @constructor
 */
function MyDroneLeg(scene, slices) {
    CGFobject.call(this, scene);

    this.slices = slices;

    this.initBuffers();
};

MyDroneLeg.prototype = Object.create(CGFobject.prototype);
MyDroneLeg.prototype.constructor = MyDroneLeg;

MyDroneLeg.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
	this.texCoords = [];
	
	var n = 2;
	var back = 0;
	for(var i = 0; i < this.slices; i++)
	{
		var actualDegree = i * 2 * Math.PI / this.slices;
        var x = Math.cos(actualDegree);
        var y = Math.sin(actualDegree);
		
		this.vertices.push(x, y, 0);
		this.normals.push(x, y, 0);
		this.texCoords.push(i/this.slices, 0);
		
		this.vertices.push(x, y, 0.2);
        this.normals.push(x, y, 0.2);
		this.texCoords.push(i/this.slices, 1);
		
		actualDegree = (i + 1) * 2 * Math.PI / this.slices;
		x = Math.cos(actualDegree);
		y = Math.sin(actualDegree);
		
		this.vertices.push(x, y, 0);
		this.normals.push(x, y, 0);
		this.texCoords.push((i+1)/this.slices, 0);
		
		this.vertices.push(x, y, 0.2);
        this.normals.push(x, y, 0.2);
		this.texCoords.push((i+1)/this.slices, 1);
		
		this.indices.push(n--, n--, n);
		n+=2; // 2 1 0 --- 2 3 1
		this.indices.push(n++, n);
		n-=2;
		this.indices.push(n); 
		
		// other face
		this.indices.push(back++, back++, back--, back); // 0 1 2 -- 1
		back += 2;
		this.indices.push(back--, back); // 3 2
		
		n += 3;
	}
	
  /*
	this.vertices.push(Math.cos(0));
    this.vertices.push(Math.sin(0));
    this.vertices.push(j / this.stacks);
	this.normals.push(Math.cos(0));
    this.normals.push(Math.sin(0));
    this.normals.push(0);
	
	
    for (var i = 1; i < this.slices/2; i++) 
	{

        var actualDegree = i * 2 * Math.PI / this.slices;
        var x = Math.cos(actualDegree);
        var y = Math.sin(actualDegree);
		this.vertices.push(x);
        this.vertices.push(y);
        this.vertices.push(j / this.stacks);

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
    }*/
	
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};