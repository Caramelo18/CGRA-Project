var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	//this.materialA.setSpecular(0.2,0.2,0.2,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	//this.materialA.setShininess(10);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);
	
	this.tableAppearance = new CGFappearance(this); // wood color
	this.tableAppearance.setAmbient(0.3,0.3,0.3,1);
	this.tableAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.tableAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.tableAppearance.setShininess(30);
	this.tableAppearance.loadTexture("..//resources//images//table.png");
	
	this.materialD = new CGFappearance(this); // walls
	this.materialD.setAmbient(0.3,0.3,0.3,1);
	this.materialD.setDiffuse(0.678,0.847,1,1);
	this.materialD.setSpecular(0.05,0.05,0.05,1);	
	this.materialD.setShininess(120);
	
	this.materialE = new CGFappearance(this); // table legs material
	this.materialE.setAmbient(0.3,0.3,0.3,1);
	this.materialE.setDiffuse(0.75,0.75,0.75,1);
	this.materialE.setSpecular(1,1,1,1);	
	this.materialE.setShininess(250);
	
	this.materialF = new CGFappearance(this); // floor 
	this.materialF.setAmbient(0.3,0.3,0.3,1);
	this.materialF.setDiffuse(0.757,0.604,0.420,1);
	this.materialF.setSpecular(0.5,0.5,0.5,1);	
	this.materialF.setShininess(120);
	this.materialF.loadTexture("..//resources//images//floor.png");
	
	this.materialG = new CGFappearance(this); // prism and cylinder 
	this.materialG.setAmbient(0.3,0.3,0.3,1);
	this.materialG.setDiffuse(0.941,0.902,0.549,1);
	this.materialG.setSpecular(0.5,0.5,0.5,1);	
	
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.windowAppearance.loadTexture("..//resources//images//window.png");
	
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("..//resources//images//slides.png");
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.slidesAppearance.setShininess(27);
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("..//resources//images//board.png");
	this.boardAppearance.setSpecular(0.65, 0.65, 0.65, 1);
	this.boardAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
	this.boardAppearance.setShininess(200);
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	
	this.updatePeriod = 20;
	
	
	// Scene elements
	this.tableTop = new MyTableTop(this);
	this.tableLegs = new MyTableLegs(this);
	this.wall = new Plane(this);
	this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.5, 1.5, 0, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.prism = new MyPrism(this, 8, 20);
	this.clock = new MyClock(this, 12, 1);
	this.drone = new MyDrone(this, this.updatePeriod);
	this.droneCargo = new MyDroneCargo(this);
	this.cargoTarget = new MyCargoTarget(this);

	
	this.enableTextures(true);
	this.setUpdatePeriod(this.updatePeriod);
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.speed = 1;
	
	this.clockOn = true;
	
	
	this.droneAppearances = new Array();
	this.droneAppearanceList = {Green : 0, PokeBall : 1, Carbon : 2};
	this.currDroneAppearance = 0;
	
	this.material1 = new CGFappearance(this); // green color
	this.material1.setAmbient(0.3,0.3,0.3,1);
	this.material1.setDiffuse(0.5,1,0,1);
	this.material1.setSpecular(0.5,0.5,0.5,1);	
	
	
	this.material2 = new CGFappearance(this); // pokeball 
	this.material2.loadTexture("..//resources//images//pb2.png");

	this.material3 = new CGFappearance(this); // carbon 
	this.material3.loadTexture("..//resources//images//carbon.jpg");
	
	this.droneAppearances.push(this.material1);
	this.droneAppearances.push(this.material2);
	this.droneAppearances.push(this.material3);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);

	
	// Positions for three lights
	this.lights[0].setPosition(4, 6, 4, 1);
	this.lights[1].setPosition(8.5, 5, 11, 1.0);
	this.lights[2].setPosition(0.1, 4, 6, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(0.5, 0.5, 0.5, 0.5);
	this.lights[0].setSpecular(0.5,0.5,0.5,0.5);
	this.lights[0].setVisible(true);
	this.lights[0].enable();

	this.lights[1].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1,1,1,1);
	this.lights[1].setVisible(true);
	this.lights[1].enable();
	
	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(0.3, 0.3, 0.1, 1);
	this.lights[2].setSpecular(0.3, 0.3, 0.1, 1);
	this.lights[2].setVisible(true);
	this.lights[2].enable();
	
	

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
	
	if(this.light1)
		this.lights[0].enable();
	else
		this.lights[0].disable();
	if(this.light2)
		this.lights[1].enable();
	else
		this.lights[1].disable();
	if(this.light3)
		this.lights[2].enable();
	else
		this.lights[2].disable();
	
}


LightingScene.prototype.display = function() {

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.materialF.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialD.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(4, 0, 8);
		this.materialE.apply();
		this.tableLegs.display();
		this.tableAppearance.apply();
		this.tableTop.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(11, 0, 8);
		this.materialE.apply();
		this.tableLegs.display();
		this.tableAppearance.apply();
		this.tableTop.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Cylinder
	this.pushMatrix();
		this.translate(10,4.75,8);
		this.rotate(90*degToRad, 1,0,0);
		this.materialG.apply();
		this.cylinder.display();
	this.popMatrix();
	
	// Prism
	this.pushMatrix();
		this.translate(12.5,4.75,8);
		this.rotate(90*degToRad, 1,0,0);
		this.materialG.apply();
		this.prism.display();
	this.popMatrix();
	
	// Clock
	this.pushMatrix();
		this.translate(7.25,7.25,0.15);
		this.scale(0.65, 0.65, 0.15);
		this.clock.display();
	this.popMatrix();
	
	
	// Drone
	this.pushMatrix();
		//this.translate(7.5, 1, 8);
		//this.rotate(210 * degToRad, 0, 1, 0);	
		this.drone.display();
	this.popMatrix();
	
	this.materialDefault.apply();
	
	this.pushMatrix();
		this.droneCargo.display();
	this.popMatrix();
	
	this.materialDefault.apply();
	
	this.pushMatrix();
		this.cargoTarget.display();
	this.popMatrix();
	// ---- END Primitive drawing section


};


LightingScene.prototype.update = function(currTime) 
{
	if(this.clockOn)
		this.clock.update(currTime);
	
	this.drone.update(this.speed);
	
}

LightingScene.prototype.doSomething = function ()
{ 
	console.log("Doing something...");
};

LightingScene.prototype.onOffClock = function()
{
	this.clockOn = !this.clockOn;
}
