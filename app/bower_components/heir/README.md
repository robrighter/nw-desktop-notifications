# Heir

This is a small script that adds the ability to inherit other functions prototype objects into your own. It makes prototypical inheritance easy and robust.

Due to there not being any documentation yet, you may want to read my JSDoc comments in the source. They will tell you everything you need to know. Here is a quick example to get you going anyway.

```javascript
// Create the base class.
function Base() {}

// Add a method.
Base.prototype.foo = function () {
	return 'Base#foo';
};

// Create a sub class which inherits from base.
function Sub() {}
heir.inherit(Sub, Base);

// Mix in some functionality enhancing objects.
heir.mixin(Sub, events);
heir.mixin(Sub, pooling);

// Change the original method.
Sub.prototype.foo = function () {
	return [
		'Sub#foo',
		this._super.foo.call(this)
	].join(', ');
};

// Create an instance of Sub and call it's method.
var s = new Sub();
s.foo(); // Returns "Sub#foo, Base#foo"
```

You can load this script into your browser using a normal script tag or AMD. You can also use node.js' `require` if you are running server side.

## Changes from v1

The `inherit` method used to work by cloning and merging multiple prototypes into one. This meant things like `instanceof` didn't work and you could get into some weird scenarios [caused by multiple inheritance][mi].

The new `inherit` uses the built in prototypical inheritance to provide a much cleaner outcome, as shown in [this post about prototypical inheritance][pi]. The major change is that you can't inherit from multiple classes any more.

If you still need to have multiple things shared between classes to avoid duplication, you can now use the `mixin` method to merge objects into your inheritance hierarchies where required.

## Downloading

You can obtain a copy by cloning this repository with git, installing through [npm][] or [bower][]. Heir is called `heir` within both package managers.

If you wish to run the tests you will also need to install Jasmine. You can do this through bower like so.

```bash
bower install --dev
```

## Testing

Tests are performed using Jasmine in the following browsers.

 * Firefox
 * Chrome
 * Opera
 * Safari
 * IE6+

When testing in the more modern browsers, not Internet Explorer basically, I run it through the very early versions, some midrange versions and the very latest ones too. I don't just do the latest version.

Heir will always be tested and working perfectly in all of them before a release. I will not release anything I think is riddled with bugs. However, if you do spot one, please [submit it as an issue][issues] and I will get right on it.

## License (MIT)

Copyright (c) 2012-2013 Oliver Caldwell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm]: https://npmjs.org/
[bower]: http://bower.io/
[issues]: https://github.com/Wolfy87/Heir/issues
[mi]: http://stackoverflow.com/questions/225929/what-is-the-exact-problem-with-multiple-inheritance
[pi]: http://oli.me.uk/2013/06/01/prototypical-inheritance-done-right/