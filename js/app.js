angular.module("app",["ngRoute"])
.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider) {

	$routeProvider.
		when("/", {
			templateUrl: "view/top/index.html",
			controller: "topController",
			title: "top"
		})
		.when("/video-chat/:username", {
			templateUrl: "view/video-chat/index.html",
			controller: "videoChatController",
			title: "video-chat"
		})
		.otherwise({
			redirectTo: "/"
		});

}]);