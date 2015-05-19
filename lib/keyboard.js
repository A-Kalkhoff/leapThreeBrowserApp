$(document).ready(function(){
  triLeap.keyboardObject = new THREE.Object3D();
  triLeap.keyObjects = [];
  triLeap.buttonWidth = 20;
  triLeap.buttonHeight = 40;
  triLeap.buttonDepth = 40;

  triLeap.startingPosition = [-130, 0, -120];
  triLeap.keys = {
    0: {"letter": "A", "position" : {0: triLeap.startingPosition[0]+10, 1: triLeap.startingPosition[1]-1*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    1: {"letter": "B", "position" : {0: triLeap.startingPosition[0]+4*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-2*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    2: {"letter": "C", "position" : {0: triLeap.startingPosition[0]+2*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-2*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    3: {"letter": "D", "position" : {0: triLeap.startingPosition[0]+10+2*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-1*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    4: {"letter": "E", "position" : {0: triLeap.startingPosition[0]+2*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}},
    5: {"letter": "F", "position" : {0: triLeap.startingPosition[0]+10+3*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-1*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    6: {"letter": "G", "position" : {0: triLeap.startingPosition[0]+10+4*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-1*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    7: {"letter": "H", "position" : {0: triLeap.startingPosition[0]+10+5*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-1*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    8: {"letter": "I", "position" : {0: triLeap.startingPosition[0]+7*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}},
    9: {"letter": "J", "position" : {0: triLeap.startingPosition[0]+10+6*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-1*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    10: {"letter": "K", "position" : {0: triLeap.startingPosition[0]+10+7*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-1*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    11: {"letter": "L", "position" : {0: triLeap.startingPosition[0]+10+8*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-1*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    12: {"letter": "M", "position" : {0: triLeap.startingPosition[0]+6*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-2*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    13: {"letter": "N", "position" : {0: triLeap.startingPosition[0]+5*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-2*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    14: {"letter": "O", "position" : {0: triLeap.startingPosition[0]+8*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}},
    15: {"letter": "P", "position" : {0: triLeap.startingPosition[0]+9*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}},
    16: {"letter": "Q", "position" : {0: triLeap.startingPosition[0], 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}},
    17: {"letter": "R", "position" : {0: triLeap.startingPosition[0]+3*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}},
    18: {"letter": "S", "position" : {0: triLeap.startingPosition[0]+10+1*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-1*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    19: {"letter": "T", "position" : {0: triLeap.startingPosition[0]+4*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}},
    20: {"letter": "U", "position" : {0: triLeap.startingPosition[0]+6*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}},
    21: {"letter": "V", "position" : {0: triLeap.startingPosition[0]+3*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-2*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    22: {"letter": "W", "position" : {0: triLeap.startingPosition[0]+1*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}},
    23: {"letter": "X", "position" : {0: triLeap.startingPosition[0]+1*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1]-2*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    24: {"letter": "Y", "position" : {0: triLeap.startingPosition[0], 1: triLeap.startingPosition[1]-2*(5+triLeap.buttonHeight), 2: triLeap.startingPosition[2]}},
    25: {"letter": "Z", "position" : {0: triLeap.startingPosition[0]+5*(5+triLeap.buttonWidth), 1: triLeap.startingPosition[1], 2: triLeap.startingPosition[2]}}
  };

  triLeap.drawKeys = function(){
    $.each(triLeap.keys, function(indexKey, key){
      triLeap.drawKey(key.letter, key.position);
    });
  	//triLeap.drawKey("B");
  };

  triLeap.drawKey = function(letter, position) {
    var texture = triLeap.getButtonTexture(letter);
    // initialize standard mesh
    var geometry = new THREE.BoxGeometry( triLeap.buttonWidth, triLeap.buttonHeight, triLeap.buttonDepth );
    var button = new THREE.Mesh( geometry, texture );
    button.position.set(position[0], position[1], position[2]);
    triLeap.keyObjects.push({"letter" : letter, "button" : button});
  };

  triLeap.addKeyboardToScene = function(){
  	triLeap.drawKeys();
  	triLeap.bundleKeyboardObject();
    triLeap.scene.add( triLeap.keyboardObject );
  };

  triLeap.bundleKeyboardObject = function(){
    for (var i=0; i<triLeap.keyObjects.length; i++) {
      triLeap.keyboardObject.add(triLeap.keyObjects[i].button);
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
    textureCtx.font = "48pt arial bold";
    textureCtx.fillText(letter, 40, 85);

    var texture = new THREE.MeshBasicMaterial({ map: new THREE.Texture(textureCanvas), transparent: false });
    texture.map.needsUpdate = true;

    return texture;
  };

  triLeap.checkForKeyboardCollision = function(frame){
      $.each(frame.hands, function(handKey, hand){
        $.each(hand.fingers, function(fingerKey, finger){
          if(finger.type==1){
            $.each(triLeap.keyObjects, function(buttonKey, buttonObject) {
              if (
                finger.tipPosition[0] >= (buttonObject.button.position.x - triLeap.buttonWidth/2) &&
                finger.tipPosition[0] <= (buttonObject.button.position.x + triLeap.buttonWidth/2) &&
                (finger.tipPosition[1] + triLeap.handPositionAdjustY) >= (buttonObject.button.position.y - triLeap.buttonHeight/2) &&
                (finger.tipPosition[1] + triLeap.handPositionAdjustY) <= (buttonObject.button.position.y + triLeap.buttonHeight/2) &&
                (finger.tipPosition[2] + triLeap.handPositionAdjustZ) >= (buttonObject.button.position.z - triLeap.buttonDepth/2) &&
                (finger.tipPosition[2] + triLeap.handPositionAdjustZ) <= (buttonObject.button.position.z + triLeap.buttonDepth/2)
              ) {
                console.log(buttonObject.letter);
              }
            });
          }
        });
      });
  };

});