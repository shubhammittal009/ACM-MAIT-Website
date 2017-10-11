/*

* GALAXY LIGHT TRAILS
*AUTHOR: MEGHANSH GOEL

*/

let canvas = document.querySelector('canvas');
//sets canvas height to the window viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//specifies the centre of rotation
let centerX = canvas.width/2;
let centerY = canvas.height/2;

//calculates the maximum radius of the rotation. This is done so that maximum
//particles are in the viewport irrespective of the device viewport size
let maxRadius;
maxRadius = (innerWidth > innerHeight) ? innerHeight : innerWidth;

let c = canvas.getContext('2d');
let radiusOptions = [1,1,0.5,0.6,1.5,1,1,0.5,0.5,0.5,0.6,0.6];  //stores particle size options in an array
let particle = []; //This is the main particle array. It stores all the Particle objects
let sign = [-1,1]; //This stores the sign values used for the coordinate system. It ensures that all particle are NOT
//spawned in the first quadrant only.
let colorValues = ["#1cc5ef","#187fce","#728adb","#1cc5ef","#fcfbd1"]; // This array stores the particle color options.

c.translate(centerX,centerY); //shift the coordinate system to the calculated centre
c.scale(1,-1); //convert coordinate system to the REAL LIFE coordinate system

/*PARTICLE CLASS. IMPORTANT*/
function Particle(radius,x,y,color){
    this.radius = radius;
    this.x = x; //stores particle current x location
    this.y = y; //stores particle current y location
    this.distance = Math.sqrt(this.x*this.x + this.y*this.y); //calculate distance of particle from the center
    this.angle = Math.acos(this.x/this.distance); //calculate angle from the center in radians
    this.color = color;
    
    /*This function draws the particle at the updated location*/
    this.draw = function(){ 
       
        c.beginPath(); 
        c.fillStyle = this.color; 
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fill();
        c.closePath();
    }
    
    this.update = function(){
        this.draw(); //Calls the draw function each time
        if(this.angle<0) this.angle = 0; //resets the angle
        /*Calculates new particle position*/
        if(this.y>0)
        { this.angle-=0.001;
         this.y = this.distance*Math.sin(this.angle);
         this.x = this.distance*Math.cos(this.angle);
            
        }
        else{
            this.angle+=0.001;
            this.y = -this.distance*Math.sin(this.angle);
            this.x = this.distance*Math.cos(this.angle);    
        }
    }
}

/*INITIALIZES THE ARRAY*/
function init(){
    particle = [];
    for(let i=0 ; i<450;i++)
    {
        let radiusP = radiusOptions[Math.floor(Math.random()*radiusOptions.length)]; //choose random value from radius array
        
        let xP = (Math.random()*(maxRadius))*sign[Math.floor(Math.random()*sign.length)]; //random x position
       
        let yP = (Math.random()*(maxRadius))*sign[Math.floor(Math.random()*sign.length)]; //random y position
 
        let color = colorValues[Math.floor(Math.random()*colorValues.length)]; //choose random value from color array
        
        particle[i] = new Particle(radiusP,xP,yP,color); //ADD Particle object from array

    }
}
function animate(){
    
    requestAnimationFrame(animate);
//    c.fillStyle = "rgba(0,0,0,0.05)";
//    c.fillRect(0-centerX,0-(centerY),innerWidth,innerHeight);
//var lastImage = c.getImageData(0,0,canvas.width,canvas.height);
//var pixelData = lastImage.data;
//var i;
//var len=pixelData.length;
//for (i=3; i<len; i += 4) {
//     pixelData[i] -= 3;
//}
//c.putImageData(lastImage,0,0);
//    
//c.globalAlpha = 0.035;           // fade rate
//c.globalCompositeOperation = "destination-out"  // fade out destination pixels
//c.fillRect(0-centerX,0-centerY,canvas.width,canvas.height)
//c.globalCompositeOperation = "source-over"
//c.globalAlpha = 1;  
    
    /*CODE FOR CREATING TRAILS. POSITIVELY DONT CHANGE*/
    c.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	c.fillStyle = 'rgba(0, 0, 0, 0.1)';
	c.fillRect( 0-centerX, 0-centerY, canvas.width, canvas.height );
	// change the composite operation back to our main mode
	c.globalCompositeOperation = 'lighter';
    
    //calls update function and redraw the particle
    for(let i=0 ; i<450 ; i++)
        {
          particle[i].update();  
        }
}
//add event listener to reset values on screen resize
window.addEventListener("resize", function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.clearRect(0-centerX,0-centerY,innerWidth,innerHeight);
    centerX = canvas.width/2;
    centerY = canvas.height/2;
    maxRadius = (innerWidth > innerHeight) ? innerHeight : innerWidth;
    c.translate(centerX,centerY);
    c.scale(1,-1);
    init();
});

window.addEventListener("orientationchange", function(event){
    setTimeout(function(){canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.clearRect(0-centerX,0-centerY,innerWidth,innerHeight);
    centerX = canvas.width/2;
    centerY = canvas.height/2;
    maxRadius = (innerWidth > innerHeight) ? innerHeight : innerWidth;
    c.translate(centerX,centerY);
    c.scale(1,-1);
    init();
    
    },1000);
    
},false);


init();
animate();