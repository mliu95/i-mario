// require([], function () {
//   Q.Sprite.extend("Mashroom",{
//     init: function(p) {
//       this._super(p, {
//         sheet: "mashroom",
//         scale: 0.05,
//         gravity: 0
//       });

//       this.add('2d, aiBounce');

//       this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
//         if(collision.obj.isA("Player")) {
//           this.destroy();
//         }
//       });
//     }
//   });
// });


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
