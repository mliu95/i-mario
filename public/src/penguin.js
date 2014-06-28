require(['./src/snowball'], function () {
  Q.Sprite.extend('Penguin',{
    init: function(p) {
      this._super(p, {
        sheet: 'goomba',
        sprite: 'goomba',
        scale: 0.15,
        snowballStep: 0
      });
      this.add('2d, aiBounce, animation');

      this.on('bump.left,bump.right,bump.bottom',function(collision) {
        if(collision.obj.isA('Player')) {
          collision.obj.trigger('damage');
        }
      });

      this.on('bump.top',function(collision) {
        if(collision.obj.isA('Player')) {
          this.destroy();
          collision.obj.p.vy = -300;
        }
      });
    },
    step: function () {
      var player = Q('Player').items[0];
      if (player) {
        if(this.p.x - player.p.x > 0){
          this.p.direction = "right";
        } else {
          this.p.direction = "left";
        }
      }
      if(this.p.snowballStep === 100){
        if(this.p.direction === "right") {
          this.stage.insert(new Q.Snowball({ x: this.p.x - 15, y: this.p.y, vx: -150, vy: -400 }));
        } else {
          this.stage.insert(new Q.Snowball({ x: this.p.x + 15, y: this.p.y, vx:  150, vy: -400 }));
        }
        this.p.snowballStep = 0;
      }
      this.p.snowballStep++;
    }
  });
});
