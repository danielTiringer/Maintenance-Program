const assert = require('chai').assert;
const app = require('../app');

let sayHelloResult = app.sayHello();
let addNumbersResult = app.addNumbers(5, 5);

describe('App', function() {
	describe('sayHello()', function () {
		it('App should return hello', function() {
			assert.equal(sayHelloResult, 'hello')
		});

		it('sayHello should return type string', function() {
			assert.typeOf(sayHelloResult, 'string');
		});
	});
	describe('addNumbers()', function() {
		it('addNumbers should be above 5', function() {
			assert.isAbove(addNumbersResult, 5);
		});

		it('addNumbers should return type number', function() {
			assert.typeOf(addNumbersResult, 'number');
		});
	});
})
