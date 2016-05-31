var fs = require('fs');

/**
 * 加载某个properties文件,path为该文件的路径
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
exports.load = function(path) {

    var data = fs.readFileSync(path, 'utf8');

    // data 是string 类型

    // 以\n分隔 不一定完全正确
    var strs = data.split('\n');
    var map = new Map();

    strs.forEach(function(value, key) {
        value = value.trim();
        if (0 === value.length) {
            // 空行
        } else if (value.startsWith('#')) {
            // 注释行
        } else {
            var index = 0;
            var equal_index = value.indexOf('=');
            var colon_index = value.indexOf(':');

            if (equal_index > 0 || colon_index > 0) {

                if (equal_index > colon_index && colon_index > 0) {
                    index = colon_index;
                } else if (colon_index > equal_index && equal_index > 0) {
                    index = equal_index;
                } else if (equal_index > 0) {
                    index = equal_index;
                } else {
                    index = colon_index;
                }
            }

            if (index === 0) {
                console.log(value + '此行无法解析');
            } else {

                var _key = value.substring(0, index);
                var _value = value.substring(index + 1);

                map.set(_key.trim(), _value.trim());
            }

        }
    });
    var properties = new Properties(path, map);

    return properties;

};

function Properties(path, map) {
    this.path = path;
    this.map = map;
    this.get = get;
    this.set = set;
    this.forEach = forEach;
    this.keys = keys;
}

/**
 *  获取某个字段值,如果不存在会返回null
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function get(key) {
    return this.map.get(key);
}

/**
 * 存储某个字段值,有可能是存储新的,也有可能是覆盖已有的
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 */
function set(key, value) {
    this.map.set(key, value);
}

/**
 *  callback(value,key)
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function forEach(callback) {
    this.map.forEach(callback);
}

/**
 * [keys description]
 * @return {[type]} [description]
 */
function keys() {
    // map .keys() 方法返回的是  Iterator
    var result = [];
    this.map.forEach(function(value, key) {
        result.push(key);
    });
    return result;
}

/**
 * [values description]
 * @return {[type]} [description]
 */
function values() {
    return this.map.values();
}
