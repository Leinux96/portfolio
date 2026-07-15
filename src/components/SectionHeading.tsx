export default function SectionHeading({
  kicker,
  title,
  intro,
}: {
  kicker: string
  title: string
  intro: string
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="kicker mb-3">{kicker}</p>
      <h2 className="m-0 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
        {intro}
      </p>
    </div>
  )
}
