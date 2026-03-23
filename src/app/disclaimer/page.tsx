import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DisclaimerPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
                <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-foreground">
                        Disclaimer
                    </h1>

                    <p>
                        The information provided on maknauang is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">External Links Disclaimer</h2>
                    <p>
                        The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">Professional Disclaimer</h2>
                    <p>
                        The site can not and does not contain legal, medical, financial, or other professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">Views Expressed</h2>
                    <p>
                        The views and opinions expressed on this website are those of the authors and do not necessarily reflect the official policy or position of maknauang. Any content provided by our bloggers or authors are of their opinion and are not intended to malign any religion, ethnic group, club, organization, company, individual or anyone or anything.
                    </p>
                </article>
            </div>
            <Footer />
        </main>
    );
}
