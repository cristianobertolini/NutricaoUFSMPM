angular.module('starter.controllers', ['ionic'])

        .controller('controller', function ($scope, userDB) {
//cria a DB alimentos e a tabela user                    
                    userDB.createDB();
        });