function doMovement() {
	// This would be much easier with proper polar coordinates, but webdev has made me go uuuuuhhhh at math
	r = Math.sqrt(posX * posX + posY * posY);
	var dx = 0;
	var dy = 0;
	
	if (posY < 0) {
		theta = -Math.atan2(posY, posX);
	} else {
		theta = PI + (PI - Math.atan2(posY, posX));
	}
	
	if (r < colRad) {
		dx -= keyStatus[1] ? speed : 0;
		dx += keyStatus[3] ? speed : 0;
		dy -= keyStatus[0] ? speed : 0;
		dy += keyStatus[2] ? speed : 0;
	} else {
		if (theta <= PI2) { // Upper right quadrant
			dx -= keyStatus[1] ? speed : 0;
			dy += keyStatus[2] ? speed : 0;
			dx -= keyStatus[0] ? speed * 0.1 : 0;
			dy += keyStatus[3] ? speed * 0.1 : 0;
		} else if(theta <= PI) { // Upper left quadrant
			dx += keyStatus[3] ? speed : 0;
			dy += keyStatus[2] ? speed : 0;
			dx += keyStatus[0] ? speed * 0.1 : 0;
			dy += keyStatus[1] ? speed * 0.1 : 0;
		} else if(theta <= PI32) { // Lower left quadrant
			dx += keyStatus[3] ? speed : 0;
			dy -= keyStatus[0] ? speed : 0;
			dy -= keyStatus[1] ? speed * 0.1 : 0;
			dx += keyStatus[2] ? speed * 0.1 : 0;
		} else { // Lower right quadrant
			dx -= keyStatus[1] ? speed : 0;
			dy -= keyStatus[0] ? speed : 0;
			dx -= keyStatus[2] ? speed * 0.1 : 0;
			dy -= keyStatus[3] ? speed * 0.1 : 0;
		}
	}
	
	if (dx != 0 && dy != 0) {
		dy *= 0.7071067811;
		dx *= 0.7071067811;
	}
	
	posX += dx;
	posY += dy;
	posZ += zspeed;
}

function resetMovement() {
	posX = 0;
	posY = 100;
	posZ = 0;
}