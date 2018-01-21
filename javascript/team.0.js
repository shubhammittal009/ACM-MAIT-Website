var winXArray = [],
    winYArray = [];

for (var i = 0; i < $(window).innerWidth(); i++) {
    winXArray.push(i);
}
    
for (var i = 0; i < $(window).innerHeight(); i++) {
    winYArray.push(i);
}

function randomPlacement(array) {
    var placement = array[Math.floor(Math.random()*array.length)];
    return placement;
}
    

var canvas = oCanvas.create({
   canvas: '#canvas',
   background: '#00040c',
   fps: 60
});

setInterval(function(){

var rectangle = canvas.display.ellipse({
   x: randomPlacement(winXArray),
   y: randomPlacement(winYArray),
   origin: { x: 'center', y: 'center' },
   radius: 0,
   fill: '#d8d8d8',
   opacity: 1
});

canvas.addChild(rectangle);

rectangle.animate({
  radius: 10,
  opacity: 0
}, {
  duration: '1000',
  easing: 'linear',
  callback: function () {
			this.remove();
		}
});

}, 100);

$(window).resize(function(){
canvas.width = $(window).innerWidth();
canvas.height = $(window).innerHeight();
});

$(window).resize();
