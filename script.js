async function buscaCEPPorRua() {
    // Obtém o valor da rua digitada
    const ruaDigitada = document.getElementById('rua').value.trim().toLowerCase();

    if (ruaDigitada === "") {
        return;
    }

    // Busca o arquivo CSV
    const response = await fetch('dados.csv'); // Substitua pelo caminho do seu arquivo CSV
    if (!response.ok) {
        alert("Erro ao carregar o arquivo CSV.");
        return;
    }

    const data = await response.text();

    // Processa o CSV
    const linhas = data.split('\n');
    const resultados = [];
    const rua = [];
    const bairro = [];
    const cidade = [];
    const uf = [];

    for (let i = 1; i < linhas.length; i++) { // Ignorando cabeçalho
        const colunas = linhas[i].split(',');

        if (colunas[0] && colunas[0].toLowerCase().includes(ruaDigitada)) {
            resultados.push(colunas[1]); // Considerando que o CEP está na segunda coluna
            rua.push(colunas[0]);
            bairro.push(colunas[2]); 
            cidade.push(colunas[3]); 
            uf.push(colunas[4]); 
        }
    }

    // Atualiza os elementos de texto na página
    if (resultados.length > 0) {
        document.getElementById('cepResultado').innerText = resultados.join(', ');
        document.getElementById('ruaResultado').innerText = rua.join(', ');
        document.getElementById('bairroResultado').innerText = bairro.join(', ');
        document.getElementById('cidadeResultado').innerText = cidade.join(', ');
        document.getElementById('ufResultado').innerText = uf.join(', ');
    } else {
        alert("Nenhum CEP encontrado para a rua '" + ruaDigitada + "'.");
    }
}

async function buscaRuaPorCep() {
    // Obtém o valor do CEP digitado
    const cepDigitado = document.getElementById('cep').value.trim().toLowerCase();

    if (cepDigitado === "") {
        return;
    }

    // Busca o arquivo CSV
    const response = await fetch('dados.csv'); // Substitua pelo caminho do seu arquivo CSV
    if (!response.ok) {
        alert("Erro ao carregar o arquivo CSV.");
        return;
    }

    const data = await response.text();

    // Processa o CSV
    const linhas = data.split('\n');
    const resultados = [];
    const bairro = [];
    const cidade = [];
    const uf = [];
    const cep = [];

    for (let i = 1; i < linhas.length; i++) { // Ignorando cabeçalho
        const colunas = linhas[i].split(',');

        if (colunas[1] && colunas[1].toLowerCase().includes(cepDigitado)) {
            resultados.push(colunas[0]); // Considerando que a rua está na primeira coluna
            bairro.push(colunas[2]); 
            cidade.push(colunas[3]); 
            uf.push(colunas[4]); 
            cep.push(colunas[1]);
        }
    }

    // Atualiza os elementos de texto na página
    if (resultados.length > 0) {
        document.getElementById('cepResultado').innerText = cep.join(', ');
        document.getElementById('ruaResultado').innerText = resultados.join(', ');
        document.getElementById('bairroResultado').innerText = bairro.join(', ');
        document.getElementById('cidadeResultado').innerText = cidade.join(', ');
        document.getElementById('ufResultado').innerText = uf.join(', ');
    } else {
        alert("Nenhuma rua encontrada para o CEP '" + cepDigitado + "'.");
    }
}