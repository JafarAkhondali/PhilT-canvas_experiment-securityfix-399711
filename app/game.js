'use strict';

var otherStats = ['objs', 'int'],
    interval = require('./interval.js'),
    stats = require('./stats.js').create(otherStats),
    bulletSalvo = require('./bulletSalvo.js'),
    explosion = require('./explosion.js'),
    ship = require('./ship.js');

exports.create = function(){
  var self = this,
      canvas,
      context,
      ship1,
      explosions = [],
      explosionsLeft = 200,
      bullets = [],
      bulletsLeft = 200,
      disableTextSelection,
      init,
      updateTime,
      animate,
      update;

  disableTextSelection = function(){
    document.addEventListener('selectstart', function(){
      return false;
    }, false);
  };

  init = function(){
    var i,
        particle;

    disableTextSelection();

    canvas = document.getElementsByTagName('canvas').item(0);

    canvas.width = window.innerWidth;
    window.canvasHeight = canvas.height = window.innerHeight;

    context = canvas.getContext('2d');

      ship1 = ship.create(context);

      ship1.move(150, 150);
      ship1.rotate(Math.PI / 2);
  };

  animate = function(timestamp){
    var i = 0,
        totalBulletCount = 0,
        length,
        x,
        y,
        direction,
        bulletCount;

    interval.update(timestamp);
    stats.begin();
    if(bulletsLeft > 0 || bullets.length > 0 ||
      explosionsLeft > 0 || explosions.length > 0 || !ship1.outsideCanvas()) {
      window.requestAnimationFrame(animate)
    }

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if(Math.floor(Math.random() * 10) === 0 && bulletsLeft > 0){
      bulletsLeft -= 4;

      while(i < 4) {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
        direction = Math.random() * Math.PI * 2;
        bullets.push(bulletSalvo.create(context, 20, x, y, direction));
        i += 1;
      }
    }

    if(Math.floor(Math.random() * 10) === 0 && explosionsLeft > 0){
      explosionsLeft -= 4;

      while(i < 4) {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
        direction = Math.random() * Math.PI * 2;
        bullets.push(explosion.create(context, 20, x, y));
        i += 1;
      }
    }

    length = bullets.length;
    while(i < length){
      bullets[i].update();
      bulletCount = bullets[i].length();
      totalBulletCount += bulletCount;
      if(bulletCount){
        i += 1;
      }else{
        bullets.splice(i, 1);
        length -= 1;
      }
    }

    length = explosions.length;
    i = 0;
    while(i < length){
      explosions[i].update();
      if(explosions[i].length()){
        i += 1;
      }else{
        explosions.splice(i, 1);
        length -= 1;
      }
    }

    stats.end();
    otherStats[0].update(totalBulletCount);
    otherStats[1].update(interval.now());

    ship1.move(1, 0);
    ship1.draw();
  };

  return {
    init: init,
    animate: animate,
  };
};
