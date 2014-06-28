require([], function () {
  Q.Sprite.extend("HealthDisplay",{
    init: function(p) {
      this._super(p, {
        sheet: "health",
        sprite: "health",
        sensor: true,
        scale: 1
      });

      this.add('animation');
      this.on('sensor');
    },
    sensor: function (obj) {
      return;
    },
    followObject: function(obj) {
      this.p.following = obj;
    },
    step: function (){
      if (this.p.following){
        this.p.x = this.p.following.p.x;
        this.p.y = this.p.following.p.y - 25;
        var percentHealth = this.p.following.p.health / this.p.following.p.originalHealth;
        console.log(percentHealth);
        if (percentHealth > 0.85){
          this.play('s0');
        } else if (0.85 >= percentHealth && percentHealth > 0.7){
          this.play('s1');
        } else if (0.69 >= percentHealth && percentHealth > 0.55){
          this.play('s2');
        } else if (0.54 >= percentHealth && percentHealth > 0.4){
          this.play('s3');
        } else if (0.39 >= percentHealth && percentHealth > 0.25){
          this.play('s4');
        } else if (0.24 >= percentHealth && percentHealth > 0.1){
          this.play('s5');
        } else if (0.09 >= percentHealth && percentHealth > 0.0){
          this.play('s6');
        } else {
          this.play('s7');
        }
      }
    }
  });
});
