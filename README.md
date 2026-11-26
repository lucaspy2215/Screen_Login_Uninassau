# Imagem Login

<img width="1232" height="720" alt="Captura de Tela 2026-11-26 às 14 43 05" src="https://github.com/user-attachments/assets/b55ad7e9-a87f-41b4-9831-178dfa3d1907" />

# Painel Admin
<img width="1127" height="808" alt="Captura de Tela 2026-11-26 às 14 44 11" src="https://github.com/user-attachments/assets/b8453d88-1962-465b-a392-21886e65da49" />

# Agenda Labs
<img width="1194" height="790" alt="Captura de Tela 2026-11-26 às 14 44 56" src="https://github.com/user-attachments/assets/45ee6016-a6c6-4507-9a42-955012585c40" />

# Solicitar Reserva 
<img width="418" height="679" alt="Captura de Tela 2026-11-26 às 14 46 03" src="https://github.com/user-attachments/assets/48d26d58-174a-4bf3-b65c-5d3deb73511c" />

# Painel Professor
<img width="1132" height="813" alt="Captura de Tela 2026-11-26 às 15 06 03" src="https://github.com/user-attachments/assets/f3b6b17b-dbb5-401b-9eae-5e6f352debdf" />


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

<img width="1232" height="720" alt="Captura de Tela 2026-11-26 às 14 43 05" src="https://github.com/user-attachments/assets/b55ad7e9-a87f-41b4-9831-178dfa3d1907" />

### Painel do administrador

<img width="1127" height="808" alt="Captura de Tela 2026-11-26 às 14 44 11" src="https://github.com/user-attachments/assets/b8453d88-1962-465b-a392-21886e65da49" />

### Agenda dos laboratórios

<img width="1194" height="790" alt="Captura de Tela 2026-11-26 às 14 44 56" src="https://github.com/user-attachments/assets/45ee6016-a6c6-4507-9a42-955012585c40" />

### Solicitações de reserva

<img width="418" height="679" alt="Captura de Tela 2026-11-26 às 14 46 03" src="https://github.com/user-attachments/assets/48d26d58-174a-4bf3-b65c-5d3deb73511c" />

### Área do professor

<img width="1132" height="813" alt="Captura de Tela 2026-11-26 às 15 06 03" src="https://github.com/user-attachments/assets/f3b6b17b-dbb5-401b-9eae-5e6f352debdf" />

## Protótipo no Figma

<img width="814" height="782" alt="Captura de Tela 2026-11-26 às 15 08 20" src="https://github.com/user-attachments/assets/f3306d51-ac45-4c96-9309-355a79ae8e94" />


**[Acessar protótipo do Lab Agenda no Figma](https://www.figma.com/design/LPh3jcYR9S49rnmPUadnzx/Lab?node-id=0-1&p=f&t=viGdsfI4chkYsXz5-0)**

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
