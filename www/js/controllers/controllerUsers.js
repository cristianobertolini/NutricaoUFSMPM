angular.module('starter.controllerUsers', ['ionic'])
        .controller('controllerUsers', function ($scope, md5, validator) {

            $scope.confirmado = false;
            $scope.enableButton = false;
            
            console.log($scope.users);
            $scope.confirma = function () {
                nick = document.getElementById('nickUser').value;
                console.log(nick);
                var validado = validator.validaNick(nick);
                if (validado) {
                    document.getElementById('textUsuario').style.color = 'green';
                } else {
                    document.getElementById('textUsuario').style.color = 'red';
                }
                console.log("returno: " + validado);

            }
            
            $scope.cadastro = function () {
                var user = {
                    name: document.getElementById("nomeUser").value,
                    nick: document.getElementById("nickUser").value,
                    password: md5.createHash(document.getElementById("senhaUser").value)
                }

            }

        });