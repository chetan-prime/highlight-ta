function highlightta() {
	//'private' variables
	var cntr = null;
	var div = null;
	var ta = null;
	var re = null;
	var mark = null;
	var comp = null;
	var corners = null;
	var modTop = null;
	var modBttm = null;

	var boxSize = null;
	var width = null;
	var borderTop = null;
	var borderBttm = null;
	var borderRadTop = null;
	var borderRadBttm = null;
	var padLeft = null;
	var padRight = null;
	var padTop = null;
	var padBttm = null;

	//initialize on instance
	if(arguments) {
		setup(arguments);
	};

	//'private' functions
	function getText() {
		return ta.value;
	};


	function getComp() {
		return comp;
	};


	function setIndex(num) {
		num = fixNan(num);

		if(typeof num === 'number') {
			num = num.toString();
		}

		if(parseFloat(num)) {
			cntr.style.zIndex = num;
		}
	};


	function setMark(dclr) {
		if(typeof dclr === 'string') {
			mark = '<mark style="margin: 0px; padding: 0px;'
				+ 'border: 0px; color: transparent;" class=" ' 
				+ dclr + '">$&</mark>';
		}
	};


	function setRegExp(regex) {
		if(regex instanceof RegExp) {
			re = regex;
		}
	};


	function highlight(text) {
		if(re !== null) {
			text = text.replace(re, mark);
		}

		return text;
	};


	function newLines(text) {
		text = text.replace(/\n$/g, '\n\n');

		return text;
	};


	function removeHTML(text) {
		text = text.replace(/&/g, '&amp');
		text = text.replace(/</g, '&lt');
		text = text.replace(/>/g, '&gt');

		return text;
	};


	function scrollbar() {
		if(ta.clientHeight !== ta.scrollHeight) {
			if(ta.style.overflowY !== 'scroll') {
				if(corners) {
					styleCorners();
				}

				ta.style.overflowY = 'scroll';
			}
		}else if(ta.style.overflowY === 'scroll') {
			ta.style.overflowY = 'hidden';

			if(corners) {
				cancelCorners();
			}
		}
	};


	function setCorners() {
		borderRadTop = parseFloat(comp.getPropertyValue('border-top-right-radius'));
		borderRadBttm = parseFloat(comp.getPropertyValue('border-bottom-right-radius'));

		borderRadTop = fixNan(borderRadTop);
		borderRadBttm = fixNan(borderRadBttm);

		modTop = (borderTop < borderRadTop) ? true : false;
		modBttm = (borderBttm < borderRadBttm) ? true : false;
	};


	function modCorners(bool) {
		if(typeof bool === 'boolean') {
			corners = bool;
		}
	};


	function cancelCorners() {
		if(modTop) {
			cntr.style.borderTopRightRadius = borderRadTop + "px";
		}	

		if(modBttm) {
			cntr.style.borderBottomRightRadius = borderRadBttm + "px";
		}	
	};


	function styleCorners() {
		if(modTop) {
			cntr.style.borderTopRightRadius = "0px";
		}	

		if(modBttm) {
			cntr.style.borderBottomRightRadius = "0px";
		}	
	};


	function size() {
		scrollLeft = window.pageXOffset;
		scrollTop = window.pageYOffset;

		cntr.style.height = "auto";
		ta.style.height = "auto";

		if(cntr.clientHeight < ta.scrollHeight) {
			cntr.style.height = (ta.scrollHeight + tare) + "px";
		}

		setTaHeight();
		setTaWidth();
		setDivHeight();
		scrollbar();
		setDivWidth();

		window.scrollTo(scrollLeft, scrollTop);
	};


	function onInput() {
		var text = ta.value;

		text = removeHTML(text);
		text = highlight(text);
		text = newLines(text);

		div.innerHTML = text;

		size();
	};


	function onScroll() {
		div.scrollTop = ta.scrollTop;
	};


	function onResize() {
		if(width !== cntr.clientWidth) {
			getTares();
			styleTa();
			styleDiv();
		}
	};


	function removeEvents() {
		ta.removeEventListener('input', onInput, false);
		ta.removeEventListener('scroll', onScroll, false);
		window.removeEventListener('resize', onResize, false);
	};


	function addEvents() {
		ta.addEventListener('input', onInput, false);
		ta.addEventListener('scroll', onScroll, false);
		window.addEventListener('resize', onResize, false);
	};


	function styleFont(node) {
		node.style.fontFamily = comp.getPropertyValue('font-family');
		node.style.fontSize = comp.getPropertyValue('font-size');
		node.style.lineHeight = comp.getPropertyValue('line-height');
		node.style.letterSpacing = comp.getPropertyValue('letter-spacing');
		node.style.color = comp.getPropertyValue('color');
	};


	function scratch(node) {
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
	};


	function setDivLoc() {
		div.style.top = padTop + "px";
		div.style.left = padLeft + "px";
	};


	function setDivHeight() {
		div.style.height = (ta.clientHeight - padTop - padBttm) + "px";
	};


	function setDivWidth() {
		div.style.width = (ta.clientWidth - padLeft - padRight) + "px";
	};


	function styleDiv() {
		styleFont(div);
		setDivHeight();
		setDivWidth();
		setDivLoc();
	};


	function setupDiv() {
		div = document.createElement('DIV');
		scratch(div);
		cntr.appendChild(div);

		styleDiv();
	
		div.style.zIndex = "1";
		div.style.whiteSpace = "pre-wrap";
		div.style.color = "transparent";
	};


	function setTaWidth() {
		ta.style.width = (cntr.clientWidth - padLeft - padRight) + "px";
	};


	function setTaHeight() {
		ta.style.height = (cntr.clientHeight - padTop - padBttm) + "px";
	};


	function setTaPad() {
		ta.style.paddingTop = padTop + "px";
		ta.style.paddingRight = padRight + "px";
		ta.style.paddingBottom = padBttm + "px";
		ta.style.paddingLeft = padLeft + "px";
	};


	function styleTa() {
		styleFont(ta);
		setTaWidth();
		setTaHeight();
		setTaPad();
	};


	function setupTa(node) {
		ta = node;
		scratch(ta);

		styleTa();

		ta.style.resize = "none";
		ta.style.zIndex = "2";
	};


	function setupCntr(node) {
		cntr = node;

		if(cntr.style.position === "") {
			cntr.style.position = "relative";
		}

		comp = window.getComputedStyle(cntr, null);
	};


	function fixNan(obj) {
		if(isNaN(obj)){
			return 0;
		}

		return obj;
	};


	function setTares() {
		boxSize = comp.getPropertyValue('box-sizing');
		width = cntr.clientWidth;

		fontSize = parseFloat(comp.getPropertyValue('font-size'));
		lineHeight = parseFloat(comp.getPropertyValue('line-height'));

		padLeft = parseFloat(comp.getPropertyValue('padding-left'));
		padRight = parseFloat(comp.getPropertyValue('padding-right'));
		padTop = parseFloat(comp.getPropertyValue('padding-top'));
		padBttm = parseFloat(comp.getPropertyValue('padding-bottom'));

		tare = padTop + padBttm;
	};


	function getTares() {
		setTares();

		if(boxSize !== 'border-box') {
			tare *= -1;
		}
	};


	function cleanUp() {
		if(cntr !== null) {
			cntr = null;
			div = null;
		}

		if(ta !== null) {
			removeEvents();
			ta = null;
		}
	};


	function isTa(node) {
		return node.tagName === 'TEXTAREA';
	};


	function isDiv(node) {
		return node.tagName === 'DIV';
	};


	function setup(args) {
		//args is [div elem, ta elem, re, re-style]
		console.log("yo");
		if(isDiv(args[0])) {
		console.log("yo1");
			cleanUp();
			setupCntr(args[0]);
			modCorners(true);
			setCorners();
		}

		if(isTa(args[1])) {
			getTares();
			setupTa(args[1]);
			setupDiv();
			addEvents();
		}

		if(args[2] && args[3]) {
			setRegExp(args[2]);
			setMark(args[3]);

			onInput();
		}
	};

	//'interface'
	return {
		init: function() {
			setup(arguments);
		},

		corners: function(bool) {
			modCorners(bool);
		},

		remove: function() {
			cleanUp();
		},

		getText: function () {
			return getText();
		},

		getComp: function() {
			return getComp();
		},

		setZ: function(num) {
			setIndex(num);
		},

		setRegex: function(re) {
			setRegExp(re);
		},

		setMark: function(dclr) {
			setMark(dclr);
		},
	}
}
