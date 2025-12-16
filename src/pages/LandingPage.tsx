import { useNavigate } from 'react-router-dom'
import { Layout, Zap, Image, Share2, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-md">
              <Layout size={18} />
            </div>
            X.IDE
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-8 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            v1.0 is now available
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Design social media content <br className="hidden md:block" />
            <span className="text-slate-500">in seconds.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The professional, lightweight editor for Instagram, TikTok, and YouTube. 
            No complex tools, just pure creativity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="h-12 px-8 rounded bg-slate-900 text-white font-semibold text-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Designing Free <ArrowRight size={18} />
            </button>
            <button className="h-12 px-8 rounded border border-slate-200 text-slate-700 font-semibold text-lg hover:bg-slate-50 transition-all">
              View Templates
            </button>
          </div>
          
          {/* Hero Image / Preview */}
          <div className="mt-20 rounded-xl border border-slate-200 shadow-2xl overflow-hidden bg-slate-50">
             <div className="aspect-video w-full bg-slate-100 flex items-center justify-center text-slate-400">
                {/* Placeholder for app screenshot */}
                <div className="text-center">
                    <Layout size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Editor Preview</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to create</h2>
            <p className="text-lg text-slate-600">
              Built for speed and simplicity. X.IDE gives you the essential tools to build your brand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-blue-600" />,
                title: "Lightning Fast",
                desc: "Zero lag. Instant exports. Built with the latest web technologies for maximum performance."
              },
              {
                icon: <Image className="text-blue-600" />,
                title: "Smart Assets",
                desc: "Access a library of professional templates, stock photos, and icons directly in the editor."
              },
              {
                icon: <Share2 className="text-blue-600" />,
                title: "Multi-Format",
                desc: "Instantly resize your designs for Instagram Stories, TikTok, YouTube Thumbnails, and more."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by creators worldwide</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                {/* Mock Logos */}
                <div className="text-2xl font-bold text-slate-800">ACME Corp</div>
                <div className="text-2xl font-bold text-slate-800">GlobalTech</div>
                <div className="text-2xl font-bold text-slate-800">CreatorLabs</div>
                <div className="text-2xl font-bold text-slate-800">DesignFlow</div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start creating?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Join thousands of creators who use X.IDE to build their audience.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="h-14 px-10 rounded bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Get Started for Free
          </button>
          <p className="mt-6 text-sm text-slate-400">
            No credit card required. Free forever for individuals.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Layout size={20} />
            X.IDE
          </div>
          <div className="flex gap-8 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Terms</a>
            <a href="#" className="hover:text-slate-900">Twitter</a>
            <a href="#" className="hover:text-slate-900">GitHub</a>
          </div>
          <div className="text-sm text-slate-500">
            © 2025 X.IDE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
