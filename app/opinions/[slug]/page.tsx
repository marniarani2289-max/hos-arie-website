<article className="mx-auto max-w-5xl">
  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
    Opinion
  </p>

  <h1 className="mt-6 max-w-4xl text-6xl font-extrabold leading-tight text-gray-950">
    {opinion.title}
  </h1>

  <p className="mt-8 max-w-3xl text-2xl leading-10 text-gray-600">
    {opinion.summary}
  </p>

  {opinion.image && (
    <div className="mt-14 overflow-hidden rounded-3xl">
      <img
        src={opinion.image}
        alt={opinion.title}
        className="h-auto w-full object-cover"
      />
    </div>
  )}

  <div className="mt-16 border-t border-gray-200 pt-12">
    <div className="article-content">
      <PortableText value={opinion.body} />
    </div>
  </div>
</article>