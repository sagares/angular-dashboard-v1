app.controller('dashboardCtrl', [ "$scope", "$timeout", "growl", dashboardCtrl ]);

function dashboardCtrl($scope, $timeout, growl) {

	// Detact Mobile Browser
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
			.test(navigator.userAgent)) {
		angular.element('html').addClass('ismobile');
	}
	$scope.sidebarToggle = {
		left : false,
		right : false
	};
	 // By default template has a boxed layout
	$scope.layoutType = localStorage.getItem('ma-layout-status');
	
	/* // For Mainmenu Active Class
	$scope.$state = $state;  */  
    
    //Close sidebar on click
	$scope.sidebarStat = function(event) {
        if (!angular.element(event.target).parent().hasClass('active')) {
            this.sidebarToggle.left = false;
        }
    };
    
    //Listview Search (Check listview pages)
	$scope.listviewSearchStat = false;
    
	$scope.lvSearch = function() {
        this.listviewSearchStat = true; 
    };
    
    //Listview menu toggle in small screens
	$scope.lvMenuStat = false;
    
    //Blog
	$scope.wallCommenting = [];
    
	$scope.wallImage = false;
	$scope.wallVideo = false;
	$scope.wallLink = false;
};

app.controller('headerCtrl', [ "$scope", "$timeout", 'messageService', headerCtrl ]);
function headerCtrl($scope, $timeout, messageService){
	// Top Search
	$scope.openSearch = function(){
        angular.element('#header').addClass('search-toggled');
        //growlService.growl('Welcome back Mallinda Hollaway', 'inverse');
    };

    $scope.closeSearch = function(){
        angular.element('#header').removeClass('search-toggled');
    };
    
 // Get messages and notification for header
    $scope.img = messageService.img;
    $scope.user = messageService.user;
    $scope.user = messageService.text;

    $scope.messageResult = messageService.getMessage($scope.img, $scope.user, $scope.text);
    
  //Clear Notification
    $scope.clearNotification = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        var x = angular.element($event.target).closest('.listview');
        var y = x.find('.lv-item');
        var z = y.size();
        
        angular.element($event.target).parent().fadeOut();
        
        x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
        x.find('.grid-loading').fadeIn(1500);
        var w = 0;
        
        y.each(function(){
            var z = $(this);
            $timeout(function(){
                z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
                    z.remove();
                });
            }, w+=150);
        });
        
        $timeout(function(){
            angular.element('#notifications').addClass('empty');
        }, (z*150)+200);
    };
   
 // Clear Local Storage
    $scope.clearLocalStorage = function() {
        
        //Get confirmation, if confirmed clear the localStorage
        swal({   
            title: "Are you sure?",   
            text: "All your saved localStorage values will be removed",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#F44336",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, function(){
            localStorage.clear();
            swal("Done!", "localStorage is cleared", "success"); 
        });
        
    }
    
    //Fullscreen View
    $scope.fullScreen = function() {
        //Launch
        function launchIntoFullscreen(element) {
            if(element.requestFullscreen) {
                element.requestFullscreen();
            } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if(element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if(element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }

        //Exit
        function exitFullscreen() {
            if(document.exitFullscreen) {
                document.exitFullscreen();
            } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        if (exitFullscreen()) {
            launchIntoFullscreen(document.documentElement);
        }
        else {
            launchIntoFullscreen(document.documentElement);
        }
    };
};


app.controller('lineChartCtrl', [ "$scope",  lineChartCtrl ]);
function lineChartCtrl($scope, messageService) {
	$scope.labels = [ "January", "February", "March", "April", "May", "June",
			"July" ];
	$scope.series = [ 'Series A', 'Series B' ];
	$scope.data = [ [ 65, 59, 80, 81, 56, 55, 40 ],
			[ 28, 48, 40, 19, 86, 27, 90 ] ];
	$scope.colors = ['Red', 'Yellow', 'Green'];
	$scope.onClick = function(points, evt) {
		console.log(points, evt);
	};
};