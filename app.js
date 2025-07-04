const { app, BrowserWindow, ipcMain } = require('electron/main');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const { exec } = require('child_process');

const pathSettingJSON = "src/settings/settings.json";
const pathIcon = "resources/imgs/logo.png";
const loadDBConfig = () => {
    const configPath = path.join(__dirname, "src/settings/settings.json");
    const rawConfig = fs.readFileSync(configPath);
    const json = JSON.parse(rawConfig);
    const dbConfigs = json.dbConfigs;

    return dbConfigs;
};

function createWindow() {
    widthSize = 800;
    heightSize = 600;

    const win = new BrowserWindow({
        width: widthSize,
        height: heightSize,
        minwidth: widthSize,
        minheight: heightSize,
        icon: pathIcon,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'), // comunicação entre processos para renderização de na interface
            contextIsolation: true, // garante o isolamento de contexto para segurança
            enableRemoteModule: false // desativa o módulo remoto para segurança
        }
    });

    win.webContents.openDevTools();
    win.loadFile("src/pages/main/index.html");

    win.maximize();
};

function execCommand(cmd, msgError) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return reject(msgError + error.message);
        }
        if (stderr) {
            return reject("error: " + stderr);
        }
        resolve(stdout);
        });
    });
}

app.whenReady().then(() => createWindow());

ipcMain.handle('read-json', async () => {
    const filePath = path.join(__dirname, pathSettingJSON);
    const data = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(data);
});

ipcMain.handle("save-json", async (event, config) => {
    const filePath = path.join(__dirname, pathSettingJSON);
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));

    return { status: "success" };
});

ipcMain.handle('execute-query', async (event, query) => {
    const dbConfig = loadDBConfig();
    const connection = await mysql.createConnection(dbConfig);

    try {
        const [rows, fields] = await connection.execute(query);
        return rows;
    } catch (error) {
        console.error('erro ao executar query:', error);
    } finally {
        connection.end();
    }
});

ipcMain.handle('compile-java-file', async (event, dir, fileJava) => {
    return execCommand(`cd src/java/${dir} && javac -d bin ${fileJava}`, `erro ao compilar o arquivo Java "${fileJava}": `);
});

// cd src/java/${dir}/bin && java ${fileJava}
ipcMain.handle('execute-java-class', async (event, dir, classJava) => {
    return execCommand(`cd src/java/${dir}/bin && java ${classJava}`, `erro ao executar a classe Java "${classJava}": `);
});

// fechando a janela do app em no windows e linux
app.on("window-all-closed", () => {
    if(process.platform != "darwin") {
        app.quit();
    }
});

// abrindo a aplicação no macOS
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});