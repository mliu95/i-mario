require([], function () {
  Q.Sprite.extend("Princess",{
    init: function(p) {
      this._super(p, {
        sheet: "princess",
        sprite: 'princess',
        distance: 0,
        scale: 0.75,
        gravity: 0,
        sensor: true
      });

      this.on("sensor");
    },
    sensor: function (obj) {
      this.stage.trigger("complete");
      this.destroy();
    }
  });
});
