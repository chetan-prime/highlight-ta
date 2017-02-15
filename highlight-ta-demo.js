function highlightTaDemo() {
	console.log("highlightTaDemo() has started.");

	var taHlght = new HighlightTa();

	taHlght.setRegex('Brian', 'g');
	taHlght.setMark('#bbbbbb', '0px', '0px');
	taHlght.init(document.getElementById('highlight-ta'));
}

highlightTaDemo();
