export const audience = [
  {
    title: "Personas interesadas en el mundo Fintech",
    text: "Descubre cómo la tecnología está transformando la industria financiera y de inversión.",
  },
  {
    title: "Recién graduados/as",
    text: "Con interés en el campo de la tecnología aplicada al sector financiero.",
  },
  {
    title: "Profesionales en activo",
    text: "Que ya trabajen en empresas y quieran profundizar en este campo.",
  },
  {
    title: "Emprendedores",
    text: "Que quieran crear una start-up en el ámbito Fintech y blockchain.",
  },
] as const;

export const methodology = [
  {
    title: "Plataformas de e-learning",
    text: "Herramientas de análisis, clases híbridas y recursos digitales para seguir el ritmo del mercado.",
  },
  {
    title: "Masterclass con profesionales",
    text: "CEOs, CFOs y especialistas del sector explican casos reales y estándares de la industria.",
  },
  {
    title: "Tutorización especializada",
    text: "Comunicación efectiva, soft skills y acompañamiento cercano durante todo el máster.",
  },
  {
    title: "Experiencias fuera del aula",
    text: "Mobile World Congress, Tech Spirit, Welcome Nomads, Talent Arena y más eventos del ecosistema.",
  },
] as const;

export const partnerLogos = [
  { name: "Accenture", src: "/uploads/2025/07/Accenture-logo-no-background.png" },
  { name: "BSC", src: "/uploads/2025/11/logoBSC.png" },
  { name: "Bizum", src: "/uploads/2023/05/logo-bizum.png" },
  { name: "TradingView", src: "/uploads/2023/05/tradingview-logo-vectorbien.png" },
  { name: "HollyMontt", src: "/uploads/2025/09/LOGO-HOLLYMONTT.jpg" },
  { name: "TECH Barcelona", src: "/uploads/2021/11/techbarcelona.png" },
  { name: "inbestMe", src: "/uploads/2022/07/inbestme-logo.png" },
  { name: "Randstad", src: "/uploads/2022/07/Randstad_Logo.png" },
  { name: "Reuters", src: "/uploads/2022/07/Reuters_Logo.png" },
  { name: "Crandon", src: "/uploads/2024/03/Logoclaim_Crandon_negro.png" },
  { name: "Inviertis", src: "/uploads/2025/02/logo-inviertis.png" },
  { name: "StockFink", src: "/uploads/2025/03/logo-stockfink-blue-1.png" },
  { name: "tradEasy", src: "/uploads/2022/10/logo-tradEasy.png" },
  { name: "BPV", src: "/uploads/2022/10/bpv-logo-bien.png" },
  { name: "Finergia", src: "/uploads/2022/11/logo-finergia.png" },
  { name: "XY Booster", src: "/uploads/2022/07/Logo-XY-BOOSTER.png" },
  { name: "Vantek", src: "/uploads/2022/07/marca-Vantek-logo_transparente.png" },
  { name: "Quanthika", src: "/uploads/2025/09/logo-quanthika.jpg" },
  { name: "Fynzo", src: "/uploads/2025/09/Logo-Fynzo.jpg" },
  { name: "Splits", src: "/uploads/2025/09/Splits-logo.jpg" },
  { name: "Menta", src: "/uploads/2025/06/menta-logo-2.0.jpg" },
  { name: "Groinversia", src: "/uploads/2025/09/logo-groinversia.jpg" },
] as const;

export const whyUb = [
  { value: "1ª", label: "Universidad española en QS World University Rankings" },
  { value: "160ª", label: "Posición mundial QS (edición 2026)" },
  { value: "6ª", label: "Ciudad europea atractiva para crear una start-up" },
  { value: "40", label: "Plazas limitadas por edición" },
] as const;

export const certifications = [
  {
    title: "Asesor Financiero / EIP",
    issuer: "Instituto Español de Analistas · EFPA",
    text: "Habilita para el asesoramiento financiero y la gestión patrimonial con reconocimiento europeo. Requisito habitual en banca privada.",
  },
  {
    title: "EFFAS Digital Assets & MiCA",
    issuer: "EFFAS",
    text: "Acredita el conocimiento de activos digitales bajo el marco europeo. Pocos programas en España la incluyen.",
  },
  {
    title: "Chartered Market Technician I",
    issuer: "CMT Association · Academic Partner",
    text: "Primer nivel de la certificación estadounidense de análisis técnico, con tarifa y materiales de socio académico.",
  },
] as const;

export const partnerStories = [
  {
    name: "Barcelona Supercomputing Center",
    logo: "/uploads/2025/11/logoBSC.png",
    text: "Programa conjunto de talento en IA aplicada a finanzas y visita técnica al centro. Un entorno de computación difícil de replicar.",
  },
  {
    name: "Accenture",
    logo: "/uploads/2025/07/Accenture-logo-no-background.png",
    text: "Retos reales como propuesta de trabajo final y vía preferente de prácticas en equipos de servicios financieros.",
  },
  {
    name: "Bizum",
    logo: "/uploads/2023/05/logo-bizum.png",
    text: "Sesiones sobre payments de éxito e innovación en pagos móviles, tokenización y experiencia de usuario real.",
  },
  {
    name: "TradingView",
    logo: "/uploads/2023/05/tradingview-logo-vectorbien.png",
    text: "Licencia profesional durante el curso y sesiones de profundización para el análisis técnico de mercados.",
  },
  {
    name: "HollyMontt",
    logo: "/uploads/2025/09/LOGO-HOLLYMONTT.jpg",
    text: "Gestión de carteras de forma ágil e intuitiva durante el curso, conectada con el módulo de mercados.",
  },
  {
    name: "TECH Barcelona",
    logo: "/uploads/2021/11/techbarcelona.png",
    text: "Entrada al mayor nodo de empresas tecnológicas del sur de Europa, con visitas y networking del programa.",
  },
] as const;

export const modules = [
  {
    semester: 1,
    code: "I",
    ects: 5,
    title: "Aspectos Jurídicos",
    coordinator: "Carlos Domínguez",
    shared: false,
    topics: [
      "Modelo de negocio Fintech y pacto de socios",
      "Acuerdos de inversión y financiación",
      "Regulación de servicios financieros digitales",
      "Protección de software y activos intangibles",
      "Privacidad, Big Data y fiscalidad Fintech",
    ],
  },
  {
    semester: 1,
    code: "II",
    ects: 9,
    title: "Open Banking & Payments",
    coordinator: "Jonathan Lema",
    shared: false,
    partner: "Minsait",
    topics: [
      "Open Banking, BaaS y Embedded Finance",
      "Medios de pago, emisión y adquirencia",
      "Pagos móviles, tokenización, xPays y Bizum",
      "Pagos A2A y banca abierta",
      "Marcos regulatorios y modelos de negocio",
    ],
  },
  {
    semester: 1,
    code: "III",
    ects: 7,
    title: "Mercados Financieros",
    coordinator: "Damià Rey",
    shared: true,
    topics: [
      "Revolución digital y oportunidades Fintech",
      "Renta fija, renta variable y value investing",
      "Macro investing y bancos centrales",
      "Análisis técnico, behaviour finance y carteras",
      "Derivados y planificación financiera",
    ],
  },
  {
    semester: 2,
    code: "IV",
    ects: 9,
    title: "Innova",
    coordinator: "Jordi Iserte",
    shared: true,
    topics: [
      "Innovación financiera y MoonShot",
      "Roboadvisors, Proptech y payments de éxito",
      "Sustainability finance y seguridad digital",
      "Talleres de IA aplicada al negocio",
      "Trading, APIs y gestión de carteras con IA",
    ],
  },
  {
    semester: 2,
    code: "V",
    ects: 4,
    title: "Estructura Financiera",
    coordinator: "Manel Serna",
    shared: false,
    topics: [
      "Modelo de negocio de una Fintech",
      "Venture Capital: early stage, growth y exit",
      "Preparación de ronda seed",
      "Estructuración de equity y deuda",
    ],
  },
  {
    semester: 2,
    code: "VI",
    ects: 5,
    title: "Data Science & IA",
    coordinator: "Miguel Romera",
    shared: false,
    topics: [
      "Bootcamp de Python y tratamiento de datos",
      "Fundamentos de IA y ciclo de vida",
      "Prompt engineering y LLMs",
      "RAG, agentes IA y automatizaciones",
      "Visualización y herramientas BI",
    ],
  },
  {
    semester: 2,
    code: "VII",
    ects: 6,
    title: "Blockchain",
    coordinator: "David Tomoletiu",
    shared: true,
    topics: [
      "Fundamentos de blockchain y criptomonedas",
      "Ethereum, smart contracts y dApps",
      "Exchanges, DEX, ICO/STO e NFT",
      "Tokenomics y escalabilidad",
      "Marco jurídico de activos digitales",
    ],
  },
  {
    semester: 2,
    code: "VIII",
    ects: 4,
    title: "Emprendimiento Digital",
    coordinator: "Alejandro Scasserra",
    shared: true,
    topics: [
      "Innovación digital y product discovery",
      "Product delivery y agilidad",
      "Caso práctico: tu primera Fintech",
      "Validación de viabilidad del negocio",
    ],
  },
] as const;

export const professors = [
  {
    name: "Dr. Damià Rey",
    role: "Director y coordinador del Máster",
    bio: "Profesor UB, UIC y Abat Oliba. CEO de Global Finance Solutions y GVC Institute.",
  },
  {
    name: "Ignasi Costas",
    role: "Director del Máster",
    bio: "Socio codirector y responsable del Área de Innovación y Emprendimiento de DWF-RCD.",
  },
  {
    name: "David Álvaro Berlanga",
    role: "Coordinador del Máster",
    bio: "Profesional de Banc Sabadell. Coordinación académica y seguimiento del alumnado.",
  },
  {
    name: "Carme Hortalà",
    role: "GVC Gaesco",
    bio: "Directora de Desarrollo Corporativo e Internacional del Grupo GVC Gaesco.",
  },
  {
    name: "Manel Serna",
    role: "Estructura financiera",
    bio: "Skypointer Venture Partners. Experto en venture capital y estructuración.",
  },
  {
    name: "Ana Sitjà",
    role: "CNMV",
    bio: "Dirección de mercados primarios de la CNMV.",
  },
  {
    name: "Xavier Roures",
    role: "CNMV",
    bio: "Departamento de autorizaciones de la CNMV.",
  },
  {
    name: "Miquel Martí",
    role: "TECH Barcelona",
    bio: "CEO de TECH Barcelona.",
  },
  {
    name: "Alejandro Scasserra",
    role: "Emprendimiento digital",
    bio: "Product Lead en Ualá. Co-founder de Okonomi y Upper Academy.",
  },
  {
    name: "Jordi Arrufí",
    role: "Mobile World Capital",
    bio: "Digital Transformation Projects Director en Mobile World Capital Barcelona.",
  },
  {
    name: "Miguel Romera",
    role: "Data Science & IA",
    bio: "QA Manager & Product Owner en YEGO.",
  },
  {
    name: "Jonathan Lema",
    role: "Open Banking",
    bio: "Coordinador del módulo Open Banking & Payments (Minsait).",
  },
  {
    name: "David Tomoletiu",
    role: "Blockchain",
    bio: "Rungie & Mindgate. Experto en criptoactivos y NFT.",
  },
  {
    name: "Jordi Mercader",
    role: "inbestMe",
    bio: "CEO y co-fundador de inbestMe.",
  },
  {
    name: "Martín Azcue",
    role: "Bizum",
    bio: "Responsable de Innovación en Bizum.",
  },
  {
    name: "Juan Pablo Valencia",
    role: "Open Finance",
    bio: "Open Finance Subject Matter Expert en Capgemini.",
  },
  {
    name: "Carlos Thomas",
    role: "Giesecke+Devrient",
    bio: "Global Head en Giesecke+Devrient.",
  },
  {
    name: "Jose Luís Álvarez",
    role: "HollyMontt",
    bio: "CEO de HollyMontt.",
  },
  {
    name: "Cristian Gómez",
    role: "tradEasy",
    bio: "CEO de tradEasy.",
  },
  {
    name: "Rebeca Pérez",
    role: "Inviertis",
    bio: "CEO y fundadora de Inviertis.",
  },
  {
    name: "Lourdes López",
    role: "Global Lead Talent",
    bio: "CEO y fundadora de Global Lead Talent.",
  },
  {
    name: "Sergi Tejero",
    role: "Fitch Ratings",
    bio: "Director de Financial Institutions en Fitch Ratings.",
  },
  {
    name: "Borja Ribera",
    role: "GVC Gaesco",
    bio: "Director manager de renta variable en GVC Gaesco.",
  },
  {
    name: "Dr. Ramon Tremosa",
    role: "Economía y política",
    bio: "Exdiputado del Parlamento Europeo y exconsejero de la Generalitat de Catalunya.",
  },
  {
    name: "Jordi Iserte",
    role: "Innova",
    bio: "Investment Director en Adevinta Ventures.",
  },
  {
    name: "Enrique Carrión",
    role: "Soft Skills",
    bio: "Director comercial de TZS Business. Desarrollo profesional y soft skills.",
  },
  {
    name: "Hugo Pérez",
    role: "IA",
    bio: "CEO y Founder de Tetlamatzin. Doctor en Inteligencia Artificial.",
  },
  {
    name: "Oriol Domínguez",
    role: "Randstad",
    bio: "Director regional de Randstad Cataluña.",
  },
  {
    name: "Lluís Sust",
    role: "Addenda",
    bio: "Co-Founder & Managing Partner de Addenda.",
  },
  {
    name: "Celia Menéndez",
    role: "BPV",
    bio: "Fiscal Manager de BPV.",
  },
] as const;

export const partners = [
  "Accenture",
  "Minsait",
  "Bizum",
  "GVC Gaesco",
  "inbestMe",
  "TradingView",
  "HollyMontt",
  "TECH Barcelona",
  "Mobile World Capital",
  "Founder Institute",
  "Inviertis",
  "Optimissa",
  "Crandon",
  "StockFink",
  "tradEasy",
  "Randstad",
  "Fitch Ratings",
  "Capgemini",
  "BSC",
] as const;

export const scholarships = [
  {
    name: "Beca Crandon Talent",
    summary:
      "Dos becas parciales del 50% para promover el talento internacional en finanzas, impulsadas por Crandon. Se solicita con el mismo formulario de admisión.",
  },
  {
    name: "Beca Maria Àngels Vallvé",
    summary:
      "Beca de GVC Gaesco destinada a mujeres con interés en el sector financiero. Cubre el 60% del coste del máster 2026/27. Mismo trámite de admisión.",
  },
] as const;

export const benefits = [
  {
    title: "Curso de Bolsa",
    text: "Descuento exclusivo para indagar en los mercados financieros, su estructura y funcionamiento.",
  },
  {
    title: "Curso de IA aplicada a mercados",
    text: "Herramientas de análisis de datos de última generación, de forma sencilla y desde cero.",
  },
  {
    title: "App de la comunidad",
    text: "Ofertas laborales, descuentos y eventos para alumnos, alumni y profesores.",
  },
] as const;

export const faqs = [
  {
    q: "¿Necesito saber programar o tener formación en finanzas?",
    a: "No. El módulo de mercados nivela bases financieras y el de datos empieza desde cero en Python. Lo que sí se pide es dedicación sostenida: son 60 ECTS en un curso académico.",
  },
  {
    q: "¿Se puede cursar íntegramente online?",
    a: "Sí. La modalidad online sigue el mismo plan docente y da acceso a las mismas certificaciones. Las visitas y eventos presenciales son opcionales.",
  },
  {
    q: "¿Qué diferencia hay con el Máster en IA aplicada a los Mercados Financieros?",
    a: "Fintech trabaja la infraestructura del dinero —pagos, activos digitales, regulación—. IA trabaja los modelos —datos, aprendizaje automático, decisión cuantitativa—. Comparten cuatro módulos, convalidables si cursas ambos.",
  },
  {
    q: "¿El título es oficial?",
    a: "Es un título propio de máster de la Universitat de Barcelona, de 60 ECTS. No es un máster universitario oficial del EEES: conviene tenerlo claro si el objetivo es el doctorado o una oposición.",
  },
  {
    q: "¿Hay prácticas garantizadas?",
    a: "Hay convenio con más de veinte empresas y una bolsa de ofertas en la app Alumni. La asignación depende del perfil y del proceso de selección de cada empresa. Si no haces prácticas, elaboras un TFM.",
  },
  {
    q: "¿Cuánto cuesta y hay becas?",
    a: "La matrícula de la edición 2026-27 es 5.480 €, con reserva de plaza de 900 € a cuenta. Hay becas Crandon y Maria Àngels Vallvé; se solicitan con el mismo formulario de admisión.",
  },
] as const;
