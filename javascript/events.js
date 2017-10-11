var wrapperMenu = document.querySelector('.wrapper-menu');

wrapperMenu.addEventListener('click', function(){
  wrapperMenu.classList.toggle('open');  
})

//TYPING BACKGROUND
function setupTypewriter(t) {
	    var HTML = t.innerHTML;

	    t.innerHTML = "";

	    var cursorPosition = 0,
	        tag = "",
	        writingTag = false,
	        tagOpen = false,
	        typeSpeed = 30,
        tempTypeSpeed = 0;

	    var type = function() {
        
	        if (writingTag === true) {
	            tag += HTML[cursorPosition];
	        }

	        if (HTML[cursorPosition] === "<") {
	            tempTypeSpeed = 0;
	            if (tagOpen) {
	                tagOpen = false;
	                writingTag = true;
	            } else {
	                tag = "";
	                tagOpen = true;
	                writingTag = true;
	                tag += HTML[cursorPosition];
	            }
	        }
	        if (!writingTag && tagOpen) {
	            tag.innerHTML += HTML[cursorPosition];
	        }
	        if (!writingTag && !tagOpen) {
	            if (HTML[cursorPosition] === " ") {
	                tempTypeSpeed = 0;
	            }
	            else {
	                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
	            }
	            t.innerHTML += HTML[cursorPosition];
	        }
	        if (writingTag === true && HTML[cursorPosition] === ">") {
	            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
	            writingTag = false;
	            if (tagOpen) {
	                var newSpan = document.createElement("span");
	                t.appendChild(newSpan);
	                newSpan.innerHTML = tag;
	                tag = newSpan.firstChild;
	            }
	        }

	        cursorPosition += 1;
	        if (cursorPosition < HTML.length - 1) {
	            setTimeout(type, tempTypeSpeed);
	        }

	    };
        
	    return {
	        type: type
	    };
	}

function init(){
	var typer = document.getElementById('typewriter');
	typewriter = setupTypewriter(typer);
	typewriter.type();
    var typer2 = document.getElementById('typewriter2');
	   typewriter = setupTypewriter(typer2);
	   typewriter.type(); 

}

init();

//TYPING BACKGROUND END

var fade = document.querySelector('.arrow');
fade.addEventListener('click',function(){
    $('.container-fluid, #typewriter, #typewriter2').fadeOut('slow');
   setTimeout(function(){
      $('.container').fadeIn('slow');
    },500)
    
})


