#Highlight-Ta#

##Abstract##

Use a regex to highlight text inside a textarea.

Checkout this [demo]().

##Details##

Highlight-Ta uses a regex to highlight text inside a textarea. This is a stand-alone script. It also adjusts its height to fit its text while following CSS declarations like box-sizing, padding, and min/max height. Highlight-Ta was created for designers and developers who needed a fast, highlighted textarea without relying on jQuery or weighty, third-party libraries.

##Usage##

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

Next, create a RegExp object. Then pass the \<div\>, \<textarea\>, RegExp, and CSS class when you initialize a new instance of HighlightTa.

```Javascript
var re = new RegExp('Brian', 'g');
var div = document.getElementById('highlight-div');
var ta = document.getElementById('highlight-ta');
var dclr = "mark-style";

var hlghtTa = new HighlightTa(div, ta, re, dclr);
```

That's all you need. The intention is to keep style and function separate. If you wish to style HighlightTa, style the \<div\> element. The \<textarea\> will adjust accordingly.

If you're wondering, "why not dynamically create a textarea inside the div?" The main advantage is a user's input won't be lost if they accidentally refresh the page.

There are also a few helper methods:

Set the z-index of HighlightTa:

`hlghtTa.setZ(2);`

or

`hlghtTa.setZ("2");`

Return the text inside the \<textarea\>:

`hlghtTa.getText();`

Release \<testarea\> from HighlightTa:

`hlghtTa.remove();`

##License##

Highlight-Ta is release under the GNU [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) license.
