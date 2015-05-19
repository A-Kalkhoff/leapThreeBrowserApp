$(document).ready(function(){
	triLeap.inputString = "";
	triLeap.inputPosition = {0: -50, 1: 150, 2: 0};
	triLeap.inputObject;

	triLeap.addInputToScene = function(){
	    var texture = triLeap.getInputTexture();
	    // initialize standard mesh
	    var geometry = new THREE.BoxGeometry( triLeap.buttonWidth*4, triLeap.buttonHeight, triLeap.buttonDepth );
	    var input = new THREE.Mesh( geometry, texture );
	    input.position.set(triLeap.inputPosition[0], triLeap.inputPosition[1], triLeap.inputPosition[2]);

	    triLeap.inputObject = input;
    	triLeap.scene.add( triLeap.inputObject );
	};

	triLeap.clearInputFromScene = function() {
	    triLeap.scene.remove(triLeap.inputObject);
	    triLeap.inputObject;
	};


  triLeap.getInputTexture = function() {
    var textureCanvas = document.createElement("canvas");
    var textureCtx = textureCanvas.getContext("2d");
    textureCanvas.height = 128;
    textureCanvas.width = 512;
    textureCtx.shadowColor = "#000000";
    textureCtx.shadowBlur = 1;
    textureCtx.fillStyle = "#dddddd";
    textureCtx.fillRect(0, 0, 512, 128);
    textureCtx.fillStyle = "#0000ff";
    textureCtx.font = "36pt arial bold";
    textureCtx.fillText(triLeap.inputString, 30, 70);

    var texture = new THREE.MeshBasicMaterial({ map: new THREE.Texture(textureCanvas), transparent: false });
    texture.map.needsUpdate = true;

    return texture;
  };

	$(document).on("buttonPressed", function(e){
		triLeap.inputString += e.originalEvent.button;
		triLeap.clearInputFromScene();
		triLeap.addInputToScene();
	});
});