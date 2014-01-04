'use strict';

var hsla = require('./colour.js');

exports.create = function(hue, saturation, light, alpha){
  var initialize,
      nameToHue,
      toString,
      shift,
      saturate,
      lighten,
      darken,
      transparentize,
      limit;

  initialize = function(){
    hue = parseInt(hue, 10) || nameToHue(hue);
  };

  nameToHue = function(name){
    return ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'red'].indexOf(name) * 60;
  };

  toString = function(){
    return 'hsla(' + hue + ', ' + saturation + '%, ' + light + '%, ' + alpha + ')';
  };

 shift = function(amount){
    amount = limit(hue + amount, 0, 360);
    return hsla.create(amount, saturation, light, alpha);
  };

  saturate = function(amount){
    amount = limit(saturation + amount);
    return hsla.create(hue, amount, light, alpha);
  };

  lighten = function(amount){
    amount = limit(light + amount);
    return hsla.create(hue, saturation, amount, alpha);
  };

  darken = function(amount){
    return lighten(-amount);
  };

  transparentize = function(amount){
    amount = limit(alpha - amount, 0, 1);
    return hsla.create(hue, saturation, light, amount);
  };

  limit = function(amount, min, max){
    min = min || 0;
    max = max || 100;
    return amount < min ? min : amount > max ? max : amount;
  };

  initialize();
  return {
    toString: toString,
    shift: shift,
    saturate: saturate,
    lighten: lighten,
    darken: darken,
    transparentize: transparentize,
    hue : hue,
    saturation: saturation,
    light: light,
    alpha: alpha
  };
};
