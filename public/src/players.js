require(['./src/fireball'], function () {
  Q.Sprite.extend('Player', {
    init: function(p, hash) {
      this._super(p, hash);

      this.add('2d, platformerControls, animation');

      Q.input.on('fire', this, 'fireWeapon');

      this.on('hit.sprite',function (collision) {
        if (collision.obj.isA('Mashroom')){
          this.p.health += 200;
          if (this.p.health > 500){
            this.p.health = 500;
          }
          Q.state.set("health", this.p.health);
          Q.audio.play('/sounds/powerup.wav');
        }

        if (collision.obj.isA('Beer')) {
          this.p.bullets += 20;
          Q.state.set("bullets", this.p.bullets);
          Q.audio.play('/sounds/gulp.wav');
        }
      });

      this.on('damage', 'onDamage');
    },
    insertHealthDisplay: function () {
      var hd = new Q.HealthDisplay();
      this.p.healthDisplay = hd;
      hd.followObject(this);
      this.stage.insert(hd);
    },
    onDamage: function () {
      this.p.health -= 100;
      Q.state.set("health", this.p.health);

      if (this.p.health <= 0) {
        Q.audio.play('/sounds/mario_die.wav');
        Q.stageScene("playerDead",1, { label: "You Died" });
        this.destroy();
        this.p.healthDisplay.destroy();
      }
    },
    fireWeapon: function () {
      if (this.p.bullets === 0 || this.p.bullets === undefined) {
        return;
      }

      if(this.p.bullets) {
        if (this.p.direction === 'left') {
          this.stage.insert(new Q.Fireball({ x: this.p.x - 15, y: this.p.y, vx: -250 , power: this.p.power}));
          // this.stage.insert(new Q.Fireball({ x: this.p.x - 15, y: this.p.y + 15, vx: -250, power: this.p.power }));
          this.p.bullets--;
        } else {
          this.stage.insert(new Q.Fireball({ x: this.p.x + 15, y: this.p.y, vx: 250 , power: this.p.power}));
          // this.stage.insert(new Q.Fireball({ x: this.p.x + 15, y: this.p.y + 15, vx: 250, power: this.p.power }));
          this.p.bullets--;
        }
     }
      Q.state.set("bullets", this.p.bullets);
      Q.audio.play('/sounds/fireball.wav');
    },
    step: function (dt) {
      if(!this.p.healthDisplay){
        this.insertHealthDisplay();
      }
      if(this.p.jumping && !this.p.jumpInput){
        this.p.jumpInput = true;
        Q.audio.play('/sounds/jump.wav', {"debounce": 500});
      } else if(!this.p.jumping && this.p.vy === 0){
        this.p.jumpInput = false;
      }
      if(this.p.y > 1000) {
        Q.stageScene('playerDead', 1, { label: "You died!" });
        this.destroy();
        Q.audio.play('/sounds/mario_die.wav');
      } else if(this.p.vx > 0) {
        this.p.flip='x';
        this.play('run_right');
      } else if(this.p.vx < 0) {
        this.p.flip='';
        this.play('run_left');
      } else {
        this.play('stand_' + this.p.direction);
      }
    }
  });
  Q.Player.extend('Alex',{
    init: function(p) {
      this._super(p, {
        sheet: 'player',
        sprite: 'player',
        flip: 'x',
        health: 100,
        jumpInput: false,
        originalHealth: 500,
        scale: 0.07,
        bullets: 0,
        power: 10
      });
      this.className = 'Player';
      Q.state.set("health", this.p.health);
    }
  });
});
