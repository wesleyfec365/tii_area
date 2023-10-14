const http = require('http');
const { parse } = require('querystring');

const PORT = 3000;
const server = http.createServer(function (req, res) {
    let [url, queryString] = req.url.split('?');

    if (url == '/index') {
        index(req, res);
    } else if (url == '/nome-seu-problema') {
        calcularProblema(req, res);
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
    res.write('<h1>Problema: Cálculo da Área de um Letreiro Publicitário em forma de pentágono.</h1>');
    res.write('<p><strong>Descrição do problema:</strong></p>');
    res.write('<p>Calcule a área de um letreiro publicitário em forma de pentágono. Se a área for maior que 20 metros quadrados, é um letreiro grande. Se for menor que 20 metros quadrados, é um letreiro pequeno.</p>');
    res.write('<form action="nome-seu-problema" method="post">');
    res.write('<label>');
    res.write('<span>Nome</span>');
    res.write('<input name="nome">');
    res.write('</label>');
    res.write('<label>');
    res.write('<span>Lado do Pentágono</span>');
    res.write('<input name="lado">');
    res.write('</label>');
    res.write('<button>Calcular</button>');
    res.write('</form>');
    res.write('<footer>Desenvolvido por Garrido</footer>');
    res.write(`</body>
    </html>`);
    res.end();
}

function calcularProblema(req, res) {
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
            let nome = dadosDoFormulario.nome;
            let lado = parseFloat(dadosDoFormulario.lado);
            let area = (5 / 4) * Math.pow(lado, 2) * (1 / Math.tan(Math.PI / 5));

            res.write('<h1>Explicação da conta</h1>');
            res.write('<p>A área de um pentágono regular pode ser calculada usando a fórmula:</p>');
            res.write('<p><strong>Área = (5/4) * lado^2 * (1 / tan(π/5))</strong></p>');
            res.write('<p>- <strong>lado</strong>: Comprimento de um lado do pentágono.</p>');
            res.write('<p>- <strong>π</strong>: Número Pi (aproximadamente 3.14159).</p>');
            res.write('<p>- <strong>tan(π/5)</strong>: Tangente do ângulo π/5 (36 graus), metade do ângulo central de um pentágono regular.</p>');
            res.write('<p>- <strong>(5/4)</strong>: Constante de conversão.</p>');
            res.write('<p>A fórmula calcula a área multiplicando o comprimento do lado pelo seu quadrado e pela tangente do ângulo π/5. O resultado é a área do pentágono.</p>');
            res.write('<h1>Resposta:</h1>');
            res.write(`<p>Nome inserido: ${nome}</p>`);
            res.write(`<p>Lado do pentágono inserido: ${lado}</p>`);
            res.write(`<p>Área do letreiro: ${area.toFixed(2)} metros quadrados</p>`);
            if (area > 20) {
                res.write('<p>É um letreiro grande.</p>');
            } else {
                res.write('<p>É um letreiro pequeno.</p>');
            }
            res.write('<footer>Desenvolvido por Garrido</footer>');
            res.write(`</body>
            </html>`);
            res.end();
        });
    } else {
        res.write('<h1>Método não permitido</h1>');
        res.write('<footer>Desenvolvido por Garrido</footer>');
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
    res.write('<p>Nome: Francisco Lourival Garrido Neto</p>');
    res.write('<h2>Formações Acadêmicas</h2>');
    res.write('<ul>');
    res.write('<li>Técnico em Informática para Internet</li>');
    res.write('<li>Instituição: Instituto Federal do Ceará (IFCE)</li>');
    res.write('<li>Ano: 2023</li>');
    res.write('</ul>');
    res.write('<h2>Experiências Profissionais</h2>');
    res.write('<ul>');
    res.write('<li>Função: CB CET</li>');
    res.write('<li>Empresa: Exército Brasileiro</li>');
    res.write('<li>Ano início: 2017</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('<footer>Desenvolvido por Garrido</footer>');
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
    res.write('<footer>Desenvolvido por Garrido</footer>');
    res.write('</html>');
    res.end();
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
