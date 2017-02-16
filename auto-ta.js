function AutoTa() {
	this.ta = null;
	this.comp = null;
	this.border = null;
	this.tare = null;
}


AutoTa.prototype.delResize = function() {
	window.setTimeout(this.size.call(this), 0);
}


AutoTa.prototype.winResize = function() {
	this.getTare();
	this.delResize()
}


AutoTa.prototype.size = function() {
	var scrollLeft = window.pageXOffset;
	var scrollTop = window.pageYOffset;

	if(this.ta.scrollHeight >= this.ta.clientHeight){
		this.ta.style.height = 'auto';
	}
	
	this.ta.style.height = this.ta.scrollHeight + this.border + this.tare + 'px';

	this.scrollbar();

	window.scrollTo(scrollLeft, scrollTop);
}


AutoTa.prototype.scrollbar = function() {
	if(this.ta.clientHeight !== this.ta.scrollHeight) {
		if(this.ta.style.overflowY !== 'scroll') {
			this.ta.style.overflowY = 'scroll';
		}
	}else if(this.ta.style.overflowY === 'scroll') {
		this.ta.style.overflowY = 'hidden';
	}
}


AutoTa.prototype.addEvents = function() {
	window.addEventListener('resize', this.winResize.bind(this), false);
	this.ta.addEventListener('input', this.delResize.bind(this), false);
}


AutoTa.prototype.removeEvents = function(node) {
	window.removeEventListener('resize', this.winResize, false);
	this.ta.removeEventListener('input', this.delResize, false);
}


AutoTa.prototype.fixNan = function(obj) {
	if(isNaN(obj)){
		return 0;
	}

	return obj;
}


AutoTa.prototype.getTare = function() {
	var borderTop = parseFloat(this.comp.getPropertyValue('border-top-width'));
	var borderBttm = parseFloat(this.comp.getPropertyValue('border-bottom-width'));
	var padTop = parseFloat(this.comp.getPropertyValue('padding-top'));
	var padBttm = parseFloat(this.comp.getPropertyValue('padding-bottom'));

	this.fixNan(borderTop);
	this.fixNan(borderBttm);
	this.fixNan(padTop);
	this.fixNan(padBttm);

	if(this.comp.getPropertyValue('box-sizing') === 'border-box'){
		this.border = borderTop + borderBttm;
		this.tare = 0;
	}else{
		if(borderTop < padTop){
			this.tare = (padTop + borderTop) * -1;
		}else{
			this.tare = (padTop + padBttm) * -1;
		}

		this.border = 0;
	}
}


AutoTa.prototype.isTa = function(node) {
	return node.tagName === 'TEXTAREA';
}


AutoTa.prototype.setup = function(node) {
	this.ta = node;
	this.ta.style.overflowY = "hidden";
	this.comp = window.getComputedStyle(this.ta, null);

	this.getTare();
	this.addEvents();
	this.size();
}


AutoTa.prototype.remove = function(node) {
	if(this.ta !== null) {
		this.removeEvents(this.ta);
		this.comp = null;
		this.ta = null;
	}
}


AutoTa.prototype.get = function() {
	return this.ta;
}


AutoTa.prototype.init = function(node) {
	if(this.isTa(node)) {
		this.remove()
		this.setup(node);
	}
}
