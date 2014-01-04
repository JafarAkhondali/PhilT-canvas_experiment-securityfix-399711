'use strict';

var main = require('./game.js').create();

main.init();
main.animate(window.performance.now());
