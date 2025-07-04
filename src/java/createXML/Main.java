// package createXML;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class Main {
    public static void main(String[] args) {
        try {
            //criando o documento
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();

            //novo documento em branco
            Document documentoXML = documentBuilder.newDocument();

            //cria a raiz(root) e adiciona no documento
            Element root = documentoXML.createElement("root");
            documentoXML.appendChild(root);

            //cria o elemento <pessoa> e o atributo "id"
            Element pessoa = documentoXML.createElement("pessoa");
            Attr id = documentoXML.createAttribute("id");
            id.setValue("1");

            //adiciona o "id" em pessoa
            pessoa.setAttributeNode(id);

            //adiciona pessoa ao root
            root.appendChild(pessoa);

            //adiciona o texto "Murylo" ao <nome>
            Element nome = documentoXML.createElement("nome");
            nome.appendChild(documentoXML.createTextNode("Murylo"));
            pessoa.appendChild(nome);

            //adiciona "18" em <idade>
            Element idade = documentoXML.createElement("idade");
            idade.appendChild(documentoXML.createTextNode("18"));
            pessoa.appendChild(idade);

            //transformando o documento em XML
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();//transformador doc. -> XML

            DOMSource documentoFonte = new DOMSource(documentoXML);
            //salva o resultado final em um arquivo
            StreamResult documentoFinal = new StreamResult(new File("../xml/pessoa.xml"));

            //transforma o documento num arquivo xml
            transformer.transform(documentoFonte, documentoFinal);

            System.out.println("XML criado com sucesso!");

        } catch (ParserConfigurationException | TransformerException ex) {
            ex.printStackTrace();
        }
    }
}