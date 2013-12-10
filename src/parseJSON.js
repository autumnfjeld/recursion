// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
// Use a recursive descent parser

var parseJSON = function (json) {
	console.log('*** START json is:', json);
	var	text = json;
	var at = 0;							// index of current character
	var ch;						// current character

	// Move to next character
	next = function () {
		ch = text.charAt(at);
		console.log('at:',at, 'ch:', ch);
		at++
		return ch;
	}

	white = function () {
		console.log("IN white");
		next();
	};

	// Parse a number
	var number = function () {
		var number;
		var string = '';

		while (ch >= '0' && ch <= '9') {
			string += ch;
			next();
		}

		number = +string;  			// why not just return string? and what is + here?
		return number;
	};

	var string = function () {
		//console.log("IN word. ch is", ch, 'test', ch < 'z');
		var string = '';

		while ( ch >= 'A' && ch <= 'z') {
			string += ch;
			next();
		}

		console.log("end word is:", string);
		return string;
	};

	var value = function () {
		console.log('IN value. ch:', ch);
		white();
		switch (ch) {
			case null:
				return null;
			default: 
				return ch >= '0' && ch <= '9' ? number() : string();
		}

	};

	return function () {
		ch = ' ';
		//console.log("here");
		result = value();
		console.log('JSON.parse is', JSON.parse(json));
		console.log('my result', result);
		return result;
	}();

};
