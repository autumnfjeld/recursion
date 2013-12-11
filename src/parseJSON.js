// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
// Use a recursive descent parser

var parseJSON = function (json) {

	console.log('%c*** START json is:', 'background-color:yellow;', json, 'typeof is', typeof json);
	
	var	text;
	var at;							// index of current character
	var ch;							// current character

	// Move to next character
	next = function () {
		at++
		ch = text.charAt(at);
		console.log("IN next. ch:", ch, 'at', at, 'text', text);
		return ch;
	}


	// Parse a number
	var number = function () {
		console.log("IN number. ch is", ch );
		var number;
		var string = '';

		while (ch >= '0' && ch <= '9') {
			string += ch;
			next();
		}

		number = +string;  			// why not just return string? and what is + here?
		console.log("is this a number", typeof number);
		return number;
	};

	// Parse a string (does not account for escaped characters)
	var string = function () {
		console.log("IN string. ch is", ch, 'test', ch < 'z');
		var string = '';

		while ( ch >= 'A' && ch <= 'z') {
			string += ch;
			next();
		}

		return string;
	};

	// Parse special words
	var specialWords = function () {

	};

	var value = function () {
		console.log('IN value. ch:', ch);
		switch (ch) {
			case null:
				return 'HI';
			default: 
				return ch >= '0' && ch <= '9' ? number() : string();
		}

	};

	var result = function () {  
		// Initialize stuff here
		text = json;
		at = 0;
		ch = text[0];
		//console.log("here");
		var parsed = value();
		console.log('%cJSON.parse is: ', 'background-color: pink;', JSON.parse(json), typeof JSON.parse(json));
		console.log('%cmy parse is:', 'background-color: pink;', parsed, ' and typeof', typeof parsed);

		return parsed;
	};

	//return 'autumn';
	return result();  //why is the return value of parsed not returned for parseJSON ?
	



};
