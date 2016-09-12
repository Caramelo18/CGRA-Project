var degToRad = Math.PI / 180.0;
var rotInc = 2;
var xzMove = 0.3;
var yMove = 0.17
var cableChange = 0.08;

/**
 * MyInterface
 * @constructor
 */
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
	
	this.move = 0;
	this.rotate = 0;
	this.height = 0;
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	

	//button to turn on/off the clock
	this.gui.add(this.scene, 'onOffClock');
	
	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Options");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', 0.1, 2);
	
	// texture list
	this.gui.add(this.scene, 'currDroneAppearance', this.scene.droneAppearanceList);
//this.gui.add(this.scene, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );
	
	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {	
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (97):	// a
			this.scene.drone.rotate(rotInc);
			break;
		case (100): // d
			this.scene.drone.rotate(-rotInc);
			break;
		case (119): // w
			this.scene.drone.move(xzMove);
			break;
		case (115): // s
			this.scene.drone.move(-xzMove);
			break;
		case (105): // i
			this.scene.drone.moveUp(yMove);
			break;	
		case (106): // j
			this.scene.drone.moveUp(-yMove);
			break;
		case (112): // p
			this.scene.drone.moveCable(-cableChange);
			break;
		case(108):  // l
			this.scene.drone.moveCable(cableChange);
			break;
	};
	
};

MyInterface.prototype.processKeyUp = function(event)
{
	this.scene.drone.reset();
}
