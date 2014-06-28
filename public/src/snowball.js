require([], function () {
  Q.Sprite.extend("Snowball",{
    init: function(p) {
      this._super(p, {
        sheet: "snowball",
        dist: 0,
        scale: 0.1,
        sensor: true
      });

      this.add('2d, aiBounce');

      this.on('bump.bottom',function(collision) {
        if(collision.obj.isA('TileLayer')) {
          this.p.vy = -300;
        }
      });

      this.on("bump.left,bump.right", function (collision) {
        if(collision.obj.isA("Player")) {
          collision.obj.trigger('damage');
          this.destroy();
        }
      });
    },
    step: function (dt) {
      this.p.dist += 1;
      this.p.angle += 20;

      if (this.p.dist === 100) {
        this.destroy();
      }
    }
  });
});
