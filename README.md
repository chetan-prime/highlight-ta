#Highlight-Ta#

##Abstract##

Use a regex to highlight text inside a textarea.

Checkout this [demo]().

##Details##

Highlight-Ta is a stand-along script that uses a regex to highlight text inside a textarea. It also adjusts its height to fit its text while following CSS declarations like box-sizing, padding, and min/max height. Highlight-Ta was created for designers and developers who need a fast, highlighted textarea without relying on jQuery or weighty, third-party libraries.

##Usage##

Highlight-Ta will square it's top-right and bottom-right corners by default if its border-width is less than its border-radius. It keeps the textarea sharp and neat. This feature can be disabled during or after initialization.

Grab `highlight-ta.js` and add it to your resources.

Start with a \<textarea\> inside a \<div\> element:

```HTML
<div id="highlight-div" class="someclass">
	<textarea id="highlight-ta"></textarea>	
</div>
```

Create a custom CSS class for the \<mark\> element:

```CSS
.mark-style {
	background-color: rgba(80, 244, 66, 0.7);
	border-radius: 2px;
}
```

Next, create a RegExp object and pass the \<div\>, \<textarea\>, RegExp, and the CSS class to initialize a new instance of HighlightTa.

```Javascript
var re = new RegExp('Brian', 'g');
var div = document.getElementById('highlight-div');
var ta = document.getElementById('highlight-ta');
var dclr = "mark-style";

//Instantiate and initialize highlight-ta:
var hlghtTa = highlightta(div, ta, re, dclr);
var hlghtTa = highlightta(div, ta, re, dclr, false);
```

That's all you need. The intention is to keep style and function separate. If you wish to style HighlightTa, then style the \<div\> element. The \<textarea\> will adjust accordingly.

If you're wondering, "why not dynamically create a textarea inside the div?" The main advantage is input won't be lost if the page accidentally is accidentally refreshed.

There are also a few helper methods:

```Javascript
//Initialize or reset the textarea with init():
hlghtTa.init(div, ta, re, dclr);
hlghtTa.init(div, ta, re, dclr, false);

//Turn corners off:
hlghtTa.corners();
hlghtTa.corners(false);

//Release \<testarea\> from HighlightTa:
hlghtTa.remove();

//Get the text inside the textarea:
hlghtTa.getText();

//Get the CSSStyleDeclaration object:
hlghtTa.getComp();

//Set the z-index:
hlghtTa.setZ(2); //use a number
hlghtTa.setZ("2"); //or use a string

//Set the class for \<mark\>:
hlghtTa.setMark("class-name");

//Set the RegExp with JavaScript RegExp object:
hlghtTa.setRegex(RegExp);

If you want to experiment with or modify Highlight-Ta, use the prototype object in `highlight-ta-proto.js`.

```Javascript
//Instantiate and initialize the prototype object:
var ta = new HighlightTa(document.getElementById("SomeID"));
var ta = new HighlightTa(document.getElementById("SomeID"), false);
```

##Compatability##

Browser | Status
---|---
Firefox | Yes
Chrome | Yes
IE | Not yet tested
Edge | Not yet tested
Opera | Not yet tested
Android | Yes
iOS | Not yet tested

##License##

Highlight-Ta is release under the GNU [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) license.
