import JSON5 from './formats/json5.js';
import jsYaml from './formats/yaml.js';
import * as fsMod from './fs.cjs';
import * as pathMod from './path.cjs';
import extname from './extname.js';
var isDeno = typeof Deno !== 'undefined';
var YAML = typeof jsYaml !== 'undefined' && jsYaml.load ? jsYaml : undefined;
var fs = fsMod ? fsMod.default || fsMod : undefined;
var path = pathMod ? pathMod.default || pathMod : undefined;
var readFileInNodeSync = function readFileInNodeSync(filename) {
  var data = fs.readFileSync(filename, 'utf8');
  var stat;
  try {
    stat = fs.statSync(filename);
  } catch (e) {}
  return {
    data: data,
    stat: stat
  };
};
var readFileInNode = function readFileInNode(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) return reject(err);
      fs.stat(filename, function (err, stat) {
        if (err) return resolve({
          data: data
        });
        return resolve({
          data: data,
          stat: stat
        });
      });
    });
  });
};
var readFileInDenoSync = function readFileInDenoSync(filename) {
  var decoder = new TextDecoder('utf-8');
  var d = Deno.readFileSync(filename);
  var data = decoder.decode(d);
  var stat;
  try {
    stat = Deno.statSync(filename);
  } catch (e) {}
  return {
    data: data,
    stat: stat
  };
};
var readFileInDeno = function readFileInDeno(filename) {
  return new Promise(function (resolve, reject) {
    var decoder = new TextDecoder('utf-8');
    Deno.readFile(filename).then(function (d) {
      var data = decoder.decode(d);
      Deno.stat(filename).then(function (stat) {
        return resolve({
          data: data,
          stat: stat
        });
      }).catch(function () {
        return resolve({
          data: data
        });
      });
    }).catch(reject);
  });
};
var replaceLast = function replaceLast(str, find, replace) {
  var index = str.lastIndexOf(find);
  if (index > -1) {
    return str.substring(0, index) + replace + str.substring(index + find.length);
  }
  return str.toString();
};
var parseData = function parseData(extension, data, options) {
  data = data.replace(/^\uFEFF/, '');
  var result = {};
  switch (extension) {
    case '.js':
    case '.ts':
      if (typeof module === 'undefined') {
        if (data.indexOf('exports') > -1) {
          data = "(".concat(replaceLast(data.substring(data.indexOf('=') + 1), '};', ''), ")");
        } else if (data.indexOf('export default ') > -1) {
          data = "(".concat(replaceLast(data.substring(data.indexOf('export default ') + 15), '};', ''), ")");
        }
      }
      result = eval(data);
      break;
    case '.json5':
      result = JSON5.parse(data);
      break;
    case '.yml':
    case '.yaml':
      result = YAML.load(data);
      break;
    default:
      result = options.parse(data);
  }
  return result;
};
var resolvePath = function resolvePath(filename) {
  return !path.isAbsolute(filename) && typeof process !== 'undefined' && process.cwd && !fs.existsSync(filename) ? path.join(process.cwd(), filename) : filename;
};
export function readFileSync(filename, options) {
  var ext = extname(filename);
  if (['.js', '.ts'].indexOf(ext) > -1 && typeof require !== 'undefined') {
    return require(resolvePath(filename));
  }
  var data, stat;
  if (isDeno) {
    var ret = readFileInDenoSync(filename);
    data = ret.data;
    stat = ret.stat;
  } else {
    var _ret = readFileInNodeSync(filename);
    data = _ret.data;
    stat = _ret.stat;
  }
  return {
    data: parseData(ext, data, options),
    stat: stat
  };
}
export function readFile(filename) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    parse: JSON.parse
  };
  var ext = extname(filename);
  if (['.js', '.ts'].indexOf(ext) > -1 && typeof require !== 'undefined') {
    return new Promise(function (resolve, reject) {
      try {
        resolve({
          data: require(resolvePath(filename))
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  var fn = isDeno ? readFileInDeno : readFileInNode;
  return new Promise(function (resolve, reject) {
    fn(filename).then(function (_ref) {
      var data = _ref.data,
        stat = _ref.stat;
      try {
        var ret = parseData(ext, data, options);
        resolve({
          data: ret,
          stat: stat
        });
      } catch (err) {
        err.message = 'error parsing ' + filename + ': ' + err.message;
        reject(err);
      }
    }).catch(reject);
  });
}