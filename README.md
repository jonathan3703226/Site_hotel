Markdown
# Hotel Samamba — Plataforma Web de Hospedagem 🏨

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-SEMÂNTICO_&_W3C-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-RESPONSIVO-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-POO_VANILLA-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript POO" />
  <img src="https://img.shields.io/badge/Acessibilidade-WCAG_AAA-005A9C?style=for-the-badge&logo=w3c&logoColor=white" alt="Acessibilidade W3C" />
  <img src="https://img.shields.io/badge/LGPD-CONFORME-008000?style=for-the-badge" alt="LGPD" />
  <img src="https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge" alt="Status" />
</div>

Aplicação web responsiva e acessível desenvolvida para o **Hotel Samamba**, localizado em Samambaia no Distrito Federal O projeto prioriza uma arquitetura front-end limpa baseada no paradigma de **Programação Orientada a Objetos (POO)** em JavaScript puro (Vanilla JS), aliada a controles rigorosos de **acessibilidade (W3C/WCAG)**, **privacidade de dados (LGPD)** e suporte **multilingue (i18n)**.

> Uma solução front-end completa desenvolvida como trabalho acadêmico, simulando a experiência real de reserva hoteleira, transparência contratual e usabilidade universal sem dependência de frameworks externos.

🔗 **[Acesse a aplicação em produção aqui](https://jonathan3703226.github.io/Site_hotel/)**

---

## 🚀 O Projeto & Estudo de Caso

O projeto do **Hotel Samamba** foi idealizado para atender 5 exigências centrais de desenvolvimento web moderno: **Estrutura POO**, **Acessibilidade W3C**, **Conformidade LGPD**, **Profissionalismo & UX** e **Internacionalização (Opcional)**[.

A arquitetura JS substituiu abordagens procedurais antigas por uma estrutura **modular baseada em classes**, onde cada gerenciador lida de forma autônoma com estado, interatividade e renderização de modais.

### 🎯 Diferenciais Técnicos & Usabilidade:

*   **Arquitetura POO em JS:** Organização em classes (`Acomodacao`, `GerenciadorAcessibilidade`, `GerenciadorTraducao`, `GerenciadorCookies`, `GerenciadorModal`, `GerenciadorReserva` e `HotelApp`), promovendo encapsulamento e reaproveitamento de código.
*   **Recursos de Acessibilidade W3C (WCAG):** Barra superior de controles com ajuste dinâmico de tamanho de fonte, modo Alto Contraste (alto impacto visual), realce de links e leitor de tela nativo via Web Speech API (`SpeechSynthesisUtterance`).
*   **Conformidade com a LGPD:** Banner de consentimento de cookies essenciais vs. analíticos com salvamento de estado local, além de modal dedicado para a Política de Privacidade e Direitos do Titular.
*   **Internacionalização em Tempo Real (i18n):** Suporte nativo a 3 idiomas (Português, Inglês e Espanhol) com tradução instantânea da interface e dos fluxos dinâmicos sem recarregar a página.
*   **Abordagem Mobile-First & Touch:** Carrosséis otimizados para suporte a gestos de deslizar (*swipe*) em telas sensíveis ao toque.

---

## ✨ Funcionalidades (Features)

*   **Catálogo de Suítes:** Apresentação visual e detalhada de acomodações (Solteiro, Casal, Duplo, Triplo e Família) com carrosséis individuais de imagens.
*   **Sistema de Pré-reserva Dinâmico:** Modal com seletor interativo de datas (check-in/check-out), cálculo automático de diárias, adição de taxa para pets e validação de e-mail/contato em tempo real.
*   **Controles de Acessibilidade:** Painel fixo para acessibilidade visual e auditiva.
*   **Gestão de Cookies LGPD:** Notificação e painel de controle de preferências de privacidade com persistência em `localStorage`.
*   **Seletor de Idiomas (i18n):** Troca dinâmica de idioma no cabeçalho com aplicação global imediata em todo o conteúdo textual do site.
*   **Serviços e Regras Úteis:** Seções sobre estadia para pets, horários de check-in/out, gratuidade para crianças e mapa interativo de localização em Samambaia-DF.

### Limites da demonstração front-end

Este projeto é uma demonstração de interface front-end e não possui um servidor backend ou banco de dados conectado. As solicitações de reserva operam como **simulações de pré-reserva**. Não são efetuadas cobranças reais nem processamento de pagamentos. As preferências do usuário (idioma, acessibilidade e aceite de cookies) são armazenadas apenas localmente no navegador (`localStorage`).

---

## 🛠️ Tecnologias Utilizadas (Stack)

*   **HTML5:** Estruturação semântica com tags específicas (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`) e atributos ARIA para acessibilidade.
*   **CSS3:** Layouts construídos com Flexbox e CSS Grid, uso de variáveis globais, suporte ao modo alto contraste e Media Queries para responsividade total.
*   **JavaScript (ES6+ POO):**
    *   Estruturação em Classes (Orientação a Objetos).
    *   Web APIs nativas (DOM, SpeechSynthesis, IntersectionObserver, LocalStorage).
*   **FontAwesome & Google Fonts:** Ícones e fontes web (`Montserrat` e `Open Sans`).
*   **Git & GitHub:** Versionamento de código e deploy automatizado via GitHub Pages.

---

## ⚙️ Como Executar Localmente

1. Clone este repositório:
   ```bash
   git clone [https://github.com/jonathan3703226/Site_hotel.git](https://github.com/jonathan3703226/Site_hotel.git)

2. Abra a pasta do projeto na sua IDE de preferência (ex: VS Code).

3. Inicie um servidor local. Recomendamos a extensão Live Server do VS Code (porta padrão 5500).

4. O navegador abrirá automaticamente a aplicação.


 Conecte-se comigo no 🔗 **[LinkedIn](https://www.linkedin.com/in/jonathan-oliveira-ads/)**
