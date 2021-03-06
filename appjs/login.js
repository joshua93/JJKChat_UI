angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope', '$location', '$window', '$localStorage',
    function ($http, $log, $scope, $location, $window, $localStorage) {
        var loginCtrl = this;


        this.checkLogin = function () {
            //$localStorage.pID = 1///THIS IS FOR AUTOMATIC LOGIN MUST REMOVE
            delete $localStorage.pID; // Very nasty logout
            console.log('Checking PID');
            if ($localStorage.pID !== undefined) {
                console.log('pID Defined');
                $location.url('/chatGroups');
            }
        }

        this.login = function () {
            var post = new Object();
            post.username = loginCtrl.username;
            post.password = loginCtrl.password;

            $http({
                url: 'https://jjkchat-api.herokuapp.com/JJKChat/login',
                dataType: 'json',
                method: 'POST',
                data: post,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                function (response) {
                    console.log("User: " + JSON.stringify(response.data));
                    this.userDetails = response.data
                    if (this.userDetails.authenticated) {
                        $localStorage.pID = this.userDetails.user_id;
                        //$window.location.href = '/allGroups';
                        $location.url('/chatGroups');
                        M.toast({html: 'Welcome Back! ' + loginCtrl.username, classes: 'rounded green pulse z-depth-3'});


                    } else {
                        M.toast({html: 'Wrong Credentials. Try again', classes: 'rounded red pulse z-depth-3'});
                        loginCtrl.username = ""
                        loginCtrl.password = ""

                    }
                },
                function (response) {
                    var status = response.status;
                    if (status === 0) {
                        alert("No internet connection");
                    }
                    else if (status === 401) {
                        alert("Your session expired. Login again");
                    }
                    else if (status === 403) {
                        alert("Not authorized");
                    }
                    else if (status === 404) {
                        alert("User not found");
                        loginCtrl.username = ""
                        loginCtrl.password = ""
                    }
                    else {
                        alert("Internal error.");
                    }
                });

        };

        console.log($localStorage.pID);
        this.checkLogin();


    }]);