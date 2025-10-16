import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Cookie } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Cookie Policy</h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                GoLeadorTips uses cookies for the following purposes:
              </p>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Required for the website to function properly. These include authentication, session management, and security features. You cannot disable these cookies.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Functional Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Remember your preferences and settings, such as language selection and display preferences.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Analytics Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Help us understand how visitors interact with our website by collecting anonymous information about page visits, time spent, and navigation patterns.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Performance Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Allow us to improve website performance by understanding which pages are most popular and how users navigate through the site.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use some third-party services that may set their own cookies:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>PayPal:</strong> For secure payment processing</li>
                <li><strong>Authentication Services:</strong> To manage user login sessions</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These third parties have their own privacy policies and cookie policies, which we encourage you to review.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Cookie Duration</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use both session and persistent cookies:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have control over cookies. You can:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Accept or decline cookies using our cookie consent banner</li>
                <li>Delete cookies through your browser settings</li>
                <li>Block all cookies in your browser preferences</li>
                <li>Set your browser to notify you when cookies are sent</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Note: Blocking certain cookies may affect website functionality and your user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Browser Settings</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most browsers allow you to manage cookies through settings:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy to reflect changes in our practices or for legal reasons. The updated policy will be posted on this page with a new "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our use of cookies, please contact us through the contact form on our <a href="/archives" className="text-primary hover:underline">Archives page</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
