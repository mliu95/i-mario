require([], function () {
  Q.Sprite.extend('Narwhal',{
    init: function(p) {
      this._super(p, {
        sheet: 'goomba',
        sprite: 'goomba',
        vx: 25,
        scale: 0.10
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
});
