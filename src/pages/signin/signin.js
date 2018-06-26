'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    console.log('333');

    $scope.user = {};
    $scope.authError = null;
    $scope.login = function () {
        //   $scope.authError = null;
        console.log($scope.app.https);
        
        // Try to login
        //   $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
        //   .then(function(response) {
        //     if ( !response.data.user ) {
        //       $scope.authError = 'Email or Password not right';
        //     }else{
        //       $state.go('app.dashboard-v1');
        //     }
        //   }, function(x) {
        //     $scope.authError = 'Server Error';
        //   });
        // };
        $state.go('app.overview');
        console.log($scope.user);
        $http.post($scope.app.https + '/site/login', $scope.user)
            .then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            });
    };

    $scope.test = function (params) {
        $http({
            method: 'GET',
            url: 'https://192.168.1.253/alert/threat-type'
        }).then(function (data, status, headers, config) {

            console.log(data.data);

            // 当相应准备就绪时调用
        }, function (error, status, headers, config) {
            console.log(error);

        })
    }
    // $scope.test();

    $scope.particvle = function (params) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        
    }
    $scope.particvle();
}]);