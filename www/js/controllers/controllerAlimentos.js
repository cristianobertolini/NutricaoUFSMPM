angular.module('starter.Alimentos', ['ionic'])
        .controller('controllerAlimentos', function ($scope, CRUDAlimentos) {

            $scope.showDetails = true;

            $scope.search = function () {
                var valor = document.getElementById('inputPesquisa').value;
                // console.log(valor);
                if (valor) {
                    $scope.alimentos = CRUDAlimentos.getAlimento(valor);
                } else {
                    $scope.alimentos = 0;
                }
            }
            $scope.details = function () {
                if ($scope.showDetails)
                    $scope.showDetails = false;
                else
                    $scope.showDetails = true;
            }

            $scope.add = function () {
                //recebe todos os valores do objeto alimento
                var name = document.getElementById('nomeAlimento').value;
                //nome é o unico item obrigatorio
                if (name) {
                    alimento = {
                        name: name,
                        umidade: document.getElementById('umidade').value,
                        energia: document.getElementById('energia').value,
                        proteina: document.getElementById('proteina').value,
                        lipideos: document.getElementById('lipideos').value,
                        colesterol: document.getElementById('colesterol').value,
                        carboidrato: document.getElementById('carboidrato').value,
                        fibra: document.getElementById('fibra').value,
                        cinzas: document.getElementById('cinzas').value,
                        calcio: document.getElementById('calcio').value,
                        magnesio: document.getElementById('magnesio').value,
                        manganes: document.getElementById('manganes').value,
                        fosforo: document.getElementById('fosforo').value,
                        ferro: document.getElementById('ferro').value,
                        sodio: document.getElementById('sodio').value,
                        potassio: document.getElementById('potassio').value,
                        cobre: document.getElementById('cobre').value,
                        zinco: document.getElementById('zinco').value,
                        retinol: document.getElementById('retinol').value,
                        re: document.getElementById('re').value,
                        rae: document.getElementById('rae').value,
                        tiamina: document.getElementById('tiamina').value,
                        riboflavina: document.getElementById('riboflavina').value,
                        piridoxina: document.getElementById('piridoxina').value,
                        niacina: document.getElementById('niacina').value,
                        vitaminac: document.getElementById('vitaminaC').value
                    }
                    //chama a função para adicionar o objeto alimento
                    CRUDAlimentos.adicionar(alimento);
                    document.location.href = "#/search"
                } else {
                    alert("O campo nome é obrigatório!");
                }

            }


        });