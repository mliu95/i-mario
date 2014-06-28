require([], function () {
  Q.Sprite.extend("Shoe",{
    init: function(p) {
      this._super(p, {
        sheet: "fireball",
        dist: 0,
        scale: 0.5,
        sensor: true
      });

      this.add('2d, aiBounce');

      this.on('bump.bottom',function(collision) {
        if(collision.obj.isA('TileLayer')) {
          this.p.vy = -300;
        }
        if (collision.obj.isA('Player')) {
          collision.obj.trigger('damage', this.p.power);
          this.destroy();
        }
      });

      this.on("bump.left, bump.top, bump.right", function (collision) {
        if (collision.obj.isA('Player')) {
          collision.obj.trigger('damage', this.p.power);
          this.destroy();
        }
      });
    },
    step: function (dt) {
      this.p.dist += 1;

      if (this.p.dist === 100) {
        this.destroy();
      }
    }
  });
});
