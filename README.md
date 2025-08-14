# Portfolio Web - Programação para Internet 1

## 📋 Descrição do Projeto

Este projeto foi desenvolvido como trabalho final da disciplina **Programação para Internet 1** do curso de **Análise e Desenvolvimento de Sistemas (ADS)**. O objetivo é demonstrar o domínio das tecnologias web fundamentais (HTML, CSS e JavaScript) através da implementação de funcionalidades dinâmicas e interativas.

## 👥 Equipe

- **Desenvolvedor Principal**: [Seu Nome Aqui]
- **Disciplina**: Programação para Internet 1
- **Professor**: Maykol
- **Curso**: Análise e Desenvolvimento de Sistemas (ADS)

## 🚀 Funcionalidades Implementadas

### ✅ 1. Carousel (carousel.js)
- **Localização**: Seção Hero da página inicial
- **Características**:
  - Transição automática a cada 5 segundos
  - Navegação manual com botões "Anterior" e "Próximo"
  - Pausa inteligente ao passar o mouse (hover)
  - Reinício do temporizador após interação manual
  - Suporte a touch/swipe em dispositivos móveis
  - Indicadores visuais de slide ativo

### ✅ 2. Sistema de Filtragem (filter.js)
- **Localização**: Seção Portfólio
- **Características**:
  - Filtros por tecnologia (React, JavaScript, PHP, Python, Django)
  - Botão "Todos" para exibir todos os projetos
  - Animações suaves na transição entre filtros
  - Contador dinâmico de projetos visíveis
  - Busca rápida adicional por tecnologia

### ✅ 3. Pesquisa Global (search.js)
- **Localização**: Barra de pesquisa no header
- **Características**:
  - Busca assíncrona em tempo real
  - Análise de conteúdo HTML usando DOMParser
  - Busca em tags de texto (h1, h2, p, a, etc.)
  - Exibição de resultados com contexto
  - Página dedicada de resultados (pages/search.html)
  - Destaque dos termos encontrados

### ✅ 4. Sistema de Login (login.js)
- **Localização**: Modal acessível pelo header
- **Características**:
  - Modal responsivo para login
  - Validação rigorosa conforme especificações:
    - Usuário: máximo 15 caracteres, não vazio
    - Senha: mínimo 8 caracteres, 2 números, 1 especial, 1 maiúscula, 1 minúscula
  - Controle de estado logado/deslogado
  - Persistência no localStorage
  - Dropdown de usuário após login
  - Credenciais de teste disponíveis

### ✅ 5. Validação de Formulários (contact.js, login.js)
- **Localização**: Formulários de Login e Contato
- **Características**:
  - Validação em tempo real
  - Feedback personalizado (toasts, não alert padrão)
  - Contador de caracteres em tempo real para mensagem
  - Validação de email com regex
  - Simulação de envio para email
  - Mensagens de erro contextualizadas

### ✅ 6. Efeitos e Animações (ui-enhancements.js)

#### 6.1 Botão "Voltar ao Topo"
- Aparece após 300px de scroll
- Animação suave de scroll para o topo
- Feedback visual no clique

#### 6.2 Funcionalidade de Clipboard
- Botão "Copiar" para email de contato
- Feedback visual: "Copiado!" por 2 segundos
- Suporte a API moderna e fallback para navegadores antigos

#### 6.3 Alternador de Tema (Claro/Escuro)
- Botão de alternância no header
- Persistência da preferência no localStorage
- Aplicação imediata para evitar "piscar"
- Variáveis CSS para gerenciamento centralizado de cores
- Detecção automática da preferência do sistema

## 🎨 Requisitos Não-Funcionais Atendidos

### ✅ Responsividade
- Layout totalmente responsivo (desktop, tablet, mobile)
- Menu hamburger para telas menores
- Breakpoints bem definidos
- Layouts fluidos com Flexbox e Grid

### ✅ Qualidade do Código
- JavaScript limpo, legível e comentado
- Separação lógica em arquivos por funcionalidade
- Seletores semânticos e organizados
- HTML5 semântico com tags apropriadas
- CSS com variáveis para manutenibilidade

### ✅ Acessibilidade
- Navegação por teclado
- Indicadores visuais de foco
- Suporte a leitores de tela
- Contraste adequado entre temas

## 📁 Estrutura do Projeto

```
projeto-web-proint/
├── index.html              # Página principal
├── README.md               # Este arquivo
├── css/
│   ├── styles.css          # Estilos principais com variáveis CSS
│   └── responsive.css      # Media queries e responsividade
├── js/
│   ├── script.js           # Script principal e gerenciamento de estado
│   ├── carousel.js         # Funcionalidade do carrossel
│   ├── filter.js           # Sistema de filtragem de portfólio
│   ├── search.js           # Sistema de pesquisa global
│   ├── login.js            # Sistema de login e validação
│   ├── contact.js          # Validação do formulário de contato
│   └── ui-enhancements.js  # Efeitos, animações e tema
├── pages/
│   └── search.html         # Página de resultados de pesquisa
└── images/                 # Pasta para imagens (vazia no momento)
```

## 🔧 Como Executar

1. **Clone ou baixe o projeto**
2. **Abra o arquivo `index.html` em um navegador web moderno**
3. **Ou use um servidor local** (recomendado):
   ```bash
   # Com Python 3
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   
   # Com PHP
   php -S localhost:8000
   ```

## 🧪 Credenciais de Teste

Para testar o sistema de login, use uma das credenciais abaixo:

- **Usuário**: `admin` | **Senha**: `Admin123!`
- **Usuário**: `user` | **Senha**: `User123!`
- **Usuário**: `test` | **Senha**: `Test123!`

## 🌟 Funcionalidades Extras Implementadas

- **Busca em tempo real** com debounce
- **Animações de entrada** para elementos
- **Suporte a touch/swipe** no carrossel
- **Dropdown de usuário** após login
- **Detecção automática** de preferência de tema do sistema
- **Feedback visual** em todas as interações
- **Estados de loading** em formulários
- **Navegação por teclado** melhorada

## 🎯 Critérios de Avaliação Atendidos

| Critério | Peso | Status | Observações |
|----------|------|--------|-------------|
| **Implementação Funcional** | 50% | ✅ | Todas as funcionalidades implementadas conforme especificações |
| **Qualidade do Código** | 20% | ✅ | Código organizado, comentado e seguindo boas práticas |
| **Design e Responsividade** | 20% | ✅ | Layout responsivo e visualmente agradável |
| **Apresentação** | 10% | ✅ | Projeto pronto para demonstração |

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com variáveis, Flexbox e Grid
- **JavaScript ES6+** - Funcionalidades dinâmicas
- **LocalStorage** - Persistência de dados
- **Intersection Observer API** - Animações de scroll
- **Clipboard API** - Funcionalidade de copiar

## 📱 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móveis (iOS/Android)

## 🔮 Possíveis Melhorias Futuras

- Integração com API real para autenticação
- Sistema de comentários nos projetos
- Galeria de imagens com lightbox
- Integração com redes sociais
- Sistema de contato com backend real
- PWA (Progressive Web App) features

---

**Desenvolvido com ❤️ para a disciplina Programação para Internet 1**
