angular.module('starter.CRUDAlimentos', [])
        .factory('CRUDAlimentos', function (alimentService) {

            //varre a lista de alimentos e retorna todos os resultados que começam com
            //a string de entrada 'alimentoP'
            function getAlimento(alimento) {
                //'len' recebe o tamanho da lista de alimentos e inicia 'i'
                var len = alimentService.length, i;
                //cria a expressão regular que determina a palavra ser varrida casa por casa desde o início 
                //.toLowerCase() deixa todas as letras minusculas
                console.log(alimento);
                var expressãoRegular = new RegExp("^" + alimento.toLowerCase());
                //inicia 'resultados' como vetor
                var resultados = [];
                //varre o vetor de 0 até 'len'
                for (i = 0; i < len; i++) {
                    // console.log(alimento[i].nome);
                    //testa a expressão regular com o nome do alimento também minúsculo
                    //se 'alimentoP' for igual ao início da string
                    if (expressãoRegular.test(alimentService[i].name.toLowerCase())) {
                        //adiciona os resultados ao vetor
                        resultados.push(alimentService[i]);
                    }


                }
                var resultadosOrdenados = [];

                //ORDENA EM ORDEM ALFABÉTICA OS RESULTADOS
                resultados.sort(function (a, b) {
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                });

                //põe o resultado que é igual pra cima
                for (var j = 0; j < resultados.length; j++) {
                    if (resultados[j].name === alimento) {
                        resultadosOrdenados.push(resultados[j]);
                        resultados.splice(j, 1);
                    }
                }

                for (var k = 0; k < resultados.length; k++) {
                    resultadosOrdenados.push(resultados[k]);
                }

                //console.log(resultadosOrdenados);
                //retorna os resultados
                return resultadosOrdenados;
            }

            //Recebe um objeto 'alimentoP' e adiciona a lista
            function adicionar(alimentoP) {
                alimentoP.id = alimentService.length + 1;
//                console.log("Adicionando Alimento: " + alimentoP);
                alimentService.push(alimentoP);
            }



            return{
                baseAlimentos: function () {
                    return baseAlimentos();
                },
                /*readAlimentos: function () {
                 return readAlimentos();
                 },
                 addItens: function () {
                 addItens();
                 }*/
                getAlimento: function (alimentoP) {
                    return getAlimento(alimentoP);
                },
                adicionar: function (alimentoP) {
                    return adicionar(alimentoP);
                }
            }
            /*      var db;
             function baseAlimentos() {
             try {
             db = conDB.con();
             db.transaction(function (tx) {
             tx.executeSql()
             
             tx.executeSql('CREATE TABLE IF NOT EXISTS alimentos(alimentos_id INTEGER PRIMARY KEY NOT NULL,' +
             ' alimentos_name varchar(200))');
             tx.executeSql('CREATE TABLE IF NOT EXISTS valores_nutricionais ' +
             '(id_alimento INTEGER (4) PRIMARY KEY REFERENCES alimentos (_ID) NOT NULL, ' +
             'umidade DOUBLE (5) DEFAULT NULL, energia INTEGER (4), proteina FLOAT (5), lipideos FLOAT (5),' +
             'colesterol INTEGER (4), carboidrato FLOAT (5), fibra FLOAT (5), cinzas FLOAT (5), calcio INTEGER (4),' +
             'magnesio INTEGER (4), manganes FLOAT (5), fosforo INTEGER (4), ferro FLOAT (5), sodio INTEGER (4),' +
             'potassio INTEGER (4), cobre FLOAT (5), zinco FLOAT (5), retinol INTEGER (4), re INTEGER (4), rae INTEGER (4),' +
             'tiamina FLOAT (5), riboflavina FLOAT (5), piridoxina FLOAT (5), niacina FLOAT (5), vitaminac FLOAT (5))'
             );
             });
             //                    db = window.sqlitePlugin.openDB({name: 'tarefasDB.db', location: 'default'},
             //                            function (db) {
             //                                db.transaction(function (tx) {
             //                                    db.transaction(function (tx) {
             //                                        tx.executeSql('CREATE TABLE IF NOT EXISTS tarefas (tarefas_id INTEGER PRIMARY KEY ASC, tarefas_nome varchar(200))');
             //                                    });
             //                                }, function (err) {
             //                                    alert('Open database ERROR: ' + JSON.stringify(err));
             //                                });
             //                            });
             } catch (err) {
             alert(err);
             }
             }
             
             function readAlimentos() {
             return promessQuery('SELECT * FROM alimentos', callBackSucesso, callBackErro, "readAlimentos");
             }
             
             function createAlimentos(obj) {
             return  promessQuery('INSERT INTO alimentos(alimentos_id, alimentos_name) VALUES (' + obj.id + ', "' + obj.nome + '")',
             callBackSucesso, callBackErro, "createAlimentos");
             }
             
             function createAtributos(obj) {
             return promessQuery('INSERT INTO valores_nutricionais(id_alimento, umidade, energia, proteina,' +
             ' lipideos, colesterol, carboidrato, fibra, cinzas, calcio, magnesio, manganes, fosforo, ferro, sodio, potassio, cobre,' +
             ' zinco, retinol, re, rae, tiamina, riboflavina, piridoxina, niacina, vitaminac)' +
             'VALUES (' + obj.id + ',' + obj.umidade + ',' + obj.energia + ',' + obj.proteina +
             ',' + obj.lipideos + ',' + obj.colesterol + ',' + obj.carboidrato + ',' + obj.fibra + ',' + obj.cinzas + ',' + obj.calcio + ',' + obj.magnesio + ',' + obj.manganes + ',' +
             obj.fosforo + ',' + obj.ferro + ',' + obj.sodio + ',' + obj.potassio + ',' + obj.cobre + ',' + obj.zinco + ',' + obj.retinol + ',' + obj.re + ',' + obj.rae + ',' + obj.tiamina + ',' +
             obj.riboflavina + ',' + obj.piridoxina + ',' + obj.niacina + ',' + obj.vitaminac + ')',
             callBackSucesso, callBackErro, "createAtributos");
             }
             
             function addItens() {
             var verif;
             readAlimentos().then(function (resultados) {
             console.log(resultados.length);
             if (resultados.length === 0) {
             for (var i = 0; i < alimento.length; i++) {
             createAlimentos(alimento[i]);
             }
             }
             });
             }
             
             function promessQuery(query, sucessCB, errorCB, func) {
             var deferido = $q.defer();
             db.transaction(function (tx) {
             tx.executeSql(query, [], sucessCB(deferido), errorCB(deferido, func));
             });
             return deferido.promise;
             }
             
             
             function callBackSucesso(deferido) {
             return function (tx, results) {
             var len = results.rows.length, i;
             var resultados = [];
             for (i = 0; i < results.rows.length; i++) {
             var alimento = {
             id: results.rows.item(i).alimentos_id,
             name: results.rows.item(i).alimentos_name
             }
             resultados.push(alimento);
             // console.log(results.rows.item(i));
             }
             deferido.resolve(resultados);
             };
             }
             
             function callBackErro(deferido, func) {
             return function () {
             alert('CallBack Error Alimentos!' + func);
             deferido.resolve([]);
             }
             }
             */


        });