document.getElementById("btn-analizar").addEventListener("click", function () { // Asocia al btn-analizar del html
    const expresion = document.getElementById("expresion").value; // Toma la exprecion digitada por el ususario
    try {
        const arbol = parseExpresion(expresion);// Llama a la funcion para analizar la expresion
        document.getElementById("resultadoSintactico").innerHTML = renderArbol(arbol);// Muestra el arbol
    } catch (error) {
        document.getElementById("resultadoSintactico").innerHTML = "Error de sintaxis: " + error.message; // En caso de algun error
    }
});

//analiza la expresion aritmetica
function parseExpresion(expresion) {
    const tokens = expresion.match(/\w+|[+\-*/()]/g);// Separa los tokens
    let index = 0;

    function siguiente() {
        return tokens[index++];// Avanza y retorna el siguiente token
    }

    function actual() {
        return tokens[index];// Retorna el token actual
    }

    // Analiza los factores-> identificadores o expresiones entre parentsis
    function parseFactor() {
        const token = siguiente();
        if (token === "(") {
            const expr = parseSumaResta();
            if (siguiente() !== ")") throw new Error("Se esperaba ')'");
            return { tipo: "Grupo", valor: expr };
        } else if (/\w+/.test(token)) {
            return { tipo: "Identificador", valor: token };
        } else {
            throw new Error("Factor inesperado: " + token);
        }
    }

    // multiplicaciones y divisiones
    function parseProductoDivision() {
        let nodo = parseFactor();
        while (["*", "/"].includes(actual())) {
            const operador = siguiente();
            const derecho = parseFactor();
            nodo = { tipo: "Operación", operador, izquierdo: nodo, derecho };
        }
        return nodo;
    }

    // sumas y restas
    function parseSumaResta() {
        let nodo = parseProductoDivision();
        while (["+", "-"].includes(actual())) {
            const operador = siguiente();
            const derecho = parseProductoDivision();
            nodo = { tipo: "Operación", operador, izquierdo: nodo, derecho };
        }
        return nodo;
    }

    return parseSumaResta();// Inicia el analisis desde la suma/resta
}

// pasa la informacion a html para visualizarse
function renderArbol(nodo) {
    if (!nodo) return "";
    if (nodo.tipo === "Identificador") return `<div class="node"><span class="label">Identificador:</span> ${nodo.valor}</div>`;
    if (nodo.tipo === "Grupo") return `<div class="node"><span class="label">Grupo</span>${renderArbol(nodo.valor)}</div>`;
    if (nodo.tipo === "Operación") {
        return `<div class="node"><span class="label">Operación:</span> ${nodo.operador}
            <div class="node"><span class="label">Izquierdo:</span> ${renderArbol(nodo.izquierdo)}</div>
            <div class="node"><span class="label">Derecho:</span> ${renderArbol(nodo.derecho)}</div>
        </div>`;
    }
    return "";
}
