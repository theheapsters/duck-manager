const { app, BrowserWindow, ipcMain } = require('electron/main');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const { exec } = require('child_process');

const paths = {
    settingsJSON: 'settings/settings.json',
    icon: 'resources/imgs/logo.png',
    dirJava: 'resources/src/plugin',
    app: 'app/app.html',
    toDelete: {
        args: "resources/src/plugin/extras/args.txt",
        xml: "resources/src/plugin/extras/xml/file_destiny.xml"
    },
    toMove: {
        file: "resources/src/plugin/spreadsheets/",
        dist: "resources/planilhas"
    }
};

async function deleteFile(pathFile) {
    try {
        await fs.promises.unlink(path.join(__dirname, pathFile));
        return "Arquivo deletado com sucesso";
    } catch(err) {
        return "Erro ao deletar o arquivo: " + err;
    }
}

async function moveFile(origin, destiny, fileName) {
    const pathOrigin = path.join(__dirname, origin, fileName); // Caminho de origem
    const pathDestiny = path.join(__dirname, destiny, fileName); // Caminho de destino

    try {
        // Verifique se o caminho de origem existe
        await fs.promises.access(pathOrigin);
        console.log(`Movendo arquivo de ${pathOrigin} para ${pathDestiny}`);

        // Copiar o arquivo para o destino
        await fs.promises.copyFile(pathOrigin, pathDestiny);
        console.log('Arquivo copiado com sucesso!');

        // Após copiar, deletar o arquivo de origem
        await fs.promises.unlink(pathOrigin);
        return 'Arquivo original excluído com sucesso!';
    } catch(err) {
        return 'Erro ao mover o arquivo: ' + err.message;
    }
}

function execCommand(cmd, msgError) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if(error) return reject(msgError + error.message);
            if(stderr) return reject("error: " + stderr);
            resolve(stdout);
        });
    });
}

function readSettingsJSON() {
    const filePath = path.join(__dirname, paths.settingsJSON);
    const settings = fs.readFileSync(filePath, 'utf-8');
    const settingsJSON = JSON.parse(settings);

    return settingsJSON;
}

function getObjectKeys(object) {
    return Object.keys(object);
}

function getObjectValues(object) {
    return Object.values(object);
}

app.whenReady().then(() => {
    const widthSize = 800;
    const heightSize = 600;

    const win = new BrowserWindow({
        width: widthSize,
        height: heightSize,
        minWidth: widthSize,
        minHeight: heightSize,
        icon: paths.icon,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'), // comunicação entre processos para renderização de na interface
            contextIsolation: true, // garante o isolamento de contexto para segurança
            enableRemoteModule: false // desativa o módulo remoto para segurança
        }
    });

    win.loadFile(paths.app);
    win.maximize();
});

// handler de pegar as configurações
ipcMain.handle("get-settings", () => { return readSettingsJSON() });

// handler de salvar as configurações
ipcMain.handle("save-settings", (event, settings) => {
    const filePath = path.join(__dirname, paths.settingsJSON);
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));

    return { status: "success" };
});

// handler de execução de queries
ipcMain.handle('execute-query', async (event, query) => {
    const settings = readSettingsJSON();
    const connectionConfigs = settings.db_configs.connection;

    let connection;

    try {
        connection = await mysql.createConnection({
            host: connectionConfigs.host,
            user: connectionConfigs.user,
            password: connectionConfigs.password,
            database: connectionConfigs.database
        });

        const [rows, fields] = await connection.execute(query);

        return rows;
    } catch(error) {
        if(error.code === 'ER_ACCESS_DENIED_ERROR') {
            return 'Erro: Acesso negado. Verifique suas credenciais.';
        } else if(error.code === 'ER_BAD_DB_ERROR') {
            return 'Erro: Banco de dados não encontrado.';
        } else {
            return 'Erro ao conectar com o banco de dados: ' + error.message;
        }
    } finally {
        if(connection) await connection.end();
    }
});

// handler de execução de arquivos Java
ipcMain.handle('compile-java-files', () => {
    return execCommand(`cd ${paths.dirJava} && mvn clean compile`, `Erro ao compilar o(s) arquivo(s) Java: `);
});

// handler de execução de classes Java
ipcMain.handle('execute-java-class', (event, packageName, className, args) => {
    return execCommand(`cd ${paths.dirJava} && mvn exec:java -Dexec.mainClass=com.plugin.${packageName}.${className} -Dexec.args="${args}"`, `Erro ao executar a classe Java "${className}": `);
});

// handler pra pegar as colunas do banco de dados que serão usadas
ipcMain.handle('get-columns-db', () => {
    const settings = readSettingsJSON();
    const columns = settings.db_columns;

    return {
        columnsPresentation: getObjectKeys(columns),
        columnsDB: getObjectValues(columns)
    };
});

// handler pra pegar a tabela do banco de dados que será usada
ipcMain.handle('get-table-db', () => {
    const settings = readSettingsJSON();
    const tableSelected = settings.db_configs.table_selected;

    return tableSelected;
});

// handler pra pegar a quantidade mínima das configurações
ipcMain.handle('get-quantidade-minima', () => {
    const settings = readSettingsJSON();
    const quantidadeMinimaValue = settings.quantidade_minima;

    return quantidadeMinimaValue;
});

// handler pra pegar informações da lista de pedidos
ipcMain.handle('get-infos-lista-pedidos', () => {
    const settings = readSettingsJSON();
    const dbColumns = settings.db_columns;
    const spreadsheetInfos = settings.spreadsheet_infos;

    return {
        dbColumns: {
            dbColumnsNames: getObjectKeys(dbColumns),
            dbColumnsNamesPresentation: getObjectValues(dbColumns)
        },
        spreadsheetInfos: {
            namesInfo: getObjectKeys(spreadsheetInfos),
            namesInfoPresentation: getObjectValues(spreadsheetInfos)
        },
        columnsImportants: {
            columnQuantity: settings.columns_importants.column_quantity
        }
    };
});

//handler pra pegar a coluna que contém a quantidade dos produtos pra pegar o nome selecionado
ipcMain.handle('get-name-column-quantity', () => {
    const settings = readSettingsJSON();
    const columnSelectedName = settings.columns_importants.column_quantity;

    return columnSelectedName;
});

//handler pra pegar as informações necessárias para a execução de classes
ipcMain.handle('get-infos-classes-execute', () => {
    const settings = readSettingsJSON();

    return settings.infos_classes_execute;
});

ipcMain.handle('delete-files', async () => {
    const delArgs = await deleteFile(paths.toDelete.args);
    const delXML = await deleteFile(paths.toDelete.xml);
    return { delArgs, delXML };
});

ipcMain.handle('move-file', async (event, fileName) => {
    return await moveFile("resources/src/plugin/extras/spreadsheets", "resources/planilhas", fileName);
});

app.on("window-all-closed", () => { if(process.platform !== "darwin") app.quit(); });

app.on("activate", () => { if(BrowserWindow.getAllWindows().length === 0) createWindow(); });