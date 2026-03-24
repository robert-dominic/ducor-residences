import Reveal from "@/components/shared/Reveal"

export default function MapEmbed() {
  return (
    <Reveal className="border border-border bg-surface">
      <div className="border-b border-border px-6 py-5 sm:px-8">
        <p className="font-sans text-xs uppercase tracking-[0.24em] text-muted">
          Location
        </p>
        <h2 className="mt-2 font-heading text-2xl font-semibold text-primary">
          Monrovia, Liberia
        </h2>
      </div>

      <iframe
        title="Map showing Monrovia, Liberia"
        src="https://www.google.com/maps?q=Monrovia%2C%20Liberia&z=13&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[420px] w-full border-0"
      />
    </Reveal>
  )
}
