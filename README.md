# Lab Agenda — Front-End

<p align="center">
  <strong>Sistema de Agendamento e Gerenciamento de Reservas de Laboratórios</strong>
</p>

## Sobre o projeto

O **Lab Agenda** é uma aplicação web desenvolvida para gerenciar reservas e utilização de laboratórios em um ambiente acadêmico. O sistema tem como objetivo organizar os horários de utilização dos laboratórios, facilitar o processo de agendamento e centralizar o gerenciamento das reservas realizadas por professores e administradores.

A aplicação permite que professores solicitem reservas, acompanhem seus agendamentos e solicitem cancelamentos, enquanto os administradores possuem ferramentas para gerenciar solicitações, aprovar ou rejeitar reservas e acompanhar as agendas dos laboratórios.

Este repositório contém o front-end do sistema, desenvolvido utilizando Next.js e TypeScript.

## Funcionalidades

### Autenticação e controle de acesso
- Login de usuários.
- Gerenciamento de sessões autenticadas.
- Navegação diferenciada de acordo com o perfil do usuário.
- Proteção de páginas de acordo com as permissões.
- Integração com o sistema de autenticação do back-end.

### Funcionalidades do professor
- Visualização de reservas e horários.
- Solicitação de reservas de laboratórios.
- Acompanhamento do status das solicitações.
- Solicitação de cancelamento de reservas.
- Visualização da agenda pessoal.

### Funcionalidades do administrador
- Gerenciamento de solicitações de reservas.
- Aprovação ou rejeição de solicitações.
- Gerenciamento e acompanhamento das agendas.
- Visualização das informações das reservas.
- Acesso às funcionalidades administrativas.

### Gerenciamento de agendas e reservas
- Visualização organizada das reservas.
- Organização por laboratório e turno.
- Acompanhamento dos status das reservas.
- Integração com o back-end para consulta e atualização dos dados.

## Tecnologias utilizadas

- **Next.js** — Framework React para desenvolvimento de aplicações web.
- **React** — Biblioteca para construção de interfaces.
- **TypeScript** — Tipagem estática e maior segurança no desenvolvimento.
- **Tailwind CSS** — Framework de estilização baseado em classes utilitárias.
- **Lucide React** — Biblioteca de ícones para interfaces.
- **Fetch API** — Comunicação com a API do back-end.

## Estrutura do projeto

```text
screen-login/
├── public/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── agenda/
││   │   │   ├── requests/
││   │   │   ├── schedules/
││   │   │   ├── teachers/
││   │   │   └── report/
││   │   ├── professor/
││   │   │   ├── agenda/
││   │   │   └── schedules/
││   │   ├── login/
││   │   └── register-teacher/
││   ├── components/
││   ├── hooks/
││   ├── lib/
││   └── types/
└── ...
```

## Requisitos

Para executar o projeto localmente, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- npm
- Back-end do Lab Agenda em execução ou disponível em uma URL configurada.

## Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Entre na pasta do projeto:

```bash
cd screen-login
```

Instale as dependências:

```bash
npm install
```

## Configuração das variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto e configure a URL da API do back-end:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Certifique-se de que o back-end esteja em execução e acessível pela URL configurada.

## Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Em seguida, acesse no navegador:

```text
http://localhost:3000
```

## Integração com o back-end

O front-end se comunica com o back-end do Lab Agenda por meio de requisições HTTP, utilizando uma API REST.

A autenticação utiliza JWT (JSON Web Token). Após o login, a sessão do usuário é armazenada no navegador e o token de autenticação é enviado nas requisições aos endpoints protegidos.

O sistema utiliza controle de acesso por perfil, diferenciando professores e administradores, garantindo que cada usuário tenha acesso às funcionalidades correspondentes à sua função.

## Fluxo de cancelamento de reservas

Os professores não possuem permissão para excluir diretamente reservas confirmadas.

Em vez disso, podem solicitar o cancelamento de uma reserva. A solicitação fica pendente de análise pelo administrador, preservando o registro da reserva e permitindo que o processo de cancelamento seja controlado.

## Desenvolvimento

O projeto utiliza uma arquitetura baseada em componentes, mantendo a separação entre páginas, componentes reutilizáveis, hooks, utilitários de comunicação com a API e tipagens.

Essa organização contribui para a manutenção, reutilização de código e evolução das funcionalidades da aplicação.

## Status do projeto

O projeto encontra-se em desenvolvimento, recebendo continuamente novas funcionalidades, melhorias e correções.

## Repositório relacionado

- **Back-End:** responsável pela API, regras de negócio, autenticação e persistência dos dados.

---

Desenvolvido como projeto acadêmico para gerenciamento de reservas e utilização de laboratórios.
