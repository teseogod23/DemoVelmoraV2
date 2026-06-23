// src/app.jsx
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
var WSP = "51950039142";
var page = document.body.dataset.page || "inicio";
var assets = {
  logo: "assets/logo-velmora-clean.png",
  fondo: "assets/velmora-fondo.jpg",
  oficina: "assets/velmora-oficina.jpg",
  productos: "assets/velmora-productos.jpg",
  entrada: "assets/velmora-entrada.jpg",
  pagos: "assets/metododepago.png",
  wssp: "assets/wssp.png"
};
var services = [
  ["Faciales", "Limpieza, hidrataci\xF3n y diagnostico de piel con productos de cabina."],
  ["Manos y pies", "Manicure, pedicure, gel y acabados elegantes para uso diario o eventos."],
  ["Cabello", "Corte, peinado, tratamiento capilar y preparaci\xF3n para ocasiones especiales."],
  ["Maquillaje", "Maquillaje profesional con piel pulida, tonos suaves y larga duraci\xF3n."],
  ["Depilaci\xF3n", "Protocolos higienicos, r\xE1pidos y pensados para comodidad."],
  ["Imagen", "Asesor\xEDa de estilo, colorimetria y rutina personal de belleza."]
];
var serviceDetails = [
  {
    title: "Facial Glow Velmora",
    category: "Faciales",
    duration: "60 - 75 min",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1300&q=86",
    bestFor: "Piel opaca, resequedad, textura irregular o primera visita.",
    result: "Piel limpia, hidratada y con acabado luminoso sin sentirse pesada.",
    includes: ["Diagnostico de piel", "Limpieza profunda", "Exfoliacion suave", "Mascarilla hidratante", "Sellado con serum y crema"],
    addOns: ["LED calmante", "Masaje lifting", "Hydrojelly mask"]
  },
  {
    title: "Manicure Rose-Gold",
    category: "Manos y pies",
    duration: "45 - 70 min",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1300&q=86",
    bestFor: "U\xF1as elegantes para uso diario, fotos, reuniones o eventos.",
    result: "Manos pulidas, cuticula limpia y acabado uniforme con tonos delicados.",
    includes: ["Limpieza de cuticula", "Forma personalizada", "Nivelacion ligera", "Color tradicional o gel", "Aceite nutritivo"],
    addOns: ["Nail art minimal", "Francesa fina", "Pedicure spa"]
  },
  {
    title: "Cabello Soft Finish",
    category: "Cabello",
    duration: "60 - 120 min",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1300&q=86",
    bestFor: "Cambio de look sutil, peinado para evento o cabello con frizz.",
    result: "Cabello suave, con movimiento y acabado de salon.",
    includes: ["Evaluaci\xF3n del cabello", "Lavado y preparaci\xF3n", "Tratamiento nutritivo", "Cepillado o ondas", "Recomendacion de rutina"],
    addOns: ["Ampolla hidratante", "Corte de puntas", "Peinado social"]
  },
  {
    title: "Makeup Soft Glam",
    category: "Maquillaje",
    duration: "75 - 100 min",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1300&q=86",
    bestFor: "Eventos, fotos, graduaciones, cenas o contenido para redes.",
    result: "Piel pulida, ojos definidos y tonos armonizados con tu estilo.",
    includes: ["Preparacion de piel", "Correccion ligera", "Base de larga duraci\xF3n", "Ojos y labios", "Sellado final"],
    addOns: ["Pestanas", "Retoque para evento", "Peinado express"]
  },
  {
    title: "Depilaci\xF3n Delicada",
    category: "Depilaci\xF3n",
    duration: "20 - 60 min",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1300&q=86",
    bestFor: "Mantenimiento personal con higiene, rapidez y cuidado de piel.",
    result: "Piel limpia y suave con indicaciones para evitar irritacion.",
    includes: ["Preparacion de zona", "Tecnica seg\xFAn sensibilidad", "Retiro cuidadoso", "Calmante post servicio", "Indicaciones de cuidado"],
    addOns: ["Exfoliacion previa", "Hidratacion post", "Diseno de cejas"]
  },
  {
    title: "Asesor\xEDa Imagen Velmora",
    category: "Imagen",
    duration: "45 - 90 min",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1300&q=86",
    bestFor: "Quienes quieren verse mas ordenadas sin cambiar su esencia.",
    result: "Guia clara de colores, estilo, maquillaje y cuidado personal.",
    includes: ["Lectura de estilo", "Colorimetr\xEDa b\xE1sica", "Rutina de belleza", "Recomendacion de servicios", "Plan de seguimiento"],
    addOns: ["Moodboard personal", "Maquillaje de prueba", "Plan mensual"]
  }
];
var serviceSteps = [
  ["01", "Lectura inicial", "Revisamos tu necesidad, tiempo disponible, sensibilidad y objetivo."],
  ["02", "Servicio guiado", "Se explica cada paso para que la experiencia se sienta clara y tranquila."],
  ["03", "Cierre y rutina", "Sales con recomendaciones simples para conservar el resultado."]
];
var serviceFaqs = [
  ["C\xF3mo elijo el servicio correcto?", "Si es tu primera visita, empieza por Facial Glow o Asesor\xEDa Imagen. Desde ahi se arma una rutina m\xE1s precisa."],
  ["Puedo combinar servicios?", "Si. Los packs pueden unir facial, manicure, maquillaje o peinado seg\xFAn evento y disponibilidad."],
  ["Necesito prepararme antes?", "Para faciales evita exfoliarte el mismo dia. Para maquillaje llega con piel limpia. Para depilacion evita sol directo antes y despues."],
  ["Los tiempos son exactos?", "Son rangos. La duraci\xF3n puede variar seg\xFAn piel, cabello, diseno o nivel de detalle solicitado."]
];
var experienceImages = {
  calm: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1500&q=86",
  consultation: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1300&q=86",
  ritual: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1300&q=86",
  beverage: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1300&q=86",
  detail: "https://images.unsplash.com/photo-1607008829749-c0f284a498e5?auto=format&fit=crop&w=1300&q=86",
  aftercare: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1300&q=86"
};
var journey = [
  ["Llegada", "Recepci\xF3n tranquila", "Te recibimos en un ambiente c\xE1lido, con tiempo para respirar y confirmar el servicio sin apuro.", experienceImages.calm],
  ["Consulta", "Escucha real", "Antes de empezar revisamos objetivo, rutina, sensibilidad, evento o estilo de vida.", experienceImages.consultation],
  ["Ritual", "Servicio guiado", "Cada paso se explica con claridad para que sepas qu\xE9 se est\xE1 haciendo y por qu\xE9.", experienceImages.ritual],
  ["Cierre", "Rutina post-visita", "Te llevas recomendaciones simples para cuidar el resultado y saber cu\xE1ndo volver.", experienceImages.aftercare]
];
var moods = {
  calma: {
    title: "Experiencia calma",
    text: "Menos conversaci\xF3n, luz suave, ritmo pausado y una atenci\xF3n enfocada en relajarte.",
    details: ["M\xFAsica baja", "Pausas entre pasos", "Indicaciones breves", "Cierre con rutina simple"]
  },
  social: {
    title: "Experiencia social",
    text: "Una visita m\xE1s conversada, ideal para amigas, eventos o preparaci\xF3n antes de una salida.",
    details: ["Recomendaciones de estilo", "Fotos del resultado", "Ideas de combinaci\xF3n", "Reserva de pack"]
  },
  evento: {
    title: "Experiencia evento",
    text: "Preparaci\xF3n coordinada para maquillaje, cabello, manos y retoques con foco en puntualidad.",
    details: ["Orden de servicios", "Tiempo controlado", "Acabado fotog\xE9nico", "Checklist final"]
  }
};
var promoPacks = [
  {
    name: "Glow Day",
    tag: "Piel + manos",
    price: "Desde S/ 149",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1300&q=86",
    promise: "Para salir con piel fresca y manos impecables en una sola visita.",
    includes: ["Facial express hidratante", "Manicure rose-gold", "Aceite nutritivo final"],
    bestFor: "Semana cargada, fotos casuales o una renovaci\xF3n r\xE1pida."
  },
  {
    name: "Evento Pulido",
    tag: "Maquillaje + cabello",
    price: "Desde S/ 229",
    image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1300&q=86",
    promise: "Acabado fotog\xE9nico, elegante y coordinado para eventos.",
    includes: ["Preparaci\xF3n de piel", "Makeup soft glam", "Ondas o peinado social"],
    bestFor: "Graduaciones, cenas, cumplea\xF1os, sesiones y reuniones."
  },
  {
    name: "Rutina Mensual",
    tag: "Mantenimiento",
    price: "Desde S/ 289",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1300&q=86",
    promise: "Un plan ordenado para mantener piel, manos e imagen sin improvisar.",
    includes: ["Facial Glow Velmora", "Manicure o pedicure", "Seguimiento de rutina"],
    bestFor: "Clientas que quieren constancia y una imagen siempre cuidada."
  },
  {
    name: "Primera Visita",
    tag: "Diagn\xF3stico",
    price: "Desde S/ 99",
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1300&q=86",
    promise: "Una entrada amable a Velmora para conocer tu piel, estilo y objetivos.",
    includes: ["Lectura de necesidad", "Servicio inicial recomendado", "Plan sugerido"],
    bestFor: "Quienes a\xFAn no saben qu\xE9 servicio elegir."
  }
];
var promoRules = [
  ["Reserva previa", "Los packs se agendan por WhatsApp seg\xFAn disponibilidad del d\xEDa."],
  ["Personalizable", "Puedes cambiar un servicio por otro equivalente si el equipo lo aprueba."],
  ["Cupos limitados", "Las promociones funcionan mejor con horario separado y puntualidad."]
];
var productCatalog = [
  { name: "Gel limpiador", price: 45, category: "Limpieza", text: "Limpieza suave para retirar impurezas sin resecar.", image: assets.productos },
  { name: "S\xE9rum facial", price: 69, category: "Hidrataci\xF3n", text: "Hidrataci\xF3n profunda y acabado luminoso.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=86" },
  { name: "Crema hidratante", price: 59, category: "Rutina diaria", text: "Nutrici\xF3n y reparaci\xF3n para uso de ma\xF1ana o noche.", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=86" },
  { name: "Crema reafirmante", price: 76, category: "Tratamiento", text: "Textura rica para elasticidad y masaje facial.", image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=86" },
  { name: "Protector glow SPF", price: 64, category: "Protecci\xF3n", text: "Protecci\xF3n diaria con acabado natural y ligero.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=86" },
  { name: "Kit Velmora mini", price: 119, category: "Pack", text: "Rutina compacta para probar limpieza, serum y crema.", image: assets.productos }
];
var socialLinks = [
  ["WhatsApp", `https://wa.me/${WSP}`, "https://cdn.simpleicons.org/whatsapp/ffffff"],
  ["Instagram", "#", "https://cdn.simpleicons.org/instagram/ffffff"],
  ["TikTok", "#", "https://cdn.simpleicons.org/tiktok/ffffff"],
  ["Facebook", "#", "https://cdn.simpleicons.org/facebook/ffffff"]
];
var fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" }
};
function Shell({ children }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement("main", null, children), /* @__PURE__ */ React.createElement("a", { className: "whatsapp", href: `https://wa.me/${WSP}`, target: "_blank", rel: "noreferrer", "aria-label": "WhatsApp" }, /* @__PURE__ */ React.createElement("img", { src: assets.wssp, alt: "" })), /* @__PURE__ */ React.createElement(Footer, null));
}
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Inicio", "index.html"],
    ["Servicios", "servicios.html"],
    ["Productos", "productos.html"],
    ["Experiencia", "experiencias.html"],
    ["Galeria", "galeria.html"],
    ["Reserva", "reserva.html"],
    ["Contacto", "contacto.html"]
  ];
  return /* @__PURE__ */ React.createElement("header", { className: `site-header ${scrolled ? "is-scrolled" : ""}` }, /* @__PURE__ */ React.createElement("a", { className: "brand", href: "index.html", "aria-label": "Velmora inicio" }, /* @__PURE__ */ React.createElement("img", { src: assets.logo, alt: "VELMORA Est\xE9tica" })), /* @__PURE__ */ React.createElement("button", { className: `menu-button ${open ? "is-open" : ""}`, onClick: () => setOpen(!open), "aria-label": open ? "Cerrar men\xFA" : "Abrir men\xFA" }, /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null)), /* @__PURE__ */ React.createElement("nav", { className: open ? "is-open" : "" }, links.map(([label, url]) => /* @__PURE__ */ React.createElement("a", { key: url, href: url }, label))));
}
function Hero() {
  return /* @__PURE__ */ React.createElement("section", { className: "hero" }, /* @__PURE__ */ React.createElement("img", { className: "hero-bg", src: assets.entrada, alt: "Entrada de Velmora Est\xE9tica" }), /* @__PURE__ */ React.createElement("div", { className: "hero-shade" }), /* @__PURE__ */ React.createElement(motion.div, { className: "hero-content", initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } }, /* @__PURE__ */ React.createElement("img", { className: "hero-logo", src: assets.logo, alt: "VELMORA Est\xE9tica" }), /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Est\xE9tica premium en tonos rose-gold"), /* @__PURE__ */ React.createElement("h1", null, "Realza tu belleza, renueva tu esencia."), /* @__PURE__ */ React.createElement("p", { className: "lead" }, "Un espacio femenino, calmado y profesional para tratamientos faciales, manos, cabello, maquillaje y cuidado personal."), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("a", { className: "primary", href: "reserva.html" }, "Reservar cita"), /* @__PURE__ */ React.createElement("a", { className: "secondary", href: "servicios.html" }, "Ver servicios"))));
}
function Intro() {
  return /* @__PURE__ */ React.createElement("section", { className: "intro-modern section" }, /* @__PURE__ */ React.createElement(motion.div, { ...fade, className: "intro-panel" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Velmora Est\xE9tica"), /* @__PURE__ */ React.createElement("h2", null, "Una visita que se siente dise\xF1ada, no improvisada."), /* @__PURE__ */ React.createElement("p", null, "Desde la llegada hasta el cierre, cada decisi\xF3n visual y de atenci\xF3n busca transmitir calma, confianza y belleza premium."), /* @__PURE__ */ React.createElement("div", { className: "intro-stats" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "01"), "Recepci\xF3n c\xE1lida"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "02"), "Diagn\xF3stico claro"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "03"), "Resultado cuidado"))), /* @__PURE__ */ React.createElement(motion.div, { ...fade, className: "intro-image-stack" }, /* @__PURE__ */ React.createElement("img", { src: assets.oficina, alt: "Recepci\xF3n Velmora" }), /* @__PURE__ */ React.createElement("img", { src: assets.productos, alt: "Productos Velmora" })));
}
function ServiceList() {
  const [active, setActive] = useState(0);
  const selected = serviceDetails[active];
  return /* @__PURE__ */ React.createElement("section", { className: "services-modern section" }, /* @__PURE__ */ React.createElement("div", { className: "services-modern-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Servicios"), /* @__PURE__ */ React.createElement("h2", null, "Elige por necesidad, no por una lista interminable.")), /* @__PURE__ */ React.createElement("a", { className: "text-link promo-home-link", href: "servicios.html" }, "Ver todos los servicios")), /* @__PURE__ */ React.createElement("div", { className: "home-service-lab" }, /* @__PURE__ */ React.createElement("div", { className: "home-service-menu" }, serviceDetails.map((service, index) => /* @__PURE__ */ React.createElement("button", { key: service.title, className: active === index ? "active" : "", onClick: () => setActive(index) }, /* @__PURE__ */ React.createElement("span", null, String(index + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("strong", null, service.category), /* @__PURE__ */ React.createElement("small", null, service.duration)))), /* @__PURE__ */ React.createElement(motion.div, { className: "home-service-card", key: selected.title, initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.32 } }, /* @__PURE__ */ React.createElement("img", { src: selected.image, alt: selected.title }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, selected.category), /* @__PURE__ */ React.createElement("h3", null, selected.title), /* @__PURE__ */ React.createElement("p", null, selected.result), /* @__PURE__ */ React.createElement("div", { className: "home-service-tags" }, selected.includes.slice(0, 3).map((item) => /* @__PURE__ */ React.createElement("span", { key: item }, item))), /* @__PURE__ */ React.createElement("a", { className: "primary", href: "reserva.html" }, "Reservar")))));
}
function ServicesHero() {
  return /* @__PURE__ */ React.createElement("section", { className: "services-hero page-top" }, /* @__PURE__ */ React.createElement("div", { className: "services-hero-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Servicios Velmora"), /* @__PURE__ */ React.createElement("h1", null, "Un menu de belleza organizado para decidir sin confundirte."), /* @__PURE__ */ React.createElement("p", null, "Explora cada tratamiento por objetivo, duraci\xF3n, resultado esperado y extras disponibles. La experiencia esta pensada para que puedas reservar con seguridad antes de llegar.")), /* @__PURE__ */ React.createElement("img", { src: assets.oficina, alt: "Interior de Velmora Est\xE9tica" }));
}
function ServiceExplorer() {
  const [selected, setSelected] = useState(serviceDetails[0]);
  return /* @__PURE__ */ React.createElement("section", { className: "service-explorer section" }, /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Explorador interactivo"), /* @__PURE__ */ React.createElement("h2", null, "Elige una categor\xEDa y mira exactamente que incluye."))), /* @__PURE__ */ React.createElement("div", { className: "service-workbench" }, /* @__PURE__ */ React.createElement("div", { className: "service-tabs", "aria-label": "Categorias de servicio" }, serviceDetails.map((service) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: service.title,
      className: selected.title === service.title ? "active" : "",
      onClick: () => setSelected(service)
    },
    /* @__PURE__ */ React.createElement("span", null, service.category),
    /* @__PURE__ */ React.createElement("strong", null, service.title)
  ))), /* @__PURE__ */ React.createElement(
    motion.div,
    {
      key: selected.title,
      className: "service-detail",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35 }
    },
    /* @__PURE__ */ React.createElement("img", { src: selected.image, alt: selected.title }),
    /* @__PURE__ */ React.createElement("div", { className: "detail-copy" }, /* @__PURE__ */ React.createElement("div", { className: "detail-topline" }, /* @__PURE__ */ React.createElement("span", null, selected.category), /* @__PURE__ */ React.createElement("span", null, selected.duration)), /* @__PURE__ */ React.createElement("h3", null, selected.title), /* @__PURE__ */ React.createElement("dl", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Ideal para"), /* @__PURE__ */ React.createElement("dd", null, selected.bestFor)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Resultado"), /* @__PURE__ */ React.createElement("dd", null, selected.result))), /* @__PURE__ */ React.createElement("div", { className: "detail-columns" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", null, "Incluye"), /* @__PURE__ */ React.createElement("ul", null, selected.includes.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", null, "Extras sugeridos"), /* @__PURE__ */ React.createElement("ul", null, selected.addOns.map((item) => /* @__PURE__ */ React.createElement("li", { key: item }, item))))), /* @__PURE__ */ React.createElement("a", { className: "primary", href: "reserva.html" }, "Reservar este servicio"))
  )));
}
function ServiceMethod() {
  return /* @__PURE__ */ React.createElement("section", { className: "service-method section" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Metodo de atenci\xF3n"), /* @__PURE__ */ React.createElement("h2", null, "La diferencia esta en el orden, no en llenar la p\xE1gina de promesas.")), /* @__PURE__ */ React.createElement("div", { className: "method-steps" }, serviceSteps.map(([number, title, text]) => /* @__PURE__ */ React.createElement(motion.div, { ...fade, key: number }, /* @__PURE__ */ React.createElement("span", null, number), /* @__PURE__ */ React.createElement("strong", null, title), /* @__PURE__ */ React.createElement("p", null, text)))));
}
function ServicePackages() {
  const packages = [
    ["Glow Day", "Facial Glow + manicure rose-gold", "Para renovar piel y manos en una sola visita."],
    ["Evento Pulido", "Makeup Soft Glam + peinado", "Para fotos, graduaciones, reuniones y cenas."],
    ["Rutina Mensual", "Facial + depilacion + seguimiento", "Para mantener una imagen cuidada de forma constante."]
  ];
  return /* @__PURE__ */ React.createElement("section", { className: "service-packages" }, /* @__PURE__ */ React.createElement("div", { className: "section" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Packs inteligentes"), /* @__PURE__ */ React.createElement("h2", null, "Combinaciones para reservar mas r\xE1pido."), /* @__PURE__ */ React.createElement("div", { className: "package-grid" }, packages.map(([name, combo, text]) => /* @__PURE__ */ React.createElement("a", { href: "reserva.html", key: name }, /* @__PURE__ */ React.createElement("span", null, combo), /* @__PURE__ */ React.createElement("strong", null, name), /* @__PURE__ */ React.createElement("p", null, text))))));
}
function ServiceFaq() {
  return /* @__PURE__ */ React.createElement("section", { className: "service-faq section" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Antes de reservar"), /* @__PURE__ */ React.createElement("h2", null, "Preguntas que ayudan a elegir mejor.")), /* @__PURE__ */ React.createElement("div", { className: "faq-list" }, serviceFaqs.map(([q, a]) => /* @__PURE__ */ React.createElement("details", { key: q }, /* @__PURE__ */ React.createElement("summary", null, q), /* @__PURE__ */ React.createElement("p", null, a)))));
}
function ExperienceHero() {
  return /* @__PURE__ */ React.createElement("section", { className: "experience-hero page-top" }, /* @__PURE__ */ React.createElement("div", { className: "experience-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Experiencia Velmora"), /* @__PURE__ */ React.createElement("h1", null, "No vienes solo por un servicio. Vienes a sentirte atendida."), /* @__PURE__ */ React.createElement("p", null, "La experiencia est\xE1 dise\xF1ada como un recorrido: llegada, escucha, servicio, cierre y seguimiento. Cada etapa tiene una intenci\xF3n para que el resultado se sienta cuidado desde antes de empezar.")), /* @__PURE__ */ React.createElement("div", { className: "experience-visual" }, /* @__PURE__ */ React.createElement("img", { src: experienceImages.calm, alt: "Ambiente de spa elegante y relajante" }), /* @__PURE__ */ React.createElement("span", null, "Calma, luz c\xE1lida y atenci\xF3n sin prisa.")));
}
function ExperienceJourney() {
  const [active, setActive] = useState(0);
  const item = journey[active];
  return /* @__PURE__ */ React.createElement("section", { className: "experience-journey section" }, /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Recorrido"), /* @__PURE__ */ React.createElement("h2", null, "Cuatro momentos que hacen que la visita se sienta completa."))), /* @__PURE__ */ React.createElement("div", { className: "journey-board" }, /* @__PURE__ */ React.createElement("div", { className: "journey-nav" }, journey.map(([label, title], index) => /* @__PURE__ */ React.createElement("button", { key: label, className: active === index ? "active" : "", onClick: () => setActive(index) }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("strong", null, title)))), /* @__PURE__ */ React.createElement(motion.div, { className: "journey-panel", key: item[0], initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }, /* @__PURE__ */ React.createElement("img", { src: item[3], alt: item[1] }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, item[0]), /* @__PURE__ */ React.createElement("h3", null, item[1]), /* @__PURE__ */ React.createElement("p", null, item[2])))));
}
function ExperienceModes() {
  const [mode, setMode] = useState("calma");
  const selected = moods[mode];
  return /* @__PURE__ */ React.createElement("section", { className: "experience-modes" }, /* @__PURE__ */ React.createElement("div", { className: "section" }, /* @__PURE__ */ React.createElement("div", { className: "mode-shell" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Personalizaci\xF3n"), /* @__PURE__ */ React.createElement("h2", null, "Elige c\xF3mo quieres vivir tu cita."), /* @__PURE__ */ React.createElement("p", null, "Una buena experiencia no se siente igual para todas. Algunas clientas quieren silencio; otras quieren conversar, grabar contenido o prepararse para un evento."), /* @__PURE__ */ React.createElement("div", { className: "mode-buttons" }, Object.entries(moods).map(([key, value]) => /* @__PURE__ */ React.createElement("button", { key, className: mode === key ? "active" : "", onClick: () => setMode(key) }, value.title)))), /* @__PURE__ */ React.createElement(motion.div, { className: "mode-detail", key: mode, initial: { opacity: 0, x: 18 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.35 } }, /* @__PURE__ */ React.createElement("h3", null, selected.title), /* @__PURE__ */ React.createElement("p", null, selected.text), /* @__PURE__ */ React.createElement("ul", null, selected.details.map((detail) => /* @__PURE__ */ React.createElement("li", { key: detail }, detail)))))));
}
function SensoryDetails() {
  const details = [
    ["Luz", "Iluminaci\xF3n c\xE1lida para que el espacio se vea favorecedor y relajante."],
    ["Aroma", "Fragancias suaves, limpias y no invasivas durante la visita."],
    ["Ritmo", "Tiempos ordenados para evitar la sensaci\xF3n de apuro."],
    ["Privacidad", "Conversaci\xF3n y recomendaciones cuidadas seg\xFAn cada persona."],
    ["Aftercare", "Indicaciones concretas para mantener el resultado en casa."]
  ];
  return /* @__PURE__ */ React.createElement("section", { className: "sensory section" }, /* @__PURE__ */ React.createElement("div", { className: "sensory-image" }, /* @__PURE__ */ React.createElement("img", { src: experienceImages.detail, alt: "Detalle elegante de productos y ambiente de belleza" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Detalles sensoriales"), /* @__PURE__ */ React.createElement("h2", null, "La experiencia se construye en peque\xF1as decisiones."), /* @__PURE__ */ React.createElement("div", { className: "sensory-list" }, details.map(([title, text]) => /* @__PURE__ */ React.createElement("div", { key: title }, /* @__PURE__ */ React.createElement("strong", null, title), /* @__PURE__ */ React.createElement("p", null, text))))));
}
function ExperienceStandards() {
  return /* @__PURE__ */ React.createElement("section", { className: "standards section" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Est\xE1ndares"), /* @__PURE__ */ React.createElement("h2", null, "Lo que puedes esperar en cada visita.")), /* @__PURE__ */ React.createElement("div", { className: "standard-grid" }, ["Confirmaci\xF3n clara de cita", "Consulta antes del servicio", "Materiales limpios y ordenados", "Explicaci\xF3n del proceso", "Recomendaci\xF3n post-visita", "Opci\xF3n de pr\xF3xima reserva"].map((item, index) => /* @__PURE__ */ React.createElement("div", { key: item }, /* @__PURE__ */ React.createElement("span", null, String(index + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("strong", null, item)))));
}
function ExperienceClosing() {
  return /* @__PURE__ */ React.createElement("section", { className: "experience-closing" }, /* @__PURE__ */ React.createElement("img", { src: experienceImages.beverage, alt: "Bebida y momento de pausa en una experiencia de spa" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Antes de irte"), /* @__PURE__ */ React.createElement("h2", null, "El cierre tambi\xE9n importa."), /* @__PURE__ */ React.createElement("p", null, "Una visita bien hecha no termina cuando acaba el servicio. Termina cuando sabes c\xF3mo cuidar el resultado, cu\xE1ndo volver y qu\xE9 combinar la pr\xF3xima vez."), /* @__PURE__ */ React.createElement("a", { className: "primary", href: "reserva.html" }, "Reservar experiencia")));
}
function Space() {
  return /* @__PURE__ */ React.createElement("section", { className: "split section" }, /* @__PURE__ */ React.createElement(motion.img, { ...fade, src: assets.oficina, alt: "Recepcion de Velmora Est\xE9tica" }), /* @__PURE__ */ React.createElement(motion.div, { ...fade, className: "split-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "El espacio"), /* @__PURE__ */ React.createElement("h2", null, "Recepcion luminosa, tonos calidos y una atmosfera pensada para bajar el ritmo."), /* @__PURE__ */ React.createElement("p", null, "La p\xE1gina usa la fotografia de la oficina como base: paredes rosadas, acentos dorados y luz indirecta. El resultado se siente como una marca real, no como una plantilla con decoracion encima."), /* @__PURE__ */ React.createElement("a", { className: "text-link", href: "experiencias.html" }, "Conocer la experiencia")));
}
function ProductFocus() {
  const [bag, setBag] = useState([]);
  const total = bag.reduce((sum, item) => sum + item.price, 0);
  const add = (product) => setBag([...bag, product]);
  const remove = (index) => setBag(bag.filter((_, i) => i !== index));
  const checkout = () => {
    const list = bag.map((item) => `- ${item.name}: S/ ${item.price}`).join("\n");
    const msg = `Hola VELMORA Est\xE9tica, quiero consultar estos productos:

${list}

Total referencial: S/ ${total}`;
    window.open(`https://wa.me/${WSP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ React.createElement("section", { className: "products-page" }, /* @__PURE__ */ React.createElement("div", { className: "product-focus" }, /* @__PURE__ */ React.createElement("div", { className: "product-image" }, /* @__PURE__ */ React.createElement("img", { src: assets.productos, alt: "Productos Velmora" })), /* @__PURE__ */ React.createElement("div", { className: "product-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "L\xEDnea recomendada"), /* @__PURE__ */ React.createElement("h2", null, "Cuidado facial con productos pensados para rutina real."), /* @__PURE__ */ React.createElement("p", null, "Elige productos, agr\xE9galos a tu bolsa y consulta disponibilidad por WhatsApp. Los precios son referenciales para presentar la tienda."))), /* @__PURE__ */ React.createElement("div", { className: "shop-layout section" }, /* @__PURE__ */ React.createElement("div", { className: "product-shop" }, productCatalog.map((product) => /* @__PURE__ */ React.createElement("article", { key: product.name }, /* @__PURE__ */ React.createElement("img", { src: product.image, alt: product.name }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, product.category), /* @__PURE__ */ React.createElement("h3", null, product.name), /* @__PURE__ */ React.createElement("p", null, product.text), /* @__PURE__ */ React.createElement("strong", null, "S/ ", product.price), /* @__PURE__ */ React.createElement("button", { onClick: () => add(product) }, "Agregar a la bolsa"))))), /* @__PURE__ */ React.createElement("aside", { className: "shopping-bag" }, /* @__PURE__ */ React.createElement("div", { className: "bag-icon", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Bolsa Velmora"), /* @__PURE__ */ React.createElement("h2", null, bag.length, " producto", bag.length === 1 ? "" : "s"), bag.length ? /* @__PURE__ */ React.createElement("div", { className: "bag-items" }, bag.map((item, index) => /* @__PURE__ */ React.createElement("button", { key: `${item.name}-${index}`, onClick: () => remove(index) }, /* @__PURE__ */ React.createElement("span", null, item.name), /* @__PURE__ */ React.createElement("strong", null, "S/ ", item.price)))) : /* @__PURE__ */ React.createElement("p", { className: "bag-empty" }, "Agrega productos para armar tu consulta."), /* @__PURE__ */ React.createElement("div", { className: "bag-total" }, /* @__PURE__ */ React.createElement("span", null, "Total referencial"), /* @__PURE__ */ React.createElement("strong", null, "S/ ", total)), /* @__PURE__ */ React.createElement("button", { className: "bag-checkout", disabled: !bag.length, onClick: checkout }, "Consultar bolsa"))));
}
function Gallery() {
  const items = [
    [assets.entrada, "Fachada y llegada"],
    [assets.oficina, "Recepcion"],
    [assets.productos, "Productos"],
    [assets.fondo, "Identidad visual"]
  ];
  return /* @__PURE__ */ React.createElement("section", { className: "gallery section" }, /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Galeria"), /* @__PURE__ */ React.createElement("h2", null, "Imagenes de marca usadas como base visual.")), /* @__PURE__ */ React.createElement("div", { className: "gallery-grid" }, items.map(([src, label]) => /* @__PURE__ */ React.createElement("figure", { key: label }, /* @__PURE__ */ React.createElement("img", { src, alt: label }), /* @__PURE__ */ React.createElement("figcaption", null, label)))));
}
function Promotions() {
  return /* @__PURE__ */ React.createElement("section", { className: "promos section" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Promociones"), /* @__PURE__ */ React.createElement("h2", null, "Packs pensados para reservar r\xE1pido."), /* @__PURE__ */ React.createElement("a", { className: "text-link promo-home-link", href: "promociones.html" }, "Ver promociones")), /* @__PURE__ */ React.createElement("div", { className: "promo-list" }, ["Facial glow", "Manos premium", "Evento especial", "Belleza completa"].map((item) => /* @__PURE__ */ React.createElement("a", { href: "reserva.html", key: item }, item))));
}
function PromotionsPage() {
  const [selected, setSelected] = useState(promoPacks[0]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { className: "promo-hero page-top" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Promociones Velmora"), /* @__PURE__ */ React.createElement("h1", null, "Packs pensados para verte lista sin armar todo desde cero."), /* @__PURE__ */ React.createElement("p", null, "Promociones claras, combinables y dise\xF1adas por momento: una salida, un evento, mantenimiento mensual o primera visita.")), /* @__PURE__ */ React.createElement("img", { src: selected.image, alt: selected.name })), /* @__PURE__ */ React.createElement("section", { className: "promo-builder section" }, /* @__PURE__ */ React.createElement("div", { className: "promo-picker" }, promoPacks.map((pack) => /* @__PURE__ */ React.createElement("button", { key: pack.name, className: selected.name === pack.name ? "active" : "", onClick: () => setSelected(pack) }, /* @__PURE__ */ React.createElement("span", null, pack.tag), /* @__PURE__ */ React.createElement("strong", null, pack.name), /* @__PURE__ */ React.createElement("small", null, pack.price)))), /* @__PURE__ */ React.createElement(motion.div, { className: "promo-detail", key: selected.name, initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }, /* @__PURE__ */ React.createElement("img", { src: selected.image, alt: selected.name }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, selected.tag), /* @__PURE__ */ React.createElement("h2", null, selected.name), /* @__PURE__ */ React.createElement("strong", { className: "promo-price" }, selected.price), /* @__PURE__ */ React.createElement("p", null, selected.promise), /* @__PURE__ */ React.createElement("div", { className: "promo-includes" }, selected.includes.map((item) => /* @__PURE__ */ React.createElement("span", { key: item }, item))), /* @__PURE__ */ React.createElement("div", { className: "promo-best" }, /* @__PURE__ */ React.createElement("b", null, "Ideal para"), /* @__PURE__ */ React.createElement("p", null, selected.bestFor)), /* @__PURE__ */ React.createElement("a", { className: "primary", href: "reserva.html" }, "Quiero este pack")))), /* @__PURE__ */ React.createElement("section", { className: "promo-strip" }, /* @__PURE__ */ React.createElement("div", { className: "section" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "C\xF3mo funciona"), /* @__PURE__ */ React.createElement("div", { className: "promo-rules" }, promoRules.map(([title, text]) => /* @__PURE__ */ React.createElement("div", { key: title }, /* @__PURE__ */ React.createElement("strong", null, title), /* @__PURE__ */ React.createElement("p", null, text)))))), /* @__PURE__ */ React.createElement("section", { className: "promo-calendar section" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Momentos recomendados"), /* @__PURE__ */ React.createElement("h2", null, "Elige el pack seg\xFAn tu semana.")), /* @__PURE__ */ React.createElement("div", { className: "calendar-list" }, [
    ["Lunes a jueves", "Rutina Mensual", "Mejor para mantenimiento sin presi\xF3n."],
    ["Viernes", "Glow Day", "Ideal para llegar al fin de semana fresca."],
    ["S\xE1bado", "Evento Pulido", "Reserva con anticipaci\xF3n para horarios clave."]
  ].map(([day, pack, text]) => /* @__PURE__ */ React.createElement("a", { href: "reserva.html", key: day }, /* @__PURE__ */ React.createElement("span", null, day), /* @__PURE__ */ React.createElement("strong", null, pack), /* @__PURE__ */ React.createElement("p", null, text))))));
}
function About() {
  return /* @__PURE__ */ React.createElement("section", { className: "split section page-top" }, /* @__PURE__ */ React.createElement(motion.div, { ...fade, className: "split-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Nosotros"), /* @__PURE__ */ React.createElement("h1", null, "Velmora nace como un espacio de belleza sereno, femenino y profesional."), /* @__PURE__ */ React.createElement("p", null, "La marca combina una atenci\xF3n cercana con una imagen premium: tonos empolvados, materiales calidos, productos cuidados y una experiencia que se siente ordenada desde el primer contacto.")), /* @__PURE__ */ React.createElement(motion.img, { ...fade, src: assets.oficina, alt: "Interior de Velmora" }));
}
function Booking() {
  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = `Hola VELMORA Est\xE9tica, quiero reservar una cita.

Nombre: ${d.get("nombre")}
Tel\xE9fono: ${d.get("telefono")}
Servicio: ${d.get("servicio")}
Fecha: ${d.get("fecha")}
Hora: ${d.get("hora")}
Modo: ${d.get("modo")}`;
    window.open(`https://wa.me/${WSP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  }
  return /* @__PURE__ */ React.createElement("section", { className: "booking booking-upgraded section page-top" }, /* @__PURE__ */ React.createElement("div", { className: "booking-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Reserva"), /* @__PURE__ */ React.createElement("h1", null, "Agenda tu cita con m\xE1s claridad y menos vueltas."), /* @__PURE__ */ React.createElement("p", null, "Elige servicio, fecha y hora tentativa. El equipo recibe el mensaje por WhatsApp y confirma disponibilidad, duraci\xF3n y recomendaci\xF3n previa."), /* @__PURE__ */ React.createElement("div", { className: "booking-benefits" }, ["Confirmaci\xF3n por WhatsApp", "Recomendaci\xF3n antes de venir", "Opci\xF3n de pack o servicio individual"].map((item) => /* @__PURE__ */ React.createElement("span", { key: item }, item)))), /* @__PURE__ */ React.createElement("form", { onSubmit: submit }, /* @__PURE__ */ React.createElement("input", { name: "nombre", placeholder: "Nombre", required: true }), /* @__PURE__ */ React.createElement("input", { name: "telefono", placeholder: "Tel\xE9fono", required: true }), /* @__PURE__ */ React.createElement("select", { name: "servicio", required: true }, services.map(([s]) => /* @__PURE__ */ React.createElement("option", { key: s }, s))), /* @__PURE__ */ React.createElement("input", { name: "fecha", type: "date", required: true }), /* @__PURE__ */ React.createElement("input", { name: "hora", type: "time", required: true }), /* @__PURE__ */ React.createElement("select", { name: "modo" }, /* @__PURE__ */ React.createElement("option", null, "Experiencia calma"), /* @__PURE__ */ React.createElement("option", null, "Experiencia social"), /* @__PURE__ */ React.createElement("option", null, "Experiencia evento")), /* @__PURE__ */ React.createElement("button", null, "Enviar por WhatsApp")));
}
function Contact() {
  return /* @__PURE__ */ React.createElement("section", { className: "contact contact-upgraded section page-top" }, /* @__PURE__ */ React.createElement("div", { className: "contact-copy" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Contacto"), /* @__PURE__ */ React.createElement("h1", null, "Hablemos de tu pr\xF3xima visita."), /* @__PURE__ */ React.createElement("p", null, "Para reservas r\xE1pidas usa WhatsApp. Para inspiraci\xF3n, resultados y novedades puedes seguir las redes de Velmora."), /* @__PURE__ */ React.createElement("div", { className: "contact-actions" }, socialLinks.map(([label, href, icon]) => /* @__PURE__ */ React.createElement("a", { key: label, href, target: href === "#" ? "_self" : "_blank", rel: "noreferrer" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("img", { src: icon, alt: "" })), /* @__PURE__ */ React.createElement("strong", null, label)))), /* @__PURE__ */ React.createElement("div", { className: "contact-info" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Horario"), /* @__PURE__ */ React.createElement("strong", null, "Lunes a s\xE1bado con cita previa")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Respuesta"), /* @__PURE__ */ React.createElement("strong", null, "Consultas y reservas por WhatsApp")))), /* @__PURE__ */ React.createElement("div", { className: "contact-map" }, /* @__PURE__ */ React.createElement("iframe", { title: "Mapa", src: "https://www.google.com/maps?q=Lima%20Peru&output=embed", loading: "lazy" })));
}
function Blog() {
  return /* @__PURE__ */ React.createElement("section", { className: "section page-top journal" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Blog"), /* @__PURE__ */ React.createElement("h1", null, "Notas breves para cuidar tu rutina."), ["Como preparar la piel antes de un evento", "Que llevar a una cita de manicure", "Rutina facial simple para la semana"].map((title) => /* @__PURE__ */ React.createElement("article", { key: title }, /* @__PURE__ */ React.createElement("span", null, "Velmora Journal"), /* @__PURE__ */ React.createElement("h2", null, title), /* @__PURE__ */ React.createElement("p", null, "Consejos practicos, tono editorial y recomendaciones faciles de aplicar."))));
}
function Footer() {
  return /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("div", { className: "footer-inner" }, /* @__PURE__ */ React.createElement("div", { className: "footer-brand" }, /* @__PURE__ */ React.createElement("img", { src: assets.logo, alt: "VELMORA Est\xE9tica" }), /* @__PURE__ */ React.createElement("p", null, "Velmora Est\xE9tica. Belleza, calma y cuidado personal.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Redes"), /* @__PURE__ */ React.createElement("div", { className: "footer-icons" }, socialLinks.map(([label, href, icon]) => /* @__PURE__ */ React.createElement("a", { key: label, href, "aria-label": label }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("img", { src: icon, alt: "" })))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "M\xE9todos de pago"), /* @__PURE__ */ React.createElement("img", { className: "payment-photo", src: assets.pagos, alt: "M\xE9todos de pago aceptados" }))), /* @__PURE__ */ React.createElement("span", { className: "footer-copy" }, "\xA9 2026 VELMORA Est\xE9tica"));
}
function Page() {
  const map = {
    inicio: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(Intro, null), /* @__PURE__ */ React.createElement(ServiceList, null), /* @__PURE__ */ React.createElement(Space, null), /* @__PURE__ */ React.createElement(ProductFocus, null), /* @__PURE__ */ React.createElement(Promotions, null)),
    servicios: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ServicesHero, null), /* @__PURE__ */ React.createElement(ServiceExplorer, null), /* @__PURE__ */ React.createElement(ServiceMethod, null), /* @__PURE__ */ React.createElement(ServicePackages, null), /* @__PURE__ */ React.createElement(ServiceFaq, null)),
    experiencias: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ExperienceHero, null), /* @__PURE__ */ React.createElement(ExperienceJourney, null), /* @__PURE__ */ React.createElement(ExperienceModes, null), /* @__PURE__ */ React.createElement(SensoryDetails, null), /* @__PURE__ */ React.createElement(ExperienceStandards, null), /* @__PURE__ */ React.createElement(ExperienceClosing, null)),
    promociones: /* @__PURE__ */ React.createElement(PromotionsPage, null),
    productos: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { className: "page-title section page-top" }, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Productos"), /* @__PURE__ */ React.createElement("h1", null, "Linea recomendada")), /* @__PURE__ */ React.createElement(ProductFocus, null)),
    galeria: /* @__PURE__ */ React.createElement(Gallery, null),
    blog: /* @__PURE__ */ React.createElement(Blog, null),
    nosotros: /* @__PURE__ */ React.createElement(About, null),
    reserva: /* @__PURE__ */ React.createElement(Booking, null),
    contacto: /* @__PURE__ */ React.createElement(Contact, null)
  };
  return /* @__PURE__ */ React.createElement(Shell, null, map[page] || map.inicio);
}
createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(Page, null));
