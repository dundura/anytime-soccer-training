import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Anytime Soccer Training',
  description: 'Get in touch with the Anytime Soccer Training team. We\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Contact Us</h1>
          <p className="text-gray text-lg">Have a question or want to learn more? Drop us a message and we&apos;ll get back to you.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
          <ContactForm />
        </div>

        <p className="text-center text-sm text-gray mt-6">
          Or email us directly at{' '}
          <a href="mailto:neil@anytime-soccer.com" className="text-red hover:underline">neil@anytime-soccer.com</a>
        </p>
      </div>
    </section>
  );
}
