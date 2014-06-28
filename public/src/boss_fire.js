require([], function () {
  Q.Sprite.extend("BossFire",{
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

      this.add("2d, animation");
      this.on("sensor");
      this.on('hit',function(collision) {
        if (!collision.obj.isA('Enemy') && !collision.obj.isA('Boss') && !collision.obj.isA('Player') && !collision.obj.isA('Fireball')){
          this.destroy();
        }
      });
    },
    sensor: function (obj) {
      if (obj.isA('Boss')) {
        return;
      }

      if(obj.isA("Player")) {
        obj.trigger('damage');
        this.destroy();
      }
    },
    step: function (dt) {
      this.p.distance += 1;

      if (this.p.distance === 100) {
        this.destroy();
      }
    }
  });
});
