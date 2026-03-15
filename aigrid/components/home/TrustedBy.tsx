import { FadeIn } from "@/components/aigrid/FadeIn";

const COMPANIES = [
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" },
  { name: "Microsoft", logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Apple", logo: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Spotify", logo: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" },
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
];

export function TrustedBy() {
  return (
    <FadeIn>
      <section className="bg-white border-y border-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Trusted by teams at</p>
            <h2 className="text-2xl font-bold text-gray-900">Leading companies use AIGrid to discover tools</h2>
          </div>
          
          {/* Logo grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {COMPANIES.map((company, i) => (
              <FadeIn key={company.name} delay={i * 0.05}>
                <div className="flex items-center justify-center h-12 w-full px-4 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-h-8 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
