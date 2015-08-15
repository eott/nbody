function registerListeners() {
	window.addEventListener("keydown", function(event) {
		switch (event.keyCode) {
			case 87: // w
				keyStatus[0] = true;
				break;
			
			case 65: // a
				keyStatus[1] = true;
				break;
				
			case 83: // s
				keyStatus[2] = true;
				break;
				
			case 68: // d
				keyStatus[3] = true;
				break;
		}
	}, false);
	
	window.addEventListener("keyup", function(event) {
		switch (event.keyCode) {
			case 87: // w
				keyStatus[0] = false;
				break;
			
			case 65: // a
				keyStatus[1] = false;
				break;
				
			case 83: // s
				keyStatus[2] = false;
				break;
				
			case 68: // d
				keyStatus[3] = false;
				break;
		}
	}, false);
}