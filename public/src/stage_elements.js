require([], function () {
  Q.Sprite.extend("MovingBar",{
    init: function(p) {
      this._super(p, {
        sheet: "bar",
        vx: 0,
        vy: 0,
        yDistance: 100,
        yTravel: 0,
        gravity: 0,
        isGoingUp: false
      });

      this.add('2d, aiBounce');
    },
    step: function (dt) {
      this.p.yTravel += 1;

      if (this.p.yTravel === this.p.yDistance) {
        this.p.isGoingUp = !this.p.isGoingUp;
        this.p.yTravel = 0;
      }

      if (this.p.isGoingUp) {
        this.p.y -= 1;
      } else {
        this.p.y += 1;
      }
    }
  });
});
