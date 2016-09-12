/**
 * MyClock
 * @constructor
 */
 
 var degToRad = Math.PI / 180.0;
 
function MyClock(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
	
	this.cylinder = new MyCylinder(scene, slices, stacks);
	this.cylinder.initBuffers();
	
	this.clockDisplay = new MyClockDisplay(scene, slices);
	this.clockDisplay.initBuffers();
	
	this.hourHand = new MyClockHand(scene);
	this.hourHand.initBuffers();
	
	this.minHand = new MyClockHand(scene);
	this.minHand.initBuffers();
	
	this.secHand = new MyClockHand(scene);
	this.secHand.initBuffers();
	
	this.hourHand.setAngle(90);
	this.minHand.setAngle(180);
	this.secHand.setAngle(270);
	
	this.prevValue = 0;
	this.delta = 0;
	this.secs = 0;
	
	this.clockAppearance = new CGFappearance(scene);
	this.clockAppearance.loadTexture("..//resources//images//clock.png");
	this.clockAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	
	this.defMat = new CGFappearance(scene);
	this.defMat.setAmbient(0.3, 0.3, 0.3, 1);
	this.defMat.setDiffuse(0.3, 0.3, 0.3, 1);
	this.defMat.setSpecular(0.3, 0.3, 0.3, 1);
	
  //  this.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

	this.scene.pushMatrix(); // clock
		this.scene.rotate(180*degToRad, 0, 0, 1);
		this.scene.rotate(180*degToRad, 0, 1, 0);
		this.cylinder.display();
		this.clockAppearance.apply();
		this.clockDisplay.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(- this.hourHand.angle * degToRad, 0, 0, 1);
		this.scene.translate(0,0.27,0.05);
		this.scene.scale(0.06, 0.55, 1);
		this.defMat.apply();
		this.hourHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(- this.minHand.angle * degToRad, 0, 0, 1);
		this.scene.translate(0,0.33,0.05);
		this.scene.scale(0.03, 0.71, 1);
		this.defMat.apply();
		this.minHand.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.rotate(- this.secHand.angle * degToRad, 0, 0, 1);
		this.scene.translate(0,0.4,0.05);
		this.scene.scale(0.01, 0.83, 1);
		this.defMat.apply();
		this.secHand.display();
	this.scene.popMatrix();
}

MyClock.prototype.update = function(currTime) 
{	
	var secs = (currTime / 1000) % 60;
	var mins = (currTime / (1000 * 60)) % 60;
	var hrs = (currTime / (1000 * 60 * 60)) % 24;
	
	this.secHand.setAngle(secs * 360/60);
	this.minHand.setAngle(mins * 360/60);
	this.hourHand.setAngle(hrs * 360/12);
	/* 	This version works by updating the time based on the standart time
	if(this.delta == 0)
	{
		this.prevValue = currTime;
		this.delta++;
	}	
	else
	{
		this.delta += currTime - this.prevValue;
		this.prevValue = currTime;
	}
	
	var act = this.secHand.angle;
	var mAct = this.minHand.angle;
	var hAct = this.hourHand.angle;
	if(this.delta >= 1000)
	{
		this.delta = 1;
		this.secHand.setAngle(act + 360/60);
		this.minHand.setAngle(mAct + 360/(60*60));
		this.hourHand.setAngle(hAct + 360/(60*60*60));
	}*/
}