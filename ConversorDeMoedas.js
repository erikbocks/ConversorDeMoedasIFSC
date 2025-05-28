const supportedCurrencies = ["USD", "EUR", "BRL", "JPY", "GBP", "CAD"];

const cachedRates = {};

function populateSelects() {
    const fromSelect = document.getElementById("from-currency");
    const toSelect = document.getElementById("to-currency");

    supportedCurrencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.textContent = currency;
        toSelect.appendChild(optionTo);
    });
}

populateSelects();

async function convert() {
    const resultDiv = document.getElementById("resultado")
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const amount = document.getElementById("amount").value;

    if (fromCurrency === toCurrency) {
        resultDiv.innerText = "Moedas iguais não podem ser convertidas.";
        resultDiv.style.color = "red";
        resultDiv.style.display = "block";
        return;
    }

    if (!amount || amount <= 0) {
        resultDiv.innerText = "Digite um valor válido.";
        resultDiv.style.color = "red";
        resultDiv.style.display = "block";
        return;
    }

    let conversionRate;
    const conversionKey = fromCurrency + toCurrency;

    if (!cachedRates[conversionKey] || cachedRates[conversionKey].limitDate < new Date()) {
        const request = await fetch(`https://economia.awesomeapi.com.br/json/last/${fromCurrency}-${toCurrency}`);

        if (!request.ok) {
            resultDiv.innerText = "Erro ao buscar a taxa de câmbio. Tente novamente mais tarde.";
            resultDiv.style.color = "red";
            resultDiv.style.display = "block";
            return;
        }

        let currentDate = new Date();
        const data = await request.json();

        cachedRates[conversionKey] = {
            rate: data[conversionKey]["ask"],
            limitDate: currentDate.setMinutes(currentDate.getMinutes() + 5)
        };

        conversionRate = cachedRates[conversionKey].rate;
    } else {
        conversionRate = cachedRates[conversionKey].rate;
    }

    let convertedAmount = amount * conversionRate;
    resultDiv.innerText = `${formatCurrency(amount, fromCurrency)} são iguais a ${formatCurrency(convertedAmount, toCurrency)}`;
    resultDiv.style.color = "black";
    resultDiv.style.display = "block";

    addToHistory(amount, convertedAmount, fromCurrency, toCurrency);
}

function formatCurrency(value, currency) {
    const options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    return new Intl.NumberFormat('pt-BR', options).format(value);
}

function addToHistory(value, convertedValue, fromCurrency, toCurrency) {
    const lista = document.getElementById("history-list");
    const item = document.createElement("li");
    item.textContent = `${getCurrentDate()} - ${formatCurrency(value, fromCurrency)} → ${formatCurrency(convertedValue, toCurrency)}`;
    lista.prepend(item);
}

function hideResult() {
    const resultDiv = document.getElementById("resultado");
    resultDiv.style.display = "none";
}

function getCurrentDate() {
    const now = new Date();

    return now.toLocaleDateString('pt-BR').split('/').join('/') +
        ' - ' +
        now.getHours().toString().padStart(2, '0') +
        ':' +
        now.getMinutes().toString().padStart(2, '0');
}