/**
 * MyTableLegs
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTableLegs(scene) //materialL, materialT) 
{
	CGFobject.call(this,scene);
	
	this.quad = new MyUnitCubeQuad(this.scene);
	this.quad.initBuffers();
	
	
	this.tableLength = 5;
	this.tableWidth = 3;
	this.tableHeight = 3.5;/*
	this.legsMaterial = materialL;
	this.topMaterial = materialT;*/

};

MyTableLegs.prototype = Object.create(CGFobject.prototype);
MyTableLegs.prototype.constructor=MyTableLegs;

MyTableLegs.prototype.display = function()
{

	var dx = this.tableLength/2 - 0.15;
	var dy = this.tableHeight/2;
	var dz = this.tableWidth/2 - 0.15;
	var h = this.tableHeight;

	var lw = 3/5 * this.tableLength * 0.1;
	
	this.scene.appl
	this.scene.pushMatrix();
	//pernas da mesa
	this.scene.pushMatrix();
	this.scene.translate(-dx,dy,-dz);
	this.scene.scale(lw,h,lw);
	this.quad.display();
	
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(-dx,dy,dz);
	this.scene.scale(lw,h,lw);
	this.quad.display();
	
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(dx,dy,dz);
	this.scene.scale(lw,h,lw);
	this.quad.display();
	
	this.scene.popMatrix();
	this.scene.translate(dx,dy,-dz);
	this.scene.scale(lw,h,lw);
	this.quad.display();
	
	this.scene.popMatrix();
	this.scene.pushMatrix();

	
	this.scene.popMatrix();
}