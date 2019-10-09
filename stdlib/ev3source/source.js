// list.js: Supporting lists in the Scheme style, using pairs made
//          up of two-element JavaScript array (vector)

// Author: Martin Henz

// array test works differently for Rhino and
// the Firefox environment (especially Web Console)
function array_test(x) {
    if (Array.isArray === undefined) {
        return x instanceof Array;
    } else {
        return Array.isArray(x);
    }
};

exports.array_length = function (x) {
    return x.length;
};

// pair constructs a pair using a two-element array
// LOW-LEVEL FUNCTION, NOT SOURCE
exports.pair = function (x, xs) {
    return [x, xs];
};

// is_pair returns true iff arg is a two-element array
// LOW-LEVEL FUNCTION, NOT SOURCE
exports.is_pair = function (x) {
    return array_test(x) && x.length === 2;
};

// head returns the first component of the given pair,
// throws an exception if the argument is not a pair
// LOW-LEVEL FUNCTION, NOT SOURCE
exports.head = function (xs) {
    if (exports.is_pair(xs)) {
        return xs[0];
    } else {
        throw new Error("head(xs) expects a pair as " +
          "argument xs, but encountered "+xs);
    }
};

// tail returns the second component of the given pair
// throws an exception if the argument is not a pair
// LOW-LEVEL FUNCTION, NOT SOURCE
exports.tail = function tail(xs) {
    if (exports.is_pair(xs)) {
        return xs[1];
    } else {
        throw new Error("tail(xs) expects a pair as " +
          "argument xs, but encountered "+xs);
    }
};

// is_null returns true if arg is null
// LOW-LEVEL FUNCTION, NOT SOURCE
exports.is_null = function is_null(xs) {
  return xs === null;
};

// is_list recurses down the list and checks that it ends with the empty list []
// does not throw any exceptions
// LOW-LEVEL FUNCTION, NOT SOURCE
exports.is_list = function is_list(xs) {
    for ( ; ; xs = exports.tail(xs)) {
		if (exports.is_null(xs)) {
			return true;
		} else if (!exports.is_pair(xs)) {
            return false;
        }
    }
};

// list makes a list out of its arguments
// LOW-LEVEL FUNCTION, NOT SOURCE
exports.list = function list() {
    var the_list = null;
    for (var i = arguments.length - 1; i >= 0; i--) {
        the_list = exports.pair(arguments[i], the_list);
    }
    return the_list;
};

// returns the length of a given argument list
// throws an exception if the argument is not a list
exports.length = function length(xs) {
    for (var i = 0; !exports.is_null(xs); ++i) {
		xs = exports.tail(xs);
    }
    return i;
};

// map applies first arg f to the elements of the second argument,
// assumed to be a list.
// f is applied element-by-element:
// map(f,[1,[2,null]]) results in [f(1),[f(2),null]]
// map throws an exception if the second argument is not a list,
// and if the second argument is a non-empty list and the first
// argument is not a function.
exports.map = function map(f, xs) {
    return (exports.is_null(xs)) ?
        null
        : exports.pair(f(exports.head(xs)), exports.map(f, exports.tail(xs)));
};

// build_list takes a non-negative integer n as first argument,
// and a function fun as second argument.
// build_list returns a list of n elements, that results from
// applying fun to the numbers from 0 to n-1.
exports.build_list = function build_list(n, fun) {
    function build(i, fun, already_built) {
        if (i < 0) {
            return already_built;
        } else {
            return build(i - 1, fun, exports.pair(fun(i),
                        already_built));
        }
    }
    return build(n - 1, fun, null);
};

// for_each applies first arg fun to the elements of the list passed as
// second argument. fun is applied element-by-element:
// for_each(fun,[1,[2,null]]) results in the calls fun(1) and fun(2).
// for_each returns true.
// for_each throws an exception if the second argument is not a list,
// and if the second argument is a non-empty list and the
// first argument is not a function.
exports.for_each = function for_each(fun, xs) {
    if (!exports.is_list(xs)) {
        throw new Error("for_each expects a list as argument xs, but " +
            "encountered " + xs);
    }
    for ( ; !exports.is_null(xs); xs = exports.tail(xs)) {
        fun(exports.head(xs));
    }
    return true;
};

// list_to_string returns a string that represents the argument list.
// It applies itself recursively on the elements of the given list.
// When it encounters a non-list, it applies toString to it.
exports.list_to_string = function list_to_string(xs) {
    return is_null(xs)
        ? "null"
        : is_pair(xs)
            ? "[" + list_to_string(head(xs)) + "," +
                list_to_string(tail(xs)) + "]"
            : stringify(xs);
};

// reverse reverses the argument list
// reverse throws an exception if the argument is not a list.
exports.reverse = function reverse(xs) {
    if (!exports.is_list(xs)) {
        throw new Error("reverse(xs) expects a list as argument xs, but " +
            "encountered " + xs);
    }
    var result = null;
    for ( ; !exports.is_null(xs); xs = exports.tail(xs)) {
        result = exports.pair(exports.head(xs), result);
    }
    return result;
};

// append first argument list and second argument list.
// In the result, the null at the end of the first argument list
// is replaced by the second argument list
// append throws an exception if the first argument is not a list
exports.append = function append(xs, ys) {
    if (exports.is_null(xs)) {
        return ys;
    } else {
        return exports.pair(exports.head(xs), exports.append(exports.tail(xs), ys));
    }
};

// member looks for a given first-argument element in a given
// second argument list. It returns the first postfix sublist
// that starts with the given element. It returns null if the
// element does not occur in the list
exports.member = function member(v, xs){
    for ( ; !exports.is_null(xs); xs = exports.tail(xs)) {
        if (exports.head(xs) === v) {
            return xs;
        }
    }
    return null;
};

// removes the first occurrence of a given first-argument element
// in a given second-argument list. Returns the original list
// if there is no occurrence.
exports.remove = function remove(v, xs){
    if (exports.is_null(xs)) {
        return null;
    } else {
        if (v === exports.head(xs)) {
            return exports.tail(xs);
        } else {
            return exports.pair(exports.head(xs), exports.remove(v, exports.tail(xs)));
        }
    }
};

// Similar to remove. But removes all instances of v instead of just the first
exports.remove_all = function remove_all(v, xs) {
    if (exports.is_null(xs)) {
        return null;
    } else {
        if (v === exports.head(xs)) {
            return exports.remove_all(v, exports.tail(xs));
        } else {
            return exports.pair(exports.head(xs), exports.remove_all(v, exports.tail(xs)));
        }
    }
};

// equal computes the structural equality
// over its arguments
exports.equal = function equal(item1, item2){
    if (exports.is_pair(item1) && exports.is_pair(item2)) {
        return exports.equal(exports.head(item1), exports.head(item2)) &&
            exports.equal(exports.tail(item1), exports.tail(item2));
    } else if (array_test(item1) && item1.length === 0 &&
           array_test(item2) && item2.length === 0) {
        return true;
    } else {
        return item1 === item2;
    }
};

// filter returns the sublist of elements of given list xs
// for which the given predicate function returns true.
exports.filter = function filter(pred, xs){
    if (exports.is_null(xs)) {
        return xs;
    } else {
        if (pred(exports.head(xs))) {
            return exports.pair(exports.head(xs), exports.filter(pred, exports.tail(xs)));
        } else {
            return exports.filter(pred, exports.tail(xs));
        }
    }
};

// enumerates numbers starting from start,
// using a step size of 1, until the number
// exceeds end.
exports.enum_list = function enum_list(start, end) {
    if (start > end) {
        return null;
    } else {
        return exports.pair(start, exports.enum_list(start + 1, end));
    }
};

// Returns the item in list lst at index n (the first item is at position 0)
exports.list_ref = function list_ref(xs, n) {
    if (n < 0) {
        throw new Error("list_ref(xs, n) expects a positive integer as " +
            "argument n, but encountered " + n);
    }

    for ( ; n > 0; --n) {
        xs = exports.tail(xs);
    }
    return exports.head(xs);
};

// accumulate applies given operation op to elements of a list
// in a right-to-left order, first apply op to the last element
// and an initial element, resulting in r1, then to the
// second-last element and r1, resulting in r2, etc, and finally
// to the first element and r_n-1, where n is the length of the
// list.
// accumulate(op,zero,list(1,2,3)) results in
// op(1, op(2, op(3, zero)))

exports.accumulate = function accumulate(op,initial,sequence) {
    if (exports.is_null(sequence)) {
        return initial;
    } else {
        return op(exports.head(sequence),
                  exports.accumulate(op,initial,exports.tail(sequence)));
    }
};

// set_head(xs,x) changes the head of given pair xs to be x,
// throws an exception if the argument is not a pair
// LOW-LEVEL FUNCTION, NOT SOURCE

exports.set_head = function set_head(xs,x) {
    if (exports.is_pair(xs)) {
        xs[0] = x;
        return undefined;
    } else {
        throw new Error("set_head(xs,x) expects a pair as " +
          "argument xs, but encountered "+xs);
    }
};

// set_tail(xs,x) changes the tail of given pair xs to be x,
// throws an exception if the argument is not a pair
// LOW-LEVEL FUNCTION, NOT SOURCE

exports.set_tail = function set_tail(xs,x) {
    if (exports.is_pair(xs)) {
        xs[1] = x;
        return undefined;
    } else {
        throw new Error("set_tail(xs,x) expects a pair as " +
          "argument xs, but encountered "+xs);
    }
};

exports.is_null = function is_null(xs) {
	return xs === null;
};

exports.is_undefined = function is_undefined(xs) {
	return typeof xs === "undefined";
};

exports.is_number = function is_number(xs) {
	return typeof xs === "number";
};

exports.is_string = function is_string(xs) {
	return typeof xs === "string";
};

exports.is_boolean = function is_boolean(xs) {
	return typeof xs === "boolean";
};

exports.is_function = function is_function(xs) {
	return typeof xs === "function";
};

exports.is_array = function is_array(a) {
	return a instanceof Array;
};

exports.stringify = function stringify(item) {
    if (exports.is_null(item)) {
        return 'null';
    } else if (exports.is_pair(item)) {
        return '[' + exports.stringify(head(item)) + ', ' + exports.stringify(tail(item)) + ']';
    } else {
        return item.toString();
    }
};

exports.display = function(str) {
    var to_show = str;

    if (exports.is_null(str)) {
        to_show = 'null';
    } else if (exports.is_array(str) && str.length > 2) {
        to_show = '[' + str.toString() + ']';
    } else if (exports.is_pair(str)) {
        to_show = exports.stringify(str);
    }

    if (typeof to_show === 'function' && to_show.toString) {
        console.log(toString(to_show));
    } else {
        console.log(to_show);
    }

    return str;
};

/**
 * @deprecated Use timed instead.
 * @returns The current time, in milliseconds, from the Unix Epoch.
 */
exports.runtime = function runtime() {
	var d = new Date();
	return d.getTime();
};

/**
 * Throws an error from the interpreter, stopping execution.
 *
 * @param {string} message The error message.
 * @param {number=} line The line number where the error occurred. This line number
 *                       will be one less than on file, because the indices used by
 *                       jison start from 0.
 * @returns {null} Should not return. Exception should be thrown otherwise program
 *                 will be in an invalid state.
 */
exports.error = function error(message, line) {
	throw new SyntaxError(message, null,
		line === undefined ? undefined : line + 1);
};

exports.newline = function newline() {
	exports.display("\n");
};

exports.random = function random(k) {
	return Math.floor(Math.random()*k);
};
// is_stream recurses down the stream and checks that it ends with the
// empty list null
exports.is_stream = function is_stream(xs) {
  return is_null(xs) || (is_pair(xs) && is_stream(stream_tail(xs)));
};
// A stream is either null or a pair whose tail is
// a nullary function that returns a stream.
exports.list_to_stream = function list_to_stream(xs) {
  return is_null(xs)
    ? null
    : pair(head(xs),
      function() { return list_to_stream(tail(xs)); });
};
// stream_to_list transforms a given stream to a list
// Lazy? No: stream_to_list needs to force the whole stream
exports.stream_to_list = function stream_to_list(xs) {
  return is_null(xs)
    ? null
    : pair(head(xs), stream_to_list(stream_tail(xs)));
};
// stream_length returns the length of a given argument stream
// throws an exception if the argument is not a stream
// Lazy? No: The function needs to explore the whole stream
exports.stream_length = function stream_length(xs) {
  return is_null(xs)
    ? 0
    : 1 + stream_length(stream_tail(xs));
};
// stream_map applies first arg f to the elements of the second
// argument, assumed to be a stream.
// f is applied element-by-element:
// stream_map(f,list_to_stream(list(1,2)) results in
// the same as list_to_stream(list(f(1),f(2)))
// stream_map throws an exception if the second argument is not a
// stream, and if the second argument is a non-empty stream and the
// first argument is not a function.
// Lazy? Yes: The argument stream is only explored as forced by
//            the result stream.
exports.stream_map = function stream_map(f, s) {
  return is_null(s)
    ? null
    : pair(f(head(s)),
      function() { return stream_map(f, stream_tail(s)); });
};
// build_stream takes a non-negative integer n as first argument,
// and a function fun as second argument.
// build_list returns a stream of n elements, that results from
// applying fun to the numbers from 0 to n-1.
// Lazy? Yes: The result stream forces the applications of fun
//            for the next element
exports.build_stream = function build_stream(n, fun) {
  function build(i) {
    return i >= n
      ? null
      : pair(fun(i),
        function() { return build(i + 1); });
  }
  return build(0);
};
// stream_for_each applies first arg fun to the elements of the stream
// passed as second argument. fun is applied element-by-element:
// for_each(fun,list_to_stream(list(1, 2,null))) results in the calls fun(1)
// and fun(2).
// stream_for_each returns true.
// stream_for_each throws an exception if the second argument is not a
// stream, and if the second argument is a non-empty stream and the
// first argument is not a function.
// Lazy? No: stream_for_each forces the exploration of the entire stream
exports.stream_for_each = function stream_for_each(fun, xs) {
  if (is_null(xs)) {
    return true;
  } else {
    fun(head(xs));
    return stream_for_each(fun, stream_tail(xs));
  }
};
// stream_reverse reverses the argument stream
// stream_reverse throws an exception if the argument is not a stream.
// Lazy? No: stream_reverse forces the exploration of the entire stream
exports.stream_reverse = function stream_reverse(xs) {
  function rev(original, reversed) {
    return is_null(original)
      ? reversed
      : rev(stream_tail(original),
        pair(head(original), function() { return reversed; }));
  }
  return rev(xs, null);
};
// stream_append appends first argument stream and second argument stream.
// In the result, null at the end of the first argument stream
// is replaced by the second argument stream
// stream_append throws an exception if the first argument is not a
// stream.
// Lazy? Yes: the result stream forces the actual append operation
exports.stream_append = function stream_append(xs, ys) {
  return is_null(xs)
    ? ys
    : pair(head(xs),
      function() { return stream_append(stream_tail(xs), ys); });
};
// stream_member looks for a given first-argument element in a given
// second argument stream. It returns the first postfix substream
// that starts with the given element. It returns null if the
// element does not occur in the stream
// Lazy? Sort-of: stream_member forces the stream only until the element is found.
exports.stream_member = function stream_member(x, s) {
  return is_null(s)
    ? null
    : head(s) === x
      ? s
      : stream_member(x, stream_tail(s));
};
// stream_remove removes the first occurrence of a given first-argument element
// in a given second-argument list. Returns the original list
// if there is no occurrence.
// Lazy? Yes: the result stream forces the construction of each next element
exports.stream_remove = function stream_remove(v, xs) {
  return is_null(xs)
    ? null
    : v === head(xs)
      ? stream_tail(xs)
      : pair(head(xs),
        function() { return stream_remove(v, stream_tail(xs)); });
}
// stream_remove_all removes all instances of v instead of just the first.
// Lazy? Yes: the result stream forces the construction of each next element
exports.stream_remove_all = function stream_remove_all(v, xs) {
  return is_null(xs)
    ? null
    : v === head(xs)
      ? stream_remove_all(v, stream_tail(xs))
      : pair(head(xs), function() { return stream_remove_all(v, stream_tail(xs)); });
};
// filter returns the substream of elements of given stream s
// for which the given predicate function p returns true.
// Lazy? Yes: The result stream forces the construction of
//            each next element. Of course, the construction
//            of the next element needs to go down the stream
//            until an element is found for which p holds.
exports.stream_filter = function stream_filter(p, s) {
  return is_null(s)
    ? null
    : p(head(s))
      ? pair(head(s),
        function() { return stream_filter(p, stream_tail(s)); })
      : stream_filter(p, stream_tail(s));
};
// enumerates numbers starting from start,
// using a step size of 1, until the number
// exceeds end.
// Lazy? Yes: The result stream forces the construction of
//            each next element
exports.enum_stream = function enum_stream(start, end) {
  return start > end
    ? null
    : pair(start,
      function() { return enum_stream(start + 1, end); });
};
// integers_from constructs an infinite stream of integers
// starting at a given number n
// Lazy? Yes: The result stream forces the construction of
//            each next element
exports.integers_from = function integers_from(n) {
  return pair(n,
    function() { return integers_from(n + 1); });
};
// eval_stream constructs the list of the first n elements
// of a given stream s
// Lazy? Sort-of: eval_stream only forces the computation of
//                the first n elements, and leaves the rest of
//                the stream untouched.
exports.eval_stream = function eval_stream(s, n) {
  return n === 0
    ? null
    : pair(head(s),
      eval_stream(stream_tail(s),
        n - 1));
};
// Returns the item in stream s at index n (the first item is at position 0)
// Lazy? Sort-of: stream_ref only forces the computation of
//                the first n elements, and leaves the rest of
//                the stream untouched.
exports.stream_ref = function stream_ref(s, n) {
  return n === 0
    ? head(s)
    : stream_ref(stream_tail(s), n - 1);
};

exports.stream_tail = function stream_tail(xs) {
  var theTail;
  if (is_pair(xs)) {
    theTail = xs[1];
  } else {
    throw new Error('stream_tail(xs) expects a pair as ' + 'argument xs, but encountered ' + xs);
  }

  if (typeof theTail === 'function') {
    return theTail();
  } else {
    throw new Error(
      'stream_tail(xs) expects a function as ' +
        'the tail of the argument pair xs, ' +
        'but encountered ' +
        theTail
    );
  }
};

// stream makes a stream out of its arguments
// LOW-LEVEL FUNCTION, NOT SOURCE
// Lazy? No: In this implementation, we generate first a
//           complete list, and then a stream using list_to_stream
exports.stream = function stream() {
  return list_to_stream(list.apply(void 0, arguments));
};
