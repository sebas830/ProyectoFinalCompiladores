document.getElementById("btnAnalizar").addEventListener("click", analizar);

function analizar() {
    const input = document.getElementById("codeInput").value;
    const lineas = input.split("\n");
    const declaradas = new Set();
    const errores = [];

    lineas.forEach((linea, index) => {
        const trimmed = linea.trim();
        const numLinea = index + 1;

        // Declaración con let, const o var
        const declaracion = trimmed.match(/^(let|const|var)\s+(\w+)\s*(=.*)?;?$/);
        if (declaracion) {
            const nombre = declaracion[2];
            if (declaradas.has(nombre)) {
                errores.push(`Línea ${numLinea}: Variable '${nombre}' ya fue declarada.`);
            } else {
                declaradas.add(nombre);
            }
            return;
        }

        // Asignación (ej. x = 10;)
        const asignacion = trimmed.match(/^(\w+)\s*=\s*.+;?$/);
        if (asignacion) {
            const nombre = asignacion[1];
            if (!declaradas.has(nombre)) {
                errores.push(`Línea ${numLinea}: Variable '${nombre}' usada sin declarar.`);
            }
        }
    });

    const resultado = errores.length > 0
        ? "Análisis semántico NO exitoso."
        : "Análisis semántico exitoso.";

    document.getElementById("resultadoSemantico").innerText = resultado;
}
