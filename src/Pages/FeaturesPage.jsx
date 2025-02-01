export default function FeaturesPage() {
    return (
      <div className="min-h-screen text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Why Choose Toolsbook?
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              The Next-Gen Bookmark Manager for Modern Users
            </p>
          </header>

          {/* Feature Comparison Table */}
          <section className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Toolsbook vs Traditional Bookmark Managers
            </h2>
            <div className="rounded-lg border border-zinc-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-left">Toolsbook</th>
                    <th className="px-6 py-4 text-left">Others</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Auto Metadata Extraction', '✅ Full Automation', '❌ Manual Entry'],
                    ['Screenshot Capture', '✅ Instant Snapshot', '❌ Browser Extension Needed'],
                    ['Keyword Generation', '✅ AI-Powered Tags', '❌ Manual Tagging'],
                    ['Organization', '✅ Smart Categories', '❌ Basic Folders'],
                    ['Cost', '✅ Free Forever', '❌ Premium Features Locked'],
                    ['Search', '✅ Deep Content Search', '❌ URL-Only Search'],
                  ].map(([feature, toolsbook, others], index) => (
                    <tr
                      key={feature}
                      className={`hover:bg-zinc-800 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-850'}`}
                    >
                      <td className="px-6 py-4 font-medium">{feature}</td>
                      <td className="px-6 py-4 text-indigo-400">{toolsbook}</td>
                      <td className="px-6 py-4 text-red-400">{others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Key Features List */}
          <section className="mb-20">
            <h2 className="text-3xl font-semibold mb-12 text-center">
              Powerful Features Overview
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Smart Scraping',
                  icon: '📦',
                  points: [
                    'Automatic metadata extraction',
                    'Full-page screenshot capture',
                    'Keyword generation using AI',
                    'Link preview generation'
                  ]
                },
                {
                  title: 'Organization',
                  icon: '🗂️',
                  points: [
                    'Customizable categories',
                    'Nested collections',
                    'Batch operations',
                    'Quick search filters'
                  ]
                },
                {
                  title: 'Privacy',
                  icon: '🔒',
                  points: [
                    'Local storage option',
                    'End-to-end encryption',
                    'No data selling',
                    'User-controlled sharing'
                  ]
                }
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-colors"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <ul className="space-y-2 text-zinc-400">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-8">
              The Ultimate Research Companion
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                ['🚀', 'Zero Setup', 'Start organizing in seconds with automated workflows'],
                ['💸', 'Free Forever', 'No hidden costs or premium paywalls'],
                ['🤖', 'Smart Automation', 'AI-powered organization saves hours weekly'],
              ].map(([icon, title, text]) => (
                <div key={title} className="p-6 bg-zinc-800 rounded-lg">
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-zinc-400">{text}</p>
                </div>
              ))}
            </div>

            <a
              href="/signup"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Start Organizing Free
            </a>
          </section>

          {/* SEO Content Section */}
          <section className="mt-20 prose prose-invert max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Best Free Bookmark Manager for Researchers and Content Curators
            </h2>
            <p>
              Toolsbook revolutionizes link management by combining automated web scraping with
              intelligent organization features. Unlike traditional bookmark managers that simply
              save URLs, our tool extracts rich metadata, generates search-friendly keywords,
              and preserves visual snapshots - making it ideal for academic research,
              content curation, and professional reference management.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">
              Key Advantages Over Competitors
            </h3>
            <ul>
              <li>No manual data entry required</li>
              <li>Built-in privacy-first architecture</li>
              <li>Advanced search across saved content</li>
              <li>Automatic link health monitoring</li>
            </ul>
          </section>
        </div>

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Toolsbook",
            "description": "Automated bookmark manager with AI-powered organization and metadata extraction",
            "features": [
              "Automated metadata extraction",
              "AI-generated keywords",
              "Free bookmark management",
              "Privacy-focused design"
            ]
          })}
        </script>
      </div>
    )
  }
