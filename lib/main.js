$(document).ready(function(){
  window.triDebug;
  window.triLeap = {};

  triLeap.boneObjects = [];
  triLeap.jointObjects = [];
  triLeap.handObject = new THREE.Object3D();
  triLeap.scene = new THREE.Scene();

  triLeap.camera = new THREE.PerspectiveCamera(
    35,         // Field of view
    800 / 640,  // Aspect ratio
    .1,         // Near
    10000       // Far
  );
  triLeap.camera.position.set( 0, 0, 600 );
  triLeap.camera.lookAt( new THREE.Vector3(0, 0, 0));

  triLeap.renderer = new THREE.WebGLRenderer();
  triLeap.renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( triLeap.renderer.domElement );

  triLeap.getMeshColor = function (type) {
    var color = 0xffffff;
    switch(type) {
      case 0:
        color = 0xff0000;
        break;
      case 1:
        color = 0x0000ff;
        break;
      case 2:
        color = 0x00ff00;
        break;
      case 3:
        color = 0xff00ff;
        break;
      case 4:
        color = 0xffff00;
        break;
    }
    return color;
  };

  triLeap.draw = function(frame) {

    triLeap.scene.remove(triLeap.handObject);
    triLeap.handObject = new THREE.Object3D();
    triLeap.boneObjects = [];
    triLeap.jointObjects = [];

    triDebug = frame;

    $.each(frame.hands, function(handKey, hand){
      $.each(hand.fingers, function(fingerKey, finger){
        triLeap.drawBones(finger, finger.type);
        triLeap.drawJoints(finger);
      });
    });

    triLeap.bundleObjects();
    triLeap.scene.add( triLeap.handObject );

    //triLeap.addKeyboardToScene();
    triLeap.renderer.render(triLeap.scene, triLeap.camera);
  };

  triLeap.bundleObjects = function(){
    for (var i=0; i<triLeap.boneObjects.length; i++) {
      triLeap.handObject.add(triLeap.boneObjects[i]);
    }
    for (var i=0; i<triLeap.jointObjects.length; i++) {
      triLeap.handObject.add(triLeap.jointObjects[i]);
    }
  };

  triLeap.drawBones = function(finger, type){
    var tipPosition = finger.tipPosition;
    var dipPosition = finger.dipPosition;
    var pipPosition = finger.pipPosition;
    var mcpPosition = finger.mcpPosition;
    var carpPosition = finger.carpPosition;

    triLeap.drawBone(tipPosition, dipPosition, type);
    triLeap.drawBone(dipPosition, pipPosition, type);
    triLeap.drawBone(pipPosition, mcpPosition, type);
    triLeap.drawBone(mcpPosition, carpPosition, type);
  };

  triLeap.drawBone = function(posStart, posEnd, type){
      var geometry = new THREE.Geometry();
      geometry.vertices.push( new THREE.Vector3(posStart[0],posStart[1],posStart[2]), new THREE.Vector3(posEnd[0],posEnd[1],posEnd[2]) );
      var meshColor = triLeap.getMeshColor(type);
      var material = new THREE.LineBasicMaterial( { color: meshColor} );
      var bone = new THREE.Line( geometry, material );
      triLeap.boneObjects.push(bone);
  };

  triLeap.drawJoints = function(finger){
    var type = finger.type;
    var tipPosition = finger.tipPosition;
    var dipPosition = finger.dipPosition;
    var pipPosition = finger.pipPosition;
    var mcpPosition = finger.mcpPosition;
    var carpPosition = finger.carpPosition;

    triLeap.drawJoint(tipPosition, type);
    triLeap.drawJoint(dipPosition, type);
    triLeap.drawJoint(pipPosition, type);
    triLeap.drawJoint(mcpPosition, type);
    triLeap.drawJoint(carpPosition, type);
  };

  triLeap.drawJoint = function(pos, type){
    // initialize standard mesh
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var meshColor = triLeap.getMeshColor(type);
    var material = new THREE.MeshBasicMaterial( { color: meshColor } );
    var joint = new THREE.Mesh( geometry, material );
    joint.position.set(pos[0], pos[1], pos[2]);
    triLeap.jointObjects.push(joint);
  };

  // run the animation loop with the draw command
  triLeap.controller = Leap.loop({enableGestures: true}, triLeap.draw);

  // Allow the Leap Motion to continue tracking if the client-window is not the active one (different TAB or Dev-Tools)
  Leap.loopController.setBackground(true)
});