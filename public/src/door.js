require([], function () {
  Q.Sprite.extend("Door",{
    init: function(p) {
      this._super(p, {
        sheet: "door",
        distance: 0,
        scale: 0.75,
        gravity: 0,
        sensor: true,
        scale: 0.25
      });

      this.on("sensor");
    },
    sensor: function (obj) {
      this.stage.trigger("complete");
    }
  });
});
