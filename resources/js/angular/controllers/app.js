var app=angular.module('dashboard',
		['ngRoute',
		 'ngAnimate',
		 'ui.bootstrap',
		 'angular-growl',
		 'angular-loading-bar',
		 'ngResource',
		 'chart.js']);

app.config(["growlProvider", function(growlProvider){
	growlProvider.globalTimeToLive(3000);
}]);

app.service('messageService', ['$resource', function($resource){
    this.getMessage = function(img, user, text) {
        var gmList = $resource("resources/data/messages-notifications.json");
        
        return gmList.get({
            img: img,
            user: user,
            text: text
        });
    };
}]);

app.service('nicescrollService', function() {
    var ns = {};
    ns.niceScroll = function(selector, color, cursorWidth) {
        
        $(selector).niceScroll({
            cursorcolor: color,
            cursorborder: 0,
            cursorborderradius: 0,
            cursorwidth: cursorWidth,
            bouncescroll: true,
            mousescrollstep: 100,
            autohidemode: false
        });
    };
    
    return ns;
});