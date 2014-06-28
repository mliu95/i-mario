require(['./src/dragon_fire'], function () {
  Q.Sprite.extend('Dragon',{
    init: function(p) {
      this._super(p, {
        sheet: 'goomba',
        sprite: 'goomba',
        vx: -100,
        scale: 0.15,
        fireStep: 0
      });
      this.add('2d, aiBounce, animation');

      this.on('bump.left,bump.right,bump.bottom',function(collision) {
        if(collision.obj.isA('Player')) {
          collision.obj.trigger('damage');
        } if(collision.obj.isA('TileLayer')) {
          this.p.vy = -400;
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
      this.play('walk');
      if(this.p.fireStep === 50){
        if(this.p.vx < 0) {
          this.stage.insert(new Q.DragonFire({ x: this.p.x - 15, y: this.p.y, vx: -250 }));
        } else {
          this.stage.insert(new Q.DragonFire({ x: this.p.x + 15, y: this.p.y, vx: 250 }));
        }
        this.p.fireStep = 0;
      }
      this.p.fireStep++;
    }
  });
});
