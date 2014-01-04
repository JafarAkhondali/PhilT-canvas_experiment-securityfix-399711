'use strict';

var bullet = require('./bullet.js');

exports.create = function (context, particleCount, x, y, direction) {
  var particles = [],
      create,
      update,
      length;

  create = function(){
    var i,
        particle;

    direction += Math.random() * 0.1 - 0.05;
    if(particleCount > 0){
      particleCount -= 1;
      particle = bullet.create(context, x, y, direction);
      particles.push(particle);
    }
  };

  update = function(){
    var i,
        length,
        particle,
        alive = [];

    create();
    length = particles.length;
    for(i = 0; i < length; i += 1){
      particle = particles[i];
      particle.update();

      if(!particle.isDead()){
        alive.push(particle);
        particle.draw();
      }
    }
    particles = alive;
  };

  length = function(){
    return particles.length;
  };

  return {
    update: update,
    length: length
  };
};
