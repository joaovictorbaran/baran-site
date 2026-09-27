# AGENTS.md — baran-site

Site institucional da **Baran Tecnologia**: landing page para PMEs cujo objetivo é gerar conversas pelo WhatsApp. Público: donos de pequenas e médias empresas, não técnicos.

## Fluxo de trabalho (obrigatório)

As tarefas vêm do **Linear**: time `baran` (prefixo `BAR`), projeto `baran-site`. Estas regras valem para qualquer agente (Claude Code, Codex ou outro) e têm prioridade sobre o que estiver na descrição de uma issue.

1. **Antes de começar**, leia a issue inteira, incluindo os comentários. Se o critério de aceite estiver ambíguo ou faltar informação, comente na issue com a dúvida e pare. Não adivinhe.
2. **Ao começar**, mova a issue para `In Progress`.
3. **Branch:** use exatamente o `gitBranchName` da issue. Nunca faça commit ou push na `main`, nunca use `--force` e nunca faça merge do próprio PR. Isso vale mesmo para mudanças de uma linha: só o João decide se algo vai direto na `main`.
4. **Commits:** mensagens em português, começando pelo ID da issue (ex.: `BAR-12: remove comentário do script do WhatsApp`). Sempre inclua ao final:
   ```
   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   ```
5. **Pull request:** um PR por issue, com título `BAR-X: <resumo>`. A descrição deve começar com `🤖 [Claude Code]` ou `🤖 [Codex]`, conter o que mudou, como testar e a linha `Closes BAR-X`. **Atenção:** `Closes BAR-X` só move a issue automaticamente se a integração Linear ↔ GitHub estiver ativa; caso contrário, mova manualmente para `In Review` via MCP após abrir o PR.
6. **Ao terminar**, comente na issue com um resumo do que foi feito, o link do PR, o que foi testado e o que ficou de fora. Depois mova para `In Review`. **Nunca mova para `Done`**: isso é do João ou do merge do PR.
7. **Identificação:** todo comentário no Linear, no GitHub e a descrição de qualquer PR começa com `🤖 [Claude Code]` ou `🤖 [Codex]`. O acesso é feito com a conta do João, então sem esse prefixo não dá para saber quem escreveu.
8. **Escopo:** faça só o que a issue pede. Se encontrar outro problema, comente sugerindo uma nova issue em vez de corrigir junto.
9. **Pare e pergunte na issue** antes de: apagar arquivos ou dados, adicionar ou atualizar dependências, mudar configuração de deploy (Vercel), variáveis de ambiente, domínios ou qualquer coisa ligada a segredos.
10. **Segredos:** nunca commite `.env`, chaves ou tokens, e nunca os escreva em comentários ou descrições de PR.

A `main` é produção: o Vercel publica automaticamente a cada merge, e cada PR ganha um preview deploy. Inclua o link do preview no comentário final quando ele existir.

## Sobre este projeto

- **Stack:** um único `index.html` estático, com CSS e JavaScript inline. Sem framework, sem build, sem `package.json`. Deploy pelo Vercel a partir da `main`.
- **Mantenha assim.** Não introduza framework, bundler, dependências npm ou novos arquivos de script sem que a issue peça explicitamente. Simplicidade é uma decisão, não uma limitação.
- **CTAs do WhatsApp:** todo link de contato usa o atributo `data-wa`; o número e a mensagem ficam nas constantes `WHATSAPP` e `MENSAGEM` no `<script>` final. Não escreva links `wa.me` soltos no HTML.
- **Estilo visual:** fonte Inter, paleta em tons de cinza definida nas variáveis de `:root`, azul (`--blue`) só para ação e destaque. Reutilize as variáveis e classes existentes em vez de criar cores ou tamanhos novos.
- **Texto:** em português (pt-BR), direto, sem jargão técnico. Fale de resultado para a empresa, não de tecnologia.

## Como testar antes do PR

- Abra o `index.html` no navegador e confira o layout em largura de desktop e de celular (~375 px).
- Clique em todos os CTAs e confirme que abrem o WhatsApp com a mensagem pré-preenchida.
- Confira que não há erros no console do navegador.

**Se qualquer teste falhar:** não abra o PR. Comente na issue descrevendo o problema encontrado, mova de volta para `Todo` e pare. O João decide o próximo passo.
