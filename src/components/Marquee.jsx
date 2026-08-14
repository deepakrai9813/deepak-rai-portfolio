const ITEMS = [
  "Full-Stack Development",
  "React",
  "Node.js",
  "TypeScript",
  "AI Integration",
  "LLMs & Groq",
  "RAG Pipelines",
  "Prompt Engineering",
  "PostgreSQL",
  "AWS",
  "UI Engineering",
  "REST & GraphQL",
  "MongoDB",
  "Docker",
];

function Track() {
  return (
    <div className="marquee__item">
      {ITEMS.map((t) => (
        <span key={t}>
          {t} <span aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <Track />
        <Track />
      </div>
    </div>
  );
}
