import InquiryForm from "@/modules/home/components/InquiryForm";

export default function InquiryPage() {
  return (
    <section className="section-py bg-secondary-50/50">
      <div className="container-app">
        <div className="mx-auto max-w-lg">
          <div className="mb-6 text-center">
            <span className="eyebrow">Inquiry</span>
            <h1 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
              We&apos;d love to hear from you
            </h1>
            <p className="mt-2 text-sm text-secondary-500">
              Questions about internships, workshops or research support? Send us your details and
              we&apos;ll get back to you.
            </p>
          </div>

          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
