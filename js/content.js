/* =========================================================================
   Conteúdo editável do site — Restaurante Montanhas de Minas
   -------------------------------------------------------------------------
   Todos os textos variáveis, contatos, horários, categorias do cardápio,
   imagens e eventos ficam aqui. Para atualizar o site, edite apenas este
   arquivo — não é preciso mexer no HTML ou no JavaScript principal.

   Imagens: enquanto as fotos oficiais não chegam, usamos imagens
   ilustrativas do Unsplash. Para trocar, basta substituir o "src" por um
   arquivo local (ex.: "img/fachada.webp") e ajustar o texto alternativo.
   ========================================================================= */

window.SITE = {
  name: "Restaurante Montanhas de Minas",

  /* Fuso horário usado no indicador "aberto agora" (horário local de Itaúna) */
  timeZone: "America/Sao_Paulo",

  contact: {
    phoneDisplay: "(37) 99856-1626",
    phoneE164: "+5537998561626",
    whatsappNumber: "5537998561626",
    whatsappMessage:
      "Olá! Conheci o Restaurante Montanhas de Minas pelo site e gostaria de obter mais informações."
  },

  links: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Restaurante+Montanhas+de+Minas%2C+Ita%C3%BAna+-+Minas+Gerais%2C+Brazil",
    mapEmbed:
      "https://www.google.com/maps?q=Restaurante+Montanhas+de+Minas,+Ita%C3%BAna+-+MG&output=embed",
    /* Substitua pelo link oficial do perfil no Google quando disponível. */
    googleReviews:
      "https://www.google.com/maps/search/?api=1&query=Restaurante+Montanhas+de+Minas%2C+Ita%C3%BAna+-+MG",
    /* Cardápio completo: informe a URL do PDF ou da página oficial.
       Enquanto estiver vazio, o botão abre o WhatsApp com a mensagem abaixo. */
    menu: "",
    menuWhatsappMessage:
      "Olá! Gostaria de consultar o cardápio completo do Restaurante Montanhas de Minas."
  },

  /* Horários — "close": "24:00" significa meia-noite (0h).
     "dow" segue o padrão do JavaScript: 0 = domingo … 6 = sábado. */
  hours: [
    { dow: 1, day: "Segunda-feira", short: "Seg" },
    { dow: 2, day: "Terça-feira", short: "Ter" },
    { dow: 3, day: "Quarta-feira", short: "Qua" },
    { dow: 4, day: "Quinta-feira", short: "Qui", open: "17:00", close: "24:00" },
    { dow: 5, day: "Sexta-feira", short: "Sex", open: "17:00", close: "24:00" },
    { dow: 6, day: "Sábado", short: "Sáb", open: "16:00", close: "24:00" },
    { dow: 0, day: "Domingo", short: "Dom", open: "08:00", close: "18:00" }
  ],

  /* Categorias do cardápio — sem pratos, preços ou ingredientes específicos.
     Quando o cardápio oficial for fornecido, atualize "description" e "items". */
  menu: [
    {
      title: "Comida mineira e brasileira",
      description:
        "O sabor da cozinha de Minas em pratos tradicionais e preparações caseiras, servidos com o capricho do interior.",
      items: ["Pratos tradicionais", "Preparações caseiras"],
      image: {
        src: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
        alt: "Imagem ilustrativa de prato de comida caseira brasileira"
      }
    },
    {
      title: "Carnes e churrasco",
      description:
        "Preparações com carnes para reunir a família e os amigos em refeições fartas e sem pressa.",
      items: ["Preparações com carnes", "Para família e grupos"],
      image: {
        src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
        alt: "Imagem ilustrativa de espetos de carne na brasa"
      }
    },
    {
      title: "Pizzas",
      description:
        "Uma das opções da casa lembradas por quem já nos visitou, ideal para compartilhar à mesa.",
      items: ["Para compartilhar"],
      image: {
        src: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        alt: "Imagem ilustrativa de pizza recém-saída do forno"
      }
    },
    {
      title: "Peixes e porções",
      description:
        "Opções para dividir e acompanhar boas conversas em momentos de descontração.",
      items: ["Para petiscar", "Para dividir"],
      image: {
        src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
        alt: "Imagem ilustrativa de prato com peixe grelhado"
      }
    },
    {
      title: "Bebidas",
      description:
        "Drinks, cervejas, vinhos e outras bebidas, conforme o cardápio vigente.",
      items: ["Drinks", "Cervejas", "Vinhos"],
      image: {
        src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
        alt: "Imagem ilustrativa de drinks servidos no balcão"
      }
    }
  ],

  /* Galeria do ambiente. "size" pode ser "large", "wide", "tall" ou vazio.
     Área infantil e apresentações musicais só devem entrar com fotos
     oficiais e confirmadas pelo restaurante. */
  gallery: [
    {
      size: "large",
      caption: "Área externa",
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      alt: "Imagem ilustrativa de área externa de restaurante com mesas ao ar livre"
    },
    {
      caption: "Ambiente interno",
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      alt: "Imagem ilustrativa de salão de restaurante com iluminação aconchegante"
    },
    {
      caption: "Pratos e detalhes",
      src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      alt: "Imagem ilustrativa de prato servido à mesa"
    },
    {
      size: "tall",
      caption: "Natureza ao redor",
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      alt: "Imagem ilustrativa de paisagem rural ao amanhecer"
    },
    {
      size: "wide",
      caption: "Mesas e convivência",
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      alt: "Imagem ilustrativa de mesas preparadas em espaço de convivência"
    },
    {
      caption: "Paisagem mineira",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      alt: "Imagem ilustrativa de montanhas sob o céu"
    }
  ],

  /* Programação. Deixe a lista vazia enquanto não houver eventos confirmados.
     Exemplo de item (remova as barras para usar):
     {
       name: "Nome do evento",
       date: "2026-11-14",          // AAAA-MM-DD
       time: "19h",
       artist: "Nome da atração",
       image: { src: "img/evento.webp", alt: "Cartaz do evento" },
       reservation: "Reservas pelo WhatsApp."
     } */
  events: [],

  /* Redes sociais — preencha somente com perfis oficiais.
     Exemplo: { label: "Instagram", url: "https://www.instagram.com/..." } */
  social: []
};
