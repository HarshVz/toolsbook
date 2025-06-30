import React from 'react';
import { Bookmark, Zap, Shield, Search, Camera, Tags, Check, X } from 'lucide-react';

function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: 'Auto-Extract Everything',
      description: 'Automatically captures titles, descriptions, and metadata from any URL'
    },
    {
      icon: Camera,
      title: 'Visual Snapshots',
      description: 'Takes full-page screenshots to preserve content as it was'
    },
    {
      icon: Tags,
      title: 'Smart Tagging',
      description: 'AI-powered keyword generation for effortless organization'
    },
    {
      icon: Search,
      title: 'Deep Search',
      description: 'Find anything instantly with full-content search capabilities'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays yours with local storage and encryption'
    },
    {
      icon: Bookmark,
      title: 'Zero Setup',
      description: 'Start organizing immediately with no configuration required'
    }
  ];

  const comparisons = [
    { feature: 'Auto metadata extraction', toolsbook: true, others: false },
    { feature: 'Visual screenshots', toolsbook: true, others: false },
    { feature: 'AI-powered tagging', toolsbook: true, others: false },
    { feature: 'Full-content search', toolsbook: true, others: false },
    { feature: 'Free forever', toolsbook: true, others: false },
    { feature: 'Privacy focused', toolsbook: true, others: false }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* <section className="relative px-6 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-indigo-300 bg-indigo-900/20 border border-indigo-500/20 rounded-full">
            <Bookmark className="w-4 h-4 mr-2" />
            Next-gen bookmark management
          </div>

          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Stop manually organizing.
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Start smart bookmarking.
            </span>
          </h1>

          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Toolsbook automatically extracts metadata, captures screenshots, and organizes your saved links with AI-powered intelligence.
          </p>

          <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Get Started Free
            <Zap className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section> */}

      {/* Features Grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything you need, nothing you don't
            </h2>
            <p className="text-lg text-neutral-400">
              Powerful automation meets intuitive design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl hover:border-indigo-500/30 hover:bg-neutral-800/70 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-6 py-20 border-t border-neutral-700/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How we compare
            </h2>
            <p className="text-lg text-neutral-400">
              See why thousands choose Toolsbook over traditional bookmark managers
            </p>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-neutral-700/50">
              <div className="px-6 py-4 bg-neutral-800/50 font-semibold text-neutral-300">
                Feature
              </div>
              <div className="px-6 py-4 bg-neutral-800/50 font-semibold text-center">
                <span className="text-indigo-400">Toolsbook</span>
              </div>
              <div className="px-6 py-4 bg-neutral-800/50 font-semibold text-center text-neutral-400">
                Others
              </div>
            </div>

            {comparisons.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-px bg-neutral-700/50 hover:bg-neutral-600/30 transition-colors">
                <div className="px-6 py-4 bg-neutral-800/50 text-neutral-300">
                  {item.feature}
                </div>
                <div className="px-6 py-4 bg-neutral-800/50 text-center">
                  {item.toolsbook ? (
                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  )}
                </div>
                <div className="px-6 py-4 bg-neutral-800/50 text-center">
                  {!item.toolsbook ? (
                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your bookmarking?
          </h2>
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Join thousands of researchers, developers, and content curators who've made the switch to intelligent bookmarking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Free Today
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-neutral-300 border border-neutral-600 rounded-lg hover:border-neutral-500 hover:text-white transition-all duration-200">
              View Demo
            </button>
          </div>

          <p className="text-sm text-neutral-500 mt-6">
            No credit card required • Free forever • Setup in 30 seconds
          </p>
        </div>
      </section> */}
    </div>
  );
}

export default FeaturesPage;
