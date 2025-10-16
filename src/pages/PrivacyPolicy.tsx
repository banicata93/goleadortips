import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At GoLeadorTips, we are committed to protecting your privacy. We collect minimal information necessary to provide our football prediction services:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Email address for account creation and communication</li>
                <li>Payment information processed securely through PayPal (we do not store payment details)</li>
                <li>Usage data and preferences to improve our service</li>
                <li>Cookies for site functionality and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your information is used exclusively for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Providing access to premium football prediction services</li>
                <li>Processing subscription payments through PayPal</li>
                <li>Sending service updates and prediction notifications</li>
                <li>Improving our prediction algorithms and user experience</li>
                <li>Responding to customer support inquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Payment Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All payments are processed through PayPal, a trusted and secure payment platform. We never store or have access to your credit card information, bank details, or other sensitive payment data. PayPal uses industry-standard encryption and security measures to protect your financial information.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses SSL encryption to ensure all data transmitted between your browser and our servers is secure and protected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or share your personal information with third parties except:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
                <li>PayPal for payment processing</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account and associated data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to enhance your experience. For detailed information about our cookie usage, please see our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us through the contact form on our <a href="/archives" className="text-primary hover:underline">Archives page</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
