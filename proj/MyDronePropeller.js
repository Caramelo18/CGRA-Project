  /**
 * MyDronePropeller
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDronePropeller(scene) {
	CGFobject.call(this,scene);

	this.blade = new MyCylinder(scene, 10, 4);
	this.blade.initBuffers();
	
	this.base = new MySSphere(scene, 20, 10);
	this.base.initBuffers();
	
	this.angle = 0;
	this.speed = 36;
};

MyDronePropeller.prototype = Object.create(CGFobject.prototype);
MyDronePropeller.prototype.constructor=MyDronePropeller;

MyDronePropeller.prototype.display = function()
{
	
	this.scene.pushMatrix();
	this.scene.translate(-0.5, 0, -0.25);
	
	this.scene.pushMatrix();
	this.scene.scale(0.7, 0.7, 0.7);
	this.scene.translate(0.7, -1, 0.35);
	this.scene.rotate(90*degToRad, -1, 0, 0);
	this.base.display();
	this.scene.popMatrix();
	
	this.scene.popMatrix();
	this.scene.rotate(this.angle*degToRad, 0, 1, 0);
	this.scene.translate(-0.5, 0, -0.25);
	
	this.scene.pushMatrix();
	this.scene.translate(-0.45, -0.7, 0);
	this.scene.scale(0.9,0.05,0.5);
	this.blade.display();
	this.scene.translate(2,0,0);
	this.blade.display();
	this.scene.popMatrix();
	
}

MyDronePropeller.prototype.update = function()
{
	this.angle += this.speed;
}

MyDronePropeller.prototype.setSpeed = function(speed)
{
	this.speed = speed;
}