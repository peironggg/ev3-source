/* polyfill built from here */
/* https://polyfill.io/v3/polyfill.min.js?features=Math.acosh%2CMath.asinh%2CMath.atanh%2CMath.cbrt%2CMath.clz32%2CMath.cosh%2CMath.expm1%2CMath.fround%2CMath.hypot%2CMath.imul%2CMath.log10%2CMath.log1p%2CMath.log2%2CMath.sign%2CMath.sinh%2CMath.tanh%2CMath.trunc */

(function(undefined) {function CreateMethodProperty(e,r,t){var a={value:t,writable:!0,enumerable:!1,configurable:!0};Object.defineProperty(e,r,a)}function ToUint32(n){var i=Number(n);return isNaN(i)||1/i===Infinity||1/i==-Infinity||i===Infinity||i===-Infinity?0:(i<0?-1:1)*Math.floor(Math.abs(i))>>>0}CreateMethodProperty(Math,"acosh",function t(a){return isNaN(a)?NaN:a<1?NaN:1===a?0:a===Infinity?Infinity:Math.log(a+Math.sqrt(a*a-1))});CreateMethodProperty(Math,"asinh",function n(i){return isNaN(i)?NaN:0===i&&1/i===Infinity?0:0===i&&1/i==-Infinity?-0:i===Infinity?Infinity:i===-Infinity?-Infinity:Math.log(i+Math.sqrt(i*i+1))});CreateMethodProperty(Math,"atanh",function n(t){return isNaN(t)?NaN:t<-1?NaN:t>1?NaN:-1===t?-Infinity:1===t?Infinity:0===t&&1/t===Infinity?0:0===t&&1/t==-Infinity?-0:Math.log((1+t)/(1-t))/2});CreateMethodProperty(Math,"cbrt",function n(t){if(isNaN(t))return NaN;if(0===t&&1/t===Infinity)return 0;if(0===t&&1/t==-Infinity)return-0;if(t===Infinity)return Infinity;if(t===-Infinity)return-Infinity;var i=Math.pow(Math.abs(t),1/3);return t<0?-i:i});CreateMethodProperty(Math,"clz32",function t(r){var e=ToUint32(r);return e?32-e.toString(2).length:32});CreateMethodProperty(Math,"cosh",function n(t){if(isNaN(t))return NaN;if(0===t&&1/t===Infinity)return 1;if(0===t&&1/t==-Infinity)return 1;if(t===Infinity)return Infinity;if(t===-Infinity)return Infinity;if((t=Math.abs(t))>709){var i=Math.exp(.5*t);return i/2*i}var i=Math.exp(t);return(i+1/i)/2});CreateMethodProperty(Math,"expm1",function n(i){return isNaN(i)?NaN:0===i&&1/i===Infinity?0:0===i&&1/i==-Infinity?-0:i===Infinity?Infinity:i===-Infinity?-1:i>-1e-6&&i<1e-6?i+i*i/2:Math.exp(i)-1});CreateMethodProperty(Math,"hypot",function t(n,r){if(0===arguments.length)return 0;for(var i=0,e=0,a=0;a<arguments.length;++a){if(arguments[a]===Infinity)return Infinity;if(arguments[a]===-Infinity)return Infinity;var f=Math.abs(Number(arguments[a]));f>e&&(i*=Math.pow(e/f,2),e=f),0===f&&0===e||(i+=Math.pow(f/e,2))}return e*Math.sqrt(i)});CreateMethodProperty(Math,"imul",function t(r,e){var n=ToUint32(r),o=ToUint32(e),i=n>>>16&65535,a=65535&n,u=o>>>16&65535,h=65535&o;return a*h+(i*h+a*u<<16>>>0)|0});CreateMethodProperty(Math,"log10",function t(e){return Math.log(e)/Math.LN10});CreateMethodProperty(Math,"log1p",function r(t){if(-1<(t=Number(t))&&t<1){for(var o=t,e=2;e<=300;e++)o+=Math.pow(-1,e-1)*Math.pow(t,e)/e;return o}return Math.log(1+t)});CreateMethodProperty(Math,"log2",function t(e){return Math.log(e)/Math.LN2});CreateMethodProperty(Math,"sign",function i(n){var n=Number(n);return isNaN(n)?NaN:1/n==-Infinity?-0:1/n===Infinity?0:n<0?-1:n>0?1:void 0});CreateMethodProperty(Math,"sinh",function r(t){var a=t<0?-1:1,e=Math.abs(t);if(e<22){if(e<Math.pow(2,-28))return t;var h=Math.exp(e)-1;return e<1?a*(2*h-h*h/(h+1))/2:a*(h+h/(h+1))/2}if(e<709.7822265625)return a*Math.exp(e)/2;var n=Math.exp(.5*e),h=a*n/2;return h*n});CreateMethodProperty(Math,"tanh",function t(n){var e;return n===Infinity?1:n===-Infinity?-1:((e=Math.exp(2*n))-1)/(e+1)});CreateMethodProperty(Math,"trunc",function t(r){return r<0?Math.ceil(r):Math.floor(r)});}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

/* A slower polyfill is used to greatly reduce file size:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround
*/
if (typeof Math.fround !== 'function') {
  Math.fround = function(arg) {
    arg = Number(arg);
    // Return early for ±0 and NaN.
    if (!arg) return arg;
    var sign = arg < 0 ? -1 : 1;
    if (sign < 0) arg = -arg;
    // Compute the exponent (8 bits, signed).
    var exp = Math.floor(Math.log(arg) / Math.LN2);
    var powexp = Math.pow(2, Math.max(-126, Math.min(exp, 127)));
    // Handle subnormals: leading digit is zero if exponent bits are all zero.
    var leading = exp < -127 ? 0 : 1;
    // Compute 23 bits of mantissa, inverted to round toward zero.
    var mantissa = Math.round((leading - arg / powexp) * 0x800000);
    if (mantissa <= -0x800000) return sign * Infinity;
    return sign * powexp * (leading - mantissa / 0x800000);
  };
}
