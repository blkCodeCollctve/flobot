'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runFlobot = undefined;

require('@babel/polyfill');

var _constants = require('./constants');

var _getTypeformResponses = require('./helpers/get-typeform-responses');

var _getTypeformResponses2 = _interopRequireDefault(_getTypeformResponses);

var _postToSlack = require('./helpers/post-to-slack');

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var runFlobot = exports.runFlobot = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var newLastQueryDateString, client, db, collection, lastQueryDateString, typeformResponses, lastQueryDate;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newLastQueryDateString = new Date().toString();
            client = void 0, db = void 0, collection = void 0, lastQueryDateString = void 0, typeformResponses = void 0;
            _context.prev = 2;
            _context.next = 5;
            return (0, _db.connectToDB)();

          case 5:
            client = _context.sent;

            db = client.db(_constants.DB_NAME);
            collection = db.collection(_constants.LAST_QUERY_DOCUMENT);
            _context.next = 15;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](2);

            console.log('ERROR: can\'t connect to db: ' + _context.t0);
            client.close();
            return _context.abrupt('return');

          case 15:
            _context.prev = 15;
            _context.next = 18;
            return (0, _db.getLastQueryDate)(client, collection);

          case 18:
            lastQueryDateString = _context.sent;

            console.log('last queried ' + lastQueryDateString);
            _context.next = 27;
            break;

          case 22:
            _context.prev = 22;
            _context.t1 = _context['catch'](15);

            console.log('ERROR: can\'t find \'' + _constants.LAST_QUERY_DOCUMENT + '\' document: ' + _context.t1);
            client.close();
            return _context.abrupt('return');

          case 27:
            _context.prev = 27;
            lastQueryDate = new Date(lastQueryDateString);
            _context.next = 31;
            return (0, _getTypeformResponses2.default)(lastQueryDate);

          case 31:
            typeformResponses = _context.sent.data.items;
            _context.next = 39;
            break;

          case 34:
            _context.prev = 34;
            _context.t2 = _context['catch'](27);

            console.log('ERROR: could not get typeform responses: ' + _context.t2);
            client.close();
            return _context.abrupt('return');

          case 39:
            _context.prev = 39;
            _context.next = 42;
            return (0, _postToSlack.postResponsesToSlack)(typeformResponses);

          case 42:
            console.log('posted responses to slack');
            _context.next = 50;
            break;

          case 45:
            _context.prev = 45;
            _context.t3 = _context['catch'](39);

            console.log('ERROR: couldn\'t post responses to slack: ' + _context.t3);
            client.close();
            return _context.abrupt('return');

          case 50:
            _context.prev = 50;
            _context.next = 53;
            return (0, _db.setLastQueryDate)(client, collection, newLastQueryDateString);

          case 53:
            console.log('last query date set to ' + newLastQueryDateString);
            _context.next = 59;
            break;

          case 56:
            _context.prev = 56;
            _context.t4 = _context['catch'](50);

            console.log('ERROR: can\'t update \'' + _constants.LAST_QUERY_DOCUMENT + '\' document: ' + _context.t4);

          case 59:

            client.close();

          case 60:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10], [15, 22], [27, 34], [39, 45], [50, 56]]);
  }));

  return function runFlobot() {
    return _ref.apply(this, arguments);
  };
}();

runFlobot();