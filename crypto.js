document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayData(data) {
    const cryptoPriceElement = document.getElementById('cryptoPrice');
    cryptoPriceElement.textContent = `Current Price of Bitcoin: $${data.bitcoin.usd}`;
}
