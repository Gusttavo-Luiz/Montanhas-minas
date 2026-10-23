/* =========================================================================
   Comportamento do site — Restaurante Montanhas de Minas
   Lê os dados de js/content.js (window.SITE) e monta as seções dinâmicas.
   ========================================================================= */
(function () {
  "use strict";

  var SITE = window.SITE;
  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  root.classList.add("js");

  /* ---------- Utilitários ---------- */

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  function el(tag, attrs, children) {
    var node = doc.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      var value = attrs[key];
      if (value === null || value === undefined || value === false) return;
      if (key === "text") node.textContent = value;
      else if (key === "html") node.innerHTML = value;
      else if (key === "class") node.className = value;
      else node.setAttribute(key, value);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(typeof child === "string" ? doc.createTextNode(child) : child);
    });
    return node;
  }

  /* Monta src/srcset otimizados (AVIF/WebP via auto=format) para imagens do
     Unsplash; arquivos locais são usados como estão. */
  function imageSources(src, widths, ratio) {
    if (src.indexOf("images.unsplash.com") === -1) return { src: src };
    function url(w) {
      var h = ratio ? "&h=" + Math.round(w * ratio) : "";
      return src + "?auto=format&fit=crop&w=" + w + h + "&q=70";
    }
    return {
      src: url(widths[widths.length - 1]),
      srcset: widths.map(function (w) { return url(w) + " " + w + "w"; }).join(", ")
    };
  }

  function picture(image, opts) {
    var sources = imageSources(image.src, opts.widths, opts.ratio);
    var img = el("img", {
      src: sources.src,
      srcset: sources.srcset,
      sizes: opts.sizes,
      alt: image.alt || "",
      loading: "lazy",
      decoding: "async",
      width: opts.width,
      height: opts.height
    });
    img.addEventListener("error", function () {
      img.closest("[data-media]") && img.closest("[data-media]").classList.add("is-missing");
    });
    return img;
  }

  function whatsappUrl(message) {
    return "https://wa.me/" + SITE.contact.whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  var icons = {
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1Z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v3M17 2v3M3.5 9h17M5 4.5h14A1.5 1.5 0 0 1 20.5 6v13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V6A1.5 1.5 0 0 1 5 4.5Z"/></svg>',
    music: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3Zm11-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z"/></svg>'
  };

  /* ---------- Links de contato e navegação ---------- */

  function setupLinks() {
    var hrefs = {
      directions: SITE.links.directions,
      googleReviews: SITE.links.googleReviews,
      whatsapp: whatsappUrl(SITE.contact.whatsappMessage),
      phone: "tel:" + SITE.contact.phoneE164
    };

    $$("[data-link]").forEach(function (link) {
      var type = link.getAttribute("data-link");
      if (!hrefs[type]) return;
      link.href = hrefs[type];

      if (type === "phone" && !link.textContent.trim()) {
        if (link.classList.contains("btn")) {
          link.innerHTML = icons.phone + "<span>Ligar: " + SITE.contact.phoneDisplay + "</span>";
        } else {
          link.textContent = SITE.contact.phoneDisplay;
        }
        link.setAttribute("aria-label", "Ligar para " + SITE.contact.phoneDisplay);
      }
      if (link.target === "_blank" && !link.hasAttribute("aria-label")) {
        link.setAttribute("aria-label", link.textContent.trim() + " (abre em nova aba)");
      }
    });

    var menuCta = $("#menu-cta");
    if (menuCta) {
      if (SITE.links.menu) {
        menuCta.href = SITE.links.menu;
        menuCta.setAttribute("aria-label", "Consultar cardápio completo (abre em nova aba)");
      } else {
        menuCta.href = whatsappUrl(SITE.links.menuWhatsappMessage);
        menuCta.setAttribute("aria-label", "Consultar cardápio completo pelo WhatsApp (abre em nova aba)");
      }
    }

    var map = $("#map");
    if (map) map.src = SITE.links.mapEmbed;
  }

  /* ---------- Cardápio ---------- */

  function renderMenu() {
    var grid = $("#menu-grid");
    if (!grid) return;

    SITE.menu.forEach(function (category, index) {
      var number = String(index + 1).padStart(2, "0");
      var media = el("div", { class: "menu-card__media", "data-media": "", "data-label": category.title }, [
        picture(category.image, {
          widths: [480, 720, 960],
          ratio: 0.75,
          sizes: "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 40vw",
          width: 960,
          height: 720
        })
      ]);
      var tags = el("ul", { class: "menu-card__tags", "aria-label": "Destaques da categoria" },
        (category.items || []).map(function (item) { return el("li", { text: item }); }));

      grid.appendChild(el("li", { class: "menu-card reveal" }, [
        media,
        el("div", { class: "menu-card__body" }, [
          el("span", { class: "menu-card__number", "aria-hidden": "true", text: number }),
          el("h3", { text: category.title }),
          el("p", { text: category.description }),
          tags
        ])
      ]));
    });
  }

  /* ---------- Galeria + lightbox ---------- */

  function renderGallery() {
    var list = $("#gallery");
    var dialog = $("#lightbox");
    if (!list) return;

    var items = SITE.gallery;
    var current = 0;
    var lastTrigger = null;
    var supportsDialog = dialog && typeof dialog.showModal === "function";

    items.forEach(function (item, index) {
      var button = el("button", {
        class: "gallery__button",
        type: "button",
        "aria-label": "Ampliar imagem: " + item.caption,
        "data-media": "",
        "data-label": item.caption
      }, [
        picture(item, {
          widths: [480, 800, 1200],
          sizes: item.size === "large" ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 700px) 100vw, 25vw"
        }),
        el("span", { class: "gallery__caption", text: item.caption })
      ]);
      button.addEventListener("click", function () {
        if (supportsDialog) open(index, button);
        // Sem suporte a <dialog>: a imagem ampliada abre em nova aba.
        else window.open(imageSources(item.src, [1600]).src, "_blank", "noopener");
      });
      list.appendChild(el("li", { class: "gallery__item reveal" + (item.size ? " gallery__item--" + item.size : "") }, [button]));
    });

    if (!supportsDialog) return;

    var img = $("#lightbox-img");
    var caption = $("#lightbox-caption");

    function show(index) {
      current = (index + items.length) % items.length;
      var item = items[current];
      var sources = imageSources(item.src, [1000, 1600, 2200]);
      img.src = sources.src;
      if (sources.srcset) img.srcset = sources.srcset; else img.removeAttribute("srcset");
      img.sizes = "90vw";
      img.alt = item.alt;
      caption.textContent = item.caption + " — imagem ilustrativa (" + (current + 1) + " de " + items.length + ")";
    }

    function open(index, trigger) {
      lastTrigger = trigger;
      show(index);
      dialog.showModal();
      root.classList.add("no-scroll");
    }

    function close() { dialog.close(); }

    dialog.addEventListener("close", function () {
      root.classList.remove("no-scroll");
      if (lastTrigger) lastTrigger.focus();
    });
    $(".lightbox__close", dialog).addEventListener("click", close);
    $(".lightbox__nav--prev", dialog).addEventListener("click", function () { show(current - 1); });
    $(".lightbox__nav--next", dialog).addEventListener("click", function () { show(current + 1); });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) close();
    });
    dialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Música e eventos ---------- */

  function renderEvents() {
    var container = $("#events");
    if (!container) return;

    var today = localDateString();
    var upcoming = (SITE.events || []).filter(function (event) {
      return !event.date || event.date >= today;
    });

    if (!upcoming.length) {
      container.appendChild(el("p", {
        class: "lead",
        text: "Uma mesa farta, boa companhia e tempo para conversar. O Montanhas de Minas é um convite para desacelerar, celebrar encontros e aproveitar o clima do interior com quem você gosta."
      }));
      container.appendChild(el("p", {
        text: "Quando houver música ao vivo ou programação especial, as novidades serão divulgadas aqui. Para saber se há algo previsto para a sua visita, fale com a gente."
      }));
      container.appendChild(el("a", {
        class: "btn btn--green",
        href: whatsappUrl("Olá! Gostaria de saber se há alguma programação especial no Restaurante Montanhas de Minas."),
        target: "_blank",
        rel: "noopener",
        "aria-label": "Perguntar sobre a programação pelo WhatsApp (abre em nova aba)",
        text: "Perguntar sobre a programação"
      }));
      return;
    }

    var list = el("ul", { class: "events" });
    upcoming.forEach(function (event) {
      var when = [formatDate(event.date), event.time].filter(Boolean).join(" · ");
      var meta = el("ul", { class: "event__meta" }, [
        when ? el("li", { html: icons.calendar }, [el("span", { text: when })]) : null,
        event.artist ? el("li", { html: icons.music }, [el("span", { text: event.artist })]) : null
      ]);

      list.appendChild(el("li", { class: "event" }, [
        event.image ? el("div", { class: "event__media", "data-media": "", "data-label": event.name }, [
          picture(event.image, { widths: [400, 800], ratio: 0.75, sizes: "(max-width: 640px) 100vw, 200px" })
        ]) : null,
        el("div", { class: "event__body" }, [
          el("h3", { text: event.name }),
          meta,
          event.reservation ? el("p", { class: "event__note", text: event.reservation }) : null
        ])
      ]));
    });
    container.appendChild(list);
  }

  function formatDate(iso) {
    if (!iso) return "";
    var parts = iso.split("-").map(Number);
    var date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12));
    return new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(date);
  }

  /* ---------- Horários e status em tempo real ---------- */

  function toMinutes(time) {
    var parts = time.split(":").map(Number);
    return parts[0] * 60 + parts[1];
  }

  function formatHour(time) {
    var parts = time.split(":").map(Number);
    var hour = parts[0] % 24;
    return hour + "h" + (parts[1] ? String(parts[1]).padStart(2, "0") : "");
  }

  function rangeLabel(entry) {
    return entry.open ? formatHour(entry.open) + " às " + formatHour(entry.close) : "Fechado";
  }

  /* Data e hora atuais no fuso de Itaúna, independentemente do dispositivo. */
  function nowInItauna() {
    var parts = {};
    new Intl.DateTimeFormat("en-US", {
      timeZone: SITE.timeZone,
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
    return {
      dow: dow,
      minutes: Number(parts.hour) * 60 + Number(parts.minute),
      date: parts.year + "-" + parts.month + "-" + parts.day
    };
  }

  function localDateString() {
    try { return nowInItauna().date; } catch (e) { return new Date().toISOString().slice(0, 10); }
  }

  function entryFor(dow) {
    return SITE.hours.filter(function (h) { return h.dow === dow; })[0];
  }

  function computeStatus(now) {
    var today = entryFor(now.dow);
    if (today && today.open && now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close)) {
      return { open: true, text: "Aberto agora · até as " + formatHour(today.close) };
    }
    for (var offset = 0; offset <= 7; offset++) {
      var dow = (now.dow + offset) % 7;
      var entry = entryFor(dow);
      if (!entry || !entry.open) continue;
      if (offset === 0 && now.minutes >= toMinutes(entry.open)) continue;
      var when = offset === 0 ? "hoje" : offset === 1 ? "amanhã" : entry.day.toLowerCase();
      return { open: false, text: "Fechado agora · abrimos " + when + " às " + formatHour(entry.open) };
    }
    return { open: false, text: "Fechado agora" };
  }

  function renderHours() {
    var list = $("#hours-list");
    var footer = $("#footer-hours");
    var status = $("#status");
    var now = null;
    try { now = nowInItauna(); } catch (e) { /* Intl indisponível: sem destaque do dia */ }

    if (list) {
      SITE.hours.forEach(function (entry) {
        var isToday = now && entry.dow === now.dow;
        var row = el("div", {
          class: "hours__row" + (entry.open ? "" : " is-closed") + (isToday ? " is-today" : "")
        }, [
          el("dt", {}, [entry.day, isToday ? el("span", { class: "hours__today", text: "Hoje" }) : null]),
          el("dd", { text: rangeLabel(entry) })
        ]);
        list.appendChild(row);
      });
    }

    if (footer) {
      // Agrupa dias consecutivos com o mesmo horário (ex.: "Seg a Qua", "Qui e Sex").
      var groups = [];
      SITE.hours.forEach(function (entry) {
        var last = groups[groups.length - 1];
        if (last && rangeLabel(last[0]) === rangeLabel(entry)) last.push(entry);
        else groups.push([entry]);
      });
      groups.forEach(function (group) {
        var first = group[0].short;
        var last = group[group.length - 1].short;
        var label = group.length === 1 ? first : first + (group.length === 2 ? " e " : " a ") + last;
        footer.appendChild(el("li", {}, [el("span", { text: label }), el("span", { text: rangeLabel(group[0]) })]));
      });
    }

    if (status && now) {
      var update = function () {
        var result = computeStatus(nowInItauna());
        status.textContent = result.text;
        status.classList.toggle("status--open", result.open);
        status.classList.toggle("status--closed", !result.open);
      };
      update();
      status.hidden = false;
      window.setInterval(update, 60000);
    }
  }

  /* ---------- Redes sociais ---------- */

  function renderSocial() {
    var list = $("#social");
    if (!list) return;
    if (!SITE.social || !SITE.social.length) {
      list.remove();
      return;
    }
    SITE.social.forEach(function (profile) {
      list.appendChild(el("li", {}, [el("a", {
        href: profile.url,
        target: "_blank",
        rel: "noopener",
        text: profile.label,
        "aria-label": profile.label + " do restaurante (abre em nova aba)"
      })]));
    });
  }

  /* ---------- Cabeçalho, menu mobile e navegação ativa ---------- */

  function setupHeader() {
    var header = $(".header");
    var toggle = $(".menu-toggle");
    var nav = $("#menu-principal");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("header--solid", window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!toggle || !nav) return;

    function setOpen(open) {
      header.classList.toggle("header--open", open);
      root.classList.toggle("no-scroll", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    $$("a", nav).forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("header--open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });

    // Destaca no menu a seção visível.
    if (!("IntersectionObserver" in window)) return;
    var links = $$(".nav__list a");
    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.removeAttribute("aria-current"); });
        var active = byId[entry.target.id];
        if (active) active.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = doc.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Animações ao rolar ---------- */

  function setupReveal() {
    var targets = $$(".reveal");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (t) {
      // Pequeno atraso escalonado entre itens irmãos de uma lista.
      if (t.tagName === "LI") {
        var index = Array.prototype.indexOf.call(t.parentNode.children, t);
        t.style.transitionDelay = (index % 3) * 80 + "ms";
      }
      observer.observe(t);
    });
  }

  /* ---------- Inicialização ---------- */

  if (!SITE) {
    console.error("js/content.js não foi carregado.");
    return;
  }

  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  setupLinks();
  renderMenu();
  renderGallery();
  renderEvents();
  renderHours();
  renderSocial();
  setupHeader();
  setupReveal();
})();
