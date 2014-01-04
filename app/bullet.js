'use strict';

var hsla = require('./colour.js'),
    interval = require('./interval.js');

exports.create = function (context, x, y, direction) {
  var speed = 5000 / 60 / 60 / 1000, // km/ms
      dx = Math.cos(direction),
      dy = Math.sin(direction),
      x2 = 3 * Math.cos(direction),
      y2 = 3 * Math.sin(direction),
      color = hsla.create(0, 0, 60, 1).toString(),
      isDead,
      update,
      draw;

  speed += Math.random() * speed / 2;

  isDead = function(){
    return (x < -20 || y < -20 ||
      x > (window.innerWidth + 20) || y > (window.innerHeight + 20)) ||
      (dx === 0 && dy === 0);
  };

  update = function(){
    var speedInPixels = speed * interval.now() * 100;
    x += dx * speedInPixels;
    y += dy * speedInPixels;
  };

  draw = function(){
    context.save();
    context.translate(x, y);
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(x2, y2);
    context.stroke();
    context.restore();
  };

  return {
    update: update,
    draw: draw,
    isDead: isDead,
  };
};

