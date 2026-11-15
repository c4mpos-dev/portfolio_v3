import { localeDate, type Lang } from "@/i18n";
import { ACCESS, AREAS, KINDS, PLATFORMS, projects, type Access, type Area, type Kind, type Platform, type Project } from "./projects";

/** English for projects.ts. Slugs, images, links and stacks stay shared. */

const KINDS_EN: Record<Kind, string> = {
  produto: "Product",
  "sistema-interno": "Internal system",
  cliente: "Client",
  "desafio-tecnico": "Technical challenge",
  estudo: "Study",
  pessoal: "Personal",
  hackathon: "Hackathon",
  competicao: "Competition",
  jogo: "Game",
};
const PLATFORMS_EN: Record<Platform, string> = { web: "Web", mobile: "Mobile", api: "API / Back end", iot: "IoT", desktop: "Desktop", embarcado: "Embedded" };
const ACCESS_EN: Record<Access, { label: string; hint: string }> = {
  online: { label: "Online", hint: "You can open it and use it." },
  "codigo-aberto": { label: "Open source", hint: "The code is on GitHub." },
  privado: { label: "Private", hint: "Private code, no public access." },
  "em-breve": { label: "Coming soon", hint: "Not released to the public yet." },
};
const AREAS_EN: Record<Area, string> = { empresa: "At companies", web: "Web and APIs", mobile: "Mobile", robotica: "Robotics" };

export const kindsFor = (lang: Lang): Record<Kind, string> => (lang === "en" ? KINDS_EN : KINDS);
export const platformsFor = (lang: Lang): Record<Platform, string> => (lang === "en" ? PLATFORMS_EN : PLATFORMS);
export const accessFor = (lang: Lang): Record<Access, { label: string; hint: string }> => (lang === "en" ? ACCESS_EN : ACCESS);
export const areasFor = (lang: Lang): Record<Area, string> => (lang === "en" ? AREAS_EN : AREAS);

type ProjectEn = Partial<Pick<Project, "name" | "summary" | "role" | "about" | "highlights">> & { captions?: string[] };

const PROJECTS_EN: Record<string, ProjectEn> = {
  "rastreamento-iot": {
    name: "IoT tracking platform",
    summary: "Real-time tracking of devices in the field, across three services.",
    role: "Full stack: architecture, APIs, real time and deployment",
    about: [
      "Web tracking applications integrated with IoT devices, with a Mapbox map showing the devices in the field. The technical documentation (PRDs, TDDs and data flows) and the AWS deployment were mine too.",
      "The system was split into three services (web application, main API and a geospatial processing microservice) to keep heavy processing away from the API.",
    ],
    highlights: [
      "Telemetry ingestion over HTTP and TCP sockets, streamed to the client over WebSocket and Server-Sent Events.",
      "REST APIs with Clean Architecture and DDD, with Swagger, JWT + refresh token and role-based access control.",
      "Asynchronous flows with the Outbox pattern, queues, workers and scheduled jobs.",
    ],
    captions: ["Main screen with the map", "A single device in detail"],
  },
  "tracking-campanhas": {
    name: "Campaign tracking platform",
    summary: "Data tracking for digital campaigns and a Taboola integration.",
    role: "Full stack internship",
    about: ["A data tracking platform for digital campaigns, on a large Clean Architecture back end that required working through every layer."],
    highlights: [
      "Cookie-based authentication in Next.js (client side, server side and Server Actions), with routes protected by profile.",
      "Taboola API integration: consuming paid-media data, with error handling and normalization.",
      "Refactors of legacy code, mapping flows and dependencies before changing anything.",
    ],
    captions: ["Campaign dashboard"],
  },
  "sistemas-inatel": {
    name: "INATEL internal systems",
    summary: "Ongoing development and automation for internal systems in production.",
    role: "Full stack internship",
    highlights: [
      "Vue.js interfaces on a corporate low-code platform, adapted to the tool's limits.",
      "Python back end (Flask and Django) with automation routines that replaced manual processes.",
      "Programmatic data exports and analysis with Pandas and Matplotlib.",
    ],
    captions: ["Internal interface"],
  },
  "campos-ctf": {
    summary: "A Brazilian Capture The Flag platform: offensive security challenges, flags and a live scoreboard.",
    role: "Product, back end and front end",
    about: [
      "A CTF platform in Portuguese for learning offensive security hands-on: each challenge hides a flag in the campos{...} format, and whoever finds it scores points on the scoreboard. Seven categories, from Web Hacking and Cryptography to OSINT, Forensics, Reverse Engineering and Pwn, from easy to insane.",
      "I built both sides: the API, which stores the challenges, checks the flags and keeps the scoreboard honest, and the interface players use. The code is still private; the site opens to the public soon.",
    ],
    highlights: [
      "NestJS 11 API with Clean Architecture (domain kept apart from infrastructure), PostgreSQL and TypeORM.",
      "Flags stored as hashes, like passwords: not even admins can read them, only check whether a submission is right.",
      "First blood settled by the database when two people solve at the same moment, with no ties and no double points.",
      "JWT RS256 sessions in httpOnly cookies, email account verification and rate limits on login, sign-up and flag submission.",
      "Unit and e2e tests with Jest on the account, session and flag submission flows; deployed with Docker.",
    ],
    captions: [
      "Challenge board by category, with the player's progress",
      "An open challenge, with the flag submission",
      "Live scoreboard with podium and the player's position",
    ],
  },
  "site-nine-tails": {
    name: "Nine Tails #9219 website",
    summary: "The FRC team's official site, with 3D, scroll-driven animation and the team's full history.",
    role: "Design and development",
    about: [
      "The official site of the FIRST Robotics Competition team at Firjan SENAI SESI Resende, where I started in FRC. It tells the story of six robots, five trophies and 122 matches with real photos.",
      "The robots were cut out of photos and cross the field as you scroll; the first one has a 3D model that replays its Charged Up move.",
    ],
    highlights: [
      "A hangar with one page per robot: spec sheet, workshop × arena comparison and the match tape from each event.",
      "Award showcase as a draggable 3D ring, in three.js.",
      "A departures board with every team trip and a scoreboard of records on an LED display.",
    ],
    captions: ["Hangar: each robot crosses the field as you scroll", "Departures board with the team's trips", "Record scores and all 122 matches"],
  },
  "tolle-lege": {
    summary: "An introduction to the Catholic faith: paths by profile, daily liturgy and a guided tour of a 3D church.",
    role: "Product, design and development",
    about: [
      "A simple path for anyone arriving, returning or just wanting to understand what the Catholic Church believes, celebrates and lives. I built it from scratch: design, code and deployment.",
      "It's a static SPA that behaves like an app: it installs as a PWA, keeps progress in the browser and generates, at build time, a page with its own title and description for each route so links get previews on social media.",
    ],
    highlights: [
      "Daily liturgy from an external API, cached, with image generation for sharing.",
      "Guided 3D tour with React Three Fiber; the model was optimized from 8.2 MB to 1.6 MB.",
      "Liturgical year computed from the date of Easter, with seasonal content that appears on its own at the right time.",
    ],
    captions: ["Site cover"],
  },
  "zonas-geograficas": {
    name: "Geographic zones on a map",
    summary: "Geographic zones drawn on a map, with a NestJS API. Next Devices technical challenge.",
    about: [
      "The technical assessment from the Next Devices hiring process. A full-stack application to create, list and delete geographic zones, with the geometry stored as GeoJSON.",
      "The code lives in two repositories: the API (link below) and the front end, desafio-next-devices-frontend on the same profile.",
    ],
    highlights: [
      "NestJS REST API with TypeORM, GeoJSON validation through a custom validator and Swagger docs.",
      "React front end with Leaflet to draw and display the zones on the map.",
      "Tests on the API controller and service and on the main front-end component.",
    ],
    captions: ["Zones drawn on the map"],
  },
  "currency-converter": {
    summary: "A React Native currency converter with live rates and light and dark themes.",
    role: "Development",
    about: [
      "A React Native mobile app with Expo that converts between currencies from many countries using live rates from AwesomeAPI. The layout came from an open Rocketseat design made for Kotlin, which I rebuilt in React Native.",
    ],
    highlights: [
      "Rates fetched at conversion time, with source and target currency selection.",
      "Light and dark themes with NativeWind (Tailwind in React Native).",
      "Animations with Reanimated and SVG icons.",
    ],
    captions: ["Light theme", "Dark theme"],
  },
  "daily-diet": {
    summary: "A React Native app to log meals and track how well you stuck to your diet.",
    role: "Development",
    about: [
      "A React Native mobile app with Expo for keeping track of a diet: each meal is logged with date, time and whether it was on or off the diet, and the app shows how the period went. The layout came from an open Rocketseat design on Figma.",
    ],
    highlights: [
      "Create, edit and delete meals, grouped by day.",
      "Stats computed from the records: percentage on the diet, best streak and total meals.",
      "Data kept on the device with AsyncStorage, stack navigation with React Navigation and styles with styled-components.",
    ],
    captions: [
      "Home: percentage on the diet and meals by day (Figma layout)",
      "Feedback after logging a meal (Figma layout)",
    ],
  },
  "jogo-charged-up": {
    name: "FRC Charged Up game",
    summary: "An Android game built in Unity by Nine Tails while preparing for the 2023 season.",
    role: "Game interface: menu, shop and customization",
    about: [
      "A game Nine Tails #9219 made while preparing for the FRC Charged Up season, to get the team into the year's theme. Built in Unity, in C#, for Android, by three people from the team.",
      "My part was the interface: the menu screen, joining the scenes, character rotation and the customization shop, with the jersey showcase and dynamic item scrolling.",
    ],
    captions: ["Game screen"],
  },
  "green-reverse-logistics": {
    summary: "Landing page for a reverse logistics and sustainability company in Rio de Janeiro.",
    role: "Development",
    about: [
      "Institutional landing page for Green Reverse Logistics, a reverse logistics and environmental sustainability company in the state of Rio de Janeiro: how it works, environmental impact, partners, FAQ and contact.",
    ],
    captions: ["Home page"],
  },
  "sucatao-forte-itaguai": {
    summary: "Landing page for a scrap buying and selling yard in Itaguaí, RJ.",
    role: "Development",
    about: [
      "Landing page for Sucatão Forte Itaguaí, which buys and sells scrap in the region: accepted materials, how selling works, benefits, a gallery of the yard, location and direct contact over WhatsApp.",
    ],
    captions: ["Home page"],
  },
  "robo-frc-charged-up": {
    name: "Robot code · FRC Charged Up",
    summary: "The code that ran on the Nine Tails robot at the Brasília regional, the Houston world championship and the off-season.",
    role: "Robot programming",
    about: [
      "Java code for the Nine Tails robot in the FRC Charged Up season, from preparation to the year's three events. Each event has its official version in the repository, along with the tests done in the workshop.",
    ],
    highlights: [
      "Official versions from the Brasília regional, the Houston world championship and the Rio off-season.",
      "Aiming tests with a Limelight camera and PID control, reading vision data over NetworkTables.",
      "Arm and extension control with dedicated motors, plus the robot's drivetrain.",
    ],
    captions: ["The team at the Houston world championship, with the robot that ran this code"],
  },
};

export function projectsFor(lang: Lang): Project[] {
  if (lang === "pt") return projects;
  return projects.map((p) => {
    const { captions, ...en } = PROJECTS_EN[p.slug] ?? {};
    return {
      ...p,
      ...en,
      year: p.year && localeDate(lang, p.year),
      shots: p.shots?.map((s, i) => ({ ...s, caption: captions?.[i] ?? s.caption })),
    };
  });
}

export const getProjectFor = (lang: Lang, slug: string) => projectsFor(lang).find((p) => p.slug === slug);
