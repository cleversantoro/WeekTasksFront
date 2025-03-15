# WeekTasks Frontend

Este é o frontend para o aplicativo WeekTasks, construído com React e Vite. Ele permite que os usuários se registrem, façam login e gerenciem suas tarefas.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 7 ou superior)

## Primeiros Passos

1. Clone o repositório:

   ```sh
   git clone https://github.com/seuusuario/weektasks-frontend.git
   cd weektasks-frontend
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Crie um arquivo `.env` no diretório raiz e adicione a seguinte variável de ambiente:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Inicie o servidor de desenvolvimento:

   ```sh
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:5173`.

## Construindo para Produção

Para construir a aplicação para produção, execute:

```sh
npm run build
```

Os arquivos prontos para produção estarão no diretório `dist`.

## Executando com Docker

1. Construa a imagem Docker:

   ```sh
   docker build -t weektasks-frontend .
   ```

2. Execute o contêiner Docker:

   ```sh
   docker run -p 80:80 weektasks-frontend
   ```

   A aplicação estará disponível em `http://localhost`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Constrói a aplicação para produção.
- `npm run lint`: Executa o ESLint para verificar erros de lint.
- `npm run preview`: Visualiza a build de produção localmente.

## Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação.
  - `pages/`: Contém os componentes de página (Login, Register, Tasks).
  - `services/`: Contém a configuração do serviço API.
  - `App.jsx`: Componente principal da aplicação.
  - `main.jsx`: Ponto de entrada da aplicação.
- `public/`: Contém os ativos públicos.
- `index.html`: Arquivo HTML principal.
- `tailwind.config.js`: Configuração do Tailwind CSS.
- `vite.config.js`: Configuração do Vite.

## Licença

Este projeto está licenciado sob a Licença MIT.
