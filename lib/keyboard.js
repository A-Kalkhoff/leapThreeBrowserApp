$(document).ready(function(){
  triLeap.keyboardObject = new THREE.Object3D();
  triLeap.keyObjects = [];

  triLeap.drawKeys = function(){
  	triLeap.drawKey("B");
  };

  triLeap.drawKey = function(letter) {
    var texture = triLeap.getButtonTexture(letter);
    // initialize standard mesh
    var geometry = new THREE.BoxGeometry( 20, 30, 20 );
    var button = new THREE.Mesh( geometry, texture );
    button.position.set(0, 0, 0);
    triLeap.keyObjects.push(button);
  };

  triLeap.addKeyboardToScene = function(){
  	triLeap.drawKeys();
  	triLeap.bundleKeyboardObject();
    triLeap.scene.add( triLeap.keyboardObject );
  };

  triLeap.bundleKeyboardObject = function(){
    for (var i=0; i<triLeap.keyObjects.length; i++) {
      triLeap.keyboardObject.add(triLeap.keyObjects[i]);
    }
  };

  triLeap.getButtonTexture = function(letter) {
    var textureCanvas = document.createElement("canvas");
    var textureCtx = textureCanvas.getContext("2d");
    textureCanvas.width = textureCanvas.height = 128;
    textureCtx.shadowColor = "#000000";
    textureCtx.shadowBlur = 5;
    textureCtx.fillStyle = "#dddddd";
    textureCtx.fillRect(0, 0, 128, 128);
    textureCtx.fillStyle = "#0000ff";
    textureCtx.font = "40pt arial bold";
    textureCtx.fillText(letter, 40, 74);

    var texture = new THREE.MeshBasicMaterial({ map: new THREE.Texture(textureCanvas), transparent: false });
    texture.map.needsUpdate = true;

    return texture;
  };

  triLeap.addKeyboardToScene();
  triLeap.renderer.render(triLeap.scene, triLeap.camera);
});