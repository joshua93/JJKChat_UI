angular.module('AppChat').controller('RegisterController', ['$http', '$log', '$scope', '$location', '$window',
    function ($http, $log, $scope, $location, $window) {
        var registerCtrl = this;



        this.register = function () {
            var postObject = new Object();
            postObject.username = registerCtrl.username;
            postObject.password = registerCtrl.password;
            postObject.first_name = registerCtrl.firstName;
            postObject.last_name = registerCtrl.lastName;
            postObject.phone = registerCtrl.phone;
            postObject.email = registerCtrl.email;
            console.log(postObject);
            $http({

                url: "http://127.0.0.1:5000/JJKChat/register",
                dataType: 'json',
                method: 'POST',
                data: postObject,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(// success call back
                function (response) {
                    // The is the sucess function!
                    // Copy the list of parts in the data variable
                    // into the list of parts in the controller.
                    //$window.location.href = '/#!/login';
                    console.log("response: " + JSON.stringify(response));
                    $location.url("/login")
                    //$location.url('/allGroups');
                }, // error callback
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
                        alert("Not found");
                    }
                    else {
                        alert("Internal error.");
                    }
                });
        };

    }]);