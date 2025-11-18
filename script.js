let valorActual = '';
let valorAnterior = '';
let operacion = null;

const pantalla = document.getElementById('pantalla');

// Agregar número o punto
function agregar(num) {
  // No permitir más de un punto decimal en el mismo número
  if (num === '.' && valorActual.includes('.')) {
    return;
  }

  // No permitir ceros al inicio de una cifra (evita 0005, 012, etc.)
  if (valorActual === '' && num === '0') {
    return;
  }

  valorActual += num;
  pantalla.value = valorActual;
}

// Seleccionar operación (+, -, *, /)
function seleccionarOperacion(op) {
  // Si no hay número actual, no hacemos nada
  if (valorActual === '' && valorAnterior === '') {
    return;
  }

  // Evitar operadores consecutivos: si ya hay una operación y NO hay número nuevo
  if (operacion !== null && valorActual === '') {
    // Opción 1: solo cambiamos la operación, sin añadir más símbolos
    operacion = op;
    return;
  }

  // Si ya hay un valor anterior y uno actual, calculamos primero
  if (valorAnterior !== '' && valorActual !== '') {
    calcular();
  }

  operacion = op;
  valorAnterior = valorActual;
  valorActual = '';
}

// Calcular resultado
function calcular() {
  if (valorAnterior === '' || valorActual === '' || operacion === null) {
    return;
  }

  const a = parseFloat(valorAnterior);
  const b = parseFloat(valorActual);
  let resultado;

  // Evitar división entre cero
  if (operacion === '/' && b === 0) {
    pantalla.value = "Error";
    valorActual = '';
    valorAnterior = '';
    operacion = null;
    return;
  }

  switch (operacion) {
    case '+':
      resultado = a + b;
      break;
    case '-':
      resultado = a - b;
      break;
    case '*':
      resultado = a * b;
      break;
    case '/':
      resultado = a / b;
      break;
    default:
      return;
  }

  // Redondeamos para evitar problemas de flotantes (0.1 + 0.2, etc.)
  resultado = parseFloat(resultado.toFixed(5));

  pantalla.value = resultado;
  valorActual = resultado.toString();
  valorAnterior = '';
  operacion = null;
}

// Limpiar calculadora
function limpiar() {
  valorActual = '';
  valorAnterior = '';
  operacion = null;
  pantalla.value = '';
}
