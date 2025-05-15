async function converter() {
    const from = document.getElementById("from-currency").value;
    const to = document.getElementById("to-currency").value;
    const amount = document.getElementById("amount").value;
  
    if (!amount || amount <= 0) {
      document.getElementById("resultado").innerText = "Digite um valor válido.";
      return;
    }
  
    const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const resultado = data.result.toFixed(2);
      document.getElementById("resultado").innerText = 
        `${amount} ${from} = ${resultado} ${to}`;
    } catch (error) {
      document.getElementById("resultado").innerText = "Erro na conversão.";
      console.error(error);
    }
  }
  