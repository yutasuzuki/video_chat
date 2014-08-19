var app = angular.module('app');

app.controller("videoChatController", function($scope,$routeParams) {

	var socket = io.connect("http://10.10.3.232:3000");
	//var socket = io.connect("http://localhost:3000");
	var otherArea = document.getElementById("other-area");
    var peer = new Peer({ 
        key: 'lwjd5qra8257b9', 
        config: {'iceServers': [{ url: 'stun:stun.l.google.com:19302'}]}
    });


	// 接続
    peer.on('open', function(){
        window.setTimeout(function(){
            $scope.peerId = peer.id;
        	socket.emit("sendId",peer.id);
        }, 1000);
    });

    //呼び出し
    peer.on('call', function(call){
        console.log(call.peer);
        var id = call.peer;　
        call.answer(window.localStream);
        call.on('stream', function(stream){
            otherVideoConnect(stream,id);
        });
    });

    //接続失敗
    peer.on('error', function(){
    });

    //途中で誰かが入室した場合IDを受け取り、画面に表示
    socket.on('connect', function() {
        socket.on("getId",function(id){
            console.log("broadcast");
            var remoteCall = peer.call(id, window.localStream);
            remoteCall.on('stream', function(stream){
                otherVideoConnect(stream,id);
            });
        });
    });

    function otherVideoConnect(stream,id) {
        var otherVideo = '<li data-id="' + id + '"><video autoplay src="' + URL.createObjectURL(stream) + '"></video></li>';
        otherArea.innerHTML += otherVideo;
    }

    /*
    * Google Speech Api
    */


    var recognition = new webkitSpeechRecognition();
    //一度マイク許可を出せば、音声認識を続けることを可能
    recognition.continuous = true;
    //中間結果の表示
    recognition.interimResults = true;
    //取得する認識仮説の数
    recognition.maxAlternatives = 10;

    recognition.onsoundstart = function(){
    };
    recognition.onresult = function(event) {
      var length = event.results.length;
      var results = event.results;
      if (length > 0) {
        for (var i = event.resultIndex; i<results.length; i++){
            //最終結果
            if(results[i].isFinal){
                var data = {
                    name: $routeParams.username,
                    value: results[i][0].transcript,
                    time: getDate()
                  };
                socket.emit("sendMsg",data);
                $scope.recordingText = "";
            }
            //中間結果
            else{
                $scope.$apply(function(){
                    $scope.recordingText = results[i][0].transcript;
                });
            }
        }
      }
    }

    recognition.start();

    socket.on("getMsg",function(data){
        //例外の場合$applyを付けないとAngularが反応しない！
        $scope.$apply(function(){
            $scope.messages = data;
        });
    });

    window.onbeforeunload = function(){
        socket.emit("sendCloseMedia",peer.id);
    }

    socket.on("getCloseMedia",function(id){
        var ele = document.querySelector('li[data-id="' + id + '"]');
        ele.parentNode.removeChild(ele);
    });
});


/*
* 現在時間取得
*/
function getDate(){
    var dateObj = new Date();
    var Year = dateObj.getYear()+1900;
    var Month = dateObj.getMonth() + 1;
    var Day = dateObj.getDate();
    var Hours = dateObj.getHours();
    var Minutes = dateObj.getMinutes();
    var Seconds = dateObj.getSeconds();
    if(Month < 10){Month = "0"+Month;}
    if(Day < 10){Day = "0"+Day;}
    if(Hours < 10){Hours = "0"+Hours;}
    if(Minutes < 10){Minutes = "0"+Minutes;}
    if(Seconds < 10){Seconds = "0"+Seconds;}
    return Year + "/" + Month + "/" + Day + " " + Hours + ":" + Minutes + ":" + Seconds ;
}




