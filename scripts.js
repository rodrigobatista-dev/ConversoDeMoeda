const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select-convert");
const currencySelectConvert = document.querySelector(".currency-select");

let dolarToday = 0;
let euroToday = 0;
let bitcoinToday = 0;
const realToday = 1;

const atualizarCotacoes = async () => {
  try {
    const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-USD");
    const data = await response.json();
    dolarToday = parseFloat(data.USDBRL.high);
    euroToday = parseFloat(data.EURBRL.high);
    bitcoinToday = parseFloat(data.BTCUSD.high);
  } catch (error) {
    console.error("Erro ao buscar cotações:", error);
    alert("Erro ao carregar cotações. Verifique sua conexão.");
  }
}

window.addEventListener("load", atualizarCotacoes);

function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  const valorNumerico = Number(
    inputCurrencyValue
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );

  if (isNaN(valorNumerico)) {
    alert("Por favor, insira um valor numérico válido.");
    return;
  }

  const correntyValueToConvert = document.querySelector(".currency-value-to-convert");
  const correntyValueToConvertd = document.querySelector(".currency-value");

  // valor de entrada formatado
  if (currencySelectConvert.value === "dolar") {
    correntyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(valorNumerico);
  } else if (currencySelectConvert.value === "euro") {
    correntyValueToConvert.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(valorNumerico);
  } else if (currencySelectConvert.value === "real") {
    correntyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorNumerico);
  } else if (currencySelectConvert.value === "bitcoin") {
    correntyValueToConvert.innerHTML = `${valorNumerico.toFixed(6)} BTC`;
  }

  // converter para reais
  let valorEmReal;
  if (currencySelectConvert.value === "dolar") {
    valorEmReal = valorNumerico * dolarToday;
  } else if (currencySelectConvert.value === "euro") {
    valorEmReal = valorNumerico * euroToday;
  } else if (currencySelectConvert.value === "bitcoin") {
    valorEmReal = valorNumerico * bitcoinToday;
  } else {
    valorEmReal = valorNumerico * realToday;
  }

  // converter para Bitcoin
  let valorEmBitcoin = valorEmReal / bitcoinToday;

  let valorConvertido;
  if (currencySelect.value === "dolar") {
    valorConvertido = valorEmReal / dolarToday;
  } else if (currencySelect.value === "euro") {
    valorConvertido = valorEmReal / euroToday;
  } else if (currencySelect.value === "real") {
    valorConvertido = valorEmReal / realToday;
  } else if (currencySelect.value === "bitcoin") {
    valorConvertido = valorEmBitcoin;
  }

  // valor de saída formatado
  if (currencySelect.value === "dolar") {
    correntyValueToConvertd.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(valorConvertido);
  } else if (currencySelect.value === "euro") {
    correntyValueToConvertd.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(valorConvertido);
  } else if (currencySelect.value === "real") {
    correntyValueToConvertd.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorConvertido);
  } else if (currencySelect.value === "bitcoin") {
    correntyValueToConvertd.innerHTML = `${valorConvertido.toFixed(8)} BTC`;
  }
}

function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.querySelector(".currency-img");

  if (currencySelect.value === "dolar") {
    currencyName.innerHTML = "Dólar americano";
    currencyImage.src = "./assets/img/dolar.png";
  } else if (currencySelect.value === "euro") {
    currencyName.innerHTML = "Euro";
    currencyImage.src = "./assets/img/euro.png";
  } else if (currencySelect.value === "real") {
    currencyName.innerHTML = "Real";
    currencyImage.src = "./assets/img/Real.png";
  } else if (currencySelect.value === "bitcoin") {
    currencyName.innerHTML = "Bitcoin";
    currencyImage.src = "./assets/img/bitcoin 1.png";
  }

  convertValues();
}

function changeCurrency1() {
  const currencyName1 = document.getElementById("currency-name-on");
  const currencyImage1 = document.querySelector(".currency-img-primeiro");

  if (currencySelectConvert.value === "dolar") {
    currencyName1.innerHTML = "Dólar americano";
    currencyImage1.src = "./assets/img/dolar.png";
  } else if (currencySelectConvert.value === "euro") {
    currencyName1.innerHTML = "Euro";
    currencyImage1.src = "./assets/img/euro.png";
  } else if (currencySelectConvert.value === "real") {
    currencyName1.innerHTML = "Real";
    currencyImage1.src = "./assets/img/Real.png";
  } else if (currencySelectConvert.value === "bitcoin") {
    currencyName1.innerHTML = "Bitcoin";
    currencyImage1.src = "./assets/img/bitcoin 1.png";
  }

  convertValues(); // Atualiza a conversão ao trocar a moeda de origem
}

currencySelect.addEventListener("change", changeCurrency);
currencySelectConvert.addEventListener("change", changeCurrency1);
convertButton.addEventListener("click", convertValues);
