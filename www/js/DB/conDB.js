angular.module('starter.conDB', [])
        .factory('conDB', function () {
            function con() {
                try {
                  var db = openDatabase('nutricao', '1.0', 'db app ionic', 2 * 1024 * 1024);
                    return db;
                } catch (err) {
                    alert('Erro: ' + err);
                    return err;
                }
            }
            return{
                con: function () {
                    return con();
                }
            }
        });
