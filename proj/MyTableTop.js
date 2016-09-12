/**
 * MyTableTop
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTableTop(scene) //materialL, materialT) 
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

MyTableTop.prototype = Object.create(CGFobject.prototype);
MyTableTop.prototype.constructor=MyTableTop;

MyTableTop.prototype.display = function()
{

	var dx = this.tableLength/2 - 0.15;
	var dy = this.tableHeight/2;
	var dz = this.tableWidth/2 - 0.15;
	var h = this.tableHeight;

	var lw = 3/5 * this.tableLength * 0.1;
	
	this.scene.appl
	this.scene.pushMatrix();

	// tampo da mesa
	this.scene.translate(0,h + 0.15,0);
	this.scene.scale(this.tableLength,0.3,this.tableWidth);
	this.quad.display();
	
	this.scene.popMatrix();
}