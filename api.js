window.onload = carregarEnderecoSalvo;  
async function jsApiCEP () {
    
    const CEP = document.getElementById('InputCEP').value;
    console.log(CEP);
    const url = `https://viacep.com.br/ws/${CEP}/json/`; 
    dado = null
    try {

    const resposta = await fetch(url);
    const dados = await resposta.json();
    console.log(dados); 
    dado = dados;
}
    catch (error) {
        console.error('Erro:', error);
    }
    
    console.log(dado)
    construirLista();
    
}
function construirLista(){
    const divContainer = document.getElementById('returnEND');
    const dadosEnd = document.createElement('div');
    dadosEnd.classList.add('returnEND');
    const SalvarEnd = document.createEleme
    dadosEnd.innerHTML = `
        <p><strong>CEP:</strong> ${dado.cep}</p>
        <p><strong>Logradouro:</strong> ${dado.logradouro}</p>
        <p><strong>Complemento:</strong> ${dado.complemento ? dado.complemento : 'N/A'}</p>
        <p><strong>Bairro:</strong> ${dado.bairro}</p>
        <p><strong>Localidade:</strong> ${dado.localidade}</p>
        <button onclick="salvarEndereco('${dado.cep}', '${dado.logradouro}', '${dado.complemento}', '${dado.bairro}', '${dado.localidade}')">Salvar Endereço</button>
    `
    divContainer.appendChild(dadosEnd);
}

function salvarEndereco(cep, logradouro, complemento, bairro, localidade) {
    const endereco = {
        Cep: cep,
        Logradouro: logradouro,
        Complemento: complemento,
        Bairro: bairro,
        Localidade: localidade
    };

    localStorage.setItem('ultimoEnd', JSON.stringify(endereco));
    alert('Último endereço salvo!');
}

// Função para carregar e exibir o endereço salvo
function carregarEnderecoSalvo() {
    const enderecoSalvo = localStorage.getItem('ultimoEnd');
    if (enderecoSalvo) {
        const endereco = JSON.parse(enderecoSalvo);
        const divContainer = document.getElementById('returnEND');
        const dadosEnd = document.createElement('div');
        dadosEnd.classList.add('returnEND');
        dadosEnd.innerHTML = `
            <p><strong>CEP:</strong> ${endereco.Cep}</p>
            <p><strong>Logradouro:</strong> ${endereco.Logradouro}</p>
            <p><strong>Complemento:</strong> ${endereco.Complemento ? endereco.Complemento : 'N/A'}</p>
            <p><strong>Bairro:</strong> ${endereco.Bairro}</p>
            <p><strong>Localidade:</strong> ${endereco.Localidade}</p>
        `;
        divContainer.appendChild(dadosEnd);
    }
}

function togglePlaceholderAndFunction() {
    const inputCEP = document.getElementById('InputCEP');
    const checkbox = document.querySelector('.switch input[type="checkbox"]');
    const button = document.querySelector('button');

    if (checkbox.checked) {
        inputCEP.placeholder = "Insira seu Logradouro";
        button.setAttribute('onclick', 'jsApiLog()');
    } else {
        inputCEP.placeholder = "Insira seu CEP";
        button.setAttribute('onclick', 'jsApiCEP()');
    }
}

document.querySelector('.switch input[type="checkbox"]').addEventListener('change', togglePlaceholderAndFunction);


async function jsApiLog () {
    // fazer dps, segundo a api vou precisar fazer um dropdown de uf -> cidade -> rua pra filtrar ex: viacep.com.br/ws/RS/Porto Alegre/Domingos/json/
// viacep.com.br/ws/RS/Porto Alegre/Domingos Jose/json/
// viacep.com.br/ws/RS/Porto Alegre/Domingos+Jose/json/
}