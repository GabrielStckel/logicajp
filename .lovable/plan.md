## Objetivo

Trocar o placeholder atual "Foto de Jonas" na seção **Quem conduz** de `src/routes/1.tsx` (linhas 454–459) pela foto enviada.

## Passos

1. Subir a foto para o CDN via `lovable-assets` a partir de `/mnt/user-uploads/WhatsApp_Image_2026-03-04_at_14.46.08.jpeg`, salvando o ponteiro em `src/assets/jonas.jpg.asset.json`. Sem cópia do binário para o repo, sem novas dependências.
2. Em `src/routes/1.tsx`:
   - Importar `jonasPhoto from "@/assets/jonas.jpg.asset.json"`.
   - Substituir o `<div aria-hidden>` com o texto "Foto de Jonas" por um `<img src={jonasPhoto.url} alt="Jonas Peress" loading="lazy" />` cobrindo o container (`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position: center top`).
   - Manter o wrapper `aspectRatio: "4/5"`, o `borderRadius`, o `overflow: hidden` e o overlay dourado existente (`linear-gradient` na linha 458) — o overlay fica *acima* da imagem preservando a integração visual editorial.
3. Nenhuma outra alteração: copy, tipografia, cores e layout permanecem idênticos. Nenhuma outra rota é tocada.

## Verificação

- Rota `/1`, seção "Quem conduz": foto renderiza no bloco 4:5 com crop centrado no rosto; overlay dourado preservado; sem CLS.
- Build/typecheck limpos.