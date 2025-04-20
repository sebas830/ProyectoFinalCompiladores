# 🛠️ Proyecto Final Compiladores

## 📌 Tabla de Contenidos
- [📄 Descripción](#descripción)
- [✨ Características](#características)
- [🔧 Instalación](#instalación)
- [🚀 Uso](#uso)
- [🧪 Ejemplos](#ejemplos)
- [🧰 Tecnologías](#tecnologías)
- [📜 Licencia](#licencia)
- [👥 Autores](#autores)

<a name="descripción"></a>
## 📄 Descripción
Este proyecto es una aplicación web interactiva desarrollada como trabajo final para la materia de Compiladores.

### ➤ ¿Qué problema resuelve?:
Su propósito es ilustrar y facilitar el proceso de análisis léxico, sintáctico y semántico de fragmentos fuente ingresados por el usuario.

### ➤ ¿Cuál es su utilidad?
La herramienta permite visualizar cómo se tokeniza el código y cómo se analiza la sintaxis y la semántica.

<a name="características"></a>
## ✨ Características
- Genera análisis léxico.
- Genera análisis sintáctico.
- Generación de árbol sintáctico.
- Genera análisis semántico.
- Interfaz web sencilla y fácil de entender.
- Visualización de tokens generados y errores detectados.
- Código modular.

<a name="instalación"></a>
## 🔧 Instalación
Asegúrate de tener los siguientes programas descargados:
1. Visual Studio Code  
3. Node.js  

Para la instalación y ejecución local del programa:
1. Dirígete al link del repositorio: https://github.com/sebas830/ProyectoFinalCompiladores  
2. Selecciona **<> Code** y posteriormente **Local**. En la parte inferior izquierda se encuentra el archivo .ZIP para descargar.  
3. Extrae la carpeta.  
4. Abre la carpeta descargada desde Visual Studio.  
5. Presiona Ctrl+J para abrir la consola.  
6. Luego, ejecuta el siguiente comando para iniciar el servidor: serve .
7. Presiona Ctrl + clic en el enlace que aparece en la terminal (por defecto será: http://localhost:3000)
8. en este ultimo paso ya se estaria ejecutando su programa.

Para solo ejecucion del programa ingrese al siguiente Link:
    https://sebas830.github.io/ProyectoFinalCompiladores/

<a name="uso"></a>
## 🚀 Uso
Funcionalidades de la Página
La página cuenta con tres funcionalidades principales:
    **- Análisis Léxico**
    **- Análisis Sintáctico**
    **- Análisis Semántico**

Cada funcionalidad está asociada a un bloque de texto independiente, donde el usuario puede ingresar el código o la operación que desea analizar.

### Instrucciones de Uso:
- Ingrese el código o la operación deseada en el bloque de texto correspondiente a la funcionalidad que quiere utilizar.
- Presione el botón asociado a la función que desea ejecutar: léxico, sintáctico o semántico.
- La página mostrará el resultado del análisis solicitado, de acuerdo con la función seleccionada.


<a name="ejemplos"></a>
## 🧪 Ejemplos
Ejemplos para los analisis:

### ➤ Lexico:  
    int x = 10;
    float y = 5.5;
    string mensaje = "Hola";
    if (x > y) {
    x = x + 1;
    }   

### ➤ Sintactico:
    a+b*(c-4)

### ➤ Semantico:
    let s=10; -> si solo se pone esta opcion el analisis es exitoso
    let s=10; -> si digitamos esta linea tambien nos dira que el analisis es incorrecto porque ya se creo la variable anteriormente.

<a name="tecnologías"></a>
## 🧰 Tecnologías
- HTML, CSS y JavaScript para la web interactiva.
- Node.js para el levantar servidor local.
- GitHub Pages para despliegue en línea.

<a name="licencia"></a>
## 📜 Licencia
Se permite solo para uso educativo, no puede ser vendido, sin embargo puede ser usado externamente y modificado.

<a name="autores"></a>
## 👥 Autores
- **Sebastian Ramirez Parra** – Análisis y Backend – [@sebas830](https://github.com/sebas830)
- **Maria Alejandra Reina** – Interfaz Web – [@Mari-R122](https://github.com/Mari-R122)
- **Jessica Tascon** – Documentación – [@JESSICATASCON](https://github.com/JESSICATASCON)
