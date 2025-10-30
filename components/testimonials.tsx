export default function Testimonials({ testimonials }: { testimonials: { description: string; name?: string }[] }) {
  return (
    <ul>
      {testimonials?.map((t, i) => (
        <li key={i}>{t.description}{t.name ? ` — ${t.name}` : ""}</li>
      ))}
    </ul>
  );
}

