import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate are your predictions?",
      answer:
        "Our predictions have an average success rate of 78% across all packages. Silver package maintains 72%, Gold achieves 78%, and Platinum reaches 65% (with higher odds). We maintain full transparency with our prediction archives available for review.",
    },
    {
      question: "What's the difference between the packages?",
      answer:
        "Silver offers daily single predictions with odds around 2.0. Gold provides accumulator tips with odds 3.0-4.0 and priority support. Platinum delivers VIP predictions with odds 8.0-10.0, personalized alerts, and 24/7 dedicated support.",
    },
    {
      question: "How do I receive the predictions?",
      answer:
        "After subscribing, you'll receive predictions via email and through your member dashboard. Gold and Platinum members also get SMS alerts for time-sensitive tips. All predictions are delivered before match kickoff.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. There are no long-term commitments. Your access will continue until the end of your current billing period.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer:
        "We offer a 7-day satisfaction guarantee for first-time subscribers. If you're not satisfied with our service within the first week, contact us for a full refund.",
    },
    {
      question: "How are the predictions made?",
      answer:
        "Our expert analysts use advanced statistical models, team form analysis, head-to-head records, injury reports, and insider knowledge. Each prediction undergoes rigorous review before being released to members.",
    },
    {
      question: "What sports do you cover?",
      answer:
        "We specialize exclusively in football (soccer) predictions, covering major leagues including Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, and more.",
    },
    {
      question: "Is betting legal in my country?",
      answer:
        "Betting laws vary by country and region. It's your responsibility to ensure that sports betting is legal in your jurisdiction before subscribing. We recommend checking local regulations.",
    },
    {
      question: "Can I upgrade or downgrade my package?",
      answer:
        "Yes, you can change your package at any time. Upgrades take effect immediately, while downgrades will apply at the start of your next billing cycle.",
    },
    {
      question: "Do you provide betting advice or just predictions?",
      answer:
        "We provide predictions with detailed analysis and reasoning. However, we don't offer personalized betting advice. All members should bet responsibly and within their means.",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-xl text-muted-foreground px-4">
            Everything you need to know about our service
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AccordionTrigger className="text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a
            href="/archives#contact"
            className="text-primary hover:underline font-medium"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
