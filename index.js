let arrX = [];
let arrY = [];

function loadXMLDoc() {
    //XMLHttpRequest serve para interagir com servidores;
    var xmlDoc = new XMLHttpRequest();

    xmlDoc.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            leituraArquivo(this);
        }
    }

    xmlDoc.open("GET", "dados/carros.xml");
    xmlDoc.send();
}

loadXMLDoc();

function leituraArquivo(xml) {
    var i;
    var xmlArquivo = xml.responseXML;
    var table =
        `<tr>
             <th>marca</th>
             <th>modelo</th>
             <th>ano</th>
             <th>cor</th>
             <th>placa</th>
             <th>quantidade</th>
        </tr>`;

    var arquivo = xmlArquivo.getElementsByTagName("veiculo");

    for (i = 0; i < arquivo.length; i++) {
        //A propriedade nodeValue retorna o valor de um nó 
        //para retornar o texto de um elemento é necessario retornar o valor do 
        //nó (element.childNodes[0].nodeValue)
        table +=
            `<tr>
                <td>${arquivo[i].getElementsByTagName("marca")[0].childNodes[0].nodeValue}</td>
                <td>${arquivo[i].getElementsByTagName("modelo")[0].childNodes[0].nodeValue}</td>
                <td>${arquivo[i].getElementsByTagName("ano")[0].childNodes[0].nodeValue}</td>
                <td>${arquivo[i].getElementsByTagName("cor")[0].childNodes[0].nodeValue}</td>
                <td>${arquivo[i].getElementsByTagName("placa")[0].childNodes[0].nodeValue}</td>
                <td>${arquivo[i].getElementsByTagName("quantidade")[0].childNodes[0].nodeValue}</td>
            </tr>`
    }

    document.getElementById("tbl1").innerHTML = table;
}

//LEITURA DE XML UTILIZANDO JQUERY

var table =
    `<tr>
             <th>marca</th>
             <th>modelo</th>
             <th>ano</th>
             <th>cor</th>
             <th>placa</th>
             <th>quantidade</th>
        </tr>`;

let url = "dados/carros.xml";

$.ajax(url)
    .done(function (carros) {
        $(carros).find('veiculo').each(function () {
            table +=
                `<tr> 
                <td>${$(this).find('marca').text()}</td>
                <td>${$(this).find('modelo').text()}</td>
                <td>${$(this).find('ano').text()}</td>
                <td>${$(this).find('cor').text()}</td>
                <td>${$(this).find('placa').text()}</td>
                <td>${$(this).find('quantidade').text()}</td>
            </tr>`
            arrX.push($(this).find('modelo').text());
            arrY.push($(this).find('quantidade').text());

        })
        novoGrafico(arrX, arrY);
        document.getElementById("tbl2").innerHTML = table;
    })
    .fail(function () {
        alert("Ocorreu um erro de leitura do arquivo XML");
    })

//GRAFICO ESTATICO
var xValues = ["Italia", "França", "Espanha", "Estados Unidos", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
]

new Chart("myChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: "Produção de vinho - 2018"
        }
    }
});


//GRAFICO COM BASE NO XML
function novoGrafico(xVal, yVal) {
    var xValuesC = xVal;
    var yValuesC = yVal;
    console.log(xValuesC);
    console.log(yValuesC);
    var colorsC = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145"
    ]

    new Chart("myChart1", {
        type: "pie",
        data: {
            labels: xValuesC,
            datasets: [{
                backgroundColor: colorsC,
                data: yValuesC
            }]
        },
        options: {
            title: {
                display: true,
                text: "Carros - 2018"
            }
        }
    });
}

//RECEITA
var table3 =
    `<tr>
             <th>cpf</th>
             <th>rg</th>
             <th>nome</th>
             <th>data_nasc</th>
             <th>endereco</th>
             <th>contatos</th>
             <th>email</th>
        </tr>`;

let url1 = "dados/receita.xml";

$.ajax(url1)
    .done(function (receita) {
        $(receita).find('contribuinte').each(function () {
            table3 +=
                `<tr> 
                <td>${$(this).find('cpf').text()}</td>
                <td>${$(this).find('rg').text()}</td>
                <td>${$(this).find('nome').text()}</td>
                <td>${$(this).find('data_nasc').text()}</td>

                <td>${$(this).find('endereco').text()}</td>
                
                <td>${$(this).find('telefone').text()}<br>
                ${$(this).find('celular').text()}</td>

                <td>${$(this).find('email').text()}</td>
            </tr>`
        })
        document.getElementById("tbl3").innerHTML = table3;
    })
    .fail(function () {
        alert("Ocorreu um erro de leitura do arquivo XML");
    })

    //<td>${$(this).find('logradouro').text()}</td>
    //<td>${$(this).find('numero').text()}</td>
    //<td>${$(this).find('bairro').text()}</td>
    //<td>${$(this).find('cidade').text()}</td>
    //<td>${$(this).find('uf').text()}</td>
    //<td>${$(this).find('cep').text()}</td>
    //<td>${$(this).find('contato').text()}</td>