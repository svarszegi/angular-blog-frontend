var app = angular.module('myBlog', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'postList.html',
                controller: 'blogCtrl'
            })
            .when('/posts/:id', {
                templateUrl: 'post.html',
                controller: 'postCtrl'
            })
            .otherwise('/');
    }
  ]);

app.controller('blogCtrl', function ($scope, $http) {
    $http.get("db.json").success(function (data) {
        $scope.blogData = data.posts;

    });
});
app.controller('postCtrl', function ($scope, $http, $routeParams) {
    $http.get("db.json").success(function (data) {
        $scope.postData = data.posts;
        $scope.id = $routeParams.id;

        if ($routeParams.id > 0)
            $scope.prevPost = Number($routeParams.id) - 1;
        else
            $scope.prevPost = $scope.postData.length - 1;

        /* next button */
        if ($routeParams.id < $scope.postData.length - 1)
            $scope.nextPost = Number($routeParams.id) + 1;
        else
            $scope.nextPost = 0;

    });
});