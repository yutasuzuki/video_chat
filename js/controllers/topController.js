var app = angular.module('app');
app.controller("topController", function($scope) {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	navigator.getUserMedia(
		{audio: true, video: true}, 
		function success(stream){
			console.log($scope);
			var ele = document.getElementById("view");
			ele.style.display = "block";
			var target =  document.getElementById("my-video");
			target.src = URL.createObjectURL(stream);
		    window.localStream = stream;
		}, 
		function error(){
			console.log("mediaに接続できません");
		}
	);
});