const palabrasReservadas = new Set(["int", "float", "if", "while", "return", "string", "void", "let", "const", "else"]);
const operadores = new Set(["+", "-", "*", "/", "=", ">", "<", "==", "!", "?", "&&", "||"]);
const delimitadores = new Set([";", "{", "}", "(", ")"]);

// Funcion principal que analiza el codigo fuente y genera los tokens y la tabla de simbolos
function analizarCodigo(codigo) {
    const patronTokens = /(".*?"|\b\d+\.\d+\b|\b\d+\b|\b[a-zA-Z_]\w*\b|==|&&|\|\||[+\-*/=<>!;{}()])/;     // Expresion regular para detectar distintos tipos de tokens

    let listaTokens = [];
    let tablaSimbolos = {};
    let numeroLinea = 1;
    let tipoActual = null;
    let posicion = 0;

    while (posicion < codigo.length) {
        const resto = codigo.slice(posicion);

        // Ignora los espacios en blanco y cuenta las lineas
        if (/^\s/.test(resto)) {
            if (resto[0] === '\n') numeroLinea++; // Si es un salto de linea, aumenta el contador
            posicion++;
            continue;
        }

        const coincidencia = resto.match(patronTokens);

        if (coincidencia && coincidencia.index === 0) {
            const token = coincidencia[0]; // Token encontrado
            let tipoToken; // Tipo del token

            // Clasificacion del token
            if (palabrasReservadas.has(token)) {
                tipoToken = 'PALABRA_RESERVADA';
                if (["int", "float", "string"].includes(token)) {
                    tipoActual = token;
                } else if (token === "void") {
                    tipoActual = "void";
                }
            } else if (operadores.has(token)) {
                tipoToken = 'OPERADOR';
                tipoActual = null; // Se borra el tipo actual
            } else if (delimitadores.has(token)) {
                tipoToken = 'DELIMITADOR';
                tipoActual = null;
            } else if (/^".*?"$/.test(token)) {
                tipoToken = 'CADENA';
            } else if (/^\d+\.\d+$/.test(token)) {
                tipoToken = 'NUMERO_DECIMAL';
            } else if (/^\d+$/.test(token)) {
                tipoToken = 'NUMERO_ENTERO';
            } else if (/^[a-zA-Z_]\w*$/.test(token)) {
                tipoToken = 'IDENTIFICADOR';
                // Si es una variable nueva, se agrega a la tabla de simbolos
                if (!tablaSimbolos[token]) {
                    tablaSimbolos[token] = { Tipo: tipoActual || 'Desconocido', Token: 'Variable', Lineas: [] };
                }
                // Se registra la linea donde aparece
                tablaSimbolos[token].Lineas.push(numeroLinea);
                // Si hay un tipo declarado, se asigna
                if (tipoActual) {
                    tablaSimbolos[token].Tipo = tipoActual;
                    tipoActual = null;
                }
            }

            listaTokens.push({ token, tipoToken, numeroLinea });
            // Se avanza la posicion segun la longitud del token
            posicion += token.length;
        } else {
            // Si no se reconoce el token, se marca como desconocido
            const token = resto[0];
            listaTokens.push({ token, tipoToken: 'DESCONOCIDO', numeroLinea });
            posicion++;
        }
    }

    // Se retorna el resultado del analisis
    return { listaTokens, tablaSimbolos };
}

// Funcion que conecta el analisis lexico con la interfaz HTML
function analizarLexico() {
    // Obtiene el codigo fuente desde un textarea con id "codigo"
    const codigo = document.getElementById("codigo").value;
    const { listaTokens, tablaSimbolos } = analizarCodigo(codigo);

    // Mostrar los tokens en la tabla HTML
    const tablaTokensBody = document.getElementById("tablaTokens").querySelector("tbody");
    tablaTokensBody.innerHTML = ""; // Limpia el contenido anterior
    listaTokens.forEach(t => {
        const fila = `<tr><td>${t.token}</td><td>${t.tipoToken}</td><td>${t.numeroLinea}</td></tr>`;
        tablaTokensBody.innerHTML += fila;
    });

    // Mostrar la tabla de simbolos en la interfaz
    const tablaSimbolosBody = document.getElementById("tablaSimbolos").querySelector("tbody");
    tablaSimbolosBody.innerHTML = ""; // Limpia el contenido anterior
    Object.entries(tablaSimbolos).forEach(([nombre, info]) => {
        const fila = `<tr><td>${nombre}</td><td>${info.Tipo}</td><td>${info.Token}</td><td>${info.Lineas.join(", ")}</td></tr>`;
        tablaSimbolosBody.innerHTML += fila;
    });
}