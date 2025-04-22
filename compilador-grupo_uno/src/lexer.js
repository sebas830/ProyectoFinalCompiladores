const palabrasReservadas = new Set(["int", "float", "if", "while", "return", "string", "void", "let", "const", "else"]);
const operadores = new Set(["+", "-", "*", "/", "=", ">", "<", "==", "!", "?", "&&", "||"]);
const delimitadores = new Set([";", "{", "}", "(", ")"]);

function analizarCodigo(codigo) {
    const patronTokens = /(".*?"|\b\d+\.\d+\b|\b\d+\b|\b[a-zA-Z_]\w*\b|==|&&|\|\||[+\-*/=<>!;{}()])/;
    let listaTokens = [];
    let tablaSimbolos = {};
    let numeroLinea = 1;
    let tipoActual = null;

    let posicion = 0;

    while (posicion < codigo.length) {
        const resto = codigo.slice(posicion);

        // Ignorar espacios y contar líneas
        if (/^\s/.test(resto)) {
            if (resto[0] === '\n') numeroLinea++;
            posicion++;
            continue;
        }

        const coincidencia = resto.match(patronTokens);

        if (coincidencia && coincidencia.index === 0) {
            const token = coincidencia[0];
            let tipoToken;

            if (palabrasReservadas.has(token)) {
                tipoToken = 'PALABRA_RESERVADA';
                if (["int", "float", "string"].includes(token)) {
                    tipoActual = token;
                } else if (token === "void") {
                    tipoActual = "void";
                }
            } else if (operadores.has(token)) {
                tipoToken = 'OPERADOR';
                tipoActual = null;
            } else if (delimitadores.has(token)) {
                tipoToken = 'DELIMITADOR';
                tipoActual = null;
            } else if (/^".*?"$/.test(token)) {
                tipoToken = 'CADENA';
            } else if (/^\d+\.\d+$/.test(token)) {
                tipoToken = 'NÚMERO_DECIMAL';
            } else if (/^\d+$/.test(token)) {
                tipoToken = 'NÚMERO_ENTERO';
            } else if (/^[a-zA-Z_]\w*$/.test(token)) {
                tipoToken = 'IDENTIFICADOR';
                if (!tablaSimbolos[token]) {
                    tablaSimbolos[token] = { Tipo: tipoActual || 'Desconocido', Token: 'Variable', Lineas: [] };
                }
                tablaSimbolos[token].Lineas.push(numeroLinea);
                if (tipoActual) {
                    tablaSimbolos[token].Tipo = tipoActual;
                    tipoActual = null;
                }
            }

            listaTokens.push({ token, tipoToken, numeroLinea });
            posicion += token.length;
        } else {
            // Token desconocido
            const token = resto[0];
            listaTokens.push({ token, tipoToken: 'DESCONOCIDO', numeroLinea });
            posicion++;
        }
    }

    return { listaTokens, tablaSimbolos };
}

function analizarLexico() {
    const codigo = document.getElementById("codigo").value;
    const { listaTokens, tablaSimbolos } = analizarCodigo(codigo);

    // Tabla de Tokens
    const tablaTokensBody = document.getElementById("tablaTokens").querySelector("tbody");
    tablaTokensBody.innerHTML = "";
    listaTokens.forEach(t => {
        const fila = `<tr><td>${t.token}</td><td>${t.tipoToken}</td><td>${t.numeroLinea}</td></tr>`;
        tablaTokensBody.innerHTML += fila;
    });

    // Tabla de Símbolos
    const tablaSimbolosBody = document.getElementById("tablaSimbolos").querySelector("tbody");
    tablaSimbolosBody.innerHTML = "";
    Object.entries(tablaSimbolos).forEach(([nombre, info]) => {
        const fila = `<tr><td>${nombre}</td><td>${info.Tipo}</td><td>${info.Token}</td><td>${info.Lineas.join(", ")}</td></tr>`;
        tablaSimbolosBody.innerHTML += fila;
    });
}
