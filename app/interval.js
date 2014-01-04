'use strict';

var previous,
    delta,
    update,
    now;

exports.update = function(time){
  delta = time - previous;
  previous = time;
};

exports.now = function(){
  return delta;
};
