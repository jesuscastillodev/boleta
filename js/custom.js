var monto = document.getElementById("monto");
var montoLiquido = document.getElementById("monto-liquido");
var liquidoDescuento = document.getElementById("liquido-descuento");
var montoBruto = document.getElementById("monto-bruto");
var brutoDescuento = document.getElementById("bruto-descuento");
var porcentajeIVA = document.getElementById("iva");
// function keypress only numbers
monto.addEventListener("keypress", (e) => {
  var key = window.event ? e.which : e.keyCode;
  if (key < 48 || key > 57) e.preventDefault();
});
porcentajeIVA.addEventListener("keypress", (e) => {
  var key = window.event ? e.which : e.keyCode;
  if ((key < 48 || key > 57) && key != 46) e.preventDefault();
});

monto.addEventListener("keyup", () => {
  monto.value = monto.value.replace(/[^0-9]/g, "");
  if (!monto.value == "") {
    // calcular monto liquido
    montoLiquido.innerHTML = "$" + liquido(monto.value);
    // calcular monto bruto
    montoBruto.innerHTML = "$" + bruto(monto.value);
  } else {
    montoLiquido.innerHTML = "$0";
    montoBruto.innerHTML = "$0";
  }
});
porcentajeIVA.addEventListener("keyup", () => {
  //format to decimal number
  if (porcentajeIVA.value > 100) {
    porcentajeIVA.value = 100;
    monto.dispatchEvent(new KeyboardEvent("keyup"));
  }
  if (
    porcentajeIVA.value != "" ||
    (porcentajeIVA.value.charAt(porcentajeIVA.value.length - 1) != "0" &&
      (porcentajeIVA.value.match(/\./g) || []).length > 1 &&
      ((porcentajeIVA.value.match(/\./g) || []).length > 1) ^
        (porcentajeIVA.value.charAt(porcentajeIVA.value.length - 1) != "."))
  ) {
    porcentajeIVA.value = parseFloat(porcentajeIVA.value);
    monto.dispatchEvent(new KeyboardEvent("keyup"));
  }
});

// function calcular monto liquido
function liquido(num) {
  var liquido = parseInt(num - iva(num));
  return liquido.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// function calcular monto bruto
function bruto(num) {
  var bruto = num / ((100 - porcentajeIVA.value) / 100);
  return bruto.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// function calcular porcentaje de reteccion de iva
function iva(num) {
  // remove not number characters from a string
  num = num.replace(/[^0-9]/g, "");
  var iva = porcentajeIVA.value / 100;
  // calculate porcentaje
  return parseInt(num * iva);
}
function copiarMonto(elementAmount, thisElement) {
  var copyText = document.getElementById(elementAmount);
  navigator.clipboard.writeText(copyText.innerHTML);
  thisElement.innerHTML = "Copiado";
  setTimeout(function () {
    thisElement.innerHTML = "Copiar";
  }, 3000);
}
