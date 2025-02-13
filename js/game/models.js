var AirPlane = function () {
	this.mesh = new THREE.Object3D();
	this.mesh.name = "airPlane";

	// Cabin

	var geomCabin = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
	var matCabin = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: THREE.FlatShading });

	geomCabin.vertices[4].y -= 10;
	geomCabin.vertices[4].z += 20;
	geomCabin.vertices[5].y -= 10;
	geomCabin.vertices[5].z -= 20;
	geomCabin.vertices[6].y += 30;
	geomCabin.vertices[6].z += 20;
	geomCabin.vertices[7].y += 30;
	geomCabin.vertices[7].z -= 20;

	var cabin = new THREE.Mesh(geomCabin, matCabin);
	cabin.castShadow = true;
	cabin.receiveShadow = true;
	this.mesh.add(cabin);

	// Engine

	var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
	var matEngine = new THREE.MeshPhongMaterial({ color: Colors.white, flatShading: THREE.FlatShading });
	var engine = new THREE.Mesh(geomEngine, matEngine);
	engine.position.x = 50;
	engine.castShadow = true;
	engine.receiveShadow = true;
	cabin.add(engine);

	// Tail Plane

	var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
	var matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: THREE.FlatShading });
	var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-40, 20, 0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	cabin.add(tailPlane);

	// Wings

	var geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1);
	var matSideWing = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: THREE.FlatShading });
	var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
	sideWing.position.set(0, 15, 0);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	cabin.add(sideWing);

	var geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
	var matWindshield = new THREE.MeshPhongMaterial({ color: Colors.white, transparent: true, opacity: .3, flatShading: THREE.FlatShading });;
	var windshield = new THREE.Mesh(geomWindshield, matWindshield);
	windshield.position.set(5, 27, 0);

	windshield.castShadow = true;
	windshield.receiveShadow = true;

	this.mesh.add(windshield);

	// Propeller
	var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
	geomPropeller.vertices[4].y -= 5;
	geomPropeller.vertices[4].z += 5;
	geomPropeller.vertices[5].y -= 5;
	geomPropeller.vertices[5].z -= 5;
	geomPropeller.vertices[6].y += 5;
	geomPropeller.vertices[6].z += 5;
	geomPropeller.vertices[7].y += 5;
	geomPropeller.vertices[7].z -= 5;
	var matPropeller = new THREE.MeshPhongMaterial({ color: Colors.brown, flatShading: THREE.FlatShading });
	this.propeller = new THREE.Mesh(geomPropeller, matPropeller);

	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;

	// Blades
	var geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1);
	var matBlade = new THREE.MeshPhongMaterial({ color: Colors.brownDark, flatShading: THREE.FlatShading });
	var blade1 = new THREE.Mesh(geomBlade, matBlade);
	blade1.position.set(8, 0, 0);

	blade1.castShadow = true;
	blade1.receiveShadow = true;

	var blade2 = blade1.clone();
	blade2.rotation.x = Math.PI / 2;

	blade2.castShadow = true;
	blade2.receiveShadow = true;

	this.propeller.add(blade1);
	this.propeller.add(blade2);
	this.propeller.position.set(10, 0, 0);
	engine.add(this.propeller);

	// Wheels (axes,tires,protections and suspension)
	var wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
	var wheelProtecMat = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: THREE.FlatShading });
	var wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
	wheelProtecR.position.set(25, -20, 25);
	cabin.add(wheelProtecR);

	var wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
	var wheelTireMat = new THREE.MeshPhongMaterial({ color: Colors.brownDark, flatShading: THREE.FlatShading });
	var wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
	wheelTireR.position.set(0, -7, 0);

	var wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
	var wheelAxisMat = new THREE.MeshPhongMaterial({ color: Colors.brown, flatShading: THREE.FlatShading });
	var wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
	wheelTireR.add(wheelAxis);

	wheelProtecR.add(wheelTireR);

	var wheelProtecL = wheelProtecR.clone();
	wheelProtecL.position.z = -wheelProtecR.position.z;
	cabin.add(wheelProtecL);

	var suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
	suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0))
	var suspensionMat = new THREE.MeshPhongMaterial({ color: Colors.red, flatShading: THREE.FlatShading });
	var suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
	suspension.position.set(-35, -5, 0);
	suspension.rotation.z = -.3;
	cabin.add(suspension);
	var wheelTireB = wheelTireR.clone();
	wheelTireB.scale.set(.5, .5, .5);
	wheelTireB.position.set(0, 0, 0);
	suspension.add(wheelTireB);
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
	this.propeller.name = "propeller";
};


