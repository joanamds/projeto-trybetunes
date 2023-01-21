# :notes: Projeto TrybeTunes! :notes:

Para fixarmos o conteúdo de React Router criamos uma aplicação para pesquisar e listar álbuns e músicas de várias bandas e artistas. Também é possível ouvir uma preview de cada música e adicionar as músicas favoritas em uma lista.

![TrybeTunes](https://user-images.githubusercontent.com/106452876/208140429-9a7d3393-d9fb-463c-817e-fa5962b0e08a.gif)

## A API utilizada e seus endpoints
<li>Para pesquisar os albuns: https://itunes.apple.com/search?entity=album&term=${parametro-da-chamada-da-api}&attribute=allArtistTerm</li>
<li>Para pesquisar as músicas de um álbum específico: https://itunes.apple.com/lookup?id=${parametro-da-chamada-da-api}&entity=song</li>
<br />

## Tecnologias usadas
Front-end:
> Desenvolvido usando: React, CSS3, HTML5, ES6

OBS: Acabei por não desenvolver a tela de Perfil. 

## Instalando Dependências
> Frontend
```bash
cd src/
npm install
``` 
## Executando aplicação
* Para rodar o front-end:

  ```
    cd src/ && npm start
  ```

## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
  ```

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto no qual você pode customizar e reutilizar todas as vezes que for executar o trybe-publisher.

Para deixá-lo com a sua cara, basta alterar o seguinte arquivo da sua máquina: ~/.student-repo-publisher/custom/_NEW_README.md

É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
