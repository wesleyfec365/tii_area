const http = require('http');

const PORT = 3000;
const server = http.createServer(function (req, res) {
    let [ url, queryString ] = req.url.split('?');

    if (url == '/index') {
        index(req, res);
    }
    else if (url == '/media') {
        media(req, res);
    }
    else {
        naoEncontrado(req, res);
    }
});

function index(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Index, ' + metodo + '!</h1>');
    res.write('<form action="media" method="post">');
    res.write('<label>');
    res.write('<span>Nome</span>');
    res.write('<input name="nome">');
    res.write('</label>');
    res.write('<label>');
    res.write('<span>Nota1</span>');
    res.write('<input name="nota1">');
    res.write('</label>');
    res.write('<label>');
    res.write('<span>Nota1</span>');
    res.write('<input name="nota2">');
    res.write('</label>');
    res.write('<button>Ok</button>');
    res.write('</form>');
    res.write(`</body>
    </html>`);
    res.end();
}

function media(req, res) {
    let metodo = req.method;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Média, ' + metodo + '!</h1>');

    let corpoTexto = '';
    let i = 0;
    req.on('data', function (pedaco) {
        corpoTexto += pedaco;
        console.log(i++, corpoTexto);
    });
    req.on('end', () => {
        let query = decoficarUrl(corpoTexto);
        
        console.log(query);
        let nome = query.nome;
        let nota1 = parseFloat(query.nota1);
        let nota2 = parseFloat(query['nota2']);
        let media = (nota1 + nota2) / 2;

        res.write(`<p>Olá, ${nome}. Você tirou ${nota1} e ${nota2}. Tem média ${media}.`);
        if (media > 6) {
            res.write('<p>Aprovado</p>');
        }
        else {
            res.write('<p>Reprovado</p>');
        }
        res.write(`</body>
        </html>`);
        
        res.end();
    });
}

function naoEncontrado(req, res) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>`);
    res.write('<h1>Não encontrado!</h1>');
    res.write(`</body>
    </html>`);
    res.end();
}

function decoficarUrl(url) {
    let propriedades = url.split('&');
    let query = {};
    for (let propriedade of propriedades) {
        let [ variavel, valor ] = propriedade.split('=');
        query[variavel] = valor;
    }
    return query;
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});