'use strict';

var hsla = require('./colour.js');

exports.create = function(context) {
  var self = {x: 0, y: 0, direction: 0},
      outsideCanvas,
      toString,
      move,
      rotate,
      draw;

  outsideCanvas = function() {
    self.x > (window.innerWidth + 50) || self.y > (window.innerHeight + 50);
  };

  toString = function(){
    return 'SHIP: x:' + self.x + ', y: ' + self.y + ', dir: ' + self.direction;
  };

  move = function(x, y){
    if (outsideCanvas()) return;

    self.x += x;
    self.y += y;
  };

  rotate = function(direction){
    self.direction += direction;
  }

  draw = function(){
    if (outsideCanvas()) return;

    var color = hsla.create(184, 50, 30, 1);

    context.save();
    context.translate(self.x, self.y);
    context.rotate(self.direction);
    context.beginPath();
    context.fillStyle = color.toString();
    context.strokeStyle = color.lighten(10).toString();
    context.shadowBlur = 15;
    context.shadowColor = color.toString();
    context.moveTo(-20, 20);
    context.quadraticCurveTo(-2, 20, 0, -20);
    context.quadraticCurveTo(2, 20, 20, 20);
    context.quadraticCurveTo(0, 35, -20, 20);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  };

  return {
    outsideCanvas: outsideCanvas,
    toString: toString,
    move: move,
    rotate: rotate,
    draw: draw
  };
};
