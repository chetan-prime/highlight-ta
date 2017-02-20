function HighlightTaObj() {
	//console.log("HighlightTaObj() created");
	this.cntr = null;
	this.div = null;
	this.ta = null;
	this.re = null;
	this.mark = null;
	this.compCntr = null;

	this.boxSize = null;
	this.fontSize = null;
	this.lineHeight = null;
	this.lineDiff = null;
	this.padLeft = null;
	this.padRight = null;
	this.padTop = null;
	this.padBttm = null;
}


HighlightTaObj.prototype.getText = function() {
	return this.ta.value;
}


HighlightTaObj.prototype.getComp = function() {
	return this.ta.compCntr;
}


HighlightTaObj.prototype.setIndex = function(num) {
	num = this.fixNan(num);

	if(typeof num === 'number') {
		num = num.toString();
	}

	this.cntr.style.zIndex = num;
}


HighlightTaObj.prototype.highlight = function(text) {
	if(this.re !== null) {
		text = text.replace(this.re, this.mark);
	}

	return text;
}


HighlightTaObj.prototype.newLines = function(text) {
	text = text.replace(/\n$/g, '\n\n');

	return text;
}


HighlightTaObj.prototype.removeHTML = function(text) {
	text = text.replace(/&/g, '&amp');
	text = text.replace(/</g, '&lt');
	text = text.replace(/>/g, '&gt');

	return text;
}


HighlightTaObj.prototype.scrollbar = function() {
	if(this.ta.clientHeight !== this.ta.scrollHeight) {
		if(this.ta.style.overflowY !== 'scroll') {
			this.ta.style.overflowY = 'scroll';
		}
	}else if(this.ta.style.overflowY === 'scroll') {
		this.ta.style.overflowY = 'hidden';
	}
}


HighlightTaObj.prototype.size = function() {
	this.scrollLeft = window.pageXOffset;
	this.scrollTop = window.pageYOffset;

	this.cntr.style.height = "auto";
	this.ta.style.height = "auto";

	if(this.cntr.clientHeight < this.ta.scrollHeight) {
		this.cntr.style.height = (this.ta.scrollHeight + this.tare) + "px";
	}

	this.setTaHeight();
	this.setTaWidth();
	this.setDivHeight();
	this.scrollbar();
	this.setDivWidth();

	window.scrollTo(this.scrollLeft, this.scrollTop);
}


HighlightTaObj.prototype.onInput = function() {
	var text = this.ta.value;

	text = this.removeHTML(text);
	text = this.highlight(text);
	text = this.newLines(text);

	this.div.innerHTML = text;

	this.size();
}


HighlightTaObj.prototype.onScroll = function() {
	this.div.scrollTop = this.ta.scrollTop;
}


HighlightTaObj.prototype.onResize = function() {
	this.setupTares();
	this.setTaWidth();
	this.setDivWidth();
}


HighlightTaObj.prototype.removeEvents = function() {
	this.ta.removeEventListener('input', this.onInput.bind(this), false);
	this.ta.removeEventListener('scroll', this.onScroll.bind(this), false);
	window.removeEventListener('resize', this.onResize.bind(this), false);
}


HighlightTaObj.prototype.addEvents = function() {
	this.ta.addEventListener('input', this.onInput.bind(this), false);
	this.ta.addEventListener('scroll', this.onScroll.bind(this), false);
	window.addEventListener('resize', this.onResize.bind(this), false);
}


HighlightTaObj.prototype.setMark = function(dclr) {
	if(typeof dclr === 'string') {
		this.mark = '<mark class="' + dclr + '">$&</mark>';
	}

}


HighlightTaObj.prototype.makeRegex = function(pattern, flags) {
	this.re = new RegExp(pattern, flags);
}


HighlightTaObj.prototype.setRegex = function(regex) {
	if(regex instanceof RegExp) {
		this.re = regex;
	}
}


HighlightTaObj.prototype.fixNan = function(obj) {
	if(isNaN(obj)){
		return 0;
	}

	return obj;
}


HighlightTaObj.prototype.styleFont = function(node) {
	node.style.fontFamily = this.compCntr.getPropertyValue('font-family');
	node.style.fontSize = this.compCntr.getPropertyValue('font-size');
	node.style.lineHeight = this.compCntr.getPropertyValue('line-height');
	node.style.letterSpacing = this.compCntr.getPropertyValue('letter-spacing');
	node.style.color = this.compCntr.getPropertyValue('color');
}


HighlightTaObj.prototype.scratch = function(node) {
	node.style.position = "absolute";
	node.style.display = "block";
	node.style.top = "0px";
	node.style.left = "0px";
	node.style.boxStyling = "border-box";
	node.style.margin = "0px";
	node.style.padding = "0px";
	node.style.backgroundColor = "transparent";
	//node.style.border = "1px solid #000000";
	node.style.border = "0px solid #000000";
	node.style.borderRadius = "0px";
	node.style.overflow = "hidden";
	node.style.overflowX = "hidden";
	node.style.overflowY = "hidden";
}



HighlightTaObj.prototype.setDivLoc = function() {
	this.div.style.top = this.padTop + "px";
	this.div.style.left = this.padLeft + "px";
}


HighlightTaObj.prototype.setDivHeight = function() {
	this.div.style.height = (this.ta.clientHeight - this.padTop - this.padBttm) + "px";
}


HighlightTaObj.prototype.setDivWidth = function() {
	this.div.style.width = (this.ta.clientWidth - this.padLeft - this.padRight) + "px";
}


HighlightTaObj.prototype.setupDiv = function() {
	this.div = document.createElement('DIV');
	this.scratch(this.div);
	this.cntr.appendChild(this.div);

	this.styleFont(this.div);
	this.div.style.zIndex = "1";
	this.div.style.whiteSpace = "pre-wrap";
	this.div.style.wordWrap = "break-word";
	this.div.style.overflow = "hidden";
	this.div.style.color = "transparent";

	this.setDivLoc();
	this.setDivWidth();
	this.setDivHeight();
}


HighlightTaObj.prototype.setTaWidth = function() {
	this.ta.style.width = (this.cntr.clientWidth - this.padLeft - this.padRight) + "px";
}


HighlightTaObj.prototype.setTaHeight = function() {
	this.ta.style.height = (this.cntr.clientHeight - this.padTop - this.padBttm + this.lineDiff) + "px";
}


HighlightTaObj.prototype.setTaPad = function() {
	this.ta.style.paddingTop = this.padTop + "px";
	this.ta.style.paddingRight = this.padRight + "px";
	this.ta.style.paddingBottom = this.padBttm + "px";
	this.ta.style.paddingLeft = this.padLeft + "px";
}


HighlightTaObj.prototype.setupTa = function(node) {
	this.ta = node;
	this.scratch(this.ta);

	if(this.ta.style.position === "") {
		this.ta.style.position = "absolute";
	}

	this.styleFont(this.ta);
	this.ta.style.resize = "none";
	this.ta.style.zIndex = "2";

	this.setTaWidth();
	this.setTaHeight();
	this.setTaPad();
}


HighlightTaObj.prototype.setupCntr = function(node) {
	this.cntr = node;

	if(this.cntr.style.position === "") {
		this.cntr.style.position = "relative";
	}

	this.compCntr = window.getComputedStyle(this.cntr, null);
}


HighlightTaObj.prototype.setupTares = function() {
	this.boxSize = this.compCntr.getPropertyValue('box-sizing');

	this.fontSize = parseFloat(this.compCntr.getPropertyValue('font-size'));
	this.lineHeight = parseFloat(this.compCntr.getPropertyValue('line-height'));

	this.padLeft = parseFloat(this.compCntr.getPropertyValue('padding-left'));
	this.padRight = parseFloat(this.compCntr.getPropertyValue('padding-right'));
	this.padTop = parseFloat(this.compCntr.getPropertyValue('padding-top'));
	this.padBttm = parseFloat(this.compCntr.getPropertyValue('padding-bottom'));

	this.tare = this.padTop + this.padBttm;

	if(this.boxSize !== 'border-box') {
		this.tare *= -1;
	}
}


HighlightTaObj.prototype.check = function () {
	console.log("check");
	console.log("Font size: " + this.fontSize);
	console.log("Line Height: " + this.lineHeight);
	console.log("Line Diff: " + this.lineDiff);
	console.log("Cntr clientWidth: " + this.cntr.clientWidth);
	console.log("Cntr clientHeight: " + this.cntr.clientHeight);
	console.log("Ta scrollHeight: " + this.cntr.scrollHeight);
	console.log("Ta clientWidth: " + this.ta.clientWidth);
	console.log("Ta clientHeight: " + this.ta.clientHeight);
	console.log("Ta scrollHeight: " + this.ta.scrollHeight);
}


HighlightTaObj.prototype.cleanUp = function() {
	if(this.cntr !== null) {
		this.cntr = null;
		this.div = null;
	}

	if(this.ta !== null) {
		this.removeEvents();
		this.ta = null;
	}
}


HighlightTaObj.prototype.isTa = function(node) {
	return node.tagName === 'TEXTAREA';
}


HighlightTaObj.prototype.isDiv = function(node) {
	return node.tagName === 'DIV';
}


HighlightTaObj.prototype.init = function(args) {
	//args is [div elem, ta elem, re, re-style]
	if(this.isDiv(args[0])) {
		this.cleanUp();
		this.setupCntr(args[0]);
	}

	if(this.isTa(args[1])) {
		this.setupTares();
		this.setupTa(args[1]);
		this.setupDiv();
		this.addEvents();
	}

	if(args[2] && args[3]) {
		this.setRegex(args[2]);
		this.setMark(args[3]);

		this.onInput();
	}

}


//'interface' for HighlightTaObj()
function HighlightTa() {
	var hlta = new HighlightTaObj();
	console.log("HighlightTa() created");

	//instantiate
	if(arguments.length > 0) {
		hlta.init(arguments);
	}

	return {
		init: function() {
			hlta.init(arguments);
		},

		remove: function() {
			hlta.cleanUp();
		},

		getComp: function() {
			return hlta.getComp();
		},

		setZ: function(num) {
			hlta.setIndex(num);
		},
	}
}
