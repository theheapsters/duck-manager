const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("api", {
    readJSON: () => ipcRenderer.invoke('read-json'),
    saveJSON: data => ipcRenderer.invoke('save-json', data),
    executeQuery: query => ipcRenderer.invoke('execute-query', query),
    compileJavaFile: (dir, fileJava) => ipcRenderer.invoke('compile-java-file', dir, fileJava),
    executeJavaClass: (dir, classJava) => ipcRenderer.invoke('execute-java-class', dir, classJava)
});