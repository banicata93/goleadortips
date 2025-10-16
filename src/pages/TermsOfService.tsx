import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using GoLeadorTips, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                GoLeadorTips provides premium football prediction services across three subscription tiers: Silver, Gold, and Platinum. Our predictions are based on statistical analysis and expert insights.
              </p>
              <p className="text-muted-foreground leading-relaxed font-semibold">
                IMPORTANT: All predictions are for informational and entertainment purposes only. We do not guarantee wins or specific outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Subscription and Payments</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  <strong>3.1 Payment Processing:</strong> All payments are processed securely through PayPal. By subscribing, you authorize recurring payments according to your chosen plan.
                </p>
                <p>
                  <strong>3.2 Subscription Tiers:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Silver Package: 1 prediction/week with odds around 2.00</li>
                  <li>Gold Package: 1 prediction/week with odds around 3-4</li>
                  <li>Platinum Package: 1 prediction/week with odds around 8-10</li>
                </ul>
                <p>
                  <strong>3.3 Refunds:</strong> Due to the nature of our service (time-sensitive predictions), refunds are generally not available once predictions have been delivered. Contact us for exceptional circumstances.
                </p>
                <p>
                  <strong>3.4 Cancellation:</strong> You may cancel your subscription at any time. Access will continue until the end of your current billing period.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>You agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate account information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Not share predictions with non-subscribers</li>
                  <li>Use predictions responsibly and legally</li>
                  <li>Comply with all applicable gambling laws in your jurisdiction</li>
                  <li>Not attempt to reverse-engineer or copy our prediction methods</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Legal Disclaimers</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p className="font-semibold text-destructive">
                  GAMBLING DISCLAIMER:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Betting involves financial risk and may not be legal in your jurisdiction</li>
                  <li>You are solely responsible for ensuring your betting activities comply with local laws</li>
                  <li>We do not encourage or promote irresponsible gambling</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>You should never bet more than you can afford to lose</li>
                </ul>
                <p className="font-semibold mt-4">
                  NO WARRANTY:
                </p>
                <p>
                  Our predictions are provided "as is" without any warranty of any kind. We make no guarantees about accuracy, completeness, or profitability.
                </p>
                <p className="font-semibold mt-4">
                  LIMITATION OF LIABILITY:
                </p>
                <p>
                  GoLeadorTips shall not be liable for any losses, damages, or harm resulting from the use of our predictions or services. This includes financial losses from betting activities.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, predictions, logos, and materials on GoLeadorTips are our intellectual property. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Account Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or misuse our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Age Restriction</h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 18 years old (or the legal gambling age in your jurisdiction) to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms are governed by applicable international law. Disputes shall be resolved through arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us through the contact form on our <a href="/archives" className="text-primary hover:underline">Archives page</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
