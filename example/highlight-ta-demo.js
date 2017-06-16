function highlightTaDemo() {

  // starting texts
  var regexes = ["[A-Z][a-z]*", "@[a-z]{1,15}\\s", ".+@.+",
      "\\([0-9]{3}\\)-?[0-9]{3}-[0-9]{4}", "[A-Z][a-z]"]
  var letter = "You can insert your own text to practice too!\nThis \
textarea will 'highlight' it based on your regex.\n\nPhone Numbers:\n(123)\
-456-7890\n(305)894-4205\n839-574-893\n\nEmails:\nyobunkyboo@5ome-dude.com\n\
4funkymonkies@hom3fry.com\nfabtabpunkbag@gimmeshelter.com\n\nTwitter Handles:\
\n@twittenbykittens\n@junebugjunkie\n@couchpuppy\n\nAddresses:\nCornelius \
Bunkercrumple\n451 Fantasy Ln\nCarmel CA\n93921\n\nJohn Bartholomew Bohem\n\
43321 Manteca Dr\nJacksonville Fl\n32201"


  // get 'form' elements
  var chk1 = document.getElementById("mod-g");
  var chk2 = document.getElementById("mod-i");
  var chk3 = document.getElementById("mod-m");
  var chks = [chk1, chk2, chk3];


  //create regex input
  var ta = document.getElementById("regex-input");

  // if empty, provide default text
  if(ta.value === "") {
    ta.value = regexes[parseInt(Math.random() * regexes.length)];
  }

  var ata = autota(ta);

  // create a highlight-ta
  var cntr = document.getElementById('highlight-div');
  var cntrta = document.getElementById('highlight-ta');
  // if empty, provide default text
  if(cntrta.value === "") {
    cntrta.value = letter;
  }


  var taHlght = hlghtta(cntr, cntrta);

  // main function to trigger highlights
  function changed() {
    var pattern = ta.value;
    var mods = "";

    for(var i = 0; i < chks.length; i++) {
      if(chks[i].checked === true) {
        mods += chks[i].value;
      }
    }

    var reg = new RegExp(pattern, mods);
    
    var re = {
      "pattern1": {"pattern": "red",
                   "css": "mark--bgrnd-clr--red"},
      "pattern2": {"pattern": "blue",
                   "css": "mark--bgrnd-clr--blue"},
      "pattern3": {"pattern": "purple",
                   "css": "mark--bgrnd-clr--purple"},
      "pattern4": {"function": function(t) {
        t = t.replace(reg, "<mark style=\"color: transparent\">$&</mark>");

        return t;
      }}
    };

    taHlght.setHighlights(re);
  }

  // add event listeners for 'form' elements
  chk1.addEventListener('change', changed, false);
  chk2.addEventListener('change', changed, false);
  chk3.addEventListener('change', changed, false);
  ta.addEventListener('input', changed, false);

  changed();
}


highlightTaDemo();
