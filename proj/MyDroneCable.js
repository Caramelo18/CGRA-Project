/**
 * MyDroneCable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
 

 
function MyDroneCable(scene) {
	CGFobject.call(this,scene);

	this.cable = new MyCylinder(scene, 3, 10);
	this.cable.initBuffers();
	
	this.hook = new MyUnitCubeQuad(scene);
	this.hook = new MyUnitCubeQuad(scene);
	
	this.length = 1;
	
};

MyDroneCable.prototype = Object.create(CGFobject.prototype);
MyDroneCable.prototype.constructor=MyDroneCable;


MyDroneCable.prototype.display = function()
{	
	this.scene.pushMatrix();
	this.scene.scale(0.1, this.length , 0.1);
	this.scene.rotate(90*degToRad, 1, 0, 0);
	this.cable.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(0, -this.length - 0.18, 0);
	this.scene.scale(0.35, 0.35, 0.35);
	this.hook.display();
	this.scene.popMatrix();
	
}

MyDroneCable.prototype.change = function(delta)
{
	if (this.length > 1 && delta < 0)
		this.length += delta;
	else if (this.length < 8 && delta > 0)
		this.length += delta;
}
