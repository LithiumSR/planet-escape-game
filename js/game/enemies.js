EnemiesHolder = function (game, data, particlesHolder, enemyMeshStorage){
    this.game = game;
    this.data = data;
    this.particlesHolder = particlesHolder;
    this.enemyMeshStorage = enemyMeshStorage;
    this.mesh = new THREE.Object3D();
    this.enemiesInUse = [];
  }


  EnemiesHolder.prototype.spawnEnemies = function(){
    var nEnemies = game.level;
  
    for (var i=0; i<nEnemies; i++){
      var enemy;
      if (this.data.enemiesPool.length) {
        enemy = this.data.enemiesPool.pop();
      }else{
        enemy = new Enemy();
      }
      enemy.angle = - (i*0.1);
      enemy.distance = Math.floor(Math.random() * (900 - 730 + 1)) + 730;

      if (enemy.distance < 815) {
        if (Math.random>0.5) {
          enemy.type = 0;
          enemy.mesh = enemyMeshStorage.getAirplaneMesh();
          enemy.mesh.scale.set(.17,.17,.17);
          enemy.mesh.rotation.y = 3 * Math.PI;
        } else {
          enemy.type = 3;
          enemy.mesh = enemyMeshStorage.getPterodactylMesh();
          enemy.mesh.scale.set(6, 6, 6);
          enemy.mesh.rotation.y = Math.PI;
        }

      } else {
        if (Math.random()>0.5) {
          enemy.type = 1;
          enemy.mesh = enemyMeshStorage.getAsteroidMesh();
          enemy.mesh.scale.set(40,40,40);
        } else {
          var layout = Math.floor(Math.random() * 3) + 1;
          enemy.type = 2;
          enemy.mesh = enemyMeshStorage.getSateliteMesh();
          enemy.mesh.scale.set(.03,.03,.03);
          if (layout == 1) {
            enemy.mesh.rotation.z = 27.35;
            enemy.mesh.rotation.y = 6.20;
          } else if (layout == 2) {
            enemy.mesh.rotation.z = 25.65;
            enemy.mesh.rotation.y = 6.20;
          } else {
            enemy.mesh.rotation.z = 26.35;
            enemy.mesh.rotation.y = 6.20;
          }
        }

      }
      enemy.mesh.traverse( function ( child ) {
        if ( child instanceof THREE.Object3D  ) {
          if (child.name == "propeller") enemy.propeller = child;
          else if (child.name == "parabola") enemy.sateliteDisc = child;
          else if (child.name == "topPart") enemy.sateliteTopPart = child;
          else if (child.name == "miniasteroid1") enemy.miniAsteroid1 = child;
          else if (child.name == "miniasteroid2") enemy.miniAsteroid2 = child;
          else if (child.name == "miniasteroid3") enemy.miniAsteroid3 = child;
          else if (child.name == "wingLeft") enemy.wingLeft = child;
          else if (child.name == "wingRight") enemy.wingRight = child;
          else if (child.name == "legLeft") enemy.legLeft = child;
          else if (child.name == "legRight") enemy.legRight = child;
        }
      } );

      if (enemy.type == 1) {
        var layout = Math.floor(Math.random() * 4) + 1;
        if (layout == 1) {
          enemy.miniAsteroid1.visible = false;
        } else if (layout == 2) {
          enemy.miniAsteroid1.visible = false;
          enemy.miniAsteroid2.visible = false;
        } else if (layout == 3) {
          enemy.miniAsteroid2.visible = false;
        }
      }
      
      enemy.mesh.position.y = -650 + Math.sin(enemy.angle)*enemy.distance;
      enemy.mesh.position.x = Math.cos(enemy.angle)*enemy.distance;
      this.mesh.add(enemy.mesh);
      this.enemiesInUse.push(enemy);
    }
  }
  
  EnemiesHolder.prototype.rotateEnemies = function(){
    for (var i=0; i<this.enemiesInUse.length; i++){
      var enemy = this.enemiesInUse[i];
      enemy.angle += this.game.baseSpeed*this.game.deltaTime*0.6;
      if (enemy.angle > Math.PI*2) enemy.angle -= Math.PI*2;
      enemy.mesh.position.y = -650 + Math.sin(enemy.angle)*enemy.distance;
      enemy.mesh.position.x = Math.cos(enemy.angle)*enemy.distance;
      if (enemy.type == 0) {
        enemy.propeller.rotation.x = enemy.propeller.rotation.x + 0.2 * deltaTime;
      } else if (enemy.type == 1) {
        enemy.mesh.rotation.z += Math.random()*.0015*game.deltaTime;
        enemy.mesh.rotation.y += Math.random()*.0015*game.deltaTime;
        if (enemy.miniAsteroid1!=undefined) {
          enemy.miniAsteroid1.rotation.y += Math.random()*.0025*game.deltaTime;
          enemy.miniAsteroid1.rotation.z += Math.random()*.0025*game.deltaTime;
        }
        if (enemy.miniAsteroid2!=undefined) {
        enemy.miniAsteroid2.rotation.y += Math.random()*.0035*game.deltaTime;
        enemy.miniAsteroid2.rotation.z += Math.random()*.0035*game.deltaTime;
        }
        if (enemy.miniAsteroid3!=undefined) {
        enemy.miniAsteroid3.rotation.y += Math.random()*.0015*game.deltaTime;
        enemy.miniAsteroid3.rotation.z += Math.random()*.0015*game.deltaTime;
        }
      } else if (enemy.type == 2) {
        enemy.sateliteDisc.rotation.x += 0.05;
      }
      if (game.vehicle == undefined) continue;
      var diffPos = game.vehicle.position.clone().sub(enemy.mesh.position.clone());
      var d = diffPos.length();
      if (d<15){
        this.particlesHolder.spawnParticles(false, 0, enemy.mesh.position.clone(), 15, 0x009999, 3);
  
        this.data.enemiesPool.unshift(this.enemiesInUse.splice(i,1)[0]);
        this.mesh.remove(enemy.mesh);
        if (this.game.hasShield) {
          this.particlesHolder.spawnParticles(false, 0, game.vehicle.position, 5, Colors.green, 3);
          disableShieldImmunity();
          this.mesh.remove(enemy.mesh);
        }
        else game.gameOver = true;
        i--;
      } else if (enemy.angle > Math.PI){
        this.data.enemiesPool.unshift(this.enemiesInUse.splice(i,1)[0]);
        this.mesh.remove(enemy.mesh);
        i--;
      }
    }
  }


  Enemy = function(meshStorage){
    this.type = -1;
    this.angle = 0;
    this.dist = 0;
  }