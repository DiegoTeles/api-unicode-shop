# Projeto Backend em NestJS

Este é um projeto backend em NestJS que utiliza várias bibliotecas para facilitar o desenvolvimento de aplicativos web e API. Abaixo, descrevo as bibliotecas usadas e explico por que elas são úteis para este projeto.

## Bibliotecas Utilizadas

1. **pg (PostgreSQL):** O PostgreSQL é um sistema de gerenciamento de banco de dados relacional altamente confiável. Ele é amplamente utilizado para armazenar dados em aplicativos web e oferece recursos avançados de consulta e segurança.

2. **creditcard.js:** Esta biblioteca oferece funcionalidades para validar e gerar números de cartão de crédito. É útil ao lidar com transações financeiras em seu aplicativo.

3. **Swagger:** O Swagger é uma estrutura de código aberto que permite a documentação e geração de APIs de forma automática. Facilita a documentação da API e a visualização interativa das rotas.

4. **bcrypt:** O bcrypt é uma biblioteca usada para a criptografia de senhas. Ela ajuda a armazenar senhas com segurança no banco de dados, evitando que elas sejam armazenadas em texto simples.

5. **passport-jwt:** O Passport é um middleware de autenticação amplamente utilizado em Node.js. O passport-jwt é uma estratégia que permite autenticar solicitações com base em tokens JWT (JSON Web Tokens).

6. **date-fns:** O date-fns é uma biblioteca de manipulação de datas em JavaScript que facilita a formatação, cálculos e manipulação de datas.

7. **winston:** O Winston é um logger para Node.js que permite a gravação de logs de aplicativos. É útil para rastrear erros e eventos importantes em seu aplicativo.

8. **sequelize-typescript:** O Sequelize é um ORM (Object-Relational Mapping) para bancos de dados SQL. O sequelize-typescript é uma extensão do Sequelize que adiciona suporte a tipos TypeScript.

9. **class-validator:** O class-validator é uma biblioteca que permite a validação de objetos em TypeScript/JavaScript. É útil para validar dados de entrada antes de processá-los.

10. **class-transformer:** O class-transformer é usado em conjunto com o class-validator para transformar objetos em diferentes formatos. Pode ser útil ao manipular dados antes de enviá-los como resposta em uma API.

## Como Começar

Para começar a usar este projeto, siga estas etapas:

1. Uso do Docker e Kubernetes

Para facilitar a implantação e escalabilidade de seu aplicativo, recomendo o uso do Docker e Kubernetes para subir a PI e o banco de dados. 

Aqui estão os passos básicos para implantação em um cluster Kubernetes usando contêineres Docker:

```bash
docker compose up
```

### ou

1. Clone o repositório em sua máquina local:

   ```bash
   git clone https://seu-repositorio.git
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Configure o banco de dados PostgreSQL e atualize as informações de conexão no arquivo `.env`.

4. Inicie o servidor NestJS:

   ```bash
   npm run start
   ```

Agora você pode começar a desenvolver seu aplicativo web ou API usando as bibliotecas mencionadas. Certifique-se de explorar a documentação de cada biblioteca para entender melhor como usá-las em seu projeto.

## Documentação

- Documentação do NestJS: [Link da Documentação](https://nestjs.com/)
- Documentação do Swagger: [Link da Documentação](https://swagger.io/)
- Documentação do bcrypt: [Link da Documentação](https://www.npmjs.com/package/bcrypt)
- Documentação do passport-jwt: [Link da Documentação](http://www.passportjs.org/packages/passport-jwt/)
- Documentação do date-fns: [Link da Documentação](https://date-fns.org/)
- Documentação do Winston: [Link da Documentação](https://github.com/winstonjs/winston)
- Documentação do Sequelize: [Link da Documentação](https://sequelize.org/)
- Documentação do class-validator: [Link da Documentação](https://github.com/typestack/class-validator)
- Documentação do class-transformer: [Link da Documentação](https://github.com/typestack/class-transformer)

## Contribuição

Se você deseja contribuir para este projeto, fique à vontade para abrir problemas (issues) ou enviar solicitações de pull (pull requests). Sua ajuda é bem-vinda!

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais detalhes.
