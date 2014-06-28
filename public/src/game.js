var Q = Quintus({audioSupported: [ 'wav','mp3' ]})
      .include('Sprites, Scenes, Input, 2D, Anim, Touch, UI, Audio')
      .setup({ maximize: true })
      .enableSound()
      .controls().touch();

var CURRENT_LEVEL = 'debug';
var UiHealth = document.getElementById("health");
var UiFireballs = document.getElementById("fireballs");

Q.animations('player', {
  run_left: { frames: [3, 1, 2], rate: 1/5 },
  run_right: { frames: [3, 1, 2], rate: 1/5 },
  stand_right: { frames: [4], rate: 1/3 },
  stand_left: { frames: [4], rate: 1/3 },
});

Q.animations('health', {
  s0: { frames: [0] },
  s1: { frames: [1] },
  s2: { frames: [2] },
  s3: { frames: [3] },
  s4: { frames: [4] },
  s5: { frames: [5] },
  s6: { frames: [6] },
  s7: { frames: [7] }
});

Q.animations('princess', {
  cry: { frames: [1, 2, 3, 4, 5, 6, 7], rate: 1/2 }
});

Q.animations('boss', {
  walk: { frames: [1, 2, 3, 4, 5], rate: 1/2 }
});

var objectFiles = [
  './src/players',
  './src/enemies',
  './src/boss',
  './src/shoe',
  './src/mashroom',
  './src/princess',
  './src/health_display',
  './src/beer',
  './src/door',
  './src/stage_elements'
];

require(objectFiles, function () {
  var currentLevel = 'debug';
  Q.scene(currentLevel,function(stage) {
    stage.insert(new Q.Repeater({ asset: '/images/background.png', speedX: 0.5, speedY: 0.5, scale: 1 }));
    stage.collisionLayer(new Q.TileLayer({ dataAsset: '/maps/debug.json', sheet: 'tiles' }));

    var player = new Q.Alex({ x: 50, y: 220 });

    stage.add("viewport").follow(player);

    stage.insert(player);
    player.insertHealthDisplay();
    stage.viewport.offsetX = 130;
    stage.viewport.offsetY = 200;

    stage.insert(new Q.Narwhal({ x: 500, y: 100 }));

    stage.insert(new Q.Beer({ x: 300, y: 505 }));
    stage.insert(new Q.Beer({ x: 330, y: 505 }));
    stage.insert(new Q.Beer({ x: 360, y: 505 }));

    stage.insert(new Q.Mashroom({ x: 495, y: 250 }));
  });

  Q.scene('ui', function(stage){
    UiHealth.innerHTML = "Health: " + Q.state.get("health");
    UiFireballs.innerHTML = "Fireballs: " + Q.state.get("bullets");

    Q.state.on("change.health", this, function() {
      UiHealth.innerHTML = "Health: " + Q.state.get("health");
    });

    Q.state.on("change.bullets", this, function() {
      UiFireballs.innerHTML = "Fireballs: " + Q.state.get("bullets");
    });
  });

  Q.scene('PlayerDead',function(stage) {
    var box = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, fill: 'rgba(0,0,0,0.5)'
    }));

    var button = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: '#CCCCCC', label: 'Play Again' }));
    var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                          label: stage.options.label }));
    button.on('click',function() {
      Q.clearStages();
      Q.stageScene('debug');
    });

    box.fit(20);
  });

  Q.scene('debug',function(stage) {
    stage.insert(new Q.Repeater({ asset: '/images/background.png', speedX: 0.5, speedY: 0.5, scale: 1 }));
    stage.collisionLayer(new Q.TileLayer({ dataAsset: '/maps/debug.json', sheet: 'tiles' }));

    var player = new Q.Alex({ x: 50, y: 50 });

    stage.add('viewport').follow(player);
    stage.viewport.offsetX = 130;
    stage.viewport.offsetY = 200;

    stage.insert(player);
    player.insertHealthDisplay();

    stage.insert(new Q.Mashroom({x: 300, y:50 }));
    stage.insert(new Q.Mashroom({x: 290, y:50 }));
    stage.insert(new Q.Beer({ x: 300, y: 80 }));
    stage.insert(new Q.Beer({ x: 330, y: 80 }));
    stage.insert(new Q.Beer({ x: 360, y: 80 }));
    stage.insert(new Q.Beer({ x: 300, y: 80 }));
    stage.insert(new Q.Beer({ x: 330, y: 80 }));
    stage.insert(new Q.Beer({ x: 360, y: 80 }));
    stage.insert(new Q.Beer({ x: 300, y: 80 }));
    stage.insert(new Q.Beer({ x: 330, y: 80 }));
    stage.insert(new Q.Beer({ x: 360, y: 80 }));

    stage.insert(new Q.Narwhal({ x: 700, y: 50 }));
    Q.stageScene('ui', 1);
  });

  Q.scene('level1',function(stage) {
    stage.insert(new Q.Repeater({ asset: '/images/background.png', speedX: 0.5, speedY: 0.5, scale: 1 }));
    stage.collisionLayer(new Q.TileLayer({ dataAsset: '/maps/level1.json', sheet: 'tiles' }));

    stage.on('complete',function() { Q.stageScene('level2'); });

    stage.insert(new Q.MovingBar({ x: 1650, y: 150, yDistance: 300 }));
    stage.insert(new Q.MovingBar({ x: 2725, y: 150, yDistance: 300 }));
    stage.insert(new Q.MovingBar({ x: 2900, y: 150, yDistance: 300 }));
    var player = new Q.Alex({ x: 2250, y: 100 });

    stage.add('viewport').follow(player);
    stage.viewport.offsetX = 130;
    stage.viewport.offsetY = 200;
    stage.insert(player);
  });

  Q.scene('level2',function(stage) {
    stage.insert(new Q.Repeater({ asset: '/images/background.png', speedX: 0.5, speedY: 0.5, scale: 1 }));
    stage.collisionLayer(new Q.TileLayer({ dataAsset: '/maps/level2.json', sheet: 'tiles' }));

    stage.insert(new Q.MovingBar({ x: 100, y: 200 }));
    stage.insert(new Q.MovingBar({ x: 250, y: 200 }));

    var player = new Q.Alex({ x: 50, y: 100 });
    stage.add('viewport').follow(player);
    stage.viewport.offsetX = 130;
    stage.viewport.offsetY = 200;
    stage.insert(player);
    player.insertHealthDisplay();

    stage.on('complete',function() { Q.stageScene('level3'); });
  });

  Q.scene('level3',function(stage) {
    stage.insert(new Q.Repeater({ asset: '/images/background.png', speedX: 0.5, speedY: 0.5, scale: 1 }));
    stage.collisionLayer(new Q.TileLayer({ dataAsset: '/maps/level3.json', sheet: 'tiles' }));

    var player = new Q.Alex({ x: 50, y: 100 });

    stage.add('viewport').follow(player);
    stage.viewport.offsetX = 130;
    stage.viewport.offsetY = 200;

    stage.insert(player);
    player.insertHealthDisplay();

    stage.on('complete',function() { Q.stageScene('level3'); });
  });

  Q.scene('level4',function(stage) {
    stage.insert(new Q.Repeater({ asset: '/images/background.png', speedX: 0.5, speedY: 0.5, scale: 1 }));
    stage.collisionLayer(new Q.TileLayer({ dataAsset: '/maps/level4.json', sheet: 'tiles' }));

    var player = new Q.Alex({ x: 50, y: 100 });

    stage.add('viewport').follow(player);
    stage.viewport.offsetX = 130;
    stage.viewport.offsetY = 200;

    stage.insert(player);
    player.insertHealthDisplay();

    stage.on('complete',function() { Q.stageScene('level4'); });
  });

  Q.scene('playerDead',function(stage) {
    var box = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, fill: 'rgba(0,0,0,0.5)'
    }));

    var button = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: '#CCCCCC', label: 'Play Again' }));
    var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                          label: stage.options.label }));
    button.on('click',function() {
      Q.clearStages();
      Q.stageScene(currentLevel); // Start over at the same level.
    });

    box.fit(20);
  });

  var images;

  images = [
    '/images/mashroom.png',
    '/images/background.png',
    '/maps/debug.json',
    '/maps/level1.json',
    '/maps/level2.json',
    '/maps/level3.json',
    '/maps/level4.json',
    '/images/tiles.png',
    '/images/princess.gif',
    '/images/fluffy.png',
    '/images/monster.png',
    '/images/narwhal.png',
    '/images/goomba.png',
    '/images/boss.png',
    '/images/mario1.png',
    '/images/mario_fireball.gif',
    '/images/boss_fireball.gif',
    '/images/beer.png',
    '/images/bar.png',
    '/images/door.png',
    '/sounds/fireball.wav',
    '/sounds/stomp.wav',
    '/sounds/boss_fireball.wav',
    '/sounds/gulp.wav',
    '/images/health.png',
    '/sounds/mario_die.wav',
    '/images/snowball.png',
    '/sounds/jump.wav',
    '/sounds/powerup.wav',
    '/sounds/world_clear.wav'
  ];

  Q.load(images.join(',') , function() {
    Q.sheet('tiles','/images/tiles.png', { tilew: 32, tileh: 32 });
    Q.sheet('tiles','/images/tiles.png', { tilew: 32, tileh: 32 });
    Q.sheet('player', '/images/mario1.png', { tilew: 400, tileh: 538 });
    Q.sheet('princess', '/images/princess.gif', { tilew: 24, tileh: 44 });
    Q.sheet('boss', '/images/boss.png', { tilew: 51 , tileh: 46 });
    Q.sheet('goomba', '/images/monster.png', { tilew: 500, tileh: 437 });
    Q.sheet('dragon', '/images/fluffy.png', { tilew: 500, tileh: 392 });
    Q.sheet('narwhal', '/images/narwhal.png', { tilew: 800, tileh: 434 });
    Q.sheet('mashroom', '/images/mashroom.png', { tilew: 483, tileh: 480 });
    Q.sheet('fireball', '/images/mario_fireball.gif', { tilew: 20, tileh: 20 });
    Q.sheet('snowball', '/images/snowball.png', { tilew: 140, tileh: 129 });
    Q.sheet('bossfire', '/images/boss_fireball.gif', { tilew: 48, tileh: 16 });
    Q.sheet('beer', '/images/beer.png', { tilew: 32, tileh: 32 });
    Q.sheet('door', '/images/door.png', { tilew: 188, tileh: 225 });
    Q.sheet('health', '/images/health.png', { tilew: 16, tileh: 16 });
    Q.sheet('bar', '/images/bar.png', { tilew: 134, tileh: 32 });
    Q.stageScene('level1');
    Q.state.reset({ "bullets": 0, "health": 10000000 });
    Q.stageScene("ui", 1);
    Q.stageScene(CURRENT_LEVEL);
  });
});
