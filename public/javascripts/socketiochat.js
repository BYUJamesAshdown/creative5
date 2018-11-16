/* global $ angular io */
var socket = io();

angular.module('socketiochat', [])
  .controller('MainCtrl', [
    '$scope', '$http',
    function($scope, $http) {
      $scope.messages = [];
      let active = false;

      $scope.username = '';

      $('#usernameModal').modal({ backdrop: 'static', keyboard: false });

      $('#usernameModal').on('shown.bs.modal', function() {
        $('#username').focus();
      });

      $scope.submitUsername = function() {
        if ($scope.username) {
          $('#usernameModal').modal('hide');
          active = true;
          get();
        }
        else {
          alert('Please enter a username');
        }
      };

      let get = function() {
        if (active) {
          $http.get('/messages').success(function(data) {
            angular.copy(data, $scope.messages);
          });
        }
      };

      $scope.send = function() {
        let username = $scope.username;
        let message = $scope.message;
        if (username && message) {
          $http.post('/messages', { username: `${username}`, message: `${message}` }).success(function(data) {
            $scope.messages.push(data);
          });
          socket.emit('message', $scope.message);
        }

        $scope.message = '';
      };

      socket.on('message', function(msg) {
        get();
        window.scrollTo(0, document.body.scrollHeight);
      });

    }
  ]);
