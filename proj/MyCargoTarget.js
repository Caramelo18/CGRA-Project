/**
 * MyCargoTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
 
function MyCargoTarget(scene) {
	CGFobject.call(this,scene);

	this.target = new MyClockDisplay(scene, 20);
	this.target.initBuffers();
	
	this.x = 4;
	this.y = 3.81;
	this.z = 8;
	this.scale = 1.5;
	
	
	
};

MyCargoTarget.prototype = Object.create(CGFobject.prototype);
MyCargoTarget.prototype.constructor=MyCargoTarget;


MyCargoTarget.prototype.display = function()
{	

	this.scene.pushMatrix();
		this.scene.material2.apply();
		this.scene.translate(this.x, this.y, this.z);
		this.scene.scale(this.scale, this.scale, this.scale);
		this.scene.rotate(90*degToRad, 1, 0, 0);
		this.scene.materialDefault.apply();
		this.target.display();
	this.scene.popMatrix();
}