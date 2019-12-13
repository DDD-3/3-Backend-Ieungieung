var express = require('express');
var router = express.Router();
var keyMap = new Map();
var lastValue = 1;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/link/:number', function(req, res, next) {
  var retValue = {};
  var number = req.params.number;
  retValue.linkKey = makeLinkKey(number);
  console.log(retValue);
  res.json(retValue);
});

router.get('/checklink/:linkId', function(req, res, next) {
  var retValue = {};
  retValue.linkId = req.params.linkId;
  retValue.isExist = keyMap.has(req.params);
  res.json(retValue);
});

function makeLinkKey(number){
    //접속자수 기본값.
    if(!(isNumeric(number) && (0 < number|| number < 11))){
      number = 3;
    }
    if(keyMap.has(lastValue)){
      lastValue = lastValue + 1;
      keyMap.set(lastValue, number);
    }else{
      keyMap.set(lastValue, number);
    }
    return lastValue;
}

router.get('/middlepoint/:linkId/:deviceId', function(req, res, next) {
    var linkId = req.params.linkId;
    var deviceId = req.params.deviceId;
    var number = 0;
    var retJson = {};

    if(keyMap.has(linkId))
      number = keyMap.get(linkId);
    }else{
      retJson.msg = "링크가 유효하지 않습니다. 링크를 새로 만들어 주세요.";
    }

});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = router;
