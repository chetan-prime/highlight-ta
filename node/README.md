# Highlight-Ta #

## Abstract ##

Highlight-Ta is a stand-along script that uses a regex, strings, and functions to highlight text inside a textarea. It also adjusts its height to fit its text while following CSS declarations like box-sizing, padding, and min/max height. Highlight-Ta was created for designers and developers who need to highlight text in a textarea without relying on jQuery or weighty third-party libraries.

Checkout this [demo](https://taylor-vann.github.io/highlight-ta/).

## Usage ##

Grab `highlight-ta.js` and add it to your resources or install via npm:

```JavaScript
npm install highlight-ta
...
const hlghtta = require("highlight-ta");
```

Start with a \<textarea\> inside a \<div\> element:

```HTML
<div id="highlight-div" class="someclass">
  <textarea id="highlight-ta"></textarea>
</div>
```

By default, Highlight-Ta will use the default style for <mark> elements. Create a custom CSS declaration for the \<mark\> element and add them with a "css" key. Create an object of rules with following pattern:

```CSS
.myClass0 {
  background-color: rgba(80, 244, 66, 0.7);
  border-radius: 2px;
}

.myClass1 {
  background-color: rgba(100, 34, 79, 0.7);
  border-radius: 2px;
}
```

```JavaScript
// add the "css" key.
var patterns = {
  "pattern1": {"pattern": "Hello, world!", "css": "myClass0"},
  "pattern2": {"pattern": "Goodbye, universe!", "css": "myClass1"},
}
```

Next, pass the \<div\>, \<textarea\>, RegExp, to initialize a new instance of Highlight-Ta.

```Javascript
// was a little work but you made it!
var div = document.getElementById('cntr-div');
var ta = document.getElementById('hlght-ta');
var patterns = {
  "pattern1": {"pattern": "Hello, world!", "css": "myClass0"},
  "pattern2": {"pattern": "Goodbye, universe!", "css": "myClass1"},
}

var hlghtTa = hlghtta(div, ta, patterns);


// Initialize highlight-ta after instantiating
var hlghtTa = hlghtta();

hlghtTa.init(div, ta);

// Set Highlights after instantiating
hlghtTa.setHighlights(patterns);
```

That's all. The intention is to keep style and function separate. Style the \<div\> element and the style the \<textarea\>. Highlight-Ta will respond to all styles and media queries.

There are also a few helper methods:

```Javascript
// Turn corners off
hlghtTa.setCorners(false);
// Turn corners on
hlghtTa.setCorners(true);

// Remove elements and event listeners
hlghtTa.destroy();
```

Hope it helps!

## Compatability ##

Browser | Works
---|---
Firefox | Yes
Chrome | Yes
Safari | Yes
IE | Yes
Edge | Yes
Opera | Not yet tested
Android | Yes
iOS | Not yet tested

## License ##

Highlight-Ta is release under the GNU [MIT(https://opensource.org/licenses/MIT) license.
