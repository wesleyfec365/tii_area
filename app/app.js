const http = require('http');
const { parse } = require('querystring');

const PORT = 3000;
const server = http.createServer(function (req, res) {
    let [url, queryString] = req.url.split('?');

    if (url == '/index') {
        index(req, res);
    } else if (url == '/calcular-area') {
        calcularArea(req, res);
    } else if (url == '/autor') {
        autor(req, res);
    } else {
        naoEncontrado(req, res);
    }
});

function index(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Projeto: Cálculo da Área de uma Área em forma de Hexatriacontágono</h1>');
    res.write('<p><strong>Descrição do projeto:</strong></p>');
    res.write('<p>Determine a área de uma área em forma de hexatriacontágono. Se a área estiver dentro do intervalo de 180 a 220 metros quadrados, é uma área média. Caso contrário, é uma área que não segue o padrão.</p>');
    res.write('<form action="calcular-area" method="post">');
    res.write('<label>');
    res.write('<span>Lado do Hexatriacontágono</span>');
    res.write('<input name="lado">');
    res.write('</label>');
    res.write('<button>Calcular</button>');
    res.write('</form>');
    res.write('<footer>Desenvolvido por Wesley Feitosa</footer>');
    res.write(`</body>
    </html>`);
    res.end();
}

function calcularArea(req, res) {
    let metodo = req.method;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);

    if (metodo === 'POST') {
        let corpoTexto = '';
        req.on('data', function (pedaco) {
            corpoTexto += pedaco;
        });

        req.on('end', () => {
            const dadosDoFormulario = parse(corpoTexto);
            let lado = parseFloat(dadosDoFormulario.lado);
            let area = 34 * Math.pow(lado, 2) * 1 / Math.tan(Math.PI / 34);

            res.write('<h1>Explicação do cálculo</h1>');
            res.write('<p>A área de um hexatriacontágono regular pode ser calculada usando a fórmula:</p>');
            res.write('<p><strong>Área = (34 * lado^2) / (4 * tan(π/34))</strong></p>');
            res.write('<p>- <strong>lado</strong>: Comprimento do lado do hexatriacontágono.</p>');
            res.write('<p>- <strong>π</strong>: Número Pi (aproximadamente 3.14159).</p>');
            res.write('<p>- <strong>tan(π/34)</strong>: Tangente do ângulo π/34, que é metade do ângulo central de um hexatriacontágono regular.</p>');
            res.write('<p>A fórmula calcula a área multiplicando o quadrado do comprimento do lado por 34 e dividindo pelo valor da tangente do ângulo π/34. O resultado é a área do hexatriacontágono.</p>');
            res.write('<h1>Resposta:</h1>');
            res.write(`<p>Lado do hexatriacontágono inserido: ${lado}</p>`);
            res.write(`<p>Área da área: ${area.toFixed(2)} metros quadrados</p>`);
            if (area >= 180 && area <= 220) {
                res.write('<p>É uma área média.</p>');
            } else {
                res.write('<p>É uma área que não segue o padrão.</p>');
            }
            res.write('<footer>Desenvolvido por Wesley Feitosa</footer>');
            res.write(`</body>
            </html>`);
            res.end();
        });
    } else {
        res.write('<h1>Método não permitido</h1>');
        res.write('<footer>Desenvolvido por Wesley Feitosa</footer>');
        res.write(`</body>
        </html>`);
        res.end();
    }
}

function autor(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Autor</h1>');
    res.write('<p>Nome: Wesley de Sousa Feitosa</p>');
    res.write('<h2>Formações Acadêmicas</h2>');
    res.write('<ul>');
    res.write('<li>Curso: Tecnico em Redes de Computadores</li>');
    res.write('<li>Instituição: E.E.E.P Icaro de Sousa Moreira</li>');
    res.write('<li>Ano: 2014</li>');
    res.write('</ul>');
    res.write('<h2>Experiências Profissionais</h2>');
    res.write('<ul>');
    res.write('<li>Função: CB</li>');
    res.write('<li>Empresa: Exercito Brasileiro</li>');
    res.write('<li>Ano início: 2018</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('<footer>Desenvolvido por Wesley Feitosa</footer>');
    res.write('</html>');
    res.end();
}

function naoEncontrado(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Não encontrado!</h1>');
    res.write('</body>');
    res.write('<footer>Desenvolvido por Wesley Feitosa</footer>');
    res.write('</html>');
    res.end();
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});