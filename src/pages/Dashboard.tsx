import { useEffect, useState } from 'react';
import { Database, Snowflake, Waves } from 'lucide-react';
import { getPolarPublications } from '../api/crossref';

export default function Dashboard() {
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPublications() {
      try {
        const data = await getPolarPublications();
        setPublications(data);
      } catch (err) {
        console.error('Crossref error:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Could not load research publications.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadPublications();
  }, []);

  return (
    <div
      className="-mx-4 -my-6 relative isolate flex min-h-[calc(100vh-5rem)] overflow-hidden bg-[#061d3b] bg-cover bg-center lg:-mx-8 lg:-my-8"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(3, 24, 55, 0.72), rgba(5, 76, 123, 0.66)), url('/arctic-background.png')",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_15%,rgba(91,207,255,0.3),transparent_42%),radial-gradient(ellipse_at_85%_75%,rgba(31,125,209,0.3),transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/10 via-blue-900/10 to-blue-950/55"
        aria-hidden="true"
      />

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 text-white md:px-8 md:py-12">
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100/25 bg-blue-950/35 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-cyan-100 backdrop-blur-sm">
            <Snowflake size={14} aria-hidden="true" />
            Polar research overview
          </div>
          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50/85 sm:text-base">
            A live overview of research activity, expeditions, publications,
            datasets, and polar observations.
          </p>
        </header>

        <section
          aria-labelledby="live-data-heading"
          className="mt-10 w-full max-w-2xl rounded-2xl border border-cyan-100/20 bg-blue-950/45 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-md sm:p-8"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-100/20 bg-cyan-300/10 text-cyan-100">
            <Database size={23} aria-hidden="true" />
          </div>
          <h2
            id="live-data-heading"
            className="mt-5 text-xl font-semibold text-white sm:text-2xl"
          >
            Live Research Data
          </h2>
          <p className="mt-3 text-sm leading-6 text-blue-50/80 sm:text-base">
            {loading && 'Loading real polar research publications...'}
            {!loading && !error && (
              <>
                Crossref is connected. Showing {publications.length} live publications.
              </>
            )}
            {!loading && error && error}
          </p>

          {!loading && !error && publications.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Real Research Publications
              </h3>

              {publications.slice(0, 5).map((publication, index) => {
                const title =
                  publication.title?.[0] || 'Untitled publication';

                const authors =
                  publication.author
                    ?.map((author: any) =>
                      [author.given, author.family].filter(Boolean).join(' ')
                    )
                    .filter(Boolean)
                    .join(', ') || 'Authors not available';

                const journal =
                  publication['container-title']?.[0] ||
                  'Journal not available';

                const publishedDate =
                  publication.published?.['date-parts']?.[0];

                const year = publishedDate?.[0];

                return (
                  <article
                    key={publication.DOI || index}
                    className="rounded-xl border border-cyan-100/15 bg-white/5 p-5 transition hover:bg-white/10"
                  >
                    <h4 className="text-base font-semibold leading-6 text-white">
                      {title}
                    </h4>

                    <p className="mt-2 text-sm text-blue-100/75">
                      {authors}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-cyan-100/70">
                      <span>{journal}</span>
                      {year && <span>{year}</span>}
                    </div>

                    {publication.publisher && (
                      <p className="mt-1 text-xs text-blue-100/60">
                        Publisher: {publication.publisher}
                      </p>
                    )}

                    {publication.DOI && (
                      <a
                        href={`https://doi.org/${publication.DOI}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex text-sm font-medium text-cyan-200 hover:text-white hover:underline"
                      >
                        View publication →
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 border-t border-cyan-100/15 pt-5 text-sm text-cyan-100/90">
            <Waves size={17} aria-hidden="true" />
            <span>Arctic research dashboard</span>
          </div>
        </section>
      </main>
    </div>
  );
}