require([], function () {
  Q.Sprite.extend("Beer",{
    init: function(p) {
      this._super(p, {
        sheet: "beer",
        distance: 0,
        scale: 0.75,
        gravity: 0,
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
