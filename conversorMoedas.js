

let botaoConverter= document.getElementById("botao-converter");
botaoConverter.addEventListener("click", converter);

let botaoLimpar= document.getElementById("botao-limpar");
botaoLimpar.addEventListener("click", limpar);


let botaoInverter = document.getElementById("botao-inverter");
botaoInverter.addEventListener("click", inverter);

let botaoAceitaMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitaMensagem.addEventListener("click", aceitaMensagem);

if(localStorage.getItem("aceitouCookie" == "1")){
    aceitaMensagem();

}

function buscaAPI(moedaOrigem="USD", moedaDestino="BRL"){
    let parametro= moedaOrigem + "-" + moedaDestino;
    let url =" https://economia.awesomeapi.com.br/json/last/" + parametro;

    console.log(url);

    return fetch(url).then(function(data){
        if(data.status == 200){
            console.log("retorno ok 200 API");
        }
       
        return data.json();
    }).then(function(response){
       
        return response[moedaOrigem + moedaDestino];
    }).catch();

}




let valorUsuario = document.getElementById("valor-usuario");
valorUsuario.addEventListener("keypress", function(event) {

    console.log(event);

    if(event.ctrlkey == true && event.code == "KeyI"){
        inverter();
    }

    if(event.ctrlkey == true && event.code == "KeyL"){
        limpar(); //verificar pq está dando erro
    }

    if(event.key == "Enter"){
        converter();
    }

});

function salvaResultadoHistorico(conversao) {

    let historico = recuperarHistoricodeConversoes();

    historico.push(conversao);

    let conversaoEmJson = JSON.stringify(historico);
    localStorage.setItem("historico", historico);
}

function recuperarHistoricodeConversoes(){
    let historico = localStorage.getItem("historico");

    if(!historico){
        
        return[];
    }
    let historicoConvertido = JSON.parse(historico);
    return historicoConvertido;
}



function aceitaMensagem(){
    let divMensagemUsuario = document.getElementById("container-mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");

    localStorage.setItem("aceitouCookie", "1")
}


function limpar(){
    let valorUsuario = document.getElementById("valor-usuario");
    let resultado = document.getElementById("resultado");

    valorUsuario.value = "";
    resultado.textContent = "";
}




function converter() {



    let valorUsuario = document.getElementById("valor-usuario").value;

    let moedaOrigem = document.getElementById("moeda1").value;
    let moedaDestino = document.getElementById("moeda2").value;
    



/*
    if (moedaOrigem =="real"){
        urlAPIParametroMoedaOrigem ="BRL";

    }

    if (moedaOrigem =="euro"){
        urlAPIParametroMoedaOrigem ="EUR";
        
    }

    if (moedaOrigem =="dolar"){
        urlAPIParametroMoedaOrigem ="USD";
        
    }
    */

    if(valorUsuario == ""){
        alert("Valor não pode ser vazio!")
        return;
    }

    if(valorUsuario < 0){
        alert("Valor não pode ser negativo");
        return;
    }

    if(moedaOrigem == moedaDestino){
        alert("As moedas são iguais, não é possível converter");
        return;
        
    }

    buscaAPI(moedaOrigem, moedaDestino).then(function(data){
        let conversao = valorUsuario * data["ask"];

        console.log(data);

        let simbolo = "";
        if (moedaDestino == "BRL"){
            simbolo = "R$"
        }
        if (moedaDestino == "USD"){
            simbolo = "US$"
        }
        if (moedaDestino == "EUR"){
            simbolo = "€";
        }
        if (moedaDestino == "GBP"){
            simbolo = "£";
        }


        let resultado = document.getElementById("resultado");
        resultado.textContent = simbolo + " " + conversao.toFixed(2);

        let resultadoDaConversao = {
            valor: valorUsuario,
            moeda1: moeda1,
            moeda2: moedaDestino,
            resultado: conversao
        }

        console.log(conversao);
    });
    return;




}
function inverter(){
    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = moeda2;
    document.getElementById("moeda2").value = moeda1;

    console.log(moeda1);
    console.log(moeda2);
}