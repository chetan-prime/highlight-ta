// Highlight-Ta
// Brian Taylor Vann
// April 2018
// MIT License


var highlightTa = function (ta) {
    "use strict";

    var confirmTextarea = function (ta) {
        if (typeof ta === "object" && ta.tagName === "TEXTAREA") {
            return ta;
        }

        throw new TypeError("Argument is not of type TEXTAREA.");
    };


    var adjustHeight = function (ta) {
        if (ta.scrollHeight <= ta.clientHeight) {
            ta.style.height = "auto";
        }

        if (ta.clientHeight < ta.scrollHeight) {
            if (window.getComputedStyle(ta).getPropertyValue("box-sizing") === "border-box") {
                ta.style.height = ta.scrollHeight + ta.offsetHeight - ta.clientHeight + "px";
            } else {
                ta.style.height = ta.scrollHeight - (ta.offsetHeight - ta.clientHeight) + "px";
            }
        }

        return ta;
    };


    var onUserChange = function (ta) {
        return function () {
            return adjustHeight(ta);
        };
    };


    var addEvents = function (ta) {
        window.addEventListener("resize", onUserChange(ta), false);
        ta.addEventListener("input", onUserChange(ta), false);
        ta.addEventListener("change", onUserChange(ta), false);

        return ta;
    };


    var removeEvents = function (ta) {
        window.removeEventListener("resize", onUserChange(ta), false);
        ta.removeEventListener("input", onUserChange(ta), false);
        ta.removeEventListener("change", onUserChange(ta), false);

        return ta;
    };


    var setup = function (ta) {
        return addEvents(confirmTextarea(ta));
    };


    var textarea = setup(ta);


    return Object.freeze({
        update: function () {
            return onUserChange(textarea);
        },

        destroy: function () {
            return removeEvents(textarea);
        }
    });
};
