function addGridBlock () {
	var html = '<div id="grid-block" class="mira-p">' +
	'	<div id="grid-block-1"></div>' +
	'	<div id="grid-block-2"></div>' +
	'	<div id="grid-block-3"></div>' +
	'	<div class="controls">' +
	'		<a title="set block size" class="set-size">&#10529;</a>' +
	'		<a title="toggle color" class="color-toggle" title="toggle color">&#9680;</a>' +
	'		<a title="toggle keyboard access" class="keylink">&#10010;</a>' +
	'	</div>' +
	'</div>' +
	'<style>#grid-block{width:180px;height:150px;font-family:arial;font-size:0;position:fixed;top:0;left:0;z-index:9001;cursor:move;padding:10px 20px 40px;border-radius:10px;border:2px solid transparent;-webkit-transition:background .05s ease-in-out;-moz-transition:background .05s ease-in-out;transition:background .05s ease-in-out;-webkit-user-select:none;-moz-user-select:none}#grid-block,#grid-block *{box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box}#grid-block div{position:absolute;left:50%}#grid-block #grid-block-1{width:30px;height:30px;bottom:130px;margin-left:-75px}#grid-block #grid-block-2{width:90px;height:90px;top:70px;margin-left:-45px}#grid-block #grid-block-3{width:60px;height:60px;margin-left:45px}#grid-block:hover .controls{opacity:1}#grid-block .controls{opacity:.25;background:rgba(100,100,100,.1);height:26px;position:absolute;width:100%;bottom:0;left:0;border-radius:13px;-webkit-transition:opacity .1s ease-in-out}#grid-block .controls a{width:26px;height:26px;display:block;position:absolute;color:#000;font-size:16px;line-height:26px;text-decoration:none;cursor:pointer;text-align:center}#grid-block .controls a:active{color:#31571b}#grid-block .color-toggle{left:0}#grid-block .set-size{margin-left:-12px;left:50%}#grid-block .keylink{right:0}#grid-block.dragged{border:2px dashed rgba(100,100,100,.5)}#grid-block.mira-p #grid-block-1{background-color:#db1d4d}#grid-block.mira-p #grid-block-2{background-color:#aac02c}#grid-block.mira-p #grid-block-3{background-color:#31571b}#grid-block.mira-t #grid-block-1{background-color:#f37621}#grid-block.mira-t #grid-block-2{background-color:#ebb927}#grid-block.mira-t #grid-block-3{background-color:#8c6239}</style>';
	
	var newElement = document.createElement ('div');
	newElement.innerHTML = html;
	
	document.getElementsByTagName('body')[0].appendChild(newElement);
	
//	document.write(html);
	
//	console.log(document.getElementsByTagName('body')[0]);
}

function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent)
		obj.detachEvent('on'+evt,fn);
}

dragDrop = {
	shiftDown: false,
	keySpeed: 1, // pixels per keypress event
	initialMouseX: undefined,
	initialMouseY: undefined,
	startX: undefined,
	startY: undefined,
	dXKeys: undefined,
	dYKeys: undefined,
	squares: undefined,
	draggedObject: undefined,
	initElement: function (element) {
		if (typeof element == 'string')
			element = document.getElementById(element);
		element.onmousedown = dragDrop.startDragMouse;
		var links = element.getElementsByTagName('a');
		var dragToggle = links[links.length-1];
		var colorToggle = links[links.length-2];
		var askSize = links[links.length-3];
		dragToggle.relatedElement = element;
		dragToggle.onclick = dragDrop.startDragKeys;
		colorToggle.onclick = dragDrop.toggleColor;
		askSize.onclick = dragDrop.askSize;
	},
	toggleColor: function (e) {
//		console.log(this.parentNode.parentNode.className);
		if (this.parentNode.parentNode.className.indexOf('mira-p') != -1) {
			this.parentNode.parentNode.className = this.parentNode.parentNode.className.replace(/mira-p/,'mira-t');
		}
		else if (this.parentNode.parentNode.className.indexOf('mira-t') != -1 ) {
			this.parentNode.parentNode.className = this.parentNode.parentNode.className.replace(/mira-t/,'mira-p');			
		}
	},
	askSize: function (e) {
		dragDrop.squares = new Array();

		for (n = 0; n < 3; n++) {
			dragDrop.squares[n] = prompt('Vul een waarde in voor blok ' + (n+1) + ' in pixels', '10');
			while (isNaN(dragDrop.squares[n]) || dragDrop.squares[n] < 5 || dragDrop.squares[n] > 250) {
				dragDrop.squares[n] = prompt('Een nummer, tussen 5 en 250, graag. Voor blok ' + (n+1) + ' in pixels', '10');
			}
	
			dragDrop.squares[n] = parseInt(dragDrop.squares[n], 10);
	
//			console.log(document.getElementById('grid-block-'+ (n+1)));
			
		}
		
		console.log(dragDrop.squares);
		
		function compare(a,b) {
			return a - b;
		}
		
		dragDrop.squares.sort(function compareNumbers(a, b)  
		{
		  return a - b;
		});
		
		console.log(dragDrop.squares);
		
		dragDrop.setSize();
		
	},
	setSize: function (e) {	
		document.getElementById('grid-block-1').style.width = dragDrop.squares[0] + 'px';
		document.getElementById('grid-block-1').style.height = dragDrop.squares[0] + 'px';
		document.getElementById('grid-block-1').style.marginLeft = '-' + ((dragDrop.squares[2] / 2) + dragDrop.squares[0]) + 'px';
		document.getElementById('grid-block-1').style.bottom = (dragDrop.squares[2] + 40) + 'px';
		
		document.getElementById('grid-block-2').style.width = dragDrop.squares[2] + 'px';
		document.getElementById('grid-block-2').style.height = dragDrop.squares[2] + 'px';
		document.getElementById('grid-block-2').style.marginLeft = '-' + (dragDrop.squares[2] / 2) + 'px';
		document.getElementById('grid-block-2').style.top = (dragDrop.squares[1] + 10) + 'px';
		
		document.getElementById('grid-block-3').style.width = dragDrop.squares[1] + 'px';
		document.getElementById('grid-block-3').style.height = dragDrop.squares[1] + 'px';
		document.getElementById('grid-block-3').style.marginLeft = (dragDrop.squares[2] / 2) + 'px';
		
		// if ((dragDrop.squares[0] + dragDrop.squares[0] + dragDrop.squares[0]) < )
		document.getElementById('grid-block').style.width = (dragDrop.squares[0] + dragDrop.squares[1] + dragDrop.squares[2]) + 'px';
		document.getElementById('grid-block').style.height = (dragDrop.squares[1] + dragDrop.squares[2]) + 'px';
	},
	startDragMouse: function (e) {
		dragDrop.startDrag(this);
		var evt = e || window.event;
		dragDrop.initialMouseX = evt.clientX;
		dragDrop.initialMouseY = evt.clientY;
		addEventSimple(document,'mousemove',dragDrop.dragMouse);
		addEventSimple(document,'mouseup',dragDrop.releaseElement);
		return false;
	},
	startDragKeys: function () {
		dragDrop.startDrag(this.relatedElement);
		dragDrop.dXKeys = dragDrop.dYKeys = 0;
		addEventSimple(document,'keydown',dragDrop.dragKeys);
		addEventSimple(document,'keyup',dragDrop.onKeyUp);
		addEventSimple(document,'keypress',dragDrop.switchKeyEvents);
		this.blur();
		return false;
	},
	startDrag: function (obj) {
		if (dragDrop.draggedObject)
			dragDrop.releaseElement();
		dragDrop.startX = obj.offsetLeft;
		dragDrop.startY = obj.offsetTop;
		dragDrop.draggedObject = obj;
		obj.className += ' dragged';
	},
	dragMouse: function (e) {
		var evt = e || window.event;
		var dX = evt.clientX - dragDrop.initialMouseX;
		var dY = evt.clientY - dragDrop.initialMouseY;
		dragDrop.setPosition(dX,dY);
		return false;
	},
	dragKeys: function(e) {
		var evt = e || window.event;
		var key = evt.keyCode;
		switch (key) {
			case 37:	// left
			case 63234:
				dragDrop.dXKeys -= (this.shiftDown) ? 10 : dragDrop.keySpeed;
				break;
			case 38:	// up
			case 63232:
				dragDrop.dYKeys -= (this.shiftDown) ? 10 : dragDrop.keySpeed;
				break;
			case 39:	// right
			case 63235:
				dragDrop.dXKeys += (this.shiftDown) ? 10 : dragDrop.keySpeed;
				break;
			case 16:
				this.shiftDown = true;
				break;
			case 40:	// down
			case 63233:
				dragDrop.dYKeys += (this.shiftDown) ? 10 : dragDrop.keySpeed;
				break;
			case 13: 	// enter
			case 27: 	// escape
				dragDrop.releaseElement();
				return false;
			default:
				return true;
		}
		dragDrop.setPosition(dragDrop.dXKeys,dragDrop.dYKeys);
		if (evt.preventDefault) // also solves problem in Saf; keypress part of default ???
			evt.preventDefault();
		return false;
	},
	onKeyUp: function(e) {
		var evt = e || window.event;
		var key = evt.keyCode;
		switch (key) {

			case 16:
				this.shiftDown = false;
				break;

			default:
				return true;
		}

		if (evt.preventDefault) // also solves problem in Saf; keypress part of default ???
			evt.preventDefault();
		return false;
	},
	setPosition: function (dx,dy) {
		dragDrop.draggedObject.style.left = dragDrop.startX + dx + 'px';
		dragDrop.draggedObject.style.top = dragDrop.startY + dy + 'px';
	},
	switchColor: function () {
		
	},
	switchKeyEvents: function () {

		// for Opera and Safari 1.3

		removeEventSimple(document,'keydown',dragDrop.dragKeys);
		removeEventSimple(document,'keyup',dragDrop.onKeyUp);
		removeEventSimple(document,'keypress',dragDrop.switchKeyEvents);
		addEventSimple(document,'keypress',dragDrop.dragKeys);
	},
	releaseElement: function() {
		removeEventSimple(document,'mousemove',dragDrop.dragMouse);
		removeEventSimple(document,'mouseup',dragDrop.releaseElement);
		removeEventSimple(document,'keypress',dragDrop.dragKeys);
		removeEventSimple(document,'keypress',dragDrop.switchKeyEvents);
		removeEventSimple(document,'keydown',dragDrop.dragKeys);
		removeEventSimple(document,'keyup',dragDrop.onKeyUp);
		dragDrop.draggedObject.className = dragDrop.draggedObject.className.replace(/ dragged/,'');
		dragDrop.draggedObject = null;
	}
}

function initGrid() {
	
//	'';
	addGridBlock();
	dragDrop.initElement(document.getElementById('grid-block'));
}

initGrid();