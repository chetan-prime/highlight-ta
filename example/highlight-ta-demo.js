function highlightTaDemo() {

  // first demo textarea
  var ta0 = document.getElementById("ta-demo0");
  var div0 = document.getElementById("div-demo0");
  var reg0 = new RegExp("[A-Z][a-z]*", "g");
  var areg1 = new RegExp("\\b(S|s)[a-z]*", "g");
  var areg2 = new RegExp("\\b(F|f)[a-z]*", "g");
  var areg3 = new RegExp("\\b(T|t)[a-z]*", "g");
  var pttrn0 = {"pattern0": {"pattern": reg0},
                "pattern1": {"pattern": areg1, "css": "mark--bgrnd-clr--blue"},
                "pattern2": {"pattern": areg2, "css": "mark--bgrnd-clr--red"},
                "pattern3": {"pattern": areg3, "css": "mark--bgrnd-clr--green"}
  };

  console.log(ta0);
  console.log(div0);
  console.log(reg0);

  var ht0 = hlghtta(div0, ta0, pttrn0);


  // try different regexes
  var ta1 = document.getElementById("ta-demo1");
  var div1 = document.getElementById("div-demo1");
  var chks = document.getElementsByName("chks")
  var chk1 = document.getElementById("chkbx1");
  var chk2 = document.getElementById("chkbx2");
  var chk3 = document.getElementById("chkbx3");
  var chk4 = document.getElementById("chkbx4");
  var pttrn1 = {"pattern0": {"pattern": reg0},
                "pattern1": {"pattern": areg1, "css": "mark--bgrnd-clr--blue"},
                "pattern2": {"pattern": areg2, "css": "mark--bgrnd-clr--red"},
                "pattern3": {"pattern": areg3, "css": "mark--bgrnd-clr--green"}
  };

  console.log(ta1);
  console.log(div1);
  console.log(chk1);
  console.log(chk2);
  console.log(chk3);
  console.log(chk4);
  console.log(chks);

  var ht1 = hlghtta(div1, ta1);

  function switchChcks() {
    console.log("switch checks")
    var c = document.getElementsByName("chks")

    var pttrn1 = {};

    for(var j = 0; j < c.length; j++) {
      console.log(c[j])
      if(c[j].checked){
        switch(c[j].value) {
          case "0":
            pttrn1["0"] = {"pattern": reg0};
            break;
          case "1":
            pttrn1["1"] = {"pattern": areg1, "css": "mark--bgrnd-clr--blue"};
            break;
          case "2":
            pttrn1["2"] = {"pattern": areg2, "css": "mark--bgrnd-clr--red"};
            break;
          case "3":
            pttrn1["3"] = {"pattern": areg3, "css": "mark--bgrnd-clr--green"};
            break;
        }
      }
    }

    ht1.setHighlights(pttrn1);
  }

  for(var i = 0; i < chks.length; i++){
    console.log(i)
    chks[i].addEventListener("click", switchChcks.bind(this), false);
  }

  // destroy demo textarea
  var ta2 = document.getElementById("ta-demo2");
  var div2 = document.getElementById("div-demo2");
  var reg2 = new RegExp("[A-Z][a-z]*", "g");
  var pttrn2 = {
    "pattern0": {"pattern": reg2}};

  console.log(ta2);
  console.log(div2);
  console.log(reg2);

  var ht2 = hlghtta(div2, ta2, pttrn2);

  function switchInit(v) {
    switch(v) {
      case "on":
        ht2 = hlghtta(div2, ta2, pttrn2);
        break;
      case "off":
        ht2.destroy();
        break;
    }
  }
  var rad2 = document.getElementsByName("ta1");

  for(var i = 0; i < rad2.length; i++){
    rad2[i].addEventListener("click", function sup() {switchInit(this.value)}, false);
  }


  // mod corners
  var ta3 = document.getElementById("ta-demo3");
  var div3 = document.getElementById("div-demo3");
  var reg3 = new RegExp("[A-Z][a-z]*", "g");
  var pttrn3 = {"pattern0": {"pattern": reg3}};

  console.log(ta3);
  console.log(div3);
  console.log(reg3);

  var ht3 = hlghtta(div3, ta3, pttrn3);

  function switchCrnrs(v) {
    switch(v) {
      case "yes":
        ht3.setCorners(true);
        break;
      case "no":
        ht3.setCorners(false);
        break;
    }
  }

  var rad3 = document.getElementsByName("ta3");

  for(var i = 0; i < rad3.length; i++){
    rad3[i].addEventListener("click", function yo() {switchCrnrs(this.value)}, false);
  }


  // update
  var ta4 = document.getElementById("ta-demo4");
  var ta5 = document.getElementById("ta-demo5");
  var div5 = document.getElementById("div-demo5");
  var reg5 = new RegExp("[A-Z][a-z]*", "g");
  var pttrn5 = {"pattern0": {"pattern": reg5}};

  console.log(ta5);
  console.log(div5);
  console.log(reg5);

  var ht5 = hlghtta(div5, ta5, pttrn5);

  function switchValue(s) {
    ta5.value = s;
    ht5.update();
  }

  var bttn = document.getElementById("update");

  bttn.addEventListener("click", function hey() {switchValue(ta4.value)}, false);



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
