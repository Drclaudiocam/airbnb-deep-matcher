---
name: Airbnb Deep Match
version: 1.0.0
colors:
  primary: "#FF385C"
  primary-hover: "#E00B41"
  primary-light: "#FFF1F3"
  secondary: "#0F172A"
  secondary-light: "#1E293B"
  surface: "#FFFFFF"
  surface-dark: "#0B0F17"
  card-bg: "#F8FAFC"
  card-bg-dark: "#131C2E"
  border: "#E2E8F0"
  border-dark: "#1E293B"
  text-main: "#0F172A"
  text-main-dark: "#F8FAFC"
  text-muted: "#64748B"
  text-muted-dark: "#94A3B8"
  emerald-confirm: "#10B981"
  emerald-bg: "#ECFDF5"
  amber-warning: "#F59E0B"
  amber-bg: "#FFFBEB"
  rose-alert: "#EF4444"
  rose-bg: "#FEF2F2"
  indigo-accent: "#6366F1"
  indigo-bg: "#EEF2FF"
typography:
  fontFamily: "Plus Jakarta Sans, Inter, sans-serif"
  headline-xl: { fontSize: "32px", fontWeight: "700", lineHeight: "1.2" }
  headline-lg: { fontSize: "24px", fontWeight: "700", lineHeight: "1.25" }
  headline-md: { fontSize: "18px", fontWeight: "600", lineHeight: "1.3" }
  body-md: { fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }
  body-sm: { fontSize: "12px", fontWeight: "400", lineHeight: "1.4" }
  label-bold: { fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
  badge-fidelity:
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# Airbnb Deep Match - Design Specification

## Overview
Interface de alta fidelidade visual, refinamento e clareza analítica. O design combina a identidade visual acolhedora do Airbnb (tons de coral vibrante `#FF385C`) com o rigor técnico de um dashboard analítico contemporâneo (Slate escuro `#0F172A`, gradientes sutis, glassmorphism e badges de evidência de alta legibilidade).

## Visual Tokens & Palette
- **Primary Coral (`#FF385C`):** Cor de destaque para CTAs principais, match scores altos e ações afirmativas.
- **Dark Canvas (`#0B0F17` / `#131C2E`):** Fundo imersivo com contraste confortável no modo escuro.
- **Confirmation Emerald (`#10B981`):** Sinaliza itens confirmados por hóspedes reais nas avaliações.
- **Cautionary Amber (`#F59E0B`):** Sinaliza itens que o anfitrião promete mas não há menção ou há ressalva de hóspedes.
- **Alert Rose (`#EF4444`):** Sinaliza reclamações explícitas de hóspedes (ex: "aquecedor quebrado").

## Typography
- Família Principal: `Plus Jakarta Sans`, com fallback para `Inter`.
- Hierarquia nítida, espaçamento generoso e números tabulares para pontuações e comparativos de preço.

## Components & Micro-interactions
- **Side-by-Side Sticky Matrix:** Cabeçalhos de anúncios fixos ao rolar horizontal e verticalmente.
- **Audit Tooltip / Drawer:** Ao clicar em qualquer critério, exibe com precisão as citações dos hóspedes com data e estrelas.
- **Match Gauge:** Gráfico circular animado de aderência ao perfil do usuário.
- **Trip Companion Voting:** Botões táteis de curtir/descurtir e contador dinâmico em tempo real.
