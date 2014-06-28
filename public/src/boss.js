require(['./src/boss_fire'], function (BossFire) {
  Q.Sprite.extend("Boss",{
    init: function(p) {
      this._super(p, {
        sheet: "boss",
        sprite: 'boss',
        frameJumpCount: 0,
        life: 500,
        originalHealth: 500,
        scale: 0.5,
        state: "walk",
        fireCollapsedTime: 0,
        jumpCount: 0,
        waitTime: 0
      });
      this.add('2d, aiBounce, animation');

      this.on("bump.left,bump.right,bump.bottom,bump.top",function(collision) {
        if(collision.obj.isA("Player")) {
          collision.obj.trigger('damage');
        }
      });

      this.on('fireball_hit', function () {

        this.p.life -= 10;

        if (this.p.life <= 0) {
          this.destroy();
        }
      })
    },
    insertHealthDisplay: function () {
      var hd = new Q.HealthDisplay();
      this.p.healthDisplay = hd;
      stage.insert(hd);
      hd.followObject(this);
    },
    switchStates: function () {
      this.p.vx = 0;
      this.p.frameJumpCount = 0;
      this.p.jumpCount = 0;
      this.p.waitTime = 0;
    },
    step: function (dt) {
      if(!this.p.healthDisplay){
        this.insertHealthDisplay();
      }
      var player = Q('Player').items[0];
      if(player){
        if (this.p.x - player.p.x > 0){
          this.p.flip = "x";
        } else {
          this.p.flip = "";
        }
        if (this.p.state === "walk"){
          var currentFrame;
          currentFrame = this.p.frameJumpCount++;
          if (currentFrame > 100 && currentFrame < 200 && currentFrame!== 0) {
            this.p.x += 1;
          }
          if (currentFrame > 250 && currentFrame < 350 && currentFrame!== 0) {
            this.p.x -= 1;
          }
          if (currentFrame > 350) {
            this.p.jumpCount++;
            this.p.frameJumpCount = 0;
            if (this.p.jumpCount > 1){
              this.switchStates();
              this.p.state = "dashWait";
            }
          }
          this.p.fireCollapsedTime += 1;
          if (this.p.fireCollapsedTime >= 200) {
            this.p.fireCollapsedTime = 0;
            if((player.p.x - this.p.x)/(Math.abs(player.p.x - this.p.x)) < 0){
              this.stage.insert(new Q.BossFire({ x: this.p.x - 30, y: this.p.y, vx: -250, vy: 0, flip: "x" }));
            } else {
              this.stage.insert(new Q.BossFire({ x: this.p.x + 30, y: this.p.y, vx: 250, vy: 0 }));
            }
            Q.audio.play('/sounds/boss_fireball.wav');
          }
        } else if (this.p.state === "dashWait"){
          var waitFrame = this.p.waitTime++;
          if (waitFrame === 200){
            this.switchStates();
            this.p.state = "dash";
          }
        } else if (this.p.state === "dash"){
          this.p.frameJumpCount++;
          if(this.p.frameJumpCount === 400){
            this.switchStates();
            this.p.state = "walk";
          } else {
            if(player){
              //Find direction of player relative to this narwhal
              this.p.vx += ((player.p.x - this.p.x)/(Math.abs(player.p.x - this.p.x))) * 20;
              if(this.p.vx > 500){
                this.p.vx = 500;
              } else if(this.p.vx < -500){
                this.p.vx = -500
              }
            }
          }
        }
      }
      this.play('walk');
    }
  });
});
