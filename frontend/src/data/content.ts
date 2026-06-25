export const services = [
  {
    title: 'Web Apps',
    description: 'Full-stack applications with modern architecture, real-time features, and pixel-perfect UI.',
    icon: 'Globe',
  },
  {
    title: 'SaaS Platforms',
    description: 'Multi-tenant systems with auth, billing, dashboards, and scalable infrastructure.',
    icon: 'Layers',
  },
  {
    title: 'Landing Pages',
    description: 'High-conversion pages with premium design, optimized for speed and SEO.',
    icon: 'Layout',
  },
  {
    title: 'Admin Dashboards',
    description: 'Data-rich interfaces with charts, tables, filters, and role-based access.',
    icon: 'BarChart3',
  },
  {
    title: 'API Development',
    description: 'RESTful and async APIs with documentation, validation, and monitoring.',
    icon: 'Code2',
  },
]

export const projects = [
  {
    title: 'Analytics Dashboard',
    problem: 'Client needed real-time business metrics without slow legacy tools.',
    solution: 'Built a React dashboard with live WebSocket updates and custom charts.',
    result: '40% faster decision-making, 3× daily active usage.',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    title: 'SaaS Booking Platform',
    problem: 'Manual scheduling caused double bookings and lost revenue.',
    solution: 'Developed a multi-tenant booking system with payments and notifications.',
    result: 'Zero double bookings, 60% reduction in admin time.',
    stack: ['React', 'Django', 'PostgreSQL', 'Stripe'],
    gradient: 'from-violet-500/20 to-purple-500/10',
  },
  {
    title: 'E-commerce API',
    problem: 'Monolithic backend could not scale during peak traffic.',
    solution: 'Designed async FastAPI microservice with caching and queue workers.',
    result: '10× throughput, 99.9% uptime during sales.',
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    gradient: 'from-emerald-500/20 to-teal-500/10',
  },
]

export const techStack = [
  { name: 'React', description: 'Component-driven UI' },
  { name: 'TypeScript', description: 'Type-safe development' },
  { name: 'C', description: 'Systems programming language' },
  { name: 'FastAPI', description: 'High-performance APIs' },
  { name: 'PostgreSQL', description: 'Reliable data layer' },
  { name: 'Python', description: 'Versatile programming language' },
  { name: 'Next.js', description: 'React framework for production' },
  { name: 'Docker', description: 'Containerized deployments' },
  { name: 'Redis', description: 'In-memory caching & pub/sub' },
  { name: 'Django', description: 'High-level Python framework' },
  { name: 'Node.js', description: 'JavaScript runtime environment' },
  { name: 'Vue', description: 'Progressive UI framework' },
]

export const metrics = [
  { value: '30+', label: 'Projects delivered' },
  { value: '<2h', label: 'Response time' },
  { value: '99.9%', label: 'Uptime mindset' },
]

export const philosophy = [
  { title: 'Speed', text: 'Ship fast without cutting corners. Iterative delivery, continuous improvement.' },
  { title: 'Quality', text: 'Clean code, thorough testing, and maintainable architecture that scales.' },
  { title: 'Scalability', text: 'Built to grow — from MVP to millions of users without rewrites.' },
  { title: 'UX Focus', text: 'Every interaction designed for clarity, speed, and conversion.' },
  { title: 'Innovation', text: 'Always exploring emerging tech to give your product a competitive edge.' },
  { title: 'Collaboration', text: 'We work as your team, not a vendor. Transparent, responsive, invested.' },
]
