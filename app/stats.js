'use strict';

var sprintf = require('sprintf-js').sprintf;

var stat = function(parent, unit){
  var min = Infinity,
      max = 0,
      average = 0,
      element = document.createElement('li'),
      update,
      toString;

  element.style.cssText = 'float: left; padding: 4px; margin-left: 10px; background: rgba(100, 100, 100, 0.3);';
  parent.appendChild(element);

  update = function(current){
    if(isNaN(current)) { return; }
    if(typeof(sprintf) === 'undefined') return;

    current = Math.round(current);
    min = Math.min(min, current);
    max = Math.max(max, current);
    average = (average + current) / 2;
    element.textContent = sprintf("%03d %s (%03d - %03d, %03d)", current, unit, min, max, average);
  };

  return {
    update: update
  };
};

exports.create = function(otherStats){
  var startTime = Date.now(),
      previousTime = startTime,
      values = [],
      ms,
      fps,
      frames = 0,
      element,
      i,
      begin,
      end,
      update;


  element = document.createElement('ul');
  element.style.cssText = 'font-size: 10px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; color: #ccc; position: absolute; left: 2px; top: 2px; margin: 0; padding: 0; list-style-type: none;';

  ms = stat(element, 'ms');
  fps = stat(element, 'fps');
  for(i = 0; i < otherStats.length; i += 1){
    otherStats[i] = stat(element, otherStats[i]);
  }
  document.body.appendChild(element);

  begin = function(){
    startTime = Date.now();
  };

  end = function(){
    var time = Date.now();

    ms.update(time - startTime);

    frames += 1;
    if(time > previousTime + 1000){
      fps.update(Math.round((frames * 1000) / (time - previousTime)));
      previousTime = time;
      frames = 0;
    }
  };

  return {
    begin: begin,
    end: end
  };
};
