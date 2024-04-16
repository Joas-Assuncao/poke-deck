# Teste de Criação de Baralhos Pokémon

Este é um projeto de teste de código desenvolvido utilizando Angular 16+, Tailwind CSS e a biblioteca UI Infragistics. O objetivo deste teste é criar uma aplicação onde o usuário possa gerenciar baralhos de cartas Pokémon, com funcionalidades específicas e uma interface intuitiva e agradável.
Funcionalidades Obrigatórias
Lista de Baralhos

 -Visualização de Baralhos: O usuário pode visualizar todos os baralhos criados.
 -Criação de Baralho: O usuário pode criar um novo baralho, fornecendo um nome para ele.
 -Remoção de Baralho: O usuário pode remover um baralho existente.
 -Edição de Baralho: O usuário pode editar um baralho, alterando seu nome.
 -Detalhes do Baralho: O usuário pode clicar em um baralho para visualizar seus detalhes, incluindo quantos Pokémon e cartas de treinador existem, além de informações sobre as cores e tipos de cartas presentes.

## Criação de um Baralho

 -Nome do Baralho: O usuário pode inserir um nome para seu novo baralho.
 -Inserção de Cartas: O usuário pode adicionar cartas ao baralho.
 -Restrições de Cartas: O baralho deve conter no mínimo 24 cartas e no máximo 60, com um máximo de 4 cartas com o mesmo nome (não id) permitido no baralho.
 -Salvamento do Baralho: Após salvar o baralho, o usuário é redirecionado para a página de lista de baralhos atualizada.
 -Armazenamento em Memória: Os baralhos são salvos apenas em memória durante a execução da aplicação.

## Interface e Design

A interface da aplicação foi desenvolvida com foco na usabilidade e na estética. Utilizei a criatividade para criar uma experiência visualmente atraente e intuitiva para o usuário. A biblioteca UI Infragistics foi aproveitada para garantir uma interface consistente e responsiva.
Arquitetura e Desenvolvimento

O projeto foi desenvolvido utilizando Angular 16+, aproveitando as standalone components (nova feature da v16) para modularizar e organizar o código de forma eficiente. O uso de RxJS foi fundamental para controlar o estado dos baralhos, garantindo uma aplicação reativa e de fácil manutenção.
Ambiente de Desenvolvimento

Durante o desenvolvimento, utilizei um ambiente de desenvolvimento moderno, com as ferramentas mais recentes disponíveis. O Tailwind CSS foi adotado para facilitar o desenvolvimento de estilos e garantir uma aplicação visualmente atraente. Além disso, foram utilizadas boas práticas de desenvolvimento, como testes unitários e integração contínua.
Repositório

O código fonte deste projeto está disponível no GitHub [Pokemon-Deck][https://github.com/Joas-Assuncao/pokemon-deck]. Certifique-se de verificar o arquivo README.md para mais informações sobre como executar o projeto localmente e detalhes adicionais sobre a arquitetura e funcionalidades implementadas.

Este projeto foi desenvolvido como parte do teste proposto pela Agência Estado. Agradeço pela oportunidade de participar deste processo seletivo e estou à disposição para quaisquer dúvidas ou esclarecimentos adicionais.

# Melhorias

- UI: Poderia ser aprimorada para uma experiência mais visualmente atrativa, embora tenha sido priorizada a implementação das funcionalidades solicitadas.
  
- UX: Gostaria de incluir filtros mais abrangentes, como por tipo, supertipo e raridade, para melhorar a navegabilidade e a precisão nas buscas.
  
- Código: Planejo aprimorar as funções existentes e otimizar ainda mais o código, visando uma melhor modularização e componentização.

- Testes: Pretendo adicionar testes para garantir a integridade do código e a robustez das funcionalidades implementadas.

# Ferramentas para usufruir do projeto

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.