//triangle object. 
//point A must be the tip of the isosceles; B, C must be specified all CW or all CCW - in our case CCW.
function triangle(isThin, ax, ay, bx, by, cx, cy) {
	this.isThin = isThin;		//otherwise it is a thick triangle
	this.ax = ax;
	this.ay = ay;
	this.bx = bx;
	this.by = by;
	this.cx = cx;
	this.cy = cy;
}

tris = new Array();

golden = (1 + Math.sqrt(5)) / 2;
update = 0;
maxDivs = 11;

cWidth = 0;
cHeight = 0;
centerX = 0;
centerY = 0;

function incUpdate() {
	update += 1;
	maxDivs -= 1;
}

// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
	
	//set canvas size and call immediately
	function setup() {
		cWidth = window.innerWidth * .8;
		cHeight = window.innerHeight * .8;
		processing.size(cWidth, cHeight);
    	processing.background(240);
		centerX = processing.width / 2;
		centerY = processing.height / 2;
		processing.translate(centerX, centerY);
		initTriangles(0);			//draw initial triangles
	}//end setup()//
	setup();	
	
	
	//iterates through every current triangle, subdividing each.
	function subdivideAll() {
		mFactor = 1.1;
		numTriangles = tris.length;
		for(var i = 0; i < numTriangles; i++) {
			var currentTri = tris.splice(0,1)[0];
			
			currentTri.ax *= mFactor;
			currentTri.ay *= mFactor;
			currentTri.bx *= mFactor;
			currentTri.by *= mFactor;
			currentTri.cx *= mFactor;
			currentTri.cy *= mFactor;
			
			if(currentTri.isThin) {
				px = currentTri.ax + (currentTri.bx - currentTri.ax) / golden;
				py = currentTri.ay + (currentTri.by - currentTri.ay) / golden;

				var newTri1 = new triangle(true, currentTri.cx, currentTri.cy, px, py, currentTri.bx, currentTri.by);
				var newTri2 = new triangle(false, px, py, currentTri.cx, currentTri.cy, currentTri.ax, currentTri.ay);		
				tris.push(newTri1);
				tris.push(newTri2);
				// console.log(newTri1);
				// console.log(newTri2);
			}
			else {
				qx = currentTri.bx + (currentTri.ax - currentTri.bx) / golden;
				qy = currentTri.by + (currentTri.ay - currentTri.by) / golden;
				
				rx = currentTri.bx + (currentTri.cx - currentTri.bx) / golden;
				ry = currentTri.by + (currentTri.cy - currentTri.by) / golden;
				
				var newTri1 = new triangle(false, qx, qy, rx, ry, currentTri.bx, currentTri.by);
				var newTri2 = new triangle(true, rx, ry, qx, qy, currentTri.ax, currentTri.ay);
				var newTri3 = new triangle(false, rx, ry, currentTri.cx, currentTri.cy, currentTri.ax, currentTri.ay);
				
				tris.push(newTri1);
				tris.push(newTri2);
				tris.push(newTri3);
			}
			// console.log(tris);
		}
	}//end subdivide()//
		
	//paint triangles to canvas
	function drawTriangles() {
		processing.noStroke();
		numTriangles = tris.length;
		for(var i = 0; i < numTriangles; i++) {
			var currentTri = tris[i];
			if(currentTri.isThin) {
				processing.fill(0, 128, 115);
				
			}
			else {
				processing.fill(0, 94, 125);
				
			}
			processing.triangle(currentTri.ax, currentTri.ay, currentTri.bx, currentTri.by, currentTri.cx, currentTri.cy);
		}
	}//end drawTriangles()
	
	//first triangles
	function initTriangles(initChoice) {
		var c = 200;
		c = centerY;
		
		if(initChoice == 0) {
			var t = new triangle(
				true, 0, 0, 
				c*Math.cos(-1.88495559), c*Math.sin(-1.88495559),
				c*Math.cos(-1.25663706), c*Math.sin(-1.25663706));
			tris.push(t);
			t = new triangle(
				true, 0, 0, 
				c*Math.cos(-.628318531), c*Math.sin(-.628318531),
				c*Math.cos(-1.25663706), c*Math.sin(-1.25663706));
			tris.push(t);
			t = new triangle(
				true, 0, 0,
				c*Math.cos(-.628318531), c*Math.sin(-.628318531),
				c, 0);
			tris.push(t);
			t = new triangle(
				true, 0, 0, 
				c*Math.cos(.628318531), c*Math.sin(.628318531), 
				c, 0);
			tris.push(t);
			t = new triangle(
				true, 0, 0, 
				c*Math.cos(.628318531), c*Math.sin(.628318531),
				c*Math.cos(1.25663706), c*Math.sin(1.25663706));
			tris.push(t);
			t = new triangle(
				true, 0, 0, 
				c*Math.cos(1.88495559), c*Math.sin(1.88495559),
				c*Math.cos(1.25663706), c*Math.sin(1.25663706));
			tris.push(t);
			t = new triangle(
				true, 0, 0, 
				-c*Math.cos(1.25663706), c*Math.sin(1.25663706),
				-c*Math.cos(.628318531), c*Math.sin(.628318531));
			tris.push(t);
			t = new triangle(
				true, 0, 0, 
				-c, 0,
				-c*Math.cos(.628318531), c*Math.sin(.628318531));
			tris.push(t);
			t = new triangle(
				true, 0, 0,
				-c, 0,
				-c*Math.cos(-.628318531), c*Math.sin(-.628318531));
			tris.push(t);
			t = new triangle(
				true, 0, 0, 
				-c*Math.cos(-1.25663706), c*Math.sin(-1.25663706),
				-c*Math.cos(-.628318531), c*Math.sin(-.628318531));
			tris.push(t);
		}
	}//end initTriangles()//
		
	processing.draw = function() { 	// Override draw function, by default it will be called 60 times per second
    	// determine center 
    	
		// cWidth = window.innerWidth;
		// cHeight = window.innerHeight;
		// processing.size(cWidth, cHeight);
	   	// processing.background(240);
		// centerX = processing.width / 2;
		// centerY = processing.height / 2;

		if(update > 0 && maxDivs > 0) {
			subdivideAll();
			update = update - 1;
			console.log("subdivided");
		}

		drawTriangles();
	}//end draw()//
}
//end sketchProc()//


var canvas = document.getElementById("canvas1");
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it