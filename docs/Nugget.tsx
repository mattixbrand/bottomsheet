export default function Nugget({
  heading,
  lead,
}: {
  heading: React.ReactNode;
  lead: React.ReactNode;
}) {
  return (
    <article className="">
      <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white underline decoration-pink-500">{heading}</h2>
      <p className="text-2xl px-0.5 text-left">{lead}</p>
    </article>
  );
}
