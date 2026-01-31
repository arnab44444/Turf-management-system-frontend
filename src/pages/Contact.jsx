export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-extrabold mb-4">
        Contact <span className="text-primary">Us</span>
      </h1>
      <p className="text-xl text-base-content/80 mb-10">
        Have questions? We&apos;re here to help.
      </p>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <ul className="space-y-4 text-lg">
            <li className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <span>Email: support@turfhub.com</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <span>Phone: +880 1XXX-XXXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <span>Address: Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
