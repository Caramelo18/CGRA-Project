/**
 * MyDrone
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
 

 
function MyDrone(scene, updatePeriod) {
	CGFobject.call(this,scene);

	this.body = new MySSphere(scene, 20, 10);
	this.body.initBuffers();
	
	this.cross = new MyCylinder(scene, 20, 10);
	this.cross.initBuffers();
	
	this.propBase = new MyCylinder(scene, 20, 2);
	this.propBase.initBuffers();
	
	this.base = new MyDroneBase(scene);
	this.base.initBuffers();
	
	this.propellerF = new MyDronePropeller(scene);
	this.propellerF.initBuffers();
	
	this.propellerB = new MyDronePropeller(scene);
	this.propellerB.initBuffers();
	
	this.propellerL = new MyDronePropeller(scene);
	this.propellerL.initBuffers();
	
	this.propellerR = new MyDronePropeller(scene);
	this.propellerR.initBuffers();
	
	this.cable = new MyDroneCable(scene);
	this.cable.initBuffers();
	
	this.pitch = 0;
	
	
	this.slow = 360 * 0.2 * updatePeriod * 0.001;
	this.normal = 360 * updatePeriod * 0.001;
	this.fast = 360 * 10 * updatePeriod * 0.001;
	
	
	this.speed = 1;
	
	this.x=7.5;
	this.y=1.35;
	this.z=8;
	this.rotation=0;
	
	
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor=MyDrone;

MyDrone.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.3, 0,
            -0.5, 0.3, 0,
            0, 0.3, 2
			];

	this.indices = [
            1, 0, 2,
			2, 0, 1
        ];
		
	
	this.primitiveType=this.scene.gl.TRIANGLES;
	
	this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
	]
	
	
	
	this.initGLBuffers();
};

MyDrone.prototype.rotate = function(angle) {
	this.rotation+=angle;
	
	this.propellerF.setSpeed(this.slow * this.speed);
	this.propellerB.setSpeed(this.slow * this.speed);
	this.propellerL.setSpeed(-this.fast * this.speed);
	this.propellerR.setSpeed(-this.fast * this.speed);
	
}

MyDrone.prototype.move = function(dist) 
{
	var movX = dist*Math.sin(this.rotation* degToRad);
	var movZ = dist*Math.cos(this.rotation* degToRad);
	this.x += movX
	this.z += movZ;
	
	if(this.checkCollision())
	{
		this.scene.droneCargo.changeColor();
		this.scene.droneCargo.move();
		if(this.readyToDrop())
			this.scene.droneCargo.drop();
	}
	if(dist > 0)
	{	
		this.propellerB.setSpeed(this.slow * this.speed);
		this.propellerF.setSpeed(this.fast * this.speed);
		if(this.pitch < 10)
			this.pitch += 1;
	}
	else
	{
		this.propellerB.setSpeed(this.fast * this.speed);
		this.propellerF.setSpeed(this.slow * this.speed);
		if(this.pitch > -10)
			this.pitch -= 1;
	}
}

MyDrone.prototype.moveUp = function(dist) 
{
	this.y+=dist;
	
	if(this.checkCollision())
	{
		this.scene.droneCargo.changeColor();
		this.scene.droneCargo.move();
		if(this.readyToDrop())
			this.scene.droneCargo.drop();
	}
}

MyDrone.prototype.moveCable = function(delta)
{
	this.cable.change(delta);
	if(this.checkCollision())
	{
		this.scene.droneCargo.changeColor();
		this.scene.droneCargo.move();
		if(this.readyToDrop())
			this.scene.droneCargo.drop();
	}
}

MyDrone.prototype.display = function()
{
	this.scene.translate(this.x, this.y, this.z);
	this.scene.rotate(this.rotation * degToRad, 0, 1, 0);
	
	// drone cable
	this.scene.pushMatrix();
	this.cable.display();
	this.scene.popMatrix();
	
	this.scene.rotate(this.pitch * degToRad, 1, 0, 0);
	
	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	
	// translates the drone to the center
	this.scene.translate(0, 0, -2);
	
	// cross
	this.scene.pushMatrix();
	this.scene.scale(0.2, 0.2, 4);
	this.cross.display();
	this.scene.popMatrix();
	
	// cross
	this.scene.pushMatrix();
	this.scene.translate(-2, 0, 2);
	this.scene.rotate(90*degToRad, 0, 1, 0);
	this.scene.scale(0.2, 0.2, 4);
	this.cross.display();
	this.scene.popMatrix();
	
	// body
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 2);
	this.scene.rotate(270*degToRad, 1, 0, 0);
	//this.droneApp.apply();
	this.body.display();
	this.scene.popMatrix();
	
	// propeller base
	this.scene.pushMatrix();
	this.scene.translate(0, -0.2, 4.3);
	this.scene.scale(0.4, 0.5, 0.4);
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.propBase.display();
	this.scene.popMatrix();
	
	// propeller base
	this.scene.pushMatrix();
	this.scene.translate(2.3, -0.2, 2);
	this.scene.scale(0.4, 0.5, 0.4);
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.propBase.display();
	this.scene.popMatrix();
	
	// propeller base
	this.scene.pushMatrix();
	this.scene.translate(0, -0.2, -0.3);
	this.scene.scale(0.4, 0.5, 0.4);
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.propBase.display();
	this.scene.popMatrix();
	
	// propeller base
	this.scene.pushMatrix();
	this.scene.translate(-2.3, -0.2, 2);
	this.scene.scale(0.4, 0.5, 0.4);
	this.scene.rotate(-90*degToRad, 1, 0, 0);
	this.propBase.display();
	this.scene.popMatrix();
	
	// base and legs
	this.scene.pushMatrix();
	this.scene.translate(0,-0.95,1.15);
	this.base.display();
	this.scene.popMatrix();
	
	// front propeller
	this.scene.pushMatrix();
	this.scene.translate(0.01, 0.64, 4.3);
	this.scene.scale(0.575, 0.5, 0.575);
	this.propellerB.display();
	this.scene.popMatrix();
	
	// right propeller
	this.scene.pushMatrix();
	this.scene.translate(2.31, 0.64, 2);
	this.scene.scale(0.575, 0.5, 0.575);
	this.propellerR.display();
	this.scene.popMatrix();
	
	// left propeller
	this.scene.pushMatrix();
	this.scene.translate(-2.29, 0.64, 2);
	this.scene.scale(0.575, 0.5, 0.575);
	this.propellerL.display();
	this.scene.popMatrix();
	
	// back propeller
	this.scene.pushMatrix();
	this.scene.translate(0.01, 0.64, -0.3);
	this.scene.scale(0.575, 0.5, 0.575);
	this.propellerF.display();
	this.scene.popMatrix();
	
	
}

MyDrone.prototype.update = function(speed)
{
	this.propellerB.update();
	this.propellerR.update();
	this.propellerL.update();
	this.propellerF.update();
	
	this.speed = speed;
	
	this.propellerB.setSpeed(this.normal * this.speed);
	this.propellerR.setSpeed(-this.normal * this.speed);
	this.propellerL.setSpeed(-this.normal * this.speed);
	this.propellerF.setSpeed(this.normal * this.speed);
	
}

MyDrone.prototype.reset = function()
{
	this.propellerB.setSpeed(this.normal * this.speed);
	this.propellerR.setSpeed(-this.normal * this.speed);
	this.propellerL.setSpeed(-this.normal * this.speed);
	this.propellerF.setSpeed(this.normal * this.speed);
	this.pitch = 0;
}

MyDrone.prototype.checkCollision = function()
{	
	if(this.y - this.cable.length - 0.75 < this.scene.droneCargo.y + 0.5 && this.y - this.cable.length > this.scene.droneCargo.y - 0.5 && 
	this.x > this.scene.droneCargo.x - 1 && this.x < this.scene.droneCargo.x + 1 && 
	this.z > this.scene.droneCargo.z - 0.75 && this.z < this.scene.droneCargo.z + 0.75)
		return true;
	else 
		return false;
}

MyDrone.prototype.readyToDrop = function()
{
	if(this.y - this.cable.length - 0.75 < this.scene.cargoTarget.y + 0.5 && this.y - this.cable.length > this.scene.cargoTarget.y - 0.5 && 
	this.x > this.scene.cargoTarget.x - 1 && this.x < this.scene.cargoTarget.x + 1 && 
	this.z > this.scene.cargoTarget.z - 0.75 && this.z < this.scene.cargoTarget.z + 0.75)
		return true;
	else 
		return false;
}
