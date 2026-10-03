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

- O HTML atual ficou com duplicação temporária, resolvida pela migração (ver Resultado).
- Hospedagem continua na Vercel.
- Aprender uma ferramenta nova, com ecossistema menor que o do Next.js.

## Gatilho de revisão

Revisar esta decisão se o site ganhar área logada, formulários com API própria ou código compartilhado com a plataforma Baran.

## Resultado da migração (02/10/2026, BAR-55)

- **Feito:** o site foi migrado para Astro (saída estática) com pnpm, sem mudar conteúdo nem visual. Layout, navegação, rodapé, script e CSS compartilhados; componentes `Cases`, `QuemSomos` e `Contato`. URLs preservadas: `/` e `/crediario` (`build.format: 'file'` mais o `cleanUrls` do `vercel.json`).
- **Paridade:** comparação elemento a elemento (posição, tamanho, cor, fonte) entre a versão HTML e a Astro em 1440×900 e 390×844: crediário sem nenhuma diferença; home com uma diferença sem efeito visual (um nó de texto em branco).
- **Lighthouse (celular, servidor local, uma rodada):** home 87 → 93 e crediário 88 → 95 em desempenho; acessibilidade, boas práticas e SEO seguem em 100. FCP de 3,1 s para 1,9 s (home) e 1,7 s (crediário). Peso transferido de 135 para 102 KB (home) e de 128 para 91 KB (crediário).
- **Foto:** saiu do HTML (antes duplicada em data URI nas duas páginas) e virou um arquivo único em `/_astro/`, com cache. Não foi recodificada, porque a otimização de imagens do Astro exige a dependência `sharp`, fora do combinado (só `astro`). Se quisermos WebP, abrir issue para adicionar o `sharp`.
- **Vercel:** Framework Preset Astro, comando `pnpm build`, saída `dist`.

## Atualização (02/10/2026, BAR-60): exceção para o `sharp`

- **Decisão:** o `sharp` entra como segunda dependência, só de build, para a foto do João ficar nítida em telas 2x e 3x. Nada dele chega ao navegador.
- **Como:** a fonte é um JPEG de 1333×2000 em `src/assets/`; o componente `QuemSomos` usa `<Picture>` com WebP em 380, 760 e 1140 px, `sizes` coerente com o layout, `loading="lazy"` e o recorte ancorado no topo para preservar o rosto. A foto de 24 KB citada acima foi substituída.
- **Regra mantida:** nenhuma outra dependência sem issue.
