const supportedCurrencies = ["USD", "EUR", "BRL", "JPY", "GBP", "CAD"]
const conversionRates = {
    "USD": {"EUR": 0.85, "BRL": 5.25, "JPY": 110.0, "GBP": 0.75, "CAD": 1.25},
    "EUR": {"USD": 1.18, "BRL": 6.15, "JPY": 130.0, "GBP": 0.88, "CAD": 1.47},
    "BRL": {"USD": 0.19, "EUR": 0.16, "JPY": 21.0, "GBP": 0.14, "CAD": 0.24},
    "JPY": {"USD": 0.0091, "EUR": 0.0077, "BRL": 0.047, "GBP": 0.0065, "CAD": 0.011},
    "GBP": {"USD": 1.33, "EUR": 1.14, "BRL": 7.14, "JPY": 153.0, "CAD": 1.67},
    "CAD": {"USD": 0.80, "EUR": 0.68, "BRL": 4.15, "JPY": 90.0, "GBP": 0.60}
}

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

function convert() {
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

    let convertedAmount = amount * conversionRates[fromCurrency][toCurrency];
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