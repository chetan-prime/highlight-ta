(function () {
  // first demo textarea
  var divWithTa = document.getElementById("div-demo");

  var reg0 = new RegExp("[A-Z][a-z]*", "g");
  var areg1 = new RegExp("\\b(S|s)[a-z]*", "g");
  var areg2 = new RegExp("\\b(F|f)[a-z]*", "g");
  var areg3 = new RegExp("\\b(T|t)[a-z]*", "g");
  var pttrn0 = {"pattern0": {"pattern": reg0},
                "pattern1": {"pattern": areg1, "css": "mark--bgrnd-clr--blue"},
                "pattern2": {"pattern": areg2, "css": "mark--bgrnd-clr--red"},
                "pattern3": {"pattern": areg3, "css": "mark--bgrnd-clr--green"}
  };
})()
