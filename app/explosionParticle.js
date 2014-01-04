'use strict';

var hsla = require('./colour.js'),
    interval = require('./interval.js');

exports.create = function(context, x, y, hue){
  var speed = 0.2,
      direction = Math.random() * Math.PI * 2,
      dx = speed * Math.cos(direction),
      dy = speed * Math.sin(direction),
      decay = Math.random() + 0.1,
      color = hsla.create(hue, 60, 50, 1),
      radius = 1,
      isDead,
      update,
      draw;

  isDead = function(){
    return (x < -20 || y < -20 ||
      x > (window.innerWidth + 20) || y > (window.innerHeight + 20)) ||
      radius < 1 ||
      color.alpha < 0.05;
  };

  update = function(){
    var speedInPixels = speed * interval.now();
    x += dx;
    y += dy;
    color = color.transparentize(decay / 15).shift(-speed / 3);
    radius += decay * 4;
  };

  draw = function(){
    context.save();
    context.globalCompositeOperation = 'lighter';
    context.translate(x, y);
    context.fillStyle = color.toString();
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  };

  return {
    update: update,
    draw: draw,
    isDead: isDead,
  };
};
