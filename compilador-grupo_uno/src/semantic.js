document.getElementById("btnAnalizar").addEventListener("click", analizar); 

// Función que realiza el análisis semántico del código ingresado por el usuario.
function analizar() {
    const input = document.getElementById("codeInput").value;// Toma la exprecion digitada por el ususario

    //Opcion de configuracion JSHint, un analizador de calidad de codigo JavaScript.
    const opciones = {
        esversion: 6, 
        undef: true,  // reporta el erro si la variable esta 2 vece definida
        varstmt: true    
    };

    // Ejecuta el analisis
    JSHINT(input, opciones);
    const errores = JSHINT.errors;

    // limpiamos la variable que almacenara el resultado 
    let resultado = ""; 

    // verifica si hay error
    if (errores.length > 0) {
        resultado += "❌ Análisis semántico NO exitoso.\n\n";
        errores.forEach(error => {
            if (error) {
            resultado += `❌ Línea ${error.line}: ${traducirError(error.reason)}\n`;
            }
        });
    } else {
        resultado = "✅ Análisis semántico exitoso. No se encontraron errores.";
    }

    // responde si el analisis esta bien o mal
    document.getElementById("resultadoSemantico").innerText = resultado; 
    }

    // Función para traducir algunos errores comunes al español
    function traducirError(mensaje) {
    const traducciones = {
        "'{a}' is not defined.": "La variable '{a}' no está definida.",
        "'{a}' has already been declared.": "La variable '{a}' ya fue declarada.",
        "Missing semicolon.": "Falta punto y coma.",
        "Expected an identifier and instead saw '{a}'.": "Se esperaba un identificador y se encontró '{a}'."
    };

    // recorre el diccionario de traducciones, si no esta devuelve el mensaje original
    for (const clave in traducciones) {
        const regex = new RegExp(clave.replace("{a}", "(.+)"));
        const match = mensaje.match(regex);
        if (match) {
        return traducciones[clave].replace("{a}", match[1]);
        }
    }

    return mensaje;
}
