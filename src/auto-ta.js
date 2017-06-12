var hlghtta = function (b, t, f, c) {
  "use strict";

  var ta, cntr, tComp, cComp, crnrs, modT, modB, radT, 
    radB, brdrT, brdrB, brdrL, brdrR, padT, padB, padL,
    padR, tare, scrlL, scrlT, div, re, mark, func,
    cPadT, cPadL;


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

    scrollbar();
    updateDiv();

    window.scrollTo(scrlL, scrlT);
  }


  function removeHTML(t) {
    t = t.replace(/&/g, '&amp');
    t = t.replace(/</g, '&lt');
    t = t.replace(/>/g, '&gt');

    return t;
  }


  function newLines(t) {
    //t = t.replace(/\n$/g, '\n\n');
    t = t.replace(/\n$/g, '<br><br>');

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
    size();
  }


  function onScroll() {
    div.scrollTop = ta.scrollTop;
  }


  function onResize() {
    noCrnrs();
    getTare();
    cntrSpace();
    styleTa();
    styleDiv();
    simpleStyle();

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
    cPadT = parseFloat(cComp.getPropertyValue("padding-top"));
    cPadL = parseFloat(cComp.getPropertyValue("padding-left"));

    cPadT = fixNan(cPadT);
    cPadL = fixNan(cPadL);
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
    setCntrTare();
    setCrnrs();

    if(tComp.getPropertyValue("box-sizing") === "border-box") {
      tare = brdrT + brdrB;
    }else{
      tare = (padT + padB) * -1;
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


  function simpleStyle() {
    if(cntr.style.position === "") {
      cntr.style.position = "relative";
    }

    div.style.position = "absolute";
    div.style.whiteSpace = "pre-line";
    div.style.wordWrap = "break-word";
    div.style.overflow = "hidden";
    div.style.overflowX = "hidden";
    div.style.overflowY = "hidden";
    //div.style.color = "transparent";
    //div.style.border = "none";
    div.style.border = "1px solid #000000";
    div.style.boxSizing = "border-box";
  }


  function styleDiv() {
    div.style.boxSizing = tComp.getPropertyValue("box-sizing");
    div.style.fontStyle = tComp.getPropertyValue("font-style");
    div.style.fontSize = tComp.getPropertyValue("font-size");
    div.style.fontVariant = tComp.getPropertyValue("font-variant");
    div.style.fontWeight = tComp.getPropertyValue("font-weight");
    div.style.lineHeight = tComp.getPropertyValue("line-height");
    div.style.marginTop = tComp.getPropertyValue("margin-top");
    div.style.marginLeft = tComp.getPropertyValue("margin-left");
  }


  function cntrSpace() {
    div.style.top = (cPadT + brdrT + padT) + "px";
    div.style.left = (cPadL + brdrL + padL) + "px";
  }


  function updateDiv() {
    div.style.height = (ta.clientHeight - padL - padR) + "px";
    div.style.width = (ta.clientWidth - padT - padB) + "px";
  }


  function unstyle(n) {
    n.style.position = "";
    n.style.width = "";
    n.style.overflow = "";
    n.style.overflowX = "";
    n.style.overflowY = "";
    n.style.wordWrap = "";
    n.style.whiteSpace = "";
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

    if(cntr !== undefined) {
      unstyle(cntr);
      cntr.removeChild(div);
      cntr = undefined;
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

    cleanUp();

    if(t.tagName === "TEXTAREA") {
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

      div = document.createElement("DIV");

      onResize();
      onInput();
      cntr.appendChild(div);
    }
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
