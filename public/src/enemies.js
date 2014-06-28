Q.Sprite.extend('Enemy',{
  init: function(p) {
    this._super(p, {
      sheet: 'goomba',
      sprite: 'goomba',
      vx: 100,
      scale: 0.15
    });
    this.addEventListeners();
  },
  addEventListeners: function() {
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
    this.play('walk');
  }
});

Q.Enemy.extend('Goomba');

require(['./src/dragon_fire'], function () {
  Q.Enemy.extend('Dragon', {
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
    },
    addEventListeners: function() {
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
    }
  });
});

Q.Enemy.extend('Narwhal', {
  addEventListeners: function () {
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
    this.play('walk');
    var player = Q('Player').items[0];
    if(player){
      if(Math.abs(player.p.y - this.p.y) < 40)  {
        //Find direction of player relative to this narwhal
        this.p.vx += ((player.p.x - this.p.x)/(Math.abs(player.p.x - this.p.x))) * 25;
        if(this.p.vx > 500){
          this.p.vx = 500;
        } else if(this.p.vx < -500){
          this.p.vx = -500
        }
      }
    }
  }
});
