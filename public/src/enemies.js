Q.Sprite.extend('Enemy',{
  init: function(p, hash) {
    this._super(p, hash);
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

Q.Enemy.extend('Goomba', {
  init: function(p){
    this._super(p, {
      sheet: 'goomba',
      sprite: 'goomba',
      vx: 100,
      scale: 0.15
    });
  }
});

require(['./src/dragon_fire'], function () {
  Q.Enemy.extend('Dragon', {
    init: function(p) {
      this._super(p, {
        sheet: 'goomba',
        sprite: 'goomba',
        vx: 100,
        scale: 0.15,
        fireStep: 0
      });
    },
    step: function () {
      this.play('walk');
      if(this.p.fireStep === 75){
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
  init: function(p){
    this._super(p, {
      sheet: 'goomba',
      sprite: 'goomba',
      vx: 100,
      scale: 0.15
    });
  },
  addEventListeners: function () {
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
    var player = Q('Player').items[0];
    if(player){
      if(Math.abs(player.p.y - this.p.y) < 40)  {
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
});

require(['./src/snowball'], function () {
  Q.Sprite.extend('Penguin',{
    init: function(p) {
      this._super(p, {
        sheet: 'goomba',
        sprite: 'goomba',
        scale: 0.15,
        snowballStep: 0
      });
    },
    addEventListeners: function () {
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
