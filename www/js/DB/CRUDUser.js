angular.module('starter.userDB', [])
        .factory('userDB', function ($q, conDB) {

            var db = conDB.con();//conexão com a base nutrição
            function createDB() {
                try {
                    //cria as tabelas 'user' e 'user_status' 
                    db.transaction(function (tx) {
                        tx.executeSql('DROP TABLE user')
                        tx.executeSql('CREATE TABLE IF NOT EXISTS user(' +
                                ' user_id INTEGER PRIMARY KEY ASC NOT NULL,' +
                                ' user_name VARCHAR(20),' +
                                ' user_type VARCHAR(20),' +
                                ' user_nick VARCHAR(20),' +
                                ' user_password VARCHAR(16))');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS user_status(user_id INTEGER (4) PRIMARY KEY REFERENCES user (_ID) NOT NULL,' +
                                'user_imc DOUBLE(5))');
                    });
                    /*                    db = window.sqlitePlugin.openDB({name: 'user.db', location: 'default'},
                     //                            function (db) {
                     //                                db.transaction(function (tx) {
                     //                                    db.transaction(function (tx) {
                     //                                        tx.executeSql('CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY, user_name VARCHAR(200), user_password VARCHAR(16))');
                     //                                    });
                     //                                }, function (err) {
                     //                                    alert('Open database ERROR: ' + JSON.stringify(err));
                     //                                });
                     //                            });*/
                } catch (err) {
                    alert('Erro: ' + err);
                }
            }
            //insere na tabela 'user'
            function createTUser(user) {
                return  promessQuery('INSERT INTO user (user_name, user_nick ,user_password) VALUES (' +
                        '"' + user.name + '","' + user.nick + '","' + user.password + '")', callBackSucesso, callBackErro);
            }
            
            //lê toda a tabela 'user'
            function readTUser() {
                return  promessQuery('SELECT * FROM user',
                        callBackSucesso, callBackErro);
            }
            
            //lê todos os usuários que começam com a entrada 'nick'
            function readTUserNick(nick) {
                return  promessQuery('SELECT user_nick FROM user WHERE user_nick LIKE "' + nick + '%"',
                        callBackSucesso, callBackErro);
            }
            
            //atualiza os dados da tabela 'user'
            function updateTUser(name, id) {
                return  promessQuery('UPDATE user SET user_name= "' + name + '" WHERE user_id= ' + id,
                        callBackSucesso, callBackErro);
            }
            
            //deleta usuário pelo id
            function deleteTUserForId(id) {
                return  promessQuery('DELETE FROM user WHERE user_id = ' + id,
                        callBackSucesso, callBackErro);
            }

            //promess para as operações do DB
            //'query' comando SQL
            //'callBackSucesso' 'callBackErro' retorna se a query funcionou ou não
            function promessQuery(query, sucessCB, errorCB) {
                var deferido = $q.defer();
                db.transaction(function (tx) {
                    tx.executeSql(query, [], sucessCB(deferido), errorCB(deferido));
                });
                return deferido.promise;
            }

            //se sucesso varre os resultados e retorna 
            function callBackSucesso(deferido) {
                return function (tx, results) {
                 //se tiver resultados organiza os dados 
                    if (results) {
                        var len = results.rows.length, i;
                        var resultados = [];
                        for (i = 0; i < len; i++) {
                            var user = {
                                id: results.rows.item(i).user_id,
                                name: results.rows.item(i).user_name,
                                nick: results.rows.item(i).user_nick
                            }
                            resultados.push(user);
//                        console.log(results.rows.item(i));
                        }
                        deferido.resolve(resultados);
                    }
                }
            }
            //se erro alert erro
            function callBackErro(deferido) {
                return function () {
                    alert('CallBack Error!');
                    deferido.resolve([]);
                }
            }

            return{
                createDB: function () {
                    return createDB();
                },
                createTUser: function (name) {
                    return createTUser(name);
                },
                readTUser: function () {
                    return readTUser();
                },
                updateTUser: function (name, id) {
                    return updateTUser(name, id);
                },
                deleteTUserForId: function (id) {
                    return deleteTUserForId(id);
                },
                readTUserNick: function (nick) {
                    return readTUserNick(nick);
                }

            }
        });

