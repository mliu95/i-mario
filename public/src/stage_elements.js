require([], function () {
  Q.Sprite.extend("MovingBar",{
    init: function(p) {
      this._super(p, {
        sheet: "bar",
        vx: 0,
        vy: 0,
        yDistance: 50,
        yTravel: 0,
        isGoingUp: false,
        gravity: 0,
        speed: 2
      });

      this.add('aiBounce');
    },
    step: function (dt) {
      this.p.yTravel += 1;

      if (this.p.yTravel === this.p.yDistance) {
        this.p.isGoingUp = !this.p.isGoingUp;
        this.p.yTravel = 0;
      }

      if (this.p.isGoingUp) {
        this.p.y -= this.p.speed;
      } else {
        this.p.y += this.p.speed;
      }
    }
  });
});
