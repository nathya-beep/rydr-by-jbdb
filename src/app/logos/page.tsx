import Image from "next/image";

export default function LogosPreview() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center gap-20 py-20 px-8">
      <h1 className="text-[#777] text-xs tracking-[0.4em] uppercase">Logo comparison — RYDR by JBDB</h1>

      {/* Navbar context */}
      <section className="w-full max-w-4xl space-y-6">
        <p className="text-[#555] text-[10px] tracking-widest uppercase text-center">En el navbar</p>
        {[
          { src: "/logo-color.png", label: "Color" },
          { src: "/logo-gris.png",  label: "Gris" },
        ].map(({ src, label }) => (
          <div key={label} className="w-full bg-[#0d0d0d] border border-white/8 rounded-lg overflow-hidden">
            {/* Simulated navbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
              <div className="flex items-center gap-3">
                <Image src={src} alt={`Logo RYDR ${label}`} width={48} height={48} className="rounded" />
                <span className="font-bold text-white tracking-widest text-sm uppercase">RYDR</span>
              </div>
              <div className="hidden md:flex items-center gap-8 text-xs text-[#888] tracking-wider uppercase">
                <span>Drops</span>
                <span>Bundles</span>
                <span>Story</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#f5ff00] flex items-center justify-center text-black text-xs font-bold">2</div>
            </div>
            <p className="text-center text-[10px] text-[#555] tracking-widest uppercase py-3">{label}</p>
          </div>
        ))}
      </section>

      {/* Standalone sizes */}
      <section className="w-full max-w-4xl space-y-6">
        <p className="text-[#555] text-[10px] tracking-widest uppercase text-center">Tamaños</p>
        <div className="grid grid-cols-2 gap-8">
          {[
            { src: "/logo-color.png", label: "Color" },
            { src: "/logo-gris.png",  label: "Gris" },
          ].map(({ src, label }) => (
            <div key={label} className="flex flex-col items-center gap-6 bg-[#111] border border-white/8 rounded-lg p-8">
              <p className="text-[#555] text-[10px] tracking-widest uppercase">{label}</p>
              <Image src={src} alt={`Logo RYDR ${label} grande`} width={200} height={200} />
              <Image src={src} alt={`Logo RYDR ${label} mediano`} width={80} height={80} />
              <Image src={src} alt={`Logo RYDR ${label} pequeño`} width={40} height={40} />
            </div>
          ))}
        </div>
      </section>

      {/* On accent background */}
      <section className="w-full max-w-4xl space-y-6">
        <p className="text-[#555] text-[10px] tracking-widest uppercase text-center">Sobre acento amarillo</p>
        <div className="grid grid-cols-2 gap-8">
          {[
            { src: "/logo-color.png", label: "Color" },
            { src: "/logo-gris.png",  label: "Gris" },
          ].map(({ src, label }) => (
            <div key={label} className="flex flex-col items-center gap-4 bg-[#f5ff00] rounded-lg p-8">
              <p className="text-black/50 text-[10px] tracking-widest uppercase">{label}</p>
              <Image src={src} alt={`Logo RYDR ${label} sobre amarillo`} width={120} height={120} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
