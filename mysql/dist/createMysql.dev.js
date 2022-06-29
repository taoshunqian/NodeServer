"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sql = require('./sql');

var Create =
/*#__PURE__*/
function () {
  function Create() {
    _classCallCheck(this, Create);
  }

  _createClass(Create, [{
    key: "create",
    value: function create() {
      var res;
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(Sql("SELECT table_name \n         FROM information_schema.TABLES WHERE table_name ='runoob_tbl'"));

            case 2:
              res = _context.sent;

              if (!(res.length == 0)) {
                _context.next = 7;
                break;
              }

              console.log("不存在");
              _context.next = 9;
              break;

            case 7:
              console.log('无需创建');
              return _context.abrupt("return", false);

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(Sql("CREATE TABLE IF NOT EXISTS runoob_tbl(\n            runoob_id INT UNSIGNED AUTO_INCREMENT,\n            user_id INT NOT NULL COMMENT '\u7528\u6237id',\n            runoob_title VARCHAR(100) NOT NULL COMMENT '\u6807\u9898',\n            runoob_author VARCHAR(40) NOT NULL COMMENT '66',\n            submission_date DATE COMMENT '\u65F6\u95F4',\n            PRIMARY KEY (runoob_id)\n         )ENGINE=InnoDB DEFAULT CHARSET=utf8;"));

            case 11:
              res = _context.sent;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return Create;
}();

module.exports = new Create();