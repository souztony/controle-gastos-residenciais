# 🎨 Controle de Gastos - Frontend (UI)

A interface do sistema de Controle de Gastos Residenciais é uma aplicação moderna, rápida e intuitiva, focada na melhor experiência de usuário possível.

## ✨ Características

- **Visual Premium**: Design moderno utilizando **Glassmorphism** e paleta de cores harmoniosa.
- **Responsividade**: Adaptável a diferentes tamanhos de tela.
- **Feedback Visual**: Badges, estados de hover e transições suaves.
- **Tipografia**: Utiliza as fontes `Inter` e `Outfit` (Google Fonts) para máxima legibilidade.

## 🛠️ Stack Tecnológica

- **Core**: [React 19](https://react.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilização**: CSS Nativo (Vanilla CSS) com variáveis modernas.
- **Ícones**: Lucide React (integrado via componentes).

## 📂 Estrutura de Código

- `/src/pages`: Páginas da aplicação (Pessoas, Categorias, Transações, Totais).
- `/src/components`: Componentes reutilizáveis (Tabelas, Formulários).
- `/src/api`: Configurações de consumo da API Backend.
- `/src/types`: Definições de interfaces TypeScript.
- `/src/index.css`: Design System e variáveis de estilo.

## 🚀 Como Rodar

1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Executar em Desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Acesse no Navegador**:
   O Vite servirá a aplicação em [http://localhost:5173](http://localhost:5173).

## 🏗️ Build para Produção

Para gerar a versão otimizada da aplicação:

```bash
npm run build
```

Os arquivos finais serão gerados na pasta `/dist`.

---
> [!TIP]
> Certifique-se de que o Backend esteja rodando para que os dados sejam carregados corretamente na interface.
