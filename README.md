# Processos importantes

## Instalação de pacotes
Para instalar os arquivos necessários para aplicação , execute o comando abaixo, **independente do seu sistema operacional**.
```cmd
npm install
```

## Processo de execução
Após a instalação de pacotes, para executar a aplicação basta executar o comando abaixo no seu cmd e esperar a aplicação abrir na sua máquina.
```cmd
npm start
```

# Programas necessários
1. [Node.JS](https://nodejs.org/pt/download/package-manager) (**obrigatório** para usar o *npm*)
2. [git](https://git-scm.com/downloads)
3. [GitHub Desktop](https://desktop.github.com/download/)

## IDEs recomendadas
Pode-se usar o *VS Code* para desenvolvimento Java? Sim, nada lhe impede disso. Porém, existem *IDEs* voltadas para esta linguagem e estas são as mais indicadas e recomendadas para se usar.

- Para desenvolvimento geral
    - [Visual Studio Code](https://code.visualstudio.com/Download)
- Para desenvolvimento em Java
    - [Intellij IDEA Community Edition](https://www.jetbrains.com/pt-br/idea/download/?section=windows#:~:text=uso%20completamente%20gratuito-,IntelliJ%20IDEA%20Community%20Edition,-O%20IDE%20para)
    - [Apache NetBeans](https://netbeans.apache.org/front/main/)

# Recursos utilizados e necessários
1. [npm](https://www.npmjs.com/) - JavaScript package manager
2. [git](https://git-scm.com/downloads) - Git
3. [Java](https://www.java.com/pt-BR/download/) - Java
4. [JDK 23](https://www.oracle.com/br/java/technologies/downloads/) - JDK

# Aplicações instaladas
## Dependências
- Desenvolvimento
1. **Nodemon**
    - Atualiza a aplicação que está rodando sem ter a necessidade de fechar e abrir a aplicação a cada mudança no código
    - A cada alteração no código, após o código ser salvo, a aplicação reseta
    - Para mais informações: [nodemon - npm](https://www.npmjs.com/package/nodemon) (nodemon), [remy/nodemon](https://github.com/remy/nodemon#nodemon) (GitHub)
2. **Electron**
    - Roda a aplicação desktop
    - Para mais informações: [electron - npm](https://www.npmjs.com/package/electron) (npm), [Introdução | Electron](https://www.electronjs.org/pt/docs/latest/) (Electron)
3. **@electron/packager**
    - Empacota a aplicação desktop criando um executável para distribuição para realização de demonstrações
    - Para mais informações: [@electron/packager](https://github.com/electron/packager?tab=readme-ov-file#electronpackager)
4. **electron-builder**
    - Criação da aplicação desktop criando um executável para distribuição a para usuários finais
    - Para mais informações: [electron-builder](https://github.com/electron-userland/electron-builder?tab=readme-ov-file#electron-builder---)

- Para o projeto
2. **fs**
    - Permite a leitura, criação de diretórios, cópia de diretórios e afins
    - Para mais informações: [file-system](https://www.npmjs.com/package/file-system) (file-system), [fs](https://www.npmjs.com/package/fs) (fs)
3. **mysql**
    - Permite executar a conexão com o MySQL, executar queries e retornar valores
    - Para mais informações> [mysql](https://www.npmjs.com/package/mysql) (mysql);
4. **ShellJs**
    - Permite a execução de comandos shell em diferentes ambientes através de métodos ou, simplesmente, inserir manualmente
    - Para mais informações> [ShellJs](https://www.npmjs.com/package/shelljs) (ShellJs);

## Frameworks
1. **Electron**
    - Roda a aplicação desktop
    - Para mais informações: [electron - npm](https://www.npmjs.com/package/electron) (npm), [Introdução | Electron](https://www.electronjs.org/pt/docs/latest/) (Electron)
2. **Apache POI**
    - Permite a edição, criação e leitura de arquivos do Office
    - Para mais informações: [Apache POI](https://poi.apache.org/) (Apache POI)

## Módulos
1. **Child process**
    - Realiza o processo de execução de arquivos e possibilita a execução de comandos no cmd (processo, este, intermediado pelo node) [Child process](https://nodejs.org/api/child_process.html#spawning-bat-and-cmd-files-on-windows) (módulo nativo do *Node*)

# Observação
É sempre bom **ATUALIZAR** o repositório constantemente para garantir que todos arquivos estão devidamente sincronizados com o repositório do projeto.

Além disso, programas, recursos e pacotes instalados ou requisitados certamente passarão por mudanças ao longo do tempo. Logo, é sempre bom prestar atenção se é pra instalar algum programa novo ou algo assim.

Não se preocupe que não será necessário estar atualizando os pacotes via *npm*.