$(document).ready(function(){
  window.triDebug;
  window.triLeap = this;
  triLeap.scene = new THREE.Scene();

  triLeap.camera = new THREE.PerspectiveCamera(
    35,         // Field of view
    800 / 640,  // Aspect ratio
    .1,         // Near
    10000       // Far
  );
  triLeap.camera.position.set( 0, 0, 1000 );
  triLeap.camera.lookAt( new THREE.Vector3(0, 0, 0));

  triLeap.renderer = new THREE.WebGLRenderer();
  triLeap.renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( triLeap.renderer.domElement );

  

  triLeap.draw = function(frame) {
    triLeap.clearHandFromScene();
    triLeap.addHandToScene(frame);

    triLeap.checkForKeyboardCollision(frame);

    triLeap.renderer.render(triLeap.scene, triLeap.camera);
  };


  // run the animation loop with the draw command
  triLeap.controller = Leap.loop({enableGestures: true}, triLeap.draw);

  // Allow the Leap Motion to continue tracking if the client-window is not the active one (different TAB or Dev-Tools)
  Leap.loopController.setBackground(true)

  triLeap.init = function(){
    triLeap.addKeyboardToScene();
    triLeap.addInputToScene();
    triLeap.renderer.render(triLeap.scene, triLeap.camera);
  };
});