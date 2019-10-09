require('./math_polyfill'); // polyfill missing math functions

function export_names(obj, prefix) {
	prefix = prefix ? prefix : '';
	var objs = Object.getOwnPropertyNames(obj);
	for (var i in objs) {
		if (objs.hasOwnProperty(i)) {
			var val = objs[i];
			global[prefix + val] = obj[val];
		}
	}
}

export_names(require('./ev3source/ev3.js'), 'ev3_');
export_names(require('./ev3source/source.js'));
export_names(require('./ev3source/array.js'));
export_names(Math, 'math_');
