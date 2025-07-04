const main = document.querySelector("main.principal");
const table = document.createElement("table");
const fundoProdutos = document.createElement("div");

window.addEventListener("load", () => {
    const tableTHead = table.createTHead();
    const tableTHeadWithRow = tableTHead.insertRow();
    fundoProdutos.className = "fundo-produtos";
    fundoProdutos.innerText = "fundo produtos";

    window.api.readJSON().then((settingsJSON) => {
        const columnNames = settingsJSON.dbColumns;

        for(const columnName of Object.getOwnPropertyNames(columnNames)) {
            const th = document.createElement("th");
            th.textContent = columnName;
            tableTHeadWithRow.appendChild(th);
        }

        const tableTBody = table.createTBody();

        for(let i = 1; i <= 10; i++) {
            const tableTBodyWithRow = tableTBody.insertRow();

            for(let c = 1; c <= 6; c++) {
                const td = document.createElement("td");
                let index = c - 1;
                const tHeadName = tableTHeadWithRow.children[index];

                td.innerHTML = `linha <i>${i}</i> da coluna <strong>${tHeadName.innerText}</strong>`;
                // td.style.cursor = "pointer";
                td.addEventListener("click", () => {
                    const productInfo = `Linha ${i} - ${tHeadName.innerText} <br> Preço: R$${(0)} <br> Código de Barras: ${(0)}`;
                    addProductToSelection(productInfo); // Adiciona o produto à seleção
                });

                tableTBodyWithRow.appendChild(td);
            }
        }

        main.appendChild(table);
        main.appendChild(fundoProdutos); // Adiciona a área de fundo de seleção ao main
    })
    .catch((error) => console.error("Erro ao ler o arquivo JSON: " + error));
});

// Função para adicionar o produto à área de fundo de seleção
function addProductToSelection(productInfo) {
    const productDiv = document.createElement("div");
    productDiv.className = "selected-product";
    fundoProdutos.textContent = '';
    productDiv.innerHTML = `${productInfo} <button class="btn-remove">Remover</button>`;
    // Adiciona o evento de remover
    productDiv.querySelector(".btn-remove").addEventListener("click", () => {
        fundoProdutos.removeChild(productDiv);
    });

    fundoProdutos.appendChild(productDiv);
}
