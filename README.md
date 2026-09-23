# 🏠 Airbnb Deep Matcher | Buscador & Comparador Inteligente

Aplicação full-stack de alto desempenho para busca profunda, análise semântica e comparação lado a lado de acomodações do Airbnb. 

Diferente da busca padrão que apenas olha tags genéricas, o **Airbnb Deep Matcher** analisa:
1. **Comodidades Oficiais** cadastradas.
2. **Descrição do Anfitrião** (marcas, modelos e detalhes específicos como *Airfryer Mondial*, *Nespresso*, *Bomba de Calor*).
3. **Histórico de Avaliações de Hóspedes** (para comprovar se a água da piscina esquenta de verdade, se o Wi-Fi suporta chamadas de vídeo e se a cozinha é bem equipada).

---

## 🚀 Funcionalidades Principais

- 🏊 **Auditoria de Piscina Aquecida & Climatizada:** Identifica se o aquecimento é solar, trocador de calor (bomba elétrica) ou a gás, além de alertar se hóspedes relataram piscina fria em dias nublados.
- 🍳 **Varredura de Eletrodomésticos Específicos:** Detecção de **Airfryer**, máquina de café expresso/cápsulas, lava-louças, taças de vinho e utensílios completos.
- 🛡️ **Score de Fidelidade (Promessa vs. Realidade):** Cruzamento automático entre o que o anfitrião promete no anúncio e os relatos reais nas avaliações.
- 🎯 **Perfis de Busca Personalizados:** Presets pré-configurados (*Lazer & Piscina*, *Gourmet & Cozinha*, *Home Office*, *Família & Crianças*) e criador de perfis customizados com pesos ponderados e itens obrigatórios.
- 📊 **Matriz Comparativa Lado a Lado:** Tabela comparativa com cabeçalho fixo, destaques de diferenças e indicador de "Top Pick".
- 🔍 **Busca Ad-hoc de Termos:** Campo de busca em tempo real para qualquer item (ex: *cervejeira*, *berço*, *rede de proteção*, *secador*).
- 👥 **Votação para Companheiros de Viagem:** Sistema de votos e comentários para grupos decidirem juntos.
- 📄 **Exportação de Relatórios:** Download de relatório em **PDF Executivo** e cópia de resumo formatado para envio no **WhatsApp**.
- ⚡ **Banco de Benchmarks Reais (1-Clique):** Teste imediato com 5 acomodações completas em destinos turísticos brasileiros (Gramado, Ubatuba, Campos do Jordão, Florianópolis, Ilhabela).

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons, Framer Motion, jsPDF, canvas-confetti.
- **Backend:** Node.js, Express, Axios, Cheerio (Web Scraping/Parsing de JSON-LD e HTML), Compromise/Regex Taxonomy Engine.
- **Design System:** Baseado em tokens definidos no [`DESIGN.md`](./DESIGN.md) com tema dark slate e acentos em coral Airbnb (`#FF385C`).

---

## 🏃 Como Rodar Localmente

### 1. Iniciar o Backend:
```bash
cd server
npm start
```
O servidor iniciará em `http://localhost:3001`.

### 2. Iniciar o Frontend:
```bash
cd client
npm run dev
```
Acesse `http://localhost:5173` no seu navegador.

### 3. Rodar Testes do Motor de Análise:
```bash
cd server
npm test
```
