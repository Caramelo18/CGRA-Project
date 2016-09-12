/**
 * MyClockHand
 * @constructor
 */
function MyClockHand(scene) {
    CGFobject.call(this, scene);

	this.angle = 90;
	
    this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
	
	
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	
	this.vertices.push(-0.5, 0.5, 0);
	this.vertices.push(-0.5, -0.5, 0);
	this.vertices.push(0.5, 0.5, 0);
	this.vertices.push(0.5, -0.5, 0);
	
	
	this.indices.push(0, 1, 2);
	this.indices.push(3, 2, 1);
	

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function(angle)
{
	this.angle = angle;
}