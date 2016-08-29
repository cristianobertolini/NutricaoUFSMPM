angular.module('starter.validator', [])
        .factory('validator', function (userDB) {
            var nickValidado;

            function validar(user) {
                var erro = [];
                if (user.name && user.nick && user.password) {
                    if (!validaNick(user.nick)) {
                        erro.push({erro: 1, description: "O usuário já existe, tente outro usuário!"});
                    }
                } else {
                    if (!user.name) {
                        erro.push({erro: 2, description: "Digite o seu nome!"});
                    }
                    if (!user.nick) {
                        erro.push ({erro:3, description: "Digite o seu nick!"});
                    }
                    if (!user.password) {
                        erro.push({erro: 4, description: "Digite a sua senha"});
                    }
                }
                return erro;
            }

            function validaNick(nick) {
                userDB.readTUserNick(nick).then(function (resultados) {
                    var len = resultados.length;
                    console.log(resultados + "Tamanho: " + len + " Nick: " + nick);
                    if (len === 0) {
                        nickValidado = true;
                        console.log(nickValidado);
                    } else {
                        for (var i = 0; i < len; i++) {
                            if (resultados[i].nick === nick) {
                                nickValidado = false;
                                console.log(nickValidado);
                                break;
                            } else {
                                nickValidado = true;
                                console.log(nickValidado);
                                break;
                            }
                        }
                    }
                });
                console.log(nickValidado);
                return nickValidado;
            }


            return{
                validaNick: function (nick) {
                    return validaNick(nick);
                },
                validar: function (user) {
                    return validar(user);
                }
            }
        });

