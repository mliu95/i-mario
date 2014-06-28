require([], function () {
  Q.Sprite.extend("Mashroom",{
    init: function(p) {
      this._super(p, {
        sheet: "mashroom",
        distance: 0,
        scale: 0.75,
        gravity: 0,
        scale: 0.05,
        sensor: true
      });

      this.on("sensor");
    },
    sensor: function (obj) {
      if (obj.isA('Player')) {
        this.destroy();
      }
    }
  });
});
