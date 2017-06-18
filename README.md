# Highlight-Ta #

## Abstract ##

Use a regexes, strings, and functions to highlight text inside a textarea.

Checkout this [demo](https://taylor-vann.github.io/highlight-ta/). You can experiment with [regexes](https://taylor-vann.github.io/highlight-ta/regex-test).

## Details ##

Highlight-Ta is a stand-along script that uses a regex to highlight text inside a textarea. It also adjusts its height to fit its text while following CSS declarations like box-sizing, padding, and min/max height. Highlight-Ta was created for designers and developers who need to highlight text in a textarea without relying on jQuery or weighty third-party libraries.

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

Then create an object of rules with following patterns:

```Javascript
// create patterns with strings!

var patterns = {
  "pattern1": {"pattern": "Hello, world!"},
  "pattern2": {"pattern": "Goodbye, universe!"},
}
```

```JavaScript
// create patterns with regexes

var regexp0 = new RegExp("[A-Z][a-z]*", "g");
var regexp1 = new RegExp("\\b(S|s)[a-z]*", "g");

var patterns = {
  "pattern1": {"pattern": regex0},
  "pattern2": {"pattern": regex1},
}
```


By default, Highlight-Ta will use the default style for <mark> elements. Create a custom CSS declaration for the \<mark\> element and add them with a "css" key:

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

You can create custom functions by carefully following this pattern:

```JavaScript
// you don't need pattern or function keys, they'll be ignnored
var patterns = {
  "myPattern1": {"function": function(t) {
    var m = "<mark id='some-id' style='some-class'>$&</mark>";
    t = t.replace(new Regex("[a-z]*", "g"), <);

    return t;
    }
  },
  "myPattern2": {"function": function(t) {
  var m = "&ltmark id='dif-id' style='diff-class'>$&</mark>";
    t = t.replace(new Regex("[a-z]*", "g"), <);

    return t;
  }
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

If you're wondering, "why not dynamically create a textarea inside the div?" The main advantage is input won't be lost if the page accidentally is accidentally refreshed.

There are also a few helper methods:

```Javascript
// Turn corners off
hlghtTa.setCorners(false);
// Turn corners on
hlghtTa.setCorners(true);

// Remove elements and event listeners
hlghtTa.destroy();
```

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
