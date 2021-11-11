let canvas,
    context,
    draging =false,
    dragLocation,
    snapshot;

    
function getMousePosition(event){
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;

    return {x:x , y: y};
}

function getTouchPos(touchEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }
function takeSnapshot(){
    snapshot = context.getImageData(0,0,canvas.width,canvas.height)
}
function restoreSnapeshot(){
    context.putImageData(snapshot,0,0);
}

function lineDraw(position){
    context.beginPath();
    context.moveTo(dragLocation.x, dragLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
    context.closePath();
}
function circleDraw(position){
    let radius = Math.sqrt(Math.pow((dragLocation.x - position.x),2), + Math.pow((dragLocation.y-position.y),2));
    context.beginPath();
    context.arc(dragLocation.x, dragLocation.y,radius, 0,2*Math.PI,false);
    context.fill();
    context.closePath();
}
function dragStart(event){
    draging= true;
    dragLocation = getMousePosition(event);
    takeSnapshot();
}

function drag(event){
    let position;
    if(draging){
        restoreSnapeshot();
        position= getMousePosition(event);
        lineDraw(position);
        circleDraw(position);
    };

}
function dragStop(event){
    draging =- false;
    restoreSnapeshot();
    let position = getMousePosition(event);
    lineDraw(position);
    circleDraw(position);
}






//for touch screen;
let draw = {
    started: false,
    start: function(event) {

        context.beginPath();
        context.moveTo(
            event.touches[0].pageX,
            event.touches[0].pageY
        );

        this.started = true;

    },
    move: function(event) {

        if (this.started) {
            context.lineTo(
                event.touches[0].pageX,
                event.touches[0].pageY
            );

            context.strokeStyle = "#000";
            context.lineWidth = 5;
            context.stroke();
        }

    },
    end: function(event) {
        this.started = false;
    }
};



function init(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    context.strokeStyle ="purple";
    context.lineWidth = 6;
    context.lineCap = 'round';
    canvas.addEventListener("mousedown",dragStart,false);
    canvas.addEventListener("mousemove",drag,false);
    canvas.addEventListener("mouseup",dragStop,false);
    canvas.addEventListener("touchstart",draw.start,false);
    canvas.addEventListener("touchmove",draw.move,false);
    canvas.addEventListener("touchend",draw.end,false);
    	// Disable Page Move
	document.body.addEventListener('touchmove',function(evt){
		evt.preventDefault();
	},{passive: false});
    

}
window.addEventListener("load",init,false);


