Q.Sprite.extend("DragonFire",{
  init: function(p) {
    this._super(p, {
      sheet: "bossfire",
      distance: 0,
      scale: 0.5,
      originalY: p.y,
      vy: 0,
      gravity: 0,
      sensor: true
    });

    if (this.p.vx < 0){
      this.p.flip = "x";
    }
    this.add("2d, animation");
    this.on("sensor");

    this.on('hit',function(collision) {
      if (!collision.obj.isA('Enemy') && !collision.obj.isA('Boss') && !collision.obj.isA('Player')){
        this.destroy();
      }
    });
  },
  sensor: function (obj) {
      if (obj.isA('Boss') || obj.isA('Enemy')) {
        return;
      }

      if(obj.isA("Player")) {
        obj.trigger('damage');
        this.destroy();
      }
  },
  step: function (dt) {
    // this.p.y = this.p.originalY - 5 ;
    this.p.distance += 1;

    if (this.p.distance === 100) {
      this.destroy();
    }
  }
});
