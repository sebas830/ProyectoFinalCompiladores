const palabrasReservadas = new Set(["int", "float", "if", "while", "return", "string", "void", "let", "const", "else"]);
const operadores = new Set(["+", "-", "*", "/", "=", ">", "<", "==","!","?","&&","||"]);
const delimitadores = new Set([";", "{", "}", "(", ")"]);

//Analiza el codigo y define sus tokens tipo de tokens
function analizarCodigo(codigo) {
    const patronTokens = /(".*?"|\b\d+\.\d+\b|\b\d+\b|\b[a-zA-Z_]\w*\b|[+\-*/=<>!]=?|[;{}()])/g; // Expresion regular
    let coincidencias = [...codigo.matchAll(patronTokens)]; //Extracion de tokens
    let listaTokens = []; // Lista los tokens
    let tablaSimbolos = {};
    let numeroLinea = 1;
    let tipoActual = null;
    let posicionActual = 0;

    // Coinsidencia de tokens detectados
    for (let coincidencia of coincidencias) {
        let token = coincidencia[0];
        let tipoToken;

        // Validar saltos de linea
        let antesDelToken = codigo.substring(posicionActual, coincidencia.index);
        numeroLinea += (antesDelToken.match(/\n/g) || []).length;
        posicionActual = coincidencia.index + token.length;

        //Definir los tokens
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
        } else if (/".*?"/.test(token)) {
            tipoToken = 'CADENA';
        } else if (/\d+\.\d+/.test(token)) {
            tipoToken = 'NÚMERO_DECIMAL';
        } else if (/\d+/.test(token)) {
            tipoToken = 'NÚMERO_ENTERO';
        } else {
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

        listaTokens.push({ token, tipoToken, numeroLinea });// Rgregar token analizado a la lista de tokens
    }

    return { listaTokens, tablaSimbolos }; // Retornamos las tablas
}

//Esta funcion se ejecuta cuando el usuario haga click en analisis lexico
function analizarLexico() {
    const codigo = document.getElementById("codigo").value; //Obtenemos la informacion ingresada por el usuario
    const { listaTokens, tablaSimbolos } = analizarCodigo(codigo);// Usamos la funcion analizar codigo

    // Limpia la tabla de tokens
    const tablaTokensBody = document.getElementById("tablaTokens").querySelector("tbody");
    tablaTokensBody.innerHTML = "";
    listaTokens.forEach(t => {
        //Mostrar tabla de tokens en el html
        const fila = `<tr><td>${t.token}</td><td>${t.tipoToken}</td><td>${t.numeroLinea}</td></tr>`;
        tablaTokensBody.innerHTML += fila;
    });

    // Limpia la tablaSimbolos
    const tablaSimbolosBody = document.getElementById("tablaSimbolos").querySelector("tbody");
    tablaSimbolosBody.innerHTML = "";
    // Recorre la tabla de simbolos y muestra los identificadores
    Object.entries(tablaSimbolos).forEach(([nombre, info]) => {
        const fila = `<tr><td>${nombre}</td><td>${info.Tipo}</td><td>${info.Token}</td><td>${info.Lineas.join(", ")}</td></tr>`;
        tablaSimbolosBody.innerHTML += fila;
    });
}