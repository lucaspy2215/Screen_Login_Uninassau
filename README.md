# Lab Agenda — Front-End

<p align="center">
  <strong>Sistema de Agendamento e Gerenciamento de Laboratórios Acadêmicos</strong>
</p>

## Sobre o projeto

O **Lab Agenda** é uma aplicação web desenvolvida para facilitar o gerenciamento e a organização de reservas de laboratórios em um ambiente acadêmico.

O sistema foi desenvolvido com o objetivo de tornar o processo de agendamento mais organizado, facilitar o acompanhamento das reservas e proporcionar uma interface intuitiva para professores e administradores.

A aplicação conta com interfaces específicas para cada perfil de usuário, permitindo que professores acompanhem seus horários e solicitações, enquanto administradores gerenciam reservas e agendas dos laboratórios.

Este repositório contém exclusivamente o front-end da aplicação, responsável pela interface e experiência de interação do usuário.

## Funcionalidades

### Professor
- Visualização de horários e reservas.
- Solicitação de reserva de laboratórios.
- Acompanhamento do status das solicitações.
- Solicitação de cancelamento de reservas.
- Visualização da agenda pessoal.

### Administrador
- Visualização e gerenciamento de solicitações.
- Aprovação e rejeição de reservas.
- Gerenciamento das agendas dos laboratórios.
- Acompanhamento das reservas.
- Acesso às funcionalidades administrativas.

### Interface e navegação
- Interface organizada por perfil de usuário.
- Navegação entre páginas e funcionalidades.
- Componentes reutilizáveis.
- Layout desenvolvido para facilitar a utilização do sistema.

## Tecnologias utilizadas

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React**

## Interface do sistema

As interfaces do Lab Agenda foram planejadas e prototipadas no Figma, buscando proporcionar uma experiência intuitiva, organizada e consistente para os usuários.

<!-- Adicione abaixo as imagens exportadas do Figma -->

### Login

*Adicionar imagem da tela de login aqui.*

### Painel do administrador

*Adicionar imagem do painel administrativo aqui.*

### Agenda dos laboratórios

*Adicionar imagem da agenda aqui.*

### Solicitações de reserva

*Adicionar imagem da página de solicitações aqui.*

### Área do professor

*Adicionar imagem da área do professor aqui.*

## Protótipo no Figma

O protótipo do projeto pode ser acessado pelo link abaixo:

**[Acessar protótipo do Lab Agenda no Figma](COLE-O-LINK-DO-FIGMA-AQUI)**

## Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd screen-login
```

Instale as dependências:

```bash
npm install
```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Executando o projeto

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse pelo navegador:

```text
http://localhost:3000
```

## Estrutura do projeto

```text
src/
├── app/          # Páginas e rotas da aplicação
├── components/   # Componentes reutilizáveis
├── hooks/       # Hooks personalizados
├── lib/         # Utilitários e funções auxiliares
└── types/       # Tipagens TypeScript
```

## Status

Projeto em desenvolvimento.

---

Desenvolvido como projeto acadêmico para gerenciamento e organização de reservas de laboratórios.
