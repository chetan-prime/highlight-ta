function highlightTaDemo() {
	console.log("highlightTaDemo() has started.");

	var re = new RegExp('Brian', 'g');

	var taHlght = highlightta(document.getElementById('highlight-div'), 
			document.getElementById('highlight-ta'), re, "mark-style");
}

highlightTaDemo();
