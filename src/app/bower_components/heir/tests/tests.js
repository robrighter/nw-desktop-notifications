(function () {
	/*global expect,heir,jasmine,describe,it*/
	'use strict';

	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	describe('heir.createObject', function () {
		it('returns a new empty object when passed one', function () {
			var source = {};
			var result = heir.createObject(source);

			expect(result).toEqual({});
			expect(result).not.toBe(source);
		});

		it('inserts the source object into the prototype', function () {
			var source = {
				foo: true
			};
			var result = heir.createObject(source);

			expect(result).toEqual(source);
			expect(result).not.toBe(source);
			expect(result.hasOwnProperty('foo')).toBe(false);
			expect(result.foo).toBe(true);
		});
	});

	describe('heir.inherit', function () {
		it('causes a class to inherit a method', function () {
			var Source = function () {};
			Source.prototype.foo = function () {};

			var Destination = function () {};
			heir.inherit(Destination, Source);
			Destination.prototype.bar = function() {};

			var result = new Destination();

			expect(Destination.prototype.hasOwnProperty('foo')).toBe(false);
			expect(Destination.prototype.hasOwnProperty('bar')).toBe(true);
			expect(result.foo).toBeDefined();
			expect(result.bar).toBeDefined();
		});

		it('can have methods overridden', function () {
			var Source = function () {};
			Source.prototype.foo = function () {
				return 'Source#foo';
			};

			var Destination = function () {};
			heir.inherit(Destination, Source);
			Destination.prototype.foo = function() {
				return [
					'Destination#foo',
					Source.prototype.foo.call(this)
				].join(', ');
			};

			var source = new Source();
			var destination = new Destination();

			expect(source.foo()).toBe('Source#foo');
			expect(destination.foo()).toBe('Destination#foo, Source#foo');
		});

		it('is correct in the eyes of instanceof', function () {
			var Source = function () {};
			var Destination = function () {};
			heir.inherit(Destination, Source);

			var source = new Source();
			var destination = new Destination();

			expect(source instanceof Source).toBe(true);
			expect(source instanceof Destination).toBe(false);

			expect(destination instanceof Source).toBe(true);
			expect(destination instanceof Destination).toBe(true);
		});

		it('has a reference to the parent in this._super', function () {
			var Source = function () {};
			var Destination = function () {};
			heir.inherit(Destination, Source);

			var result = new Destination();

			expect(result._super).toBe(Source.prototype);
		});

		it('can have the addition of this._super disabled', function () {
			var Source = function () {};
			var Destination = function () {};
			heir.inherit(Destination, Source, false);

			var result = new Destination();

			expect(result._super).toBeUndefined();
		});
	});

	describe('heir.mixin', function () {
		it('can mix methods into a class', function () {
			var source = {
				foo: function () {},
				bar: function () {}
			};
			var Destination = function () {};
			heir.mixin(Destination, source);
			var result = new Destination();

			expect(result.foo).toBeDefined();
			expect(result.bar).toBeDefined();
			expect(Destination.prototype.hasOwnProperty('foo')).toBe(true);
			expect(Destination.prototype.hasOwnProperty('bar')).toBe(true);
		});
	});

	describe('heir.hasOwn', function () {
		it('returns true when it is it\'s own', function () {
			var source = {
				foo: true
			};

			expect(heir.hasOwn(source, 'foo')).toBe(true);
		});

		it('returns false when it is either undefined or up the prototype chain', function () {
			var noProperty = {};
			var inChain = heir.createObject({
				foo: true
			});

			expect(heir.hasOwn(noProperty, 'foo')).toBe(false);
			expect(inChain.foo).toBeDefined();
			expect(heir.hasOwn(inChain, 'foo')).toBe(false);
		});
	});

	describe('heir.merge', function () {
		it('merges one object into another', function () {
			var a = {foo:true};
			var b = {bar:true};
			heir.merge(a, b);

			expect(a.foo).toBe(true);
			expect(a.bar).toBe(true);
			expect(b.foo).toBeUndefined();
		});
	});

	jasmineEnv.execute();
}.call(this));