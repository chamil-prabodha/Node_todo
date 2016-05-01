/**
 * Created by Chamil Prabodha on 01/05/2016.
 */

var todo = angular.module('ToDo',[]);

todo.controller('mainController',function($scope,$http){
    $scope.formData = {};

    $http.get('api/todos').success(function(data){
        $scope.todos = data;
        $scope.name = 'hello';
        console.log(data);
    }).error(function(err){
        console.log('ERROR: '+err);
    });

    $scope.createTodo = function(){
        $http.post('api/todos',$scope.formData).success(function(data){
            $scope.formData = {};
            $scope.todos = data;
            console.log(data);
        }).error(function(err){
            console.log('ERROR: '+err);
        });
    };

    $scope.deleteTodo = function(id){
        $http.delete('api/todos/'+id).success(function(data){
            $scope.todos = data;
            console.log(data);
        }).error(function(err){
            console.log('ERROR: '+err);
        });
    }
});