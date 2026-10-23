# Restaurante Montanhas de Minas — site oficial

Site estático (HTML, CSS e JavaScript puro, sem dependências) do Restaurante Montanhas de Minas, em Itaúna, MG.

## Estrutura

```
index.html        Estrutura e textos fixos das seções, SEO e dados estruturados
css/styles.css    Identidade visual, layout responsivo e animações
js/content.js     Conteúdo editável: contatos, links, horários, cardápio, galeria, eventos, redes sociais
js/main.js        Monta as seções dinâmicas, menu mobile, lightbox e indicador de horário
img/favicon.svg   Ícone do site
```

## Como atualizar o conteúdo

Quase tudo o que muda com frequência está em `js/content.js`:

- **Horários**: lista `hours` (o indicador "Aberto agora" usa o horário de Itaúna, `America/Sao_Paulo`).
- **Cardápio**: lista `menu`. Para ligar o botão "Consultar cardápio completo" a um PDF ou página, preencha `links.menu`. Enquanto estiver vazio, o botão abre o WhatsApp.
- **Avaliações do Google**: troque `links.googleReviews` pelo link oficial do perfil quando estiver disponível.
- **Galeria**: lista `gallery`. Para usar fotos oficiais, troque o `src` por arquivos locais (ex.: `img/fachada.webp`) e revise o `alt`. Depois disso, remova o aviso "Imagens ilustrativas" em `index.html`.
- **Eventos**: lista `events` (há um exemplo comentado). Com a lista vazia, a seção mostra um texto de convivência e um botão para perguntar sobre a programação.
- **Redes sociais**: lista `social`. O bloco só aparece quando houver perfis oficiais cadastrados.

As imagens do hero, da seção "Nossa essência" e da seção "Música" ficam direto no `index.html`.

## Como visualizar

Abra o `index.html` no navegador ou sirva a pasta com qualquer servidor estático, por exemplo:

```
python3 -m http.server 8000
```
