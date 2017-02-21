function HighlightTaObj() {
	//console.log("HighlightTaObj() created");
	this.cntr = null;
	this.div = null;
	this.ta = null;
	this.re = null;
	this.mark = null;
	this.comp = null;
	this.corners = null;
	this.modTop = null;
	this.modBttm = null;

	this.boxSize = null;
	this.width = null;
	this.borderTop = null;
	this.borderBttm = null;
	this.borderRadTop = null;
	this.borderRadBttm = null;
	this.padLeft = null;
	this.padRight = null;
	this.padTop = null;
	this.padBttm = null;
}


HighlightTaObj.prototype.getText = function() {
	return this.ta.value;
}


HighlightTaObj.prototype.getComp = function() {
	return this.comp;
}


HighlightTaObj.prototype.setIndex = function(num) {
	num = this.fixNan(num);

	if(typeof num === 'number') {
		num = num.toString();
	}

	if(parseFloat(num)) {
		this.cntr.style.zIndex = num;
	}
}


HighlightTaObj.prototype.setMark = function(dclr) {
	if(typeof dclr === 'string') {
		this.mark = '<mark style="margin: 0px; padding: 0px;'
			+ 'border: 0px; color: transparent;" class=" ' 
			+ dclr + '">$&</mark>';
	}
}


HighlightTaObj.prototype.setRegExp = function(regex) {
	if(regex instanceof RegExp) {
		this.re = regex;
	}
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
			if(this.corners) {
				this.styleCorners();
			}

			this.ta.style.overflowY = 'scroll';
		}
	}else if(this.ta.style.overflowY === 'scroll') {
		this.ta.style.overflowY = 'hidden';

		if(this.corners) {
			this.cancelCorners();
		}
	}
}


HighlightTaObj.prototype.setCorners = function() {
	this.borderRadTop = parseFloat(this.comp.getPropertyValue('border-top-right-radius'));
	this.borderRadBttm = parseFloat(this.comp.getPropertyValue('border-bottom-right-radius'));

	this.borderRadTop = this.fixNan(this.borderRadTop);
	this.borderRadBttm = this.fixNan(this.borderRadBttm);

	this.modTop = (this.borderTop < this.borderRadTop) ? true : false;
	this.modBttm = (this.borderBttm < this.borderRadBttm) ? true : false;
}


HighlightTaObj.prototype.modCorners = function(bool) {
	if(typeof bool === 'boolean') {
		this.corners = bool;
	}
}


HighlightTaObj.prototype.cancelCorners = function() {
	if(this.modTop) {
		this.cntr.style.borderTopRightRadius = this.borderRadTop + "px";
	}	

	if(this.modBttm) {
		this.cntr.style.borderBottomRightRadius = this.borderRadBttm + "px";
	}	
}


HighlightTaObj.prototype.styleCorners = function() {
	if(this.modTop) {
		this.cntr.style.borderTopRightRadius = "0px";
	}	

	if(this.modBttm) {
		this.cntr.style.borderBottomRightRadius = "0px";
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
	if(this.width !== this.cntr.clientWidth) {
		this.getTares();
		this.styleTa();
		this.styleDiv();
	}
}


HighlightTaObj.prototype.removeEvents = function() {
	this.ta.removeEventListener('input', this.onInput, false);
	this.ta.removeEventListener('scroll', this.onScroll, false);
	window.removeEventListener('resize', this.onResize, false);
}


HighlightTaObj.prototype.addEvents = function() {
	this.ta.addEventListener('input', this.onInput.bind(this), false);
	this.ta.addEventListener('scroll', this.onScroll.bind(this), false);
	window.addEventListener('resize', this.onResize.bind(this), false);
}


HighlightTaObj.prototype.styleFont = function(node) {
	node.style.fontFamily = this.comp.getPropertyValue('font-family');
	node.style.fontSize = this.comp.getPropertyValue('font-size');
	node.style.lineHeight = this.comp.getPropertyValue('line-height');
	node.style.letterSpacing = this.comp.getPropertyValue('letter-spacing');
	node.style.color = this.comp.getPropertyValue('color');
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
	node.style.border = "0px solid #000000";
	node.style.borderRadius = "0px";
	node.style.wordWrap = "break-word";
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


HighlightTaObj.prototype.styleDiv = function() {
	this.styleFont(this.div);
	this.setDivHeight();
	this.setDivWidth();
	this.setDivLoc();
}


HighlightTaObj.prototype.setupDiv = function() {
	this.div = document.createElement('DIV');
	this.scratch(this.div);
	this.cntr.appendChild(this.div);

	this.styleDiv();
	
	this.div.style.zIndex = "1";
	this.div.style.whiteSpace = "pre-wrap";
	this.div.style.color = "transparent";
}


HighlightTaObj.prototype.setTaWidth = function() {
	this.ta.style.width = (this.cntr.clientWidth - this.padLeft - this.padRight) + "px";
}


HighlightTaObj.prototype.setTaHeight = function() {
	this.ta.style.height = (this.cntr.clientHeight - this.padTop - this.padBttm) + "px";
}


HighlightTaObj.prototype.setTaPad = function() {
	this.ta.style.paddingTop = this.padTop + "px";
	this.ta.style.paddingRight = this.padRight + "px";
	this.ta.style.paddingBottom = this.padBttm + "px";
	this.ta.style.paddingLeft = this.padLeft + "px";
}


HighlightTaObj.prototype.styleTa = function() {
	this.styleFont(this.ta);
	this.setTaWidth();
	this.setTaHeight();
	this.setTaPad();
}


HighlightTaObj.prototype.setupTa = function(node) {
	this.ta = node;
	this.scratch(this.ta);

	this.styleTa();

	this.ta.style.resize = "none";
	this.ta.style.zIndex = "2";
}


HighlightTaObj.prototype.setupCntr = function(node) {
	this.cntr = node;

	if(this.cntr.style.position === "") {
		this.cntr.style.position = "relative";
	}

	this.comp = window.getComputedStyle(this.cntr, null);
}


HighlightTaObj.prototype.fixNan = function(obj) {
	if(isNaN(obj)){
		return 0;
	}

	return obj;
}


HighlightTaObj.prototype.setTares = function() {
	this.boxSize = this.comp.getPropertyValue('box-sizing');
	this.width = this.cntr.clientWidth;

	this.fontSize = parseFloat(this.comp.getPropertyValue('font-size'));
	this.lineHeight = parseFloat(this.comp.getPropertyValue('line-height'));

	this.padLeft = parseFloat(this.comp.getPropertyValue('padding-left'));
	this.padRight = parseFloat(this.comp.getPropertyValue('padding-right'));
	this.padTop = parseFloat(this.comp.getPropertyValue('padding-top'));
	this.padBttm = parseFloat(this.comp.getPropertyValue('padding-bottom'));

	this.tare = this.padTop + this.padBttm;
}


HighlightTaObj.prototype.getTares = function() {
	this.setTares();

	if(this.boxSize !== 'border-box') {
		this.tare *= -1;
	}

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
		this.modCorners(true);
		this.setCorners();
	}

	if(this.isTa(args[1])) {
		this.getTares();
		this.setupTa(args[1]);
		this.setupDiv();
		this.addEvents();
	}

	if(args[2] && args[3]) {
		this.setRegExp(args[2]);
		this.setMark(args[3]);

		this.onInput();
	}
}


//'interface' for HighlightTaObj()
function HighlightTa() {
	var hlta = new HighlightTaObj();

	//instantiate
	if(arguments.length > 0) {
		hlta.init(arguments);
	}

	return {
		init: function() {
			hlta.init(arguments);
		},

		corners: function(bool) {
			hlta.modCorners(bool);
		},

		remove: function() {
			hlta.cleanUp();
		},

		getText: function () {
			return hlta.getText();
		},

		getComp: function() {
			return hlta.getComp();
		},

		setZ: function(num) {
			hlta.setIndex(num);
		},

		setRegex: function(re) {
			hlta.setRegExp(re);
		},

		setMark: function(dclr) {
			hlta.setMark(dclr);
		},
	}
}
