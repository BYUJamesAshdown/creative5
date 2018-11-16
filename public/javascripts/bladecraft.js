/* global angular io */
var socket = io();

angular.module('bladecraft', [])
  .controller('MainCtrl', [
    '$scope', '$http',
    function($scope, $http) {
      $scope.messages = [];

      $http.get('/messages').success(function(data) {
        console.log('get success');
        angular.copy(data, $scope.messages);
      });

      $scope.send = function() {
        var message = $scope.message;
        if (message) {
          $http.post('/messages', { message: `${message}` }).success(function(data) {
            console.log('post success');
            $scope.messages.push(data);
          });
          socket.emit('message', $scope.message);
        }

        $scope.message = '';
      };

      socket.on('message', function(msg) {
        console.log('socket response');
        $http.get('/messages').success(function(data) {
          console.log('get success');
          angular.copy(data, $scope.messages);
        });
        window.scrollTo(0, document.body.scrollHeight);
      });

    }
  ]);

/*
$(document).ready(function() {
  var socket = io();

  $('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
});
*/
