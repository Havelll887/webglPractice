// Constructor
EarthApp = function () {
    Sim.App.call(this);
}

// Subclass Sim.App
EarthApp.prototype = new Sim.App();

// Our custom initializer
EarthApp.prototype.init = function (param) {
    // Call superclass init code to set up scene, renderer, default camera
    Sim.App.prototype.init.call(this, param);

    // Create the Earth and add it to our sim
    var earth = new Earth();
    earth.init();
    this.addObject(earth);

    let sun = new Sun();
    sun.init();
    this.addObject(sun);
}

// Custom Earth class
Earth = function () {
    Sim.Object.call(this);
}

Earth.prototype = new Sim.Object();

Earth.prototype.init = function () {
    // Create our Earth with nice texture
    let earthmap = "../images/earth_surface_2048.jpg";
    let geometry = new THREE.SphereGeometry(1, 32, 32);
    let texture = THREE.ImageUtils.loadTexture(earthmap);
    let material = new THREE.MeshPhongMaterial({ map: texture });
    let mesh = new THREE.Mesh(geometry, material);

    // Let's work in the tilt
    mesh.rotation.x = Earth.TILT;

    // Tell the framework about our object
    this.setObject3D(mesh);
}

Earth.prototype.update = function () {
    // "I feel the Earth move..."
    this.object3D.rotation.y += Earth.ROTATION_Y;
}

Sun = function () {
    Sim.Object.call(this)
}
Sun.prototype = new Sim.Object();
Sun.prototype.init = function () {
    let light = new THREE.PointLight(0xffffff, 2, 100)
    light.position.set(-10, 0, 20);
    this.setObject3D(light)
}

Earth.ROTATION_Y = 0.0025;
Earth.TILT = 0.41;