import "core-js/stable";
import "regenerator-runtime/runtime";
import * as babel from '@babel/standalone';

export function transform(source) {
    return babel.transform(source, { presets: ['es2015'] }).code;
}
