# 001. Stack do site da Baran Tecnologia

Data: 2026-10-02
Status: aceita

## Contexto

O site da Baran Tecnologia é institucional e de captação: apresenta serviços, cases e contato, e recebe tráfego frio de mensagens diretas, LinkedIn e indicações. Não tem login, banco de dados nem backend, e tem uma pessoa mantendo. Vai crescer de 2 para cerca de 5 páginas (home, crédito, migração, parcerias, manifesto).

## Decisão

1. **Agora (02/10/2026):** HTML estático, com `index.html` e `crediario.html`, para validar o posicionamento e começar a enviar o site.
2. **Próximo passo:** migrar para **Astro** (saída estática), antes de criar a 3ª página nova (migração ou manifesto).
3. O site pessoal (joaobaran.com) continua em Next.js. Os dois projetos têm stacks diferentes de propósito, cada uma justificada pelo que o projeto é.

## Motivos

- É um site de conteúdo. Astro envia zero JavaScript por padrão e usa "ilhas" só onde houver interatividade, o que favorece velocidade e SEO para quem chega por link frio.
- Markdown nativo para o manifesto e páginas futuras, e layouts e componentes compartilhados (hoje CSS, cabeçalho, rodapé e script de origem estão duplicados entre os HTMLs).
- A migração é barata: o resultado atual já é HTML e CSS.
- O site pessoal usa Next.js porque terá comentários, contas e banco na fase 2. O site da Baran não tem essa parte de aplicação.

## Alternativas consideradas

- **Next.js com exportação estática:** reaproveita o que já uso (pnpm, Tailwind, Vercel, fluxo com Linear), mas é mais pesado do que o projeto pede e não traz variedade de stack.
- **HTML puro como destino final:** funciona até cerca de 3 páginas; depois a duplicação cresce.
- **Framer, Webflow ou outro no-code:** incoerente com a oferta de migração de no-code para código.

## Consequências

- O HTML atual fica com duplicação temporária. Aceitável por poucos dias.
- Hospedagem continua na Vercel.
- Aprender uma ferramenta nova, com ecossistema menor que o do Next.js.

## Gatilho de revisão

Revisar esta decisão se o site ganhar área logada, formulários com API própria ou código compartilhado com a plataforma Baran.
