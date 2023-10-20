const http = require('http');
const { parse } = require('querystring');

const PORT = 3000;
const server = http.createServer(function (req, res) {
    let [url, queryString] = req.url.split('?');

    if (url == '/index') {
        index(req, res);
    } else if (url == '/calcular-estande') {
        calcularEstande(req, res);
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
    res.write('<h1>Problema: Cálculo da Área de um Estande em forma de Heptadecágono</h1>');
    res.write('<p><strong>Descrição do problema:</strong></p>');
    res.write('<p>Calcule a área de um estande em forma de heptadecágono. Se a área estiver dentro do intervalo de 60 a 80 metros quadrados, é um estande médio. Caso contrário, é um estande que não segue o padrão.</p>');
    res.write('<form action="calcular-estande" method="post">');
    res.write('<label>');
    res.write('<span>Lado do Heptadecágono</span>');
    res.write('<input name="lado">');
    res.write('</label>');
    res.write('<button>Calcular</button>');
    res.write('</form>');
    res.write('<footer>Desenvolvido por Lucas Diniz</footer>');
    res.write(`</body>
    </html>`);
    res.end();
}

function calcularEstande(req, res) {
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
            let area = 17 / 4 * Math.pow(lado, 2) * 1 / Math.tan(Math.PI / 17);

            res.write('<h1>Explicação da conta</h1>');
            res.write('<p>A área de um heptadecágono regular pode ser calculada usando a fórmula:</p>');
            res.write('<p><strong>Área = (17/4) * lado^2 * (1 / tan(π/17))</strong></p>');
            res.write('<p>- <strong>lado</strong>: Comprimento de um lado do heptadecágono.</p>');
            res.write('<p>- <strong>π</strong>: Número Pi (aproximadamente 3.14159).</p>');
            res.write('<p>- <strong>tan(π/17)</strong>: Tangente do ângulo π/17, que é metade do ângulo central de um heptadecágono regular.</p>');
            res.write('<p>- <strong>(17/4)</strong>: Constante de conversão.</p>');
            res.write('<p>A fórmula calcula a área multiplicando o comprimento do lado pelo seu quadrado e pela tangente do ângulo π/17. O resultado é a área do heptadecágono.</p>');
            res.write('<h1>Resposta:</h1>');
            res.write(`<p>Lado do heptadecágono inserido: ${lado}</p>`);
            res.write(`<p>Área do estande: ${area.toFixed(2)} metros quadrados</p>`);
            if (area >= 60 && area <= 80) {
                res.write('<p>É um estande médio.</p>');
            } else {
                res.write('<p>É um estande que não segue o padrão.</p>');
            }
            res.write('<footer>Desenvolvido por Lucas Diniz</footer>');
            res.write(`</body>
            </html>`);
            res.end();
        });
    } else {
        res.write('<h1>Método não permitido</h1>');
        res.write('<footer>Desenvolvido por Lucas Diniz</footer>');
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
    res.write('<p>Nome: Lucas de França Diniz</p>');
    res.write('<h2>Formações Acadêmicas</h2>');
    res.write('<ul>');
    res.write('<li>Análise e desenvolvimento de sistemas</li>');
    res.write('<li>Instituição: Universidade Estácio De Sá</li>');
    res.write('<li>Técnico em Informática para Internet</li>');
    res.write('<li>Instituição: Instituto Federal do Ceará (IFCE)</li>');
    res.write('<li>Ano: 2023</li>');
    res.write('</ul>');
    res.write('<h2>Experiências Profissionais</h2>');
    res.write('<ul>');
    res.write('<li>Função: 3º Sgt</li>');
    res.write('<li>Empresa: Exército Brasileiro</li>');
    res.write('<li>Ano início: 2016</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('<footer>Desenvolvido por Lucas Diniz</footer>');
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
    res.write('<footer>Desenvolvido por Lucas Diniz</footer>');
    res.write('</html>');
    res.end();
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
