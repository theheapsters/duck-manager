const buttonSave = document.querySelector(".btn-save");

buttonSave.addEventListener("click", () => {
    const hostInput = document.querySelector("#host-input");
    const userInput = document.querySelector("#user-input");
    const passwordInput = document.querySelector("#password-input");
    const databaseInput = document.querySelector("#database-input");
    const settings = {
        quantidadeMinima: inputQuantidadeMinima.value,
        pathImageCopied: inputPathCopied.files[0]?.path || filePathDisplay.textContent, // usa o novo arquivo ou mantém o antigo
        atalhos: {
            pesquisa: "CTRL + i",
            menu: "CTRL + ,"
        },
        dbConfigs: {
            host: hostInput.value,
            user: userInput.value,
            password: passwordInput.value,
            database: databaseInput.value
        },
        dbColumns: {},
        themes: {
            claro: "tema_claro_path",
            escuro: "tema_escuro_path",
            tucupi: "tema_tucupi_path"
        }
    };

    for(const inputColumn of configsDBColumns.children) {
        const columnName = inputColumn.children[0].value;
        const columnNameDB = inputColumn.children[1].value;

        settings.dbColumns[columnName] = columnNameDB;
    }

    window.api.saveJSON(settings).then((response) => {
        if (response.status === "success") {
            alert("Configurações salvas com sucesso!");

            dialogElement.close();
        } else {
            alert("Não foi possível salvar as configurações");
        }
    }).catch((error) => console.error("Erro ao salvar o arquivo JSON: " + error));
});