document.getElementById("btn-analizar").addEventListener("click", function () {
    const expresion = document.getElementById("expresion").value;
    try {
        const arbol = parseExpresion(expresion);
        document.getElementById("resultadoSintactico").innerHTML = renderArbol(arbol);
    } catch (error) {
        document.getElementById("resultadoSintactico").innerHTML = "Error de sintaxis: " + error.message;
    }
});

function parseExpresion(expresion) {
    const tokens = expresion.match(/\w+|[+\-*/()]/g);
    let index = 0;

    function siguiente() {
        return tokens[index++];
    }

    function actual() {
        return tokens[index];
    }

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

    function parseProductoDivision() {
        let nodo = parseFactor();
        while (["*", "/"].includes(actual())) {
            const operador = siguiente();
            const derecho = parseFactor();
            nodo = { tipo: "Operación", operador, izquierdo: nodo, derecho };
        }
        return nodo;
    }

    function parseSumaResta() {
        let nodo = parseProductoDivision();
        while (["+", "-"].includes(actual())) {
            const operador = siguiente();
            const derecho = parseProductoDivision();
            nodo = { tipo: "Operación", operador, izquierdo: nodo, derecho };
        }
        return nodo;
    }

    return parseSumaResta();
}

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
