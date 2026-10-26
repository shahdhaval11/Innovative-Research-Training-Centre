import FeedbackForm from "./FeedbackForm";

export default function FeedbackPage() {
  return (
    <section className="section-py bg-secondary-50/50">
      <div className="container-app">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-secondary-100 bg-white shadow-soft">
          <div className="bg-linear-to-br from-secondary-800 to-secondary-600 px-6 py-7 text-white sm:px-8">
            <span className="text-xs font-bold tracking-wider text-primary-200 uppercase">
              Feedback
            </span>
            <h1 className="mt-1 font-heading text-2xl font-extrabold sm:text-3xl">
              Share Your Feedback
            </h1>
            <p className="mt-2 text-sm text-secondary-100">
              Tell us about your experience with NanoNova.
            </p>
          </div>

          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
