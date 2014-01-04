'use strict';

var explosionParticle = require('./explosionParticle.js');

exports.create = function(context, particleCount, x, y){
  var particles = [],
      create,
      update,
      length;

  create = function(){
    var i,
        hue = Math.random() * 6 * 60,
        particle;

    for(i = 0; i < 50; i += 1){
      if(particleCount > 0){
        particleCount -= 1;
        particle = explosionParticle.create(context, x, y, hue);
        particles.push(particle);
      }else{
        break;
      }
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
