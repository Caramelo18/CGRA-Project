 /**
 * MyDroneBase
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDroneBase(scene) {
	CGFobject.call(this,scene);

	this.leg = new MyDroneLeg(scene, 20);
	this.leg.initBuffers();
	
	this.bottom = new MyUnitCubeQuad(scene);
	this.bottom.initBuffers();
};

MyDroneBase.prototype = Object.create(CGFobject.prototype);
MyDroneBase.prototype.constructor=MyDroneBase;

MyDroneBase.prototype.display = function()
{
	this.scene.pushMatrix();
	this.leg.display();
	this.scene.translate(0, 0, 1.5);
	this.leg.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(0.95, 0, 0.85);
	this.scene.scale(0.2, 0.2, 2.5);
	this.bottom.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-1, 0, 0.85);
	this.scene.scale(0.2, 0.2, 2.5);
	this.bottom.display();
	this.scene.popMatrix();
}