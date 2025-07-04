const btnGerarDoc = document.querySelector(".btn-gerar-doc");
const loadingDialogElement = document.querySelector("dialog#loading");
const inputGerarList = document.querySelector("#btn-gerar-lista");

btnGerarDoc.addEventListener("click", () => loadingDialogElement.showModal());

inputGerarList.addEventListener("click", async () => {
    loadingDialogElement.showModal();

    try {
        console.log("gerando lista de pedidos...");
        const compileResponse = await window.api.compileJavaFile('readXML', 'Main.java');
        console.log(compileResponse === "" ? "código compilado com sucesso!" : null);
        const executeResponse = await window.api.executeJavaClass('readXML', 'readXML.Main');
        console.log(executeResponse);
    } catch (error) {
        console.log("não foi possível gerar a lista de pedidos");
        console.error(error);
    } finally {
        loadingDialogElement.close();
    }
});