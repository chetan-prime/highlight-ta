function highlightTaDemo() {
	//create form
	var chk1 = document.getElementById('mod-g');
	var chk2 = document.getElementById('mod-i');
	var chk3 = document.getElementById('mod-m');
	var chks = [chk1, chk2, chk3];

	//create regex input
	var ta = document.getElementById('regex-input');
	var ata = autota(ta);

	//create regex
	var pattern = 'Michael';
	var mods = 'g';
	var re = new RegExp(pattern, mods);

	//create a highlight-ta
	var cntr = document.getElementById('highlight-div');
	var cntrta = document.getElementById('highlight-ta');
	var taHlght = highlightta(cntr, cntrta, "mark-style", re);


	function changed() {
		pattern = ta.value;
		mods = "";

		for(var i = 0; i < chks.length; i++) {
			if(chks[i].checked === true) {
				mods += chks[i].value;
			}
		}

		re = new RegExp(pattern, mods);
		taHlght.setRegex(re);
	}

	chk1.addEventListener('change', changed, false);
	chk2.addEventListener('change', changed, false);
	chk3.addEventListener('change', changed, false);
	ta.addEventListener('input', changed, false);
}

highlightTaDemo();
