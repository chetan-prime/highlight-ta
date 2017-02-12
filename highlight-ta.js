function HighlightTa() {
	console.log("highlight-ta instantiated");
	this.cntr = null;
	this.div = null;
	this.ta = null;

	this.compCntr = null;
}

HighlightTa.prototype.delUpdate = function() {
	window.setTimeout(this.update.call(this), 0);
}


HighlightTa.prototype.highlight = function(text) {
	text = text.replace(/([A-Z][a-z0-9]*)/g, '<mark style="color: transparent;">$&</mark>');
	return text;
}


HighlightTa.prototype.newLines = function(text) {
	text = text.replace(/\n$/g, '\n\n');
	return text;
}


HighlightTa.prototype.adjustBar = function() {
	this.div.style.width = (this.ta.clientWidth 
			- parseFloat(this.compCntr.getPropertyValue('padding-left')) 
			- parseFloat(this.compCntr.getPropertyValue('padding-right'))) + "px";
}


HighlightTa.prototype.update = function() {
	this.div.innerHTML = this.newLines(this.ta.value);
	this.div.innerHTML = this.highlight(this.div.innerHTML);

	this.adjustBar()
}


HighlightTa.prototype.onScroll = function() {
	this.div.scrollTop = this.ta.scrollTop;
}


HighlightTa.prototype.onResize = function() {
	this.styleDiv();
	this.styleTa();
	this.adjustBar();
}


HighlightTa.prototype.addEvents = function() {
	this.ta.addEventListener('input', this.delUpdate.bind(this), false);
	this.ta.addEventListener('scroll', this.onScroll.bind(this), false);
	window.addEventListener('resize', this.onResize.bind(this), false);
}


HighlightTa.prototype.styleDiv = function() {
	this.div.style.width = (this.cntr.clientWidth 
				- parseFloat(this.compCntr.getPropertyValue('padding-left')) 
				- parseFloat(this.compCntr.getPropertyValue('padding-right'))) + "px";
	this.div.style.height = (this.cntr.clientHeight 
				- parseFloat(this.compCntr.getPropertyValue('padding-top')) 
				- parseFloat(this.compCntr.getPropertyValue('padding-bottom'))) + "px";


	this.div.style.top = parseFloat(this.compCntr.getPropertyValue('padding-top')) + "px";
	this.div.style.left = parseFloat(this.compCntr.getPropertyValue('padding-left')) + "px";

	this.div.style.fontFamily = this.compCntr.getPropertyValue('font-family');
	this.div.style.fontSize = this.compCntr.getPropertyValue('font-size');
	this.div.style.lineHeight = this.compCntr.getPropertyValue('line-height');
	this.div.style.letterSpacing = this.compCntr.getPropertyValue('letter-spacing');
	this.div.style.color = "transparent";
}


HighlightTa.prototype.styleTa = function() {
	this.ta.style.width = (this.cntr.clientWidth 
				- parseFloat(this.compCntr.getPropertyValue('padding-left')) 
				- parseFloat(this.compCntr.getPropertyValue('padding-right'))) + "px";
	this.ta.style.height = (this.cntr.clientHeight 
				- parseFloat(this.compCntr.getPropertyValue('padding-top')) 
				- parseFloat(this.compCntr.getPropertyValue('padding-bottom'))) + "px";

	this.ta.style.paddingLeft = this.compCntr.getPropertyValue('padding-left');
	this.ta.style.paddingRight = this.compCntr.getPropertyValue('padding-right');
	this.ta.style.paddingTop = this.compCntr.getPropertyValue('padding-top');
	this.ta.style.paddingBottom = this.compCntr.getPropertyValue('padding-bottom');

	this.ta.style.fontFamily = this.compCntr.getPropertyValue('font-family');
	this.ta.style.fontSize = this.compCntr.getPropertyValue('font-size');
	this.ta.style.lineHeight = this.compCntr.getPropertyValue('line-height');
	this.ta.style.letterSpacing = this.compCntr.getPropertyValue('letter-spacing');
	this.ta.style.color = this.compCntr.getPropertyValue('color');
}


HighlightTa.prototype.setupDiv = function() {
	this.div.style.position = "absolute";
	this.div.style.display = "block";
	this.div.style.zIndex = "1"
	this.div.style.boxStyling = "border-box";
	this.div.style.margin = "0px";
	this.div.style.padding = "0px";
	this.div.style.whiteSpace = "pre-wrap";
	this.div.style.wordWrap = "break-word";
	this.div.style.border = "0px solid #000000";
	this.div.style.overflow = "hidden";

	this.styleDiv();
}


HighlightTa.prototype.setupTa = function() {
	this.ta.style.position = "absolute";
	this.ta.style.display = "block";
	this.ta.style.zIndex = "2";
	this.ta.style.top = "0px";
	this.ta.style.left = "0px";
	this.ta.style.boxStyling = "border-box";
	this.ta.style.margin = "0px";
	this.ta.style.backgroundColor = "transparent";
	this.ta.style.border = "0px solid #000000";
	this.ta.style.overflow = "auto";
	this.ta.style.resize = "none";

	this.styleTa();
}


HighlightTa.prototype.setupCntr = function() {
	if(this.cntr.style.position === "") {
		this.cntr.style.position = "relative";
	}
}


HighlightTa.prototype.addTa = function() {
	this.div = document.createElement('DIV');
	this.cntr.appendChild(this.div);
	
	this.ta = document.createElement('TEXTAREA');
	this.cntr.appendChild(this.ta);

	this.compCntr = window.getComputedStyle(this.cntr, null);
}


HighlightTa.prototype.makeTa = function() {
	this.addTa();
	this.setupCntr();
	this.setupDiv();
	this.setupTa();
	this.addEvents();
	this.delUpdate();
}


HighlightTa.prototype.cleanUp = function() {
	if(this.cntr !== null) {
		while(this.cntr.hasChildNodes()) {
			this.cntr.removeChild(this.cntr.lastChild);
		}
	}

	this.div = null;
	this.ta = null;
	this.cntr = null;
}


HighlightTa.prototype.isDiv = function(node) {
	return node.tagName === 'DIV';
}


HighlightTa.prototype.init = function(node) {
	if(this.isDiv(node)) {
		console.log("node is a div");
		this.cleanUp();
		this.cntr = node;
		this.makeTa();
		console.log("job done");
	}
}
