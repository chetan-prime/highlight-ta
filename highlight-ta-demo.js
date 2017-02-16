function highlightTaDemo() {
	console.log("highlightTaDemo() has started.");

	var taHlght = new HighlightTa();

	var re = new RegExp('Brian', 'g');
	taHlght.init(document.getElementById('highlight-ta'), re, '#bbbbbb', '0px');
}

highlightTaDemo();
