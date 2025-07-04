const settingsDialogElement = document.querySelector("dialog#settings");
const btnSettings = document.querySelector("header .btn-settings");
const btnClose = document.querySelector("dialog .btn-close");
const configsDB = document.querySelector("#db-configs");
const configsDBColumns = document.querySelector("#db-configs-columns");
const themesPresentation = document.querySelector("#themes-presentation");
const inputQuantidadeMinima = document.querySelector("#input-quantidade-minima");
const filePathDisplay = document.querySelector("#file-path-display");
const inputPathCopied = document.querySelector("#input-path-copied");

btnSettings.addEventListener("click", () => {
    window.api.readJSON().then((settingsJSON) => {
        inputQuantidadeMinima.value = settingsJSON.quantidadeMinima;
        filePathDisplay.textContent = settingsJSON.pathImageCopied;
        inputPathCopied.value = "";
        configsDB.innerHTML = "";
        configsDBColumns.innerHTML = "";
        themesPresentation.innerHTML = "";

        for(const [dbConfigKey, dbConfigValue] of Object.entries(settingsJSON.dbConfigs)) {
            const li = document.createElement("li");
            const label = document.createElement("label");
            const input = document.createElement("input");
            const idName = dbConfigKey + "-input";

            label.setAttribute("for", idName);
            label.textContent = dbConfigKey;

            input.setAttribute("type", "text");
            input.setAttribute("minlength", "1");
            input.setAttribute("maxlength", "50");
            input.id = idName;
            input.value = dbConfigValue;

            li.appendChild(label);
            li.appendChild(input);

            configsDB.appendChild(li);
        }

        for(const [columnNamePresentation, columnName] of Object.entries(settingsJSON.dbColumns)) {
            const li = document.createElement("li");
            const inputColumnNamePresentation = document.createElement("input");
            const inputColumnName = document.createElement("input");

            inputColumnNamePresentation.setAttribute("type", "text");
            inputColumnNamePresentation.setAttribute("minlength", "1");
            inputColumnNamePresentation.setAttribute("maxlength", "50");
            inputColumnNamePresentation.value = columnNamePresentation;

            inputColumnName.setAttribute("type", "text");
            inputColumnName.setAttribute("minlength", "1");
            inputColumnName.setAttribute("maxlength", "50");
            inputColumnName.value = columnName;

            li.appendChild(inputColumnNamePresentation);
            li.appendChild(inputColumnName);

            configsDBColumns.appendChild(li);
        }

        for(const theme of Object.getOwnPropertyNames(settingsJSON.themes)) {
            const li = document.createElement("li");
            const themeInput = document.createElement("input");
            const labelTheme = document.createElement("label");
            const idNames = {
                themeNameInput: `tema-${theme}-input`,
                themeNameID: `tema-${theme}`
            };
            const className = "tema";

            themeInput.setAttribute("type", "radio");
            themeInput.setAttribute("name", "theme-color");
            themeInput.id = idNames.themeNameInput;
            themeInput.value = theme;

            if(themeInput.value === "tucupi") themeInput.setAttribute("checked", "checked");

            labelTheme.setAttribute("for", idNames.themeNameInput);
            labelTheme.innerHTML = `Tema <b class="${className}" id="${idNames.themeNameID}">${theme}</b>`;

            li.appendChild(themeInput);
            li.appendChild(labelTheme);

            themesPresentation.appendChild(li);
        }
    }).catch((error) => console.error("erro ao ler o arquivo JSON: " + error));

    settingsDialogElement.showModal();
});

btnClose.addEventListener("click", () => settingsDialogElement.close());