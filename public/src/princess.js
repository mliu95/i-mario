require([], function () {
  Q.Sprite.extend("Princess", {
    init: function(p) {
      this._super(p, {
        sheet: 'princess',
        sprite: 'princess',
        shoeStep: 0
    });
      this.add('2d, animation');
    },
    step: function (dt) {
      this.play('cry');
      var player = Q('Player').items[0];
        if(player){
          if(this.p.shoeStep == 20) {
            this.p.shoeStep = 0;
              //princess to the left of mario
              if((player.p.x - this.p.x) < -40 && Math.abs(player.p.y - this.p.y) < 30)  {
                this.stage.insert(new Q.Shoe({ x: this.p.x - 15, y: this.p.y, vx: -250 , power: 1000}));
              //princess to the right of mario
              } else if ((player.p.x - this.p.x) < 40 && Math.abs(player.p.y - this.p.y) < 30) {
                this.stage.insert(new Q.Shoe({ x: this.p.x + 15, y: this.p.y, vx: 250 , power: 1000}));
              }
          }
          this.p.shoeStep++;
        }
    }
  });
});
