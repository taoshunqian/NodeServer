"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sql = require('../mysql/sql');

var RedisClient = require("../redis/index");

function queryTaskList(req, res) {
  var data;
  return regeneratorRuntime.async(function queryTaskList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Sql("select * from no_role"));

        case 2:
          data = _context.sent;
          res.json(data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getItems(data) {
  var testArr = [];
  var resultArr = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i].rank == 0) {
      resultArr.push(_objectSpread({}, data[i], {
        chid: []
      }));
    } else {
      testArr.push(data[i]);
    }
  }

  for (var j = 0; j < resultArr.length; j++) {
    for (var _i = 0; _i < testArr.length; _i++) {
      if (resultArr[j].label_id == testArr[_i].rank) {
        resultArr[j].chid.push(testArr[_i]);
      }
    }
  }

  return resultArr;
}

function getLabel(req, res) {
  var data;
  return regeneratorRuntime.async(function getLabel$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Sql("\n    select no_label.label_name,no_label.rank,no_label.label_id,no_label.label_color,no_label.label_status\n    from no_user left join no_label on \n    no_user.user_id = no_label.user_id\n    "));

        case 2:
          data = _context2.sent;
          res.json(getItems(data));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getIframe(req, res) {
  var data;
  return regeneratorRuntime.async(function getIframe$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Sql("select iframe_name,iframe_url,iframe_id from no_iframe"));

        case 2:
          data = _context3.sent;
          res.json(data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getArticle(req, res) {
  var data;
  return regeneratorRuntime.async(function getArticle$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Sql("\n    select * from no_title\n    "));

        case 2:
          data = _context4.sent;
          res.json(data);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getGirl(req, res) {
  var data;
  return regeneratorRuntime.async(function getGirl$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Sql("\n    select * from no_girl\n    "));

        case 2:
          data = _context5.sent;
          console.log(data);
          res.json(data);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function addLabel(req, res) {
  var data;
  return regeneratorRuntime.async(function addLabel$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Sql("insert into no_label (label_name, user_id, rank) values ( 'ppp', 3, 0)"));

        case 2:
          data = _context6.sent;
          res.json({
            id: data.insertId
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}

var num = 0;

function smembers(name) {
  new Promise(function (resolve, reject) {
    RedisClient.smembers(name, function (err, v) {
      resolve(v);
    });
  })["catch"](function (e) {
    reject("查询失败");
  });
}

var disNum = true;

function addTest(req, res) {
  return regeneratorRuntime.async(function addTest$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          // console.log(req.query.num);
          // num++;
          // RedisClient.rpush("user", req.query.num);
          // RedisClient.lrange("user", 0 , 10, function(err,v) {
          //     console.log(v)
          // });
          // RedisClient.ltrim("user", 0 , 10, function(err,v) {
          //     RedisClient.lrange("user", 0 , 10, function(err2,v2) {
          //         console.log(v2)
          //     });
          // });
          //  查询数量
          RedisClient.scard("user3", function _callee(err, v) {
            return regeneratorRuntime.async(function _callee$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!(v > 50)) {
                      _context7.next = 9;
                      break;
                    }

                    if (!disNum) {
                      _context7.next = 6;
                      break;
                    }

                    disNum = false;
                    setTimeout(function () {
                      disNum = true;
                    }, 1000 * 5);
                    _context7.next = 6;
                    return regeneratorRuntime.awrap(Sql("update no_test set ww=ww+1 where id = 1"));

                  case 6:
                    res.json({
                      code: 500
                    });
                    _context7.next = 10;
                    break;

                  case 9:
                    // 查询指定元素是否存在
                    RedisClient.sismember("user3", req.query.num, function (err, v) {
                      if (v == 1) {
                        res.json({
                          code: 400
                        });
                      } else {
                        RedisClient.sadd("user3", req.query.num);
                        res.json({
                          code: 200
                        });
                      }
                    });

                  case 10:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          }); // RedisClient.sadd("user",req.query.num);
          // await RedisClient.hget("user",function(err,v) {
          // });
          // RedisClient.hset("user",req.query.num,new Date(), function(err,v) {
          //     if(!err) {
          //     }else {
          //         res.json({
          //             code: 401
          //         })
          //     }
          // })
          // let num = await Sql("select ww from no_test where id = 1");
          // if(num == 10) {
          //     res.json({
          //         msg:"结束"
          //     })
          // } else {
          //     let data = await Sql("update no_test set ww=ww+1 where id = 1")
          //     res.json(data);
          // }

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
}

module.exports = {
  queryTaskList: queryTaskList,
  getLabel: getLabel,
  addLabel: addLabel,
  getIframe: getIframe,
  getArticle: getArticle,
  getGirl: getGirl,
  addTest: addTest
};