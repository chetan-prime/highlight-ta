function HighlightTa() {
	this.cntr = null;
	this.compCntr = null;
	this.compTa = null;
	this.back = null;
	this.div = null;
	this.ta = null;
	this.re = null;
	this.mark = null;
}


HighlightTa.prototype.delSize = function() {
	window.setTimeout(this.size.call(this), 0);
}


HighlightTa.prototype.getSize = function() {
	if(this.compCntr.getPropertyValue('box-sizing') === "border-box") {
		if(parseFloat(this.compCntr.getPropertyValue('padding-top')) <=
			parseFloat(this.compCntr.getPropertyValue('border-top-width'))) {
			return (this.ta.scrollHeight
				+ parseFloat(this.compCntr.getPropertyValue('border-top-width'))
				+ parseFloat(this.compCntr.getPropertyValue('border-bottom-width'))) + "px";
		}

		return (this.ta.scrollHeight
			+ parseFloat(this.compCntr.getPropertyValue('padding-top'))
			+ parseFloat(this.compCntr.getPropertyValue('border-top-width'))) + "px";
	}

	return (this.ta.scrollHeight 
		- parseFloat(this.compCntr.getPropertyValue('padding-top')) 
		- parseFloat(this.compCntr.getPropertyValue('padding-bottom')) + "px");
}


HighlightTa.prototype.size = function() {
	var scrollLeft = window.pageXOffset;
	var scrollTop = window.pageYOffset;
	
	this.cntr.style.height = "auto";
	this.ta.style.height = "auto";

	if(this.ta.clientHeight < this.ta.scrollHeight) {
		console.log("scroll height larger");
		this.cntr.style.height = this.getSize();
	}

	this.styleHeight(this.ta, this.cntr, this.compCntr);
	this.styleHeight(this.div, this.ta, this.compTa);

	window.scrollTo(scrollLeft, scrollTop);
}


HighlightTa.prototype.highlight = function(text) {
	if(this.re !== null) {
		text = text.replace(this.re, this.mark);
	}

	return text;
}


HighlightTa.prototype.newLines = function(text) {
	text = text.replace(/\n$/g, '\n\n');
	return text;
}


HighlightTa.prototype.removeHTML = function(text) {
	text = text.replace(/&/g, '&amp');
	text = text.replace(/</g, '&lt');
	text = text.replace(/>/g, '&gt');
	return text;
}


HighlightTa.prototype.adjustBar = function() {
	this.div.style.width = (this.ta.clientWidth 
		- parseFloat(this.compCntr.getPropertyValue('padding-left')) 
		- parseFloat(this.compCntr.getPropertyValue('padding-right'))) + "px";
}


HighlightTa.prototype.onInput = function() {
	var text = this.ta.value;

	text = this.removeHTML(text);
	text = this.highlight(text);
	text = this.newLines(text);

	this.div.innerHTML = text;

	this.delSize();
	this.adjustBar();
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
	this.ta.addEventListener('input', this.onInput.bind(this), false);
	this.ta.addEventListener('scroll', this.onScroll.bind(this), false);
	window.addEventListener('resize', this.onResize.bind(this), false);
}


HighlightTa.prototype.styleFont = function(node) {
	node.style.fontFamily = this.compCntr.getPropertyValue('font-family');
	node.style.fontSize = this.compCntr.getPropertyValue('font-size');
	node.style.lineHeight = this.compCntr.getPropertyValue('line-height');
	node.style.letterSpacing = this.compCntr.getPropertyValue('letter-spacing');
	node.style.color = this.compCntr.getPropertyValue('color');
}


HighlightTa.prototype.styleHeight = function(inner, outer, comp) {
	inner.style.height = (outer.clientHeight 
		- parseFloat(comp.getPropertyValue('padding-top')) 
		- parseFloat(comp.getPropertyValue('padding-bottom'))) + "px";
}


HighlightTa.prototype.styleWidth = function(node) {
	node.style.width = (this.cntr.clientWidth 
		- parseFloat(this.compCntr.getPropertyValue('padding-left')) 
		- parseFloat(this.compCntr.getPropertyValue('padding-right'))) + "px";
}


HighlightTa.prototype.styleDiv = function() {
	this.styleWidth(this.div);
	this.styleHeight(this.div, this.ta, this.compTa);

	this.div.style.top = parseFloat(this.compCntr.getPropertyValue('padding-top')) + "px";
	this.div.style.left = parseFloat(this.compCntr.getPropertyValue('padding-left')) + "px";

	this.styleFont(this.div);
	this.div.style.color = "transparent";
}


HighlightTa.prototype.styleTa = function() {
	this.styleWidth(this.ta);
	this.styleHeight(this.ta, this.cntr, this.compCntr);

	this.ta.style.paddingLeft = this.compCntr.getPropertyValue('padding-left');
	this.ta.style.paddingRight = this.compCntr.getPropertyValue('padding-right');
	this.ta.style.paddingTop = this.compCntr.getPropertyValue('padding-top');
	this.ta.style.paddingBottom = this.compCntr.getPropertyValue('padding-bottom');

	this.styleFont(this.ta);
}


HighlightTa.prototype.scratch = function(node) {
	node.style.position = "absolute";
	node.style.display = "block";
	node.style.top = "0px";
	node.style.left = "0px";
	node.style.boxStyling = "border-box";
	node.style.margin = "0px";
	node.style.padding = "0px";
	node.style.backgroundColor = "transparent";
	node.style.border = "1px solid #000000";
	//node.style.border = "0px solid #000000";
	node.style.borderRadius = "0px";
	node.style.overflow = "auto";
}


HighlightTa.prototype.setupDiv = function() {
	this.scratch(this.div);

	this.div.style.zIndex = "1"
	this.div.style.whiteSpace = "pre-wrap";
	this.div.style.wordWrap = "break-word";
	this.div.style.overflow = "hidden";

	this.styleDiv();
}


HighlightTa.prototype.setupTa = function() {
	this.scratch(this.ta);

	this.ta.style.zIndex = "2";
	this.ta.style.resize = "none";

	this.styleTa();
}


HighlightTa.prototype.setupCntr = function() {
	if(this.cntr.style.position === "") {
		console.log(this.cntr.style.position);
		this.cntr.style.position = "relative";
	}
}


HighlightTa.prototype.addTa = function() {
	this.div = document.createElement('DIV');
	this.cntr.appendChild(this.div);

	this.ta = document.createElement('TEXTAREA');
	this.cntr.appendChild(this.ta);

	this.compCntr = window.getComputedStyle(this.cntr, null);
	this.compTa = window.getComputedStyle(this.ta, null);
}


HighlightTa.prototype.makeTa = function() {
	this.addTa();
	this.styleTa();
	this.styleDiv();
	this.setupCntr();
	this.setupDiv();
	this.setupTa();
	this.addEvents();
	this.delSize();
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


HighlightTa.prototype.getTa = function() {
	return this.ta;
}


HighlightTa.prototype.getDiv = function() {
	return this.div;
}


HighlightTa.prototype.getText = function() {
	return this.ta.value;
}


HighlightTa.prototype.setMark = function(bgclr, rds) {
	this.mark = '<mark style="background-color: ' + bgclr + '; ' 
			+ 'padding: 0px; ' 
			+ 'border-radius: ' + rds + '; '
			+ 'color: transparent;" >'
			+ "$&" + '</mark>';
}


HighlightTa.prototype.makeRegex = function(pattern, flags) {
	this.re = new RegExp(pattern, flags);
}


HighlightTa.prototype.setRegex = function(regex) {
	this.re = regex;
}


HighlightTa.prototype.init = function() {
	if(this.isDiv(arguments[0])) {
		this.cleanUp();
		this.cntr = arguments[0];
		this.setRegex(arguments[1]);
		this.setMark(arguments[2], arguments[3]);
		this.makeTa();
	}
}
