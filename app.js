const readline = require('readline-sync');
const urlencode = require('urlencode');
const http = require('http');
const util = require('./util');

const HOST = "youth.koreatech.ac.kr";
const PATH = "/BookmarkLecture.do?cmd=addBookmarkNew&bookmarkJson=";
const JSONData = { "accmConnPage": "", "aprvUserNm": "", "aprvUserNo": "", "atchFilePath": "", "banCd": "", "classStudyCnt": 1, "connCnt": 1, "connPageCnt": 1, "connTm": 1684, "connTotTm": 9, "critTm": 0, "crsCreCd": "", "errorCode": "0", "finalConnPage": "", "firstStudyDttm": "", "gradeCd": "", "groupTm": 0, "gubun": "", "hisSn": 0, "lastConnUintCd": "", "listParam": "", "maxScore": 0, "message": "", "messageDetail": "", "minScore": 0, "mobileTm": 0, "modDttm": "20170905114824", "modNm": "UnKnown", "modNo": "", "parUnitCd": "", "passScore": 0, "pcTm": 0, "prgrChkType": "", "prgrChkYn": "", "prgrRatio": 0.6, "quiz": "", "quizCnt": 0, "quizPassScore": 0, "quizPassYn": "", "quizUnitCd": "", "quizYn": "", "rNum": "", "regDttm": "20170905114824", "regId": "", "regNm": "UnKnown", "regNo": "", "result": "true", "sbjCd": "NSC0000519", "schlStudyDivCd": "", "schlStudyDivNm": "", "schlStudyDt": "", "schlStudyEndTm": "", "schlStudyStartTm": "", "searchDuration": "", "searchFrom": "", "searchKey": "", "searchTo": "", "searchValue": "", "sortKey": "", "stdCnt": 0, "stdNo": "", "studyDiv": "PER", "studyDivNm": "", "studyDttm": "20170905114824", "studyYn": "", "subCnt": 0, "subList": [], "summaryRatio": 0, "todayStudyYn": "", "totPageCnt": 0, "totalConnect": 0, "totalConnectTime": 0, "totalPage": 0, "unitCd": "CNT000001355", "unitFilePath": "", "unitLvl": 0, "unitNm": "", "unitOdr": 0, "unitPath": "", "unitType": "", "userId": "", "userNm": "", "userNo": "" };

const STDNO = ["CNT000001328", "CNT000001348", "CNT000001349", "CNT000001352"];

//init STDNO
const tmpStr = "CNT0000013"
const start = 52;

for (var i = 1; i <= 14; i++) {
    STDNO.push(tmpStr + (start + i));
}

var options = {
    host: HOST,
    path: '',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ko-kr',
        'Cookie': ''
    }
};

callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function(chunk) {
        str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function() {
        console.log(str);
    });
};

//get User input
var stdNo = readline.question('What is stdNO?');
var cookie = readline.question('What is your cookie?');

//set options
JSONData.stdNo = stdNo;
options.headers.Cookie = cookie;

//send Request
for (var i = 0; i < STDNO.length; i++) {
    JSONData.connTm = util.getRandomTime();
    JSONData.unitCd = STDNO[i];
    const _PATH = PATH + util.enocdeJSON(JSONData);
    options.path = _PATH;
    console.log('Sending Request.... : ', i);
    console.log('Options : ', options);
    //send request
    http.request(options, callback).end();
}
