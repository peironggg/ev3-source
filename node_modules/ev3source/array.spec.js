var assert = require('assert');
var array = require('./array');
var source = require('./source');
var pair = source.pair;
var list = source.list;

describe('Array functions', function () {
    describe('a_append', function () {
        it('a_append([], x)', function () {
            assert.deepStrictEqual(
                array.a_append([], [1, 2, 3]),
                [1, 2, 3]);
        });

        it('a_append(x, [])', function () {
            assert.deepStrictEqual(
                array.a_append([1, 2, 3], []),
                [1, 2, 3]);
        });

        it('a_append(x, y)', function () {
            assert.deepStrictEqual(
                array.a_append([1, 2, 3], [4, 5, 6]),
                [1, 2, 3, 4, 5, 6]);
        });
    });

    describe('a_reverse', function () {
        it('a_reverse([])', function () {
            assert.deepStrictEqual(
                array.a_reverse([]),
                []);
        });

        it('a_reverse(x)', function () {
            assert.deepStrictEqual(
                array.a_reverse([1, 2, 3]),
                [3, 2, 1]);
        });
    });

    describe('a_take', function() {
        it('a_take(xs, 0)', function () {
            assert.deepStrictEqual(
                array.a_take([1, 2, 3], 0),
                []);
        });


        it('a_take(xs, 2)', function () {
            assert.deepStrictEqual(
                array.a_take([1, 2, 3], 2),
                [1, 2]);
        });
    });

    describe('a_drop', function(){
        it('a_drop(xs, 0)', function () {
            assert.deepStrictEqual(
                array.a_drop([1, 2, 3], 0),
                [1, 2, 3]);
        });


        it('a_drop(xs, 2)', function () {
            assert.deepStrictEqual(
                array.a_drop([1, 2, 3], 2),
                [3]);
        });
    });

    describe('a_flatten', function(){
        it('a_flatten([])', function () {
            assert.deepStrictEqual(
                array.a_flatten([]),
                []);
        });


        it('a_flatten([[1,2,3], [4,5,6], [7,8,9]])', function () {
            assert.deepStrictEqual(
                array.a_flatten([[1,2,3], [4,5,6], [7,8,9]]),
                [1,2,3,4,5,6,7,8,9]);
        });
    });

    describe('a_remove', function(){
        it('a_remove(x, [])', function () {
            assert.deepStrictEqual(
                array.a_remove(1, []),
                []);
        });

        it('a_remove(x,[...x])', function () {
            assert.deepStrictEqual(
                array.a_remove(3,[1,2,3]),
                [1,2]);
        });

        it('a_remove(x,[...x...x..])', function () {
            assert.deepStrictEqual(
                array.a_remove(3,[1,2,3,3,2,1]),
                [1,2,3,2,1]);
        });
    });

    describe('a_accumulate', function() {
        it('a_accumulate(op, init, [])', function() {
            assert.deepStrictEqual(
                array.a_accumulate(function(x, acc) {

                }, 0, []),
                0
            );
        });

        it('a_accumulate(op_sym, init, [])', function() {
            assert.deepStrictEqual(
                array.a_accumulate(function(x, acc) {
                    return x + acc;
                }, 0, [1,2,3]),
                6
            );
        });

        it('a_accumulate(op_sym, init, [])', function() {
            assert.deepStrictEqual(
                array.a_accumulate(function(x, acc) {
                    return x + acc;
                }, 0, [1,2,3]),
                6
            );
        });

        it('a_accumulate(op_asym, init, [])', function() {
            assert.deepStrictEqual(
                array.a_accumulate(pair, null, [1,2,3]),
                list(1,2,3)
            );
        });

        it('alias: a_reduce', function() {
            assert.deepStrictEqual(
                array.a_reduce,
                array.a_accumulate
            );
        });
    });

    describe('a_filter', function() {
        it('a_filter(f, [])', function() {
            assert.deepStrictEqual(
                array.a_filter(function(x) { }, []),
                []
            );
        });

        it('a_filter(x => true, [ ... ])', function() {
            assert.deepStrictEqual(
                array.a_filter(function(x) { return true }, 
                [0,1,2,3]),
                [0,1,2,3]
            );
        });

        it('a_filter(x => false, [ ... ])', function() {
            assert.deepStrictEqual(
                array.a_filter(function(x) { return false }, 
                [0,1,2,3]),
                []
            );
        });
    });

    describe('a_map', function() {
        it('a_map(f, [])', function() {
            assert.deepStrictEqual(
                array.a_map(function(x) { }, []),
                []
            );
        });

        it('a_map(f, [...])', function() {
            assert.deepStrictEqual(
                array.a_map(function(x) { return x * 2 }, 
                [0,1,2,3]),
                [0,2,4,6]
            );
        });
    });

    describe('enum_array', function() {
        it('enum_array(b, a); b > a', function() {
            assert.deepStrictEqual(
                array.enum_array(6,3),
                []
            );
        });

        it('enum_array(a, b); b > a', function() {
            assert.deepStrictEqual(
                array.enum_array(3,6),
                [3,4,5,6]
            );
        });
    });

    
    describe('build_array', function() {
        it('build_array(0, f)', function() {
            assert.deepStrictEqual(
                array.build_array(0, function(x) { return x; }),
                []
            );
        });

        it('build_array(3, f)', function() {
            assert.deepStrictEqual(
                array.build_array(3, function(x) { return 2*x; }),
                [0,2,4]
            );
        });
    });

    describe('a_for_each', function() {
        var seen = [];
        it('a_for_each(f, [])', function() {
            array.a_for_each(function(x) {
                seen.push(x);
            }, []);
            assert.deepStrictEqual(
                seen,
                []
            );
        });

        it('a_for_each(f, [...])', function() {
            array.a_for_each(function(x) {
                seen.push(x);
            }, [1,2,3]);
            assert.deepStrictEqual(
                seen,
                [1,2,3]
            );
        });
    });

    describe('a_sort', function() {
        it('a_sort([])', function() {
            assert.deepStrictEqual(
                array.a_sort([]),
                []
            );
        });

        it('a_sort([...])', function() {
            assert.deepStrictEqual(
                array.a_sort([12,1,11,13,10]),
                [1, 10, 11, 12, 13]
            );
        });
    });


});

