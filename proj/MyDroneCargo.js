/**
 * MyDroneCargo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
 

 
function MyDroneCargo(scene) {
	CGFobject.call(this,scene);

	this.box = new MyUnitCubeQuad(scene);
	this.box.initBuffers();
	
	this.x = 4;
	this.y = 0.5;
	this.z = 13;
	
	this.picked = false;
	this.dropped = true;
	
	this.material = new CGFappearance(this.scene); // green color
	this.material.setAmbient(0.3,0.3,0.3,1);
	this.material.setDiffuse(0.5,1,0,1);
	this.material.setSpecular(0.5,0.5,0.5,1);	
	
	this.material1 = new CGFappearance(this.scene); // blue color
	this.material1.setAmbient(0.3,0.3,0.3,1);
	this.material1.setDiffuse(0.3,0.3,0.9,1);
	this.material1.setSpecular(0.5,0.5,0.5,1);
};

MyDroneCargo.prototype = Object.create(CGFobject.prototype);
MyDroneCargo.prototype.constructor=MyDroneCargo;


MyDroneCargo.prototype.display = function()
{	

	this.scene.translate(this.x, this.y, this.z);
	this.scene.scale(2, 1, 1.5);
	if(this.picked)
		this.material.apply();
	else if(this.dropped)
		this.material1.apply();
	this.box.display();
	
}

MyDroneCargo.prototype.move = function()
{
	this.x = this.scene.drone.x;
	this.y = this.scene.drone.y - this.scene.drone.cable.length - 0.75;
	this.z = this.scene.drone.z;
}

MyDroneCargo.prototype.changeColor = function()
{
	this.picked = true;
	this.dropped = false;
}

MyDroneCargo.prototype.drop = function()
{
	this.dropped = true;
	this.picked = false;
	this.x = 4;
	this.y = 4.3;
	this.z = 8;
}
