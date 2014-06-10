define(['../app'], function (controllers) {
    Array.prototype.head = function () {
        return this[0]
    }

    Array.prototype.tail = function () {
        return this.slice(1, this.length);
    }

    if (typeof String.prototype.startsWith != 'function') {
        // see below for better implementation!
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }

    cons = function (a, arr) {
        arr.unshift(a);
        return arr;
    }

    array2map = function (p, arr) {
        var result = {};
        arr.forEach(function (item) {
            result[item[p]] = item;
        })
        return result
    }

    copyProps = function(src, dest) {
        for (var i in src) {
            if (!i.startsWith('__')) {
                dest[i] = src[i];
            }
        }
    }

    Function.prototype.method = function (name, func) {
        this.prototype[name] = func;
        return this;
    };

    Function.method('inherits', function (parent) {
        this.prototype = new parent();
        var d = {},
            p = this.prototype;
        this.prototype.constructor = parent;
        this.method('uber', function uber(name) {
            if (!(name in d)) {
                d[name] = 0;
            }
            var f, r, t = d[name], v = parent.prototype;
            if (t) {
                while (t) {
                    v = v.constructor.prototype;
                    t -= 1;
                }
                f = v[name];
            } else {
                f = p[name];
                if (f == this[name]) {
                    f = v[name];
                }
            }
            d[name] += 1;
            r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
            d[name] -= 1;
            return r;
        });
        return this;
    });


})