import { useState } from "react";
import { toast } from "react-toastify";

const CONTACT_INFO = [
  {
    icon: "📧",
    title: "Email",
    value: "support@turfhub.com",
    desc: "We reply within 24 hours",
    href: "mailto:support@turfhub.com",
  },
  {
    icon: "📱",
    title: "Phone",
    value: "+880 1XXX-XXXXXX",
    desc: "Mon–Sat, 9AM–8PM",
    href: "tel:+8801XXXXXX",
  },
  {
    icon: "📍",
    title: "Location",
    value: "Dhaka, Bangladesh",
    desc: "Visit us anytime",
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 border-b border-base-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.08)_0%,transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
          <p className="text-primary font-semibold tracking-wide mb-2">Get in Touch</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-base-content">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-base-content/80 max-w-2xl">
            Have questions? We&apos;re here to help. Reach out and we&apos;ll get back to you soon.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact cards */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-base-content">Contact Info</h2>
            <div className="space-y-4">
              {CONTACT_INFO.map((c, i) => (
                <a
                  key={i}
                  href={c.href || undefined}
                  className={`card bg-base-100 border border-base-200 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 group block ${!c.href ? "cursor-default" : ""}`}
                >
                  <div className="card-body flex-row items-center gap-4 py-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
                      {c.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-base-content/60">{c.title}</p>
                      <p className="font-semibold text-base-content">{c.value}</p>
                      <p className="text-xs text-base-content/50">{c.desc}</p>
                    </div>
                    {c.href && (
                      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden">
              <div className="card-body p-8">
                <h2 className="text-xl font-bold mb-2 text-base-content">Send a Message</h2>
                <p className="text-base-content/70 text-sm mb-6">Fill out the form below and we&apos;ll respond as soon as possible.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base-content">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="input input-bordered w-full"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base-content">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="input input-bordered w-full"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base-content">Message</span>
                    </label>
                    <textarea
                      placeholder="How can we help?"
                      className="textarea textarea-bordered w-full min-h-[120px]"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12 card bg-base-200 border border-base-300 overflow-hidden">
          <div className="h-48 md:h-64 flex items-center justify-center text-base-content/50">
            <div className="text-center">
              <span className="text-5xl block mb-2">📍</span>
              <p className="font-medium">Dhaka, Bangladesh</p>
              <p className="text-sm">Find us on the map</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
