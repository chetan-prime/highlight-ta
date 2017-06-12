var hlghtta = function (b, t, f, c) {
  "use strict";

  var ta, cComp, tComp, crnrs, modT, modB, radT, radB,
    brdrT, brdrB, brdrL, brdrR, padT, padB, padL, padR,
    tare, tareT, tareL, tareB, tareR, scrlL, scrlT;

  var cntr, div, bgrnd, re, mark, boxSize, width, borderTop, borderBttm, borderRad, padL, padR, func;

  var cPadT, cPadL, cBrdrT, cBrdrL, cMrgnT, cMrgnL, cTareT, cTareL;

  function noCrnrs() {
    if(crnrs) {
      ta.style.borderTopRightRadius = "";
      ta.style.borderBottomRightRadius = "";
    }
  }


  function sharpCrnrs() {
    if(crnrs) {
      if(modT) {
        ta.style.borderTopRightRadius = "0px";
      }

      if(modB) {
        ta.style.borderBottomRightRadius = "0px";
      }
    }
  }


  function scrollbar() {
    if(ta.clientHeight !== ta.scrollHeight) {
      if(ta.style.overflowY !== "scroll") {
        sharpCrnrs();
        ta.style.overflowY = "scroll";
      }
    }else if(ta.style.overflowY === "scroll") {
      noCrnrs();
      ta.style.overflowY = "hidden";
    }
  }


  function size() {
    scrlL = window.pageXOffset;
    scrlT = window.pageYOffset;

    if(ta.scrollHeight <= ta.clientHeight) {
      ta.style.height = "auto";
    }

    ta.style.height = ta.scrollHeight + tare + "px";
    div.style.heigt = ta.style.height + "px";

    scrollbar();
    window.scrollTo(scrlL, scrlT);
  }


  function cntrSpace() {
    div.style.top = (cTareT + brdrT + padT) + "px";
    div.style.left = (cTareL + brdrL + padL) + "px";
  }


  function removeHTML(t) {

    return t;
  }


  function newLines(t) {

    return t;
  }


  function highlight(t) {

    return t;
  }


  function filter() {
    var txt = ta.value;

    txt = removeHTML(txt);
    txt = newLines(txt);
    txt = highlight(txt);

    return txt;
  }


  function onInput() {
    var txt = filter(ta.value);
    div.innerHTML = txt;
    onResize();
  }


  function onScroll() {
    div.scrollTop = ta.scrollTop
    console.log("ta scroll");
  }


  function onResize() {
    noCrnrs();
    getTare();
    getCntrTare();
    cntrSpace();
    styleDiv();

    if(ta.style.overflowY === "scroll") {
      sharpCrnrs();
    }

    size();
  }


  function addEvnts() {
    ta.addEventListener("input", onInput, false);
    ta.addEventListener("scroll", onScroll, false);
    window.addEventListener("resize", onResize, false);
  }


  function rmvEvnts() {
    ta.removeEventListener("input", size, false);
	ta.removeEventListener("scroll", onScroll, false);
    window.removeEventListener("resize", onResize, false);
  }


  function fixNan(a) {
    if(isNaN(a)) {
      return 0;
    }

    return a;
  }


  function setTare() {
    brdrT = parseFloat(tComp.getPropertyValue("border-top-width"));
    brdrB = parseFloat(tComp.getPropertyValue("border-bottom-width"));
    brdrL = parseFloat(tComp.getPropertyValue("border-left-width"));
    brdrR = parseFloat(tComp.getPropertyValue("border-right-width"));
    padT = parseFloat(tComp.getPropertyValue("padding-top"));
    padB = parseFloat(tComp.getPropertyValue("padding-bottom"));
    padL = parseFloat(tComp.getPropertyValue("padding-left"));
    padR = parseFloat(tComp.getPropertyValue("padding-right"));

    brdrT = fixNan(brdrT);
    brdrB = fixNan(brdrB);
    brdrL = fixNan(brdrL);
    brdrR = fixNan(brdrR);
    padT = fixNan(padT);
    padB = fixNan(padB);
    padL = fixNan(padL);
    padR = fixNan(padR);
  }


  function setCntrTare() {
    cBrdrT = parseFloat(cComp.getPropertyValue("border-top-width"));
    cBrdrL = parseFloat(cComp.getPropertyValue("border-left-width"));
    cPadT = parseFloat(cComp.getPropertyValue("padding-top"));
    cPadL = parseFloat(cComp.getPropertyValue("padding-left"));
    cMrgnT = parseFloat(cComp.getPropertyValue("margin-top"));
    cMrgnL = parseFloat(cComp.getPropertyValue("margin-left"));

    cBrdrT = fixNan(cBrdrT);
    cBrdrL = fixNan(cBrdrL);
    cPadT = fixNan(cPadT);
    cPadL = fixNan(cPadL);
    cMrgnT = fixNan(cMrgnT);
    cMrgnL = fixNan(cMrgnL);
  }


  function setCrnrs() {
    radT = parseFloat(tComp.getPropertyValue("border-top-right-radius"));
    radB = parseFloat(tComp.getPropertyValue("border-bottom-right-radius"));
    radT = fixNan(radT);
    radB = fixNan(radB);

    modT = (brdrT < radT) ? true : false;
    modB = (brdrB < radB) ? true : false;
  }


  function getTare() {
    setTare();
    setCrnrs();

    if(tComp.getPropertyValue("box-sizing") === "border-box") {
      tare = brdrT + brdrB;
    }else{
      tare = (padT + padB) * -1;
    }

    tareT = padT * -1;
    tareL = padL * -1;
    tareR = padR * -1;
    tareB = padB * -1;
  }


  function getCntrTare() {
    setCntrTare();

    if(cComp.getPropertyValue("box-sizing") === "border-box") {
      cTareT = cPadT + cBrdrT;
      cTareL = cPadL + cBrdrL;
    }else{
      cTareT = cPadT + cBrdrT;
      cTareL = cPadL + cBrdrL;
    }
  }


  function modCrnrs(b) {
    if(typeof b === "boolean") {
      if(!b) {
        noCrnrs();
        crnrs = b;
      }else{
        crnrs = b;
        sharpCrnrs();
      }
    }
  }


  function styleTa() {
    ta.style.overflow = "hidden";
    ta.style.overflowX = "hidden";
    ta.style.overflowY = "hidden";
    ta.style.wordWrap = "break-word";
    ta.style.position = "relative";
    ta.style.background = "none";
    ta.style.backgroundColor = "transparent";
    ta.style.zIndex = "1";
  }


  function styleDiv() {
    div.style.position = "absolute";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    div.style.overflow = "hidden";
    div.style.overflowX = "hidden";
    div.style.overflowY = "hidden";
    //div.style.maxHeight = cComp.getPropertyValue("max-height");
    //div.style.color = "transparent";
    //div.style.borderColor = "transparent";
    div.style.border = "none";
    div.style.boxSizing = "border-box";
    div.style.boxSizing = tComp.getPropertyValue("box-sizing");
    div.style.fontStyle = tComp.getPropertyValue("font-style");
    div.style.fontSize = tComp.getPropertyValue("font-size");
    div.style.fontVariant = tComp.getPropertyValue("font-variant");
    div.style.fontWeight = tComp.getPropertyValue("font-weight");
    div.style.lineHeight = tComp.getPropertyValue("line-height");
    div.style.marginTop = tComp.getPropertyValue("margin-top");
    div.style.marginLeft = tComp.getPropertyValue("margin-left");
    div.style.height = ta.clientHeight + tareL + tareR + "px";
    div.style.width = ta.clientWidth + tareT + tareB + "px";
  }


  function styleCntr() {
    if(cntr.style.position === "") {
      cntr.style.position = "relative";
      console.log("changed");
    }

    console.log(tare);
    cntr.style.top = tare + "px";
  }


  function unstyle(n) {
    n.style.overflow = "";
    n.style.overflowX = "";
    n.style.overflowY = "";
    n.style.wordWrap = "";
    n.style.whiteSpace = "";
    n.style.position = "";
    n.style.height = "";
  }


  function cleanUp() {
    if(ta !== undefined) {
      unstyle(ta);
      noCrnrs();
      rmvEvnts();
      tComp = undefined;
      crnrs = undefined;
      ta = undefined;
    }
  }


  function copyText(t, d) {
    while(d.hasChildNodes()) {
      d.removeChild(d.lastChild);
    }

    var txt = document.createTextNode(t.value);
    d.appendChild(txt);

  }


  function setup(b, t, f, c) {
    if(!t || !b) {
      return;
    }

    if(!f) {
      func = f;
    }

    if(t.tagName === "TEXTAREA") {
      cleanUp();

      ta = t;
      tComp = window.getComputedStyle(ta);

      modCrnrs(true);
      modCrnrs(c);

      rmvEvnts();
      addEvnts();
      styleTa();
    }

    if(b.tagName === "DIV") {
      cntr = b;
      cComp = window.getComputedStyle(cntr);

      styleCntr();

      div = document.createElement("DIV");

      cntr.appendChild(div);

      bgrnd = document.createElement("DIV");
      div.appendChild(bgrnd);
    }

    getTare();
    getCntrTare();
    styleDiv();
    onInput();
    onResize();
  }


  //initialize on instance
  setup(b, t, f, c);


  return {
    //"interface"
    init: function(b, t, f, c) {
      setup(b, t, f, c);
    },

    setcrnrs: function(b) {
      modCrnrs(b);
    },

    update: function() {
      onResize();
    },

    destroy: function() {
      cleanUp();
    }
  };
};
