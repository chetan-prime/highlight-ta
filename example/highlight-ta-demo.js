function highlightTaDemo() {
	//create a regular expression
	var re = new RegExp('Michael', 'g');

	//initialize and instantiate prototype object
	//var taHlght = new HighlightTa(document.getElementById('highlight-div'), 
	//		document.getElementById('highlight-ta'), "mark-style", re);

	//initialize and instantiate closure function
	var taHlght = highlightta(document.getElementById('highlight-div'), 
			document.getElementById('highlight-ta'), "mark-style", re);
}

highlightTaDemo();
