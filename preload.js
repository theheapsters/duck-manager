const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("api", {
    getConfigs: () => ipcRenderer.invoke('get-settings'),
    saveConfigs: data => ipcRenderer.invoke('save-settings', data),
    executeQuery: query => ipcRenderer.invoke('execute-query', query),
    compileJavaFile: () => ipcRenderer.invoke('compile-java-files'),
    executeJavaClass: (package, className, args) => ipcRenderer.invoke('execute-java-class', package, className, args),
    getColumnsDB: () => ipcRenderer.invoke('get-columns-db'),
    getTableDB: () => ipcRenderer.invoke('get-table-db'),
    getQuantidadeMinima: () => ipcRenderer.invoke('get-quantidade-minima'),
    getInfosListaPedidos: () => ipcRenderer.invoke('get-infos-lista-pedidos'),
    getNameColumnQuantity: () => ipcRenderer.invoke('get-name-column-quantity'),
    getInfosClassesExecute: () => ipcRenderer.invoke('get-infos-classes-execute'),
    deleteFiles: () => ipcRenderer.invoke('delete-files'),
    moveFile: nameFile => ipcRenderer.invoke('move-file', nameFile),
});