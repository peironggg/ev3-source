// The following lodash functions will be included
// They have been taught previously.

// All of them will be prefixed with a_ to 
// denote the fact that they work on lists.

// Appends two arrays xs, ys.
// Returns a new array.
// _.concat in lodash.
// Takes O(n + m), where xs and ys have lengths n and m respectively.
function a_append(xs, ys) {
    var result = [];
    var curr = 0;
    for(var i = 0; i < xs.length; i++) {
        result[curr++] = xs[i];
    }
    for(var i = 0; i < ys.length; i++) {
        result[curr++] = ys[i];
    }
    return result;
}

exports.a_append = a_append;

// Returns the array, but in reverse.
function a_reverse(xs) {
    var result = [];
    var curr = 0;
    for(var i = xs.length - 1; i >=0 ; i-- ){
        result[curr++] = xs[i];
    }
    return result;
}

exports.a_reverse = a_reverse;

// Returns a new array consisting of the first k elements of xs.
function a_take(xs, k) {
    var result = [];
    for(var i = 0; i<k ; i++) {
        result[i] = xs[i]; 
    }
    return result;
}

exports.a_take = a_take;

// Returns a new array of items in xs without the first k elements.
function a_drop(xs, k) {
    var result = [];
    var curr = 0;
    for(var i = k; i < xs.length; i++) {
        result[curr++] = xs[i];
    }
    return result;
}

exports.a_drop = a_drop;

// Flattens an array of arrays into a single array.
function a_flatten(xs) {
    var result = [];
    var curr = 0;
    for(var i = 0; i < xs.length ; i++) {
        for(var j = 0; j < xs[i].length ; j++) {
            result[curr++] = xs[i][j];
        }
    }
    return result;
}

exports.a_flatten = a_flatten;

// Returns a new array consisting of items of x
// such that the first instance of x is removed.
// If no such item, returns original array.
function a_remove(x, xs) {
    var found = false;
    var result = [];
    var curr = 0;
    for(var i = 0; i < xs.length; i++) {
        if(!found && xs[i] === x) {
            found = true;
        } else {
            result[curr++] = xs[i];
        }
    }
    return result;
}

exports.a_remove = a_remove;


// Higher order functions

// accumulate applies given operation op to elements of an array
// in a right-to-left order, first apply op to the last element
// and an initial element, resulting in r1, then to the
// second-last element and r1, resulting in r2, etc, and finally
// to the first element and r_n-1, where n is the length of the
// list.
// accumulate(op,zero,list(1,2,3)) results in
// op(1, op(2, op(3, zero)))
// This function is _.reduce in lodash

function a_accumulate(op, initial, xs) {
    var result = initial;
    for(var i = xs.length - 1; i >= 0; i--) {
        result = op(xs[i], result);
    }
    return result;
}


exports.a_accumulate = a_accumulate;

exports.a_reduce = a_accumulate;


// filter returns the subarray of elements of given array xs
// for which the given predicate function returns true.
function a_filter(pred, xs) {
    var curr = 0;
    var result = [];
    for(var i = 0; i < xs.length; i++) {
        if(pred(xs[i])){
            result[curr++] = xs[i];
        }
    }
    return result;
}

exports.a_filter = a_filter;

// Returns a new array consisting of items in xs
// with f applied to them.
// I.e. map(f, [x1, ..., xn])
// -> [f(x1), ..., f(xn)]
function a_map(f, xs) {
    var result = [];
    for(var i = 0; i< xs.length; i++) {
        result[i] = f(xs[i]);
    }
    return result;
}

exports.a_map = a_map;

// Returns an array enumerating numbers 
// starting from start,
// using a step size of 1, until the number
// exceeds end.
function enum_array(start, end) {
    var result = [];
    var curr = 0;
    for(var i = start; i <= end; i++) {
        result[curr++] = i;
    }
    return result;
}

exports.enum_array = enum_array;


// build_array takes a non-negative integer n as first argument,
// and a function fun as second argument.
// build_array returns an array of n elements, that results from
// applying fun to the numbers from 0 to n-1.
function build_array(n, fun) {
    var result = [];
    for(var i = 0; i < n; i++) {
        result[i] = fun(i);
    }
    return result;
}

exports.build_array = build_array;

function merge(xs, ys) {
    var result = [];
    var curr = 0;
    var cx = 0;
    var cy = 0;
    while(cx !== xs.length || cy !== ys.length) {
        if(cx === xs.length) {
            result[curr++] = ys[cy++];
        } else if (cy === ys.length) {
            result[curr++] = xs[cx++];
        } else if(xs[cx] <= ys[cy]){
            result[curr++] = xs[cx++];
        } else {
            result[curr++] = ys[cy++];
        }
    }
    return result;
}

function a_for_each(fun, xs) {
    for(var i = 0 ; i < xs.length; i++) {
        fun(xs[i]);
    }
}

exports.a_for_each = a_for_each;

// Sorts the given array.
function a_sort(xs) {
    const k = Math.floor(xs.length / 2);
    return xs.length <= 1 
        ? xs
        : merge(a_sort(a_take(xs, k)),
            a_sort(a_drop(xs, k)));   
}

exports.a_sort = a_sort;
