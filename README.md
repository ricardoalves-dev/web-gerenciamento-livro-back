# Web - Gerenciamento de Livros

**Tema da Aplicação: Sistema de Controle para Biblioteca**

**Objetivo:**
Desenvolver uma aplicação web completa que englobe frontend, backend e   de dados para gerenciamento de uma biblioteca. A aplicação deve oferecer funcionalidades para que os usuários possam efetuar o cadastro, visualização, edição, exclusão, reserva e devolução de livros. Cada livro deve estar vinculado a uma categoria específica e contar com um estoque limitado de exemplares. Além disso, a aplicação deverá suportar o gerenciamento de categorias, permitindo seu cadastro, visualização, edição e remoção.

# **Requisitos**

### **Backend (Servidor HTTP)**

- Utilizar comunicação HTTP com os métodos GET, POST, PUT, PATCH e DELETE.
- Conectar-se a um banco de dados relacional.

### **Modelo do Banco de Dados:**
![image](https://github.com/user-attachments/assets/56b2dea4-689a-46ef-aeec-17507d634115)

### **Frontend (Interface acessível via navegador web)**

- Criar uma interface para exibir a lista de livros, suas informações e categoria.
- Possibilitar a busca de livros por título, autor ou categoria.
- Permitir cadastro, edição e exclusão de livros e categorias.
- Permitir a reserva e devolução de livros.

## **Validações e Regras de Negócios**

- O título e autor de um livro são obrigatórios.
- O ano de publicação deve ser um valor válido e não pode ser maior que o ano atual.
- A reserva de um livro só pode ser feita se houver exemplares disponíveis.
- Ao devolver um livro, deve-se verificar se realmente há algum exemplar reservado.
- Feedback visual para indicar se há exemplares disponíveis de um livro e quantos são.
- Validações de formulários e tratativas de erros, com os códigos de erro HTTP corretos.

  ## **Critérios de Avaliação**

- Implementação completa dos CRUDs tanto no backend quanto no frontend.
- Aplicação correta das regras de negócio.
- Organização do código e adoção de boas práticas de desenvolvimento.
- Interface amigável e responsiva.
- Manipulação adequada do relacionamento no banco de dados.

## **Entrega**

- O candidato deve fornecer o código fonte da aplicação em um repositório remoto Git (GitHub, BitBucket, etc.) público e enviar a url para o e-mail: [**henriquebedendo@teksystem.com.br**](mailto:henriquebedendo@teksystem.com.br)
- Incluir instruções claras sobre como configurar o ambiente, instalar e executar a aplicação localmente.
- Disponibilizar um Script SQL para criação das tabelas no banco de dados, ou instruções de como executar as migrations no caso de uso de ORM.
- Um arquivo **`README.md`** deve conter uma breve descrição da solução, as tecnologias utilizadas e quaisquer instruções adicionais que o candidato considere relevantes.
