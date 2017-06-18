# Highlight-Ta #

## Abstract ##

Use a regexes, strings, and functions to highlight text inside a textarea.

Checkout this [demo](https://taylor-vann.github.io/highlight-ta/) app. You can experiment with [regexes](https://taylor-vann.github.io/highlight-ta/regex-test).

## Details ##

Highlight-Ta is a stand-along script that uses a regex to highlight text inside a textarea. It also adjusts its height to fit its text while following CSS declarations like box-sizing, padding, and min/max height. Highlight-Ta was created for designers and developers who need to highlight text in a textarea without relying on jQuery or weighty third-party libraries.

## Usage ##

Highlight-Ta will square it's top-right and bottom-right corners by default if its border-width is less than its border-radius. It keeps the textarea sharp and neat. This feature can be disabled during or after initialization.

Grab `highlight-ta.js` and add it to your resources.

Start with a \<textarea\> inside a \<div\> element:

```HTML
<div id="highlight-div" class="someclass">
	<textarea id="highlight-ta"></textarea>
</div>
```

Then create an object of rules with following pattern:

```Javascript
// create patterns with strings!

var patterns = {
	"pattern1": {"pattern": "Hello, world!"},
  "pattern2": {"pattern": "Goodbye, universe!"},
}


// create patterns with regexes

var regexp0 = new RegExp("[A-Z][a-z]*", "g");
var regexp1 = new RegExp("\\b(S|s)[a-z]*", "g");

var patterns = {
	"pattern1": {"pattern": regex0},
  "pattern2": {"pattern": regex1},
}

var regexp = new RegExp("[A-Z][a-z]*", "g");
```


By default, Highlight-Ta will use the default style for <mark> elements. Create a custom CSS declaration for the \<mark\> element and add them with a "css" key:

```CSS
.mark-style {
	background-color: rgba(80, 244, 66, 0.7);
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
    var m = "&ltmark id='some-id' style='some-class'&gt$&amp&ltmark&gt";
    t = t.replace(new Regex("[a-z]*", "g"), <);

    return t;
    }
  },
  "myPattern2": {"function": function(t) {
    var m = "&ltmark id='dif-id' style='diff-class'&gt$&amp&ltmark&gt";
    t = t.replace(new Regex("[a-z]*", "g"), <);

    return t;
  }
}
```


Next, pass the \<div\>, \<textarea\>, RegExp, to initialize a new instance of Highlight-Ta.

```Javascript
// was a little work but you made it!

var div = document.getElementById('highlight-div');
var ta = document.getElementById('highlight-ta');
var patterns = {
	"pattern1": {"pattern": "Hello, world!", "css": "myClass0"},
  "pattern2": {"pattern": "Goodbye, universe!", "css": "myClass1"},
}

var hlghtTa = highlightta(div, ta, patterns);


//Initialize highlight-ta after instantiating

var hlghtTa = highlightta();

hlghtTa.init(div, ta);
hlghtTa.setHighlights(patterns);


```

That's all. The intention is to keep style and function separate. Style the \<div\> element and the style the \<textarea\>. Highlight-Ta will respond to all styles and media queries.

If you're wondering, "why not dynamically create a textarea inside the div?" The main advantage is input won't be lost if the page accidentally is accidentally refreshed.

There are also a few helper methods:

```Javascript
// Initialize or reset the textarea
hlghtTa.init(div, ta, dclr, re);
hlghtTa.init(div, ta, dclr, re, false);

// Turn corners off
hlghtTa.setCorners(false);
// Turn corners on
hlghtTa.setCorners(true);


// Set the class for \<mark\>:
hlghtTa.setHighlihgts(patterns);


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
