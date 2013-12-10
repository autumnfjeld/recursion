// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
// Use a recursive descent parser

var parseJSON = function (json) {
	console.log('*** START json is:', json);
	var	text = json;
	var at = 0;							// index of current character
	var ch = '';						// current character

	// Move to next character
	next = function () {
		at++
		ch = text.charAt(at);
		console.log('at:',at, 'ch:', ch);
	}

	// Parse a number
	number = function () {
			console.log("in while, ch is:", ch);		
		var number;
		var string = '';

		while (ch >= '0' && ch <= '9') {
			string += ch;
			next();
		}
		return string;
	};

	return function () {
		ch = text.charAt(0);
		console.log("here");
		result = number();
		console.log('JSON.parse is', JSON.parse(json));
		console.log('my result', result);
		return result;
	}();

};
