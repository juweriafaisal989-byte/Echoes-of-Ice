
import {
  Snowflake,
  Database,
  BookOpen,
  Waves,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Snowflake size={28} />,
      title: 'Polar Research',
      description:
        'Explore research about the Arctic, Antarctic, ice, and changing polar environments.',
    },
    {
      icon: <Database size={28} />,
      title: 'Research Datasets',
      description:
        'Discover scientific datasets and information from polar research sources.',
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Publications',
      description:
        'Find scholarly articles and publications about polar science.',
    },
    {
      icon: <Waves size={28} />,
      title: 'Our Changing Planet',
      description:
        'Learn about glaciers, oceans, climate, and the future of polar regions.',
    },
  ];

  return (
    <div
      className="relative isolate min-h-screen overflow-hidden bg-[#061d3b] bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(3, 24, 55, 0.78), rgba(5, 65, 110, 0.72)), url('/arctic-background.png')",
      }}
    >
      {/* Blue overlay across the entire background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/20 via-blue-900/20 to-[#03152e]/80"
        aria-hidden="true"
      />

      <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-20">
        {/* Hero section */}
        <section className="rounded-3xl border border-cyan-200/20 bg-blue-950/75 p-7 shadow-2xl shadow-blue-950/40 backdrop-blur-md sm:p-12 lg:p-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-blue-900/80 px-4 py-2 text-sm text-cyan-100">
            <Snowflake size={17} />
            Discover the Polar World
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Echoes of Ice
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Explore the mysteries of the polar regions through scientific
            publications, research datasets, and discoveries about our
            changing planet.
          </p>

          <a
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-3 rounded-xl border border-cyan-200/30 bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-blue-500"
          >
            Explore Research
            <ArrowRight size={19} />
          </a>
        </section>

        {/* Blue feature boxes */}
        <section className="mt-12">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Explore Echoes of Ice
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Discover Polar Science
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-blue-100/90">
              Access research resources and explore the science behind the
              world's polar environments.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-cyan-200/20 bg-[#082c58]/95 p-6 shadow-xl shadow-blue-950/30 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-[#0b396c]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-200/20 bg-blue-500/20 text-cyan-200">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-blue-100/85">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom information box */}
        <section className="mt-8 rounded-2xl border border-cyan-200/20 bg-blue-950/85 p-6 shadow-xl backdrop-blur-md sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/20 p-3 text-cyan-200">
              <Waves size={26} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Understanding Our Polar Regions
              </h2>

              <p className="mt-2 leading-7 text-blue-100/85">
                Polar regions help scientists understand climate patterns,
                changing ice conditions, ocean systems, and the connections
                between the Earth's environments.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-cyan-100/20 py-6 text-center text-sm text-blue-100/75">
          Echoes of Ice · Exploring polar research and discovery
        </footer>
      </main>
    </div>
  );
}