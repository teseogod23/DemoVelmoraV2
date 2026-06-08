import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';

const WSP = '51950039142';
const page = document.body.dataset.page || 'inicio';

const assets = {
  logo: 'assets/logo-velmora-clean.png',
  fondo: 'assets/velmora-fondo.jpg',
  oficina: 'assets/velmora-oficina.jpg',
  productos: 'assets/velmora-productos.jpg',
  entrada: 'assets/velmora-entrada.jpg',
  pagos: 'assets/metododepago.png',
  wssp: 'assets/wssp.png'
};

const services = [
  ['Faciales', 'Limpieza, hidratación y diagnostico de piel con productos de cabina.'],
  ['Manos y pies', 'Manicure, pedicure, gel y acabados elegantes para uso diario o eventos.'],
  ['Cabello', 'Corte, peinado, tratamiento capilar y preparación para ocasiones especiales.'],
  ['Maquillaje', 'Maquillaje profesional con piel pulida, tonos suaves y larga duración.'],
  ['Depilación', 'Protocolos higienicos, rápidos y pensados para comodidad.'],
  ['Imagen', 'Asesoría de estilo, colorimetria y rutina personal de belleza.']
];

const serviceDetails = [
  {
    title: 'Facial Glow Velmora',
    category: 'Faciales',
    duration: '60 - 75 min',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1300&q=86',
    bestFor: 'Piel opaca, resequedad, textura irregular o primera visita.',
    result: 'Piel limpia, hidratada y con acabado luminoso sin sentirse pesada.',
    includes: ['Diagnostico de piel', 'Limpieza profunda', 'Exfoliacion suave', 'Mascarilla hidratante', 'Sellado con serum y crema'],
    addOns: ['LED calmante', 'Masaje lifting', 'Hydrojelly mask']
  },
  {
    title: 'Manicure Rose-Gold',
    category: 'Manos y pies',
    duration: '45 - 70 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1300&q=86',
    bestFor: 'Uñas elegantes para uso diario, fotos, reuniones o eventos.',
    result: 'Manos pulidas, cuticula limpia y acabado uniforme con tonos delicados.',
    includes: ['Limpieza de cuticula', 'Forma personalizada', 'Nivelacion ligera', 'Color tradicional o gel', 'Aceite nutritivo'],
    addOns: ['Nail art minimal', 'Francesa fina', 'Pedicure spa']
  },
  {
    title: 'Cabello Soft Finish',
    category: 'Cabello',
    duration: '60 - 120 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1300&q=86',
    bestFor: 'Cambio de look sutil, peinado para evento o cabello con frizz.',
    result: 'Cabello suave, con movimiento y acabado de salon.',
    includes: ['Evaluación del cabello', 'Lavado y preparación', 'Tratamiento nutritivo', 'Cepillado o ondas', 'Recomendacion de rutina'],
    addOns: ['Ampolla hidratante', 'Corte de puntas', 'Peinado social']
  },
  {
    title: 'Makeup Soft Glam',
    category: 'Maquillaje',
    duration: '75 - 100 min',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1300&q=86',
    bestFor: 'Eventos, fotos, graduaciones, cenas o contenido para redes.',
    result: 'Piel pulida, ojos definidos y tonos armonizados con tu estilo.',
    includes: ['Preparacion de piel', 'Correccion ligera', 'Base de larga duración', 'Ojos y labios', 'Sellado final'],
    addOns: ['Pestanas', 'Retoque para evento', 'Peinado express']
  },
  {
    title: 'Depilación Delicada',
    category: 'Depilación',
    duration: '20 - 60 min',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1300&q=86',
    bestFor: 'Mantenimiento personal con higiene, rapidez y cuidado de piel.',
    result: 'Piel limpia y suave con indicaciones para evitar irritacion.',
    includes: ['Preparacion de zona', 'Tecnica según sensibilidad', 'Retiro cuidadoso', 'Calmante post servicio', 'Indicaciones de cuidado'],
    addOns: ['Exfoliacion previa', 'Hidratacion post', 'Diseno de cejas']
  },
  {
    title: 'Asesoría Imagen Velmora',
    category: 'Imagen',
    duration: '45 - 90 min',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1300&q=86',
    bestFor: 'Quienes quieren verse mas ordenadas sin cambiar su esencia.',
    result: 'Guia clara de colores, estilo, maquillaje y cuidado personal.',
    includes: ['Lectura de estilo', 'Colorimetría básica', 'Rutina de belleza', 'Recomendacion de servicios', 'Plan de seguimiento'],
    addOns: ['Moodboard personal', 'Maquillaje de prueba', 'Plan mensual']
  }
];

const serviceSteps = [
  ['01', 'Lectura inicial', 'Revisamos tu necesidad, tiempo disponible, sensibilidad y objetivo.'],
  ['02', 'Servicio guiado', 'Se explica cada paso para que la experiencia se sienta clara y tranquila.'],
  ['03', 'Cierre y rutina', 'Sales con recomendaciones simples para conservar el resultado.']
];

const serviceFaqs = [
  ['Cómo elijo el servicio correcto?', 'Si es tu primera visita, empieza por Facial Glow o Asesoría Imagen. Desde ahi se arma una rutina más precisa.'],
  ['Puedo combinar servicios?', 'Si. Los packs pueden unir facial, manicure, maquillaje o peinado según evento y disponibilidad.'],
  ['Necesito prepararme antes?', 'Para faciales evita exfoliarte el mismo dia. Para maquillaje llega con piel limpia. Para depilacion evita sol directo antes y despues.'],
  ['Los tiempos son exactos?', 'Son rangos. La duración puede variar según piel, cabello, diseno o nivel de detalle solicitado.']
];

const experienceImages = {
  calm: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1500&q=86',
  consultation: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1300&q=86',
  ritual: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1300&q=86',
  beverage: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1300&q=86',
  detail: 'https://images.unsplash.com/photo-1607008829749-c0f284a498e5?auto=format&fit=crop&w=1300&q=86',
  aftercare: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1300&q=86'
};

const journey = [
  ['Llegada', 'Recepción tranquila', 'Te recibimos en un ambiente cálido, con tiempo para respirar y confirmar el servicio sin apuro.', experienceImages.calm],
  ['Consulta', 'Escucha real', 'Antes de empezar revisamos objetivo, rutina, sensibilidad, evento o estilo de vida.', experienceImages.consultation],
  ['Ritual', 'Servicio guiado', 'Cada paso se explica con claridad para que sepas qué se está haciendo y por qué.', experienceImages.ritual],
  ['Cierre', 'Rutina post-visita', 'Te llevas recomendaciones simples para cuidar el resultado y saber cuándo volver.', experienceImages.aftercare]
];

const moods = {
  calma: {
    title: 'Experiencia calma',
    text: 'Menos conversación, luz suave, ritmo pausado y una atención enfocada en relajarte.',
    details: ['Música baja', 'Pausas entre pasos', 'Indicaciones breves', 'Cierre con rutina simple']
  },
  social: {
    title: 'Experiencia social',
    text: 'Una visita más conversada, ideal para amigas, eventos o preparación antes de una salida.',
    details: ['Recomendaciones de estilo', 'Fotos del resultado', 'Ideas de combinación', 'Reserva de pack']
  },
  evento: {
    title: 'Experiencia evento',
    text: 'Preparación coordinada para maquillaje, cabello, manos y retoques con foco en puntualidad.',
    details: ['Orden de servicios', 'Tiempo controlado', 'Acabado fotogénico', 'Checklist final']
  }
};

const promoPacks = [
  {
    name: 'Glow Day',
    tag: 'Piel + manos',
    price: 'Desde S/ 149',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1300&q=86',
    promise: 'Para salir con piel fresca y manos impecables en una sola visita.',
    includes: ['Facial express hidratante', 'Manicure rose-gold', 'Aceite nutritivo final'],
    bestFor: 'Semana cargada, fotos casuales o una renovación rápida.'
  },
  {
    name: 'Evento Pulido',
    tag: 'Maquillaje + cabello',
    price: 'Desde S/ 229',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1300&q=86',
    promise: 'Acabado fotogénico, elegante y coordinado para eventos.',
    includes: ['Preparación de piel', 'Makeup soft glam', 'Ondas o peinado social'],
    bestFor: 'Graduaciones, cenas, cumpleaños, sesiones y reuniones.'
  },
  {
    name: 'Rutina Mensual',
    tag: 'Mantenimiento',
    price: 'Desde S/ 289',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1300&q=86',
    promise: 'Un plan ordenado para mantener piel, manos e imagen sin improvisar.',
    includes: ['Facial Glow Velmora', 'Manicure o pedicure', 'Seguimiento de rutina'],
    bestFor: 'Clientas que quieren constancia y una imagen siempre cuidada.'
  },
  {
    name: 'Primera Visita',
    tag: 'Diagnóstico',
    price: 'Desde S/ 99',
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1300&q=86',
    promise: 'Una entrada amable a Velmora para conocer tu piel, estilo y objetivos.',
    includes: ['Lectura de necesidad', 'Servicio inicial recomendado', 'Plan sugerido'],
    bestFor: 'Quienes aún no saben qué servicio elegir.'
  }
];

const promoRules = [
  ['Reserva previa', 'Los packs se agendan por WhatsApp según disponibilidad del día.'],
  ['Personalizable', 'Puedes cambiar un servicio por otro equivalente si el equipo lo aprueba.'],
  ['Cupos limitados', 'Las promociones funcionan mejor con horario separado y puntualidad.']
];

const products = [
  ['Gel limpiador', 'Limpieza suave para preparar la piel.'],
  ['Serum facial', 'Hidratacion profunda y luminosidad.'],
  ['Crema hidratante', 'Nutricion y reparacion diaria.'],
  ['Crema reafirmante', 'Efecto lifting y elasticidad.']
];

const productCatalog = [
  { name: 'Gel limpiador', price: 45, category: 'Limpieza', text: 'Limpieza suave para retirar impurezas sin resecar.', image: assets.productos },
  { name: 'Sérum facial', price: 69, category: 'Hidratación', text: 'Hidratación profunda y acabado luminoso.', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=86' },
  { name: 'Crema hidratante', price: 59, category: 'Rutina diaria', text: 'Nutrición y reparación para uso de mañana o noche.', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=86' },
  { name: 'Crema reafirmante', price: 76, category: 'Tratamiento', text: 'Textura rica para elasticidad y masaje facial.', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=86' },
  { name: 'Protector glow SPF', price: 64, category: 'Protección', text: 'Protección diaria con acabado natural y ligero.', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=86' },
  { name: 'Kit Velmora mini', price: 119, category: 'Pack', text: 'Rutina compacta para probar limpieza, serum y crema.', image: assets.productos }
];

const socialLinks = [
  ['WhatsApp', `https://wa.me/${WSP}`, 'https://cdn.simpleicons.org/whatsapp/ffffff'],
  ['Instagram', '#', 'https://cdn.simpleicons.org/instagram/ffffff'],
  ['TikTok', '#', 'https://cdn.simpleicons.org/tiktok/ffffff'],
  ['Facebook', '#', 'https://cdn.simpleicons.org/facebook/ffffff']
];

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: 'easeOut' }
};

function Shell({ children }) {
  return <>
    <Header />
    <main>{children}</main>
    <a className="whatsapp" href={`https://wa.me/${WSP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      <img src={assets.wssp} alt="" />
    </a>
    <Footer />
  </>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Inicio', 'index.html'],
    ['Servicios', 'servicios.html'],
    ['Productos', 'productos.html'],
    ['Experiencia', 'experiencias.html'],
    ['Galeria', 'galeria.html'],
    ['Reserva', 'reserva.html'],
    ['Contacto', 'contacto.html']
  ];

  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <a className="brand" href="index.html" aria-label="Velmora inicio">
      <img src={assets.logo} alt="VELMORA Estética" />
    </a>
    <button className={`menu-button ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav className={open ? 'is-open' : ''}>
      {links.map(([label, url]) => <a key={url} href={url}>{label}</a>)}
    </nav>
  </header>;
}

function Hero() {
  return <section className="hero">
    <img className="hero-bg" src={assets.entrada} alt="Entrada de Velmora Estética" />
    <div className="hero-shade" />
    <motion.div className="hero-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <img className="hero-logo" src={assets.logo} alt="VELMORA Estética" />
      <p className="eyebrow">Estética premium en tonos rose-gold</p>
      <h1>Realza tu belleza, renueva tu esencia.</h1>
      <p className="lead">Un espacio femenino, calmado y profesional para tratamientos faciales, manos, cabello, maquillaje y cuidado personal.</p>
      <div className="actions">
        <a className="primary" href="reserva.html">Reservar cita</a>
        <a className="secondary" href="servicios.html">Ver servicios</a>
      </div>
    </motion.div>
  </section>;
}

function Intro() {
  return <section className="intro-modern section">
    <motion.div {...fade} className="intro-panel">
      <p className="eyebrow">Velmora Estética</p>
      <h2>Una visita que se siente diseñada, no improvisada.</h2>
      <p>Desde la llegada hasta el cierre, cada decisión visual y de atención busca transmitir calma, confianza y belleza premium.</p>
      <div className="intro-stats">
        <span><strong>01</strong>Recepción cálida</span>
        <span><strong>02</strong>Diagnóstico claro</span>
        <span><strong>03</strong>Resultado cuidado</span>
      </div>
    </motion.div>
    <motion.div {...fade} className="intro-image-stack">
      <img src={assets.oficina} alt="Recepción Velmora" />
      <img src={assets.productos} alt="Productos Velmora" />
    </motion.div>
  </section>;
}

function ServiceList() {
  const [active, setActive] = useState(0);
  const selected = serviceDetails[active];

  return <section className="services-modern section">
    <div className="services-modern-head">
      <div>
        <p className="eyebrow">Servicios</p>
        <h2>Elige por necesidad, no por una lista interminable.</h2>
      </div>
      <a className="text-link promo-home-link" href="servicios.html">Ver todos los servicios</a>
    </div>
    <div className="home-service-lab">
      <div className="home-service-menu">
        {serviceDetails.map((service, index) => <button key={service.title} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{service.category}</strong>
          <small>{service.duration}</small>
        </button>)}
      </div>
      <motion.div className="home-service-card" key={selected.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .32 }}>
        <img src={selected.image} alt={selected.title} />
        <div>
          <p className="eyebrow">{selected.category}</p>
          <h3>{selected.title}</h3>
          <p>{selected.result}</p>
          <div className="home-service-tags">
            {selected.includes.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
          </div>
          <a className="primary" href="reserva.html">Reservar</a>
        </div>
      </motion.div>
    </div>
  </section>;
}

function ServicesHero() {
  return <section className="services-hero page-top">
    <div className="services-hero-copy">
      <p className="eyebrow">Servicios Velmora</p>
      <h1>Un menu de belleza organizado para decidir sin confundirte.</h1>
      <p>Explora cada tratamiento por objetivo, duración, resultado esperado y extras disponibles. La experiencia esta pensada para que puedas reservar con seguridad antes de llegar.</p>
    </div>
    <img src={assets.oficina} alt="Interior de Velmora Estética" />
  </section>;
}

function ServiceExplorer() {
  const [selected, setSelected] = useState(serviceDetails[0]);

  return <section className="service-explorer section">
    <div className="section-heading">
      <div>
        <p className="eyebrow">Explorador interactivo</p>
        <h2>Elige una categoría y mira exactamente que incluye.</h2>
      </div>
    </div>
    <div className="service-workbench">
      <div className="service-tabs" aria-label="Categorias de servicio">
        {serviceDetails.map((service) => <button
          key={service.title}
          className={selected.title === service.title ? 'active' : ''}
          onClick={() => setSelected(service)}
        >
          <span>{service.category}</span>
          <strong>{service.title}</strong>
        </button>)}
      </div>
      <motion.div
        key={selected.title}
        className="service-detail"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .35 }}
      >
        <img src={selected.image} alt={selected.title} />
        <div className="detail-copy">
          <div className="detail-topline">
            <span>{selected.category}</span>
            <span>{selected.duration}</span>
          </div>
          <h3>{selected.title}</h3>
          <dl>
            <div>
              <dt>Ideal para</dt>
              <dd>{selected.bestFor}</dd>
            </div>
            <div>
              <dt>Resultado</dt>
              <dd>{selected.result}</dd>
            </div>
          </dl>
          <div className="detail-columns">
            <div>
              <h4>Incluye</h4>
              <ul>{selected.includes.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h4>Extras sugeridos</h4>
              <ul>{selected.addOns.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <a className="primary" href="reserva.html">Reservar este servicio</a>
        </div>
      </motion.div>
    </div>
  </section>;
}

function ServiceMethod() {
  return <section className="service-method section">
    <div>
      <p className="eyebrow">Metodo de atención</p>
      <h2>La diferencia esta en el orden, no en llenar la página de promesas.</h2>
    </div>
    <div className="method-steps">
      {serviceSteps.map(([number, title, text]) => <motion.div {...fade} key={number}>
        <span>{number}</span>
        <strong>{title}</strong>
        <p>{text}</p>
      </motion.div>)}
    </div>
  </section>;
}

function ServicePackages() {
  const packages = [
    ['Glow Day', 'Facial Glow + manicure rose-gold', 'Para renovar piel y manos en una sola visita.'],
    ['Evento Pulido', 'Makeup Soft Glam + peinado', 'Para fotos, graduaciones, reuniones y cenas.'],
    ['Rutina Mensual', 'Facial + depilacion + seguimiento', 'Para mantener una imagen cuidada de forma constante.']
  ];

  return <section className="service-packages">
    <div className="section">
      <p className="eyebrow">Packs inteligentes</p>
      <h2>Combinaciones para reservar mas rápido.</h2>
      <div className="package-grid">
        {packages.map(([name, combo, text]) => <a href="reserva.html" key={name}>
          <span>{combo}</span>
          <strong>{name}</strong>
          <p>{text}</p>
        </a>)}
      </div>
    </div>
  </section>;
}

function ServiceFaq() {
  return <section className="service-faq section">
    <div>
      <p className="eyebrow">Antes de reservar</p>
      <h2>Preguntas que ayudan a elegir mejor.</h2>
    </div>
    <div className="faq-list">
      {serviceFaqs.map(([q, a]) => <details key={q}>
        <summary>{q}</summary>
        <p>{a}</p>
      </details>)}
    </div>
  </section>;
}

function ExperienceHero() {
  return <section className="experience-hero page-top">
    <div className="experience-copy">
      <p className="eyebrow">Experiencia Velmora</p>
      <h1>No vienes solo por un servicio. Vienes a sentirte atendida.</h1>
      <p>La experiencia está diseñada como un recorrido: llegada, escucha, servicio, cierre y seguimiento. Cada etapa tiene una intención para que el resultado se sienta cuidado desde antes de empezar.</p>
    </div>
    <div className="experience-visual">
      <img src={experienceImages.calm} alt="Ambiente de spa elegante y relajante" />
      <span>Calma, luz cálida y atención sin prisa.</span>
    </div>
  </section>;
}

function ExperienceJourney() {
  const [active, setActive] = useState(0);
  const item = journey[active];

  return <section className="experience-journey section">
    <div className="section-heading">
      <div>
        <p className="eyebrow">Recorrido</p>
        <h2>Cuatro momentos que hacen que la visita se sienta completa.</h2>
      </div>
    </div>
    <div className="journey-board">
      <div className="journey-nav">
        {journey.map(([label, title], index) => <button key={label} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
          <span>{label}</span>
          <strong>{title}</strong>
        </button>)}
      </div>
      <motion.div className="journey-panel" key={item[0]} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
        <img src={item[3]} alt={item[1]} />
        <div>
          <p className="eyebrow">{item[0]}</p>
          <h3>{item[1]}</h3>
          <p>{item[2]}</p>
        </div>
      </motion.div>
    </div>
  </section>;
}

function ExperienceModes() {
  const [mode, setMode] = useState('calma');
  const selected = moods[mode];

  return <section className="experience-modes">
    <div className="section">
      <div className="mode-shell">
        <div>
          <p className="eyebrow">Personalización</p>
          <h2>Elige cómo quieres vivir tu cita.</h2>
          <p>Una buena experiencia no se siente igual para todas. Algunas clientas quieren silencio; otras quieren conversar, grabar contenido o prepararse para un evento.</p>
          <div className="mode-buttons">
            {Object.entries(moods).map(([key, value]) => <button key={key} className={mode === key ? 'active' : ''} onClick={() => setMode(key)}>{value.title}</button>)}
          </div>
        </div>
        <motion.div className="mode-detail" key={mode} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .35 }}>
          <h3>{selected.title}</h3>
          <p>{selected.text}</p>
          <ul>{selected.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </motion.div>
      </div>
    </div>
  </section>;
}

function SensoryDetails() {
  const details = [
    ['Luz', 'Iluminación cálida para que el espacio se vea favorecedor y relajante.'],
    ['Aroma', 'Fragancias suaves, limpias y no invasivas durante la visita.'],
    ['Ritmo', 'Tiempos ordenados para evitar la sensación de apuro.'],
    ['Privacidad', 'Conversación y recomendaciones cuidadas según cada persona.'],
    ['Aftercare', 'Indicaciones concretas para mantener el resultado en casa.']
  ];

  return <section className="sensory section">
    <div className="sensory-image">
      <img src={experienceImages.detail} alt="Detalle elegante de productos y ambiente de belleza" />
    </div>
    <div>
      <p className="eyebrow">Detalles sensoriales</p>
      <h2>La experiencia se construye en pequeñas decisiones.</h2>
      <div className="sensory-list">
        {details.map(([title, text]) => <div key={title}>
          <strong>{title}</strong>
          <p>{text}</p>
        </div>)}
      </div>
    </div>
  </section>;
}

function ExperienceStandards() {
  return <section className="standards section">
    <div>
      <p className="eyebrow">Estándares</p>
      <h2>Lo que puedes esperar en cada visita.</h2>
    </div>
    <div className="standard-grid">
      {['Confirmación clara de cita', 'Consulta antes del servicio', 'Materiales limpios y ordenados', 'Explicación del proceso', 'Recomendación post-visita', 'Opción de próxima reserva'].map((item, index) => <div key={item}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <strong>{item}</strong>
      </div>)}
    </div>
  </section>;
}

function ExperienceClosing() {
  return <section className="experience-closing">
    <img src={experienceImages.beverage} alt="Bebida y momento de pausa en una experiencia de spa" />
    <div>
      <p className="eyebrow">Antes de irte</p>
      <h2>El cierre también importa.</h2>
      <p>Una visita bien hecha no termina cuando acaba el servicio. Termina cuando sabes cómo cuidar el resultado, cuándo volver y qué combinar la próxima vez.</p>
      <a className="primary" href="reserva.html">Reservar experiencia</a>
    </div>
  </section>;
}

function Space() {
  return <section className="split section">
    <motion.img {...fade} src={assets.oficina} alt="Recepcion de Velmora Estética" />
    <motion.div {...fade} className="split-copy">
      <p className="eyebrow">El espacio</p>
      <h2>Recepcion luminosa, tonos calidos y una atmosfera pensada para bajar el ritmo.</h2>
      <p>La página usa la fotografia de la oficina como base: paredes rosadas, acentos dorados y luz indirecta. El resultado se siente como una marca real, no como una plantilla con decoracion encima.</p>
      <a className="text-link" href="experiencias.html">Conocer la experiencia</a>
    </motion.div>
  </section>;
}

function ProductFocus() {
  const [bag, setBag] = useState([]);
  const total = bag.reduce((sum, item) => sum + item.price, 0);
  const add = (product) => setBag([...bag, product]);
  const remove = (index) => setBag(bag.filter((_, i) => i !== index));
  const checkout = () => {
    const list = bag.map((item) => `- ${item.name}: S/ ${item.price}`).join('\n');
    const msg = `Hola VELMORA Estética, quiero consultar estos productos:\n\n${list}\n\nTotal referencial: S/ ${total}`;
    window.open(`https://wa.me/${WSP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return <section className="products-page">
    <div className="product-focus">
      <div className="product-image">
        <img src={assets.productos} alt="Productos Velmora" />
      </div>
      <div className="product-copy">
        <p className="eyebrow">Línea recomendada</p>
        <h2>Cuidado facial con productos pensados para rutina real.</h2>
        <p>Elige productos, agrégalos a tu bolsa y consulta disponibilidad por WhatsApp. Los precios son referenciales para presentar la tienda.</p>
      </div>
    </div>
    <div className="shop-layout section">
      <div className="product-shop">
        {productCatalog.map((product) => <article key={product.name}>
          <img src={product.image} alt={product.name} />
          <div>
            <span>{product.category}</span>
            <h3>{product.name}</h3>
            <p>{product.text}</p>
            <strong>S/ {product.price}</strong>
            <button onClick={() => add(product)}>Agregar a la bolsa</button>
          </div>
        </article>)}
      </div>
      <aside className="shopping-bag">
        <div className="bag-icon" aria-hidden="true"></div>
        <p className="eyebrow">Bolsa Velmora</p>
        <h2>{bag.length} producto{bag.length === 1 ? '' : 's'}</h2>
        {bag.length ? <div className="bag-items">
          {bag.map((item, index) => <button key={`${item.name}-${index}`} onClick={() => remove(index)}>
            <span>{item.name}</span>
            <strong>S/ {item.price}</strong>
          </button>)}
        </div> : <p className="bag-empty">Agrega productos para armar tu consulta.</p>}
        <div className="bag-total">
          <span>Total referencial</span>
          <strong>S/ {total}</strong>
        </div>
        <button className="bag-checkout" disabled={!bag.length} onClick={checkout}>Consultar bolsa</button>
      </aside>
    </div>
  </section>;
}

function Gallery() {
  const items = [
    [assets.entrada, 'Fachada y llegada'],
    [assets.oficina, 'Recepcion'],
    [assets.productos, 'Productos'],
    [assets.fondo, 'Identidad visual']
  ];
  return <section className="gallery section">
    <div className="section-heading">
      <p className="eyebrow">Galeria</p>
      <h2>Imagenes de marca usadas como base visual.</h2>
    </div>
    <div className="gallery-grid">
      {items.map(([src, label]) => <figure key={label}>
        <img src={src} alt={label} />
        <figcaption>{label}</figcaption>
      </figure>)}
    </div>
  </section>;
}

function Promotions() {
  return <section className="promos section">
    <div>
      <p className="eyebrow">Promociones</p>
      <h2>Packs pensados para reservar rápido.</h2>
      <a className="text-link promo-home-link" href="promociones.html">Ver promociones</a>
    </div>
    <div className="promo-list">
      {['Facial glow', 'Manos premium', 'Evento especial', 'Belleza completa'].map((item) => <a href="reserva.html" key={item}>{item}</a>)}
    </div>
  </section>;
}

function PromotionsPage() {
  const [selected, setSelected] = useState(promoPacks[0]);

  return <>
    <section className="promo-hero page-top">
      <div>
        <p className="eyebrow">Promociones Velmora</p>
        <h1>Packs pensados para verte lista sin armar todo desde cero.</h1>
        <p>Promociones claras, combinables y diseñadas por momento: una salida, un evento, mantenimiento mensual o primera visita.</p>
      </div>
      <img src={selected.image} alt={selected.name} />
    </section>

    <section className="promo-builder section">
      <div className="promo-picker">
        {promoPacks.map((pack) => <button key={pack.name} className={selected.name === pack.name ? 'active' : ''} onClick={() => setSelected(pack)}>
          <span>{pack.tag}</span>
          <strong>{pack.name}</strong>
          <small>{pack.price}</small>
        </button>)}
      </div>
      <motion.div className="promo-detail" key={selected.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
        <img src={selected.image} alt={selected.name} />
        <div>
          <p className="eyebrow">{selected.tag}</p>
          <h2>{selected.name}</h2>
          <strong className="promo-price">{selected.price}</strong>
          <p>{selected.promise}</p>
          <div className="promo-includes">
            {selected.includes.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="promo-best">
            <b>Ideal para</b>
            <p>{selected.bestFor}</p>
          </div>
          <a className="primary" href="reserva.html">Quiero este pack</a>
        </div>
      </motion.div>
    </section>

    <section className="promo-strip">
      <div className="section">
        <p className="eyebrow">Cómo funciona</p>
        <div className="promo-rules">
          {promoRules.map(([title, text]) => <div key={title}>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="promo-calendar section">
      <div>
        <p className="eyebrow">Momentos recomendados</p>
        <h2>Elige el pack según tu semana.</h2>
      </div>
      <div className="calendar-list">
        {[
          ['Lunes a jueves', 'Rutina Mensual', 'Mejor para mantenimiento sin presión.'],
          ['Viernes', 'Glow Day', 'Ideal para llegar al fin de semana fresca.'],
          ['Sábado', 'Evento Pulido', 'Reserva con anticipación para horarios clave.']
        ].map(([day, pack, text]) => <a href="reserva.html" key={day}>
          <span>{day}</span>
          <strong>{pack}</strong>
          <p>{text}</p>
        </a>)}
      </div>
    </section>
  </>;
}

function About() {
  return <section className="split section page-top">
    <motion.div {...fade} className="split-copy">
      <p className="eyebrow">Nosotros</p>
      <h1>Velmora nace como un espacio de belleza sereno, femenino y profesional.</h1>
      <p>La marca combina una atención cercana con una imagen premium: tonos empolvados, materiales calidos, productos cuidados y una experiencia que se siente ordenada desde el primer contacto.</p>
    </motion.div>
    <motion.img {...fade} src={assets.oficina} alt="Interior de Velmora" />
  </section>;
}

function Booking() {
  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = `Hola VELMORA Estética, quiero reservar una cita.\n\nNombre: ${d.get('nombre')}\nTeléfono: ${d.get('telefono')}\nServicio: ${d.get('servicio')}\nFecha: ${d.get('fecha')}\nHora: ${d.get('hora')}\nModo: ${d.get('modo')}`;
    window.open(`https://wa.me/${WSP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  }

  return <section className="booking booking-upgraded section page-top">
    <div className="booking-copy">
      <p className="eyebrow">Reserva</p>
      <h1>Agenda tu cita con más claridad y menos vueltas.</h1>
      <p>Elige servicio, fecha y hora tentativa. El equipo recibe el mensaje por WhatsApp y confirma disponibilidad, duración y recomendación previa.</p>
      <div className="booking-benefits">
        {['Confirmación por WhatsApp', 'Recomendación antes de venir', 'Opción de pack o servicio individual'].map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
    <form onSubmit={submit}>
      <input name="nombre" placeholder="Nombre" required />
      <input name="telefono" placeholder="Teléfono" required />
      <select name="servicio" required>{services.map(([s]) => <option key={s}>{s}</option>)}</select>
      <input name="fecha" type="date" required />
      <input name="hora" type="time" required />
      <select name="modo">
        <option>Experiencia calma</option>
        <option>Experiencia social</option>
        <option>Experiencia evento</option>
      </select>
      <button>Enviar por WhatsApp</button>
    </form>
  </section>;
}

function Contact() {
  return <section className="contact contact-upgraded section page-top">
    <div className="contact-copy">
      <p className="eyebrow">Contacto</p>
      <h1>Hablemos de tu próxima visita.</h1>
      <p>Para reservas rápidas usa WhatsApp. Para inspiración, resultados y novedades puedes seguir las redes de Velmora.</p>
      <div className="contact-actions">
        {socialLinks.map(([label, href, icon]) => <a key={label} href={href} target={href === '#' ? '_self' : '_blank'} rel="noreferrer">
          <span><img src={icon} alt="" /></span>
          <strong>{label}</strong>
        </a>)}
      </div>
      <div className="contact-info">
        <div><span>Horario</span><strong>Lunes a sábado con cita previa</strong></div>
        <div><span>Respuesta</span><strong>Consultas y reservas por WhatsApp</strong></div>
      </div>
    </div>
    <div className="contact-map">
      <iframe title="Mapa" src="https://www.google.com/maps?q=Lima%20Peru&output=embed" loading="lazy" />
    </div>
  </section>;
}

function Blog() {
  return <section className="section page-top journal">
    <p className="eyebrow">Blog</p>
    <h1>Notas breves para cuidar tu rutina.</h1>
    {['Como preparar la piel antes de un evento', 'Que llevar a una cita de manicure', 'Rutina facial simple para la semana'].map((title) => <article key={title}>
      <span>Velmora Journal</span>
      <h2>{title}</h2>
      <p>Consejos practicos, tono editorial y recomendaciones faciles de aplicar.</p>
    </article>)}
  </section>;
}

function Footer() {
  return <footer>
    <div className="footer-inner">
      <div className="footer-brand">
        <img src={assets.logo} alt="VELMORA Estética" />
        <p>Velmora Estética. Belleza, calma y cuidado personal.</p>
      </div>
      <div>
        <h3>Redes</h3>
        <div className="footer-icons">
          {socialLinks.map(([label, href, icon]) => <a key={label} href={href} aria-label={label}>
            <span><img src={icon} alt="" /></span>
          </a>)}
        </div>
      </div>
      <div>
        <h3>Métodos de pago</h3>
        <img className="payment-photo" src={assets.pagos} alt="Métodos de pago aceptados" />
      </div>
    </div>
    <span className="footer-copy">© 2026 VELMORA Estética</span>
  </footer>;
}

function Page() {
  const map = {
    inicio: <><Hero /><Intro /><ServiceList /><Space /><ProductFocus /><Promotions /></>,
    servicios: <><ServicesHero /><ServiceExplorer /><ServiceMethod /><ServicePackages /><ServiceFaq /></>,
    experiencias: <><ExperienceHero /><ExperienceJourney /><ExperienceModes /><SensoryDetails /><ExperienceStandards /><ExperienceClosing /></>,
    promociones: <PromotionsPage />,
    productos: <><section className="page-title section page-top"><p className="eyebrow">Productos</p><h1>Linea recomendada</h1></section><ProductFocus /></>,
    galeria: <Gallery />,
    blog: <Blog />,
    nosotros: <About />,
    reserva: <Booking />,
    contacto: <Contact />
  };

  return <Shell>{map[page] || map.inicio}</Shell>;
}

createRoot(document.getElementById('root')).render(<Page />);
