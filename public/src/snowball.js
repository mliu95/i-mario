require([], function () {
  Q.Sprite.extend("Snowball",{
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
      });

      this.on("bump.left,bump.right", function (collision) {
        if(collision.obj.isA("Player")) {
          Q.audio.play('/sounds/mario_die.wav');
          Q.stageScene("playerDead",1, { label: "You Died" });
          collision.obj.destroy();
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
