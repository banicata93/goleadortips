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
        "Our predictions have an average success rate of 89% across all packages. Silver package maintains 94%, Gold achieves 87%, and Platinum reaches 77% (with higher odds). We maintain full transparency with our prediction archives available for review.",
    },
    {
      question: "What's the difference between the packages?",
      answer:
        "Silver offers daily single predictions with odds around 1.70-1.90. Gold provides accumulator tips with odds 3.0-4.0 and priority support. Platinum delivers VIP predictions with odds 8.0-10.0, personalized alerts, and 24/7 dedicated support.",
    },
    {
      question: "How do I receive the predictions?",
      answer:
        "After subscribing, you will receive the predictions via email and through our dedicated Telegram group.         ",

    {
      question: "Do you offer a money-back guarantee?",
      answer:
        "No refunds are provided. All payments are final and non-refundable.",
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
        "Betting laws vary by country and region. It is your responsibility to ensure that sports betting is legal in your jurisdiction before subscribing. We recommend checking local regulations. We do not encourage gambling – we provide predictions based solely on data and statistics.",
    },
    {
      question: "Can I upgrade or downgrade my package?",
      answer:
        "Yes, you can change your package at any time.",
    },
    {
      question: "Do you provide betting advice or just predictions?",
      answer:
        "We provide predictions with detailed analysis and reasoning. However, we do not offer personalized betting advice. All members should bet responsibly and within their means. Gold and Platinum subscribers receive bankroll management guidance.",
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
