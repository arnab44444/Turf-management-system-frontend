import { Link, useSearchParams, Form } from "react-router";
import { getImageUrl } from "../utils/imageUrl";
import { useLoaderData } from "react-router";

export default function AllTurfs() {
  const turfs = useLoaderData() || [];
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "";
  const sectionType = searchParams.get("sectionType") || "";
  const paymentCancelled = searchParams.get("payment_cancelled");

  const sportLabels = { football: "Football", cricket: "Cricket", badminton: "Badminton", basketball: "Basketball", volleyball: "Volleyball" };
  const activeSportLabel = sectionType ? sportLabels[sectionType] || sectionType : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-primary font-semibold tracking-wide mb-2">Browse</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-base-content">
          All <span className="text-primary">Turfs</span>
        </h1>
        <p className="text-lg text-base-content/70">
          Filter by city and sport to find your perfect match.
        </p>
      </div>

      {paymentCancelled && (
        <div className="alert alert-info mb-8 shadow-md">
          <span>Payment was cancelled. You can book again anytime.</span>
        </div>
      )}

      <div className="card bg-base-100 p-6 mb-10 shadow-xl rounded-2xl border border-base-200">
        <Form method="get" action="/all-turfs" className="flex flex-wrap gap-4 items-end">
          <div className="form-control flex-1 min-w-[200px]">
            <label className="label">
              <span className="label-text font-medium text-base-content">City / Area</span>
            </label>
            <input
              type="text"
              placeholder="e.g. GEC, Oxygen, Chakbazar"
              name="city"
              defaultValue={city}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full sm:w-48">
            <label className="label">
              <span className="label-text font-medium text-base-content">Sport</span>
            </label>
            <select name="sectionType" className="select select-bordered w-full" defaultValue={sectionType}>
              <option value="">All sports</option>
              <option value="football">Football</option>
              <option value="cricket">Cricket</option>
              <option value="badminton">Badminton</option>
              <option value="basketball">Basketball</option>
              <option value="volleyball">Volleyball</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary font-semibold bg-primary text-primary-content">
            Apply Filters
          </button>
          </Form>
        {activeSportLabel && (
          <p className="text-sm mt-4 text-base-content/70">
            Showing turfs with {activeSportLabel} available
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {turfs.map((turf, i) => (
          <Link
            key={turf._id}
            to={sectionType ? `/turfs/${turf._id}?sport=${sectionType}` : `/turfs/${turf._id}`}
            className="group card bg-base-100 shadow-lg hover:shadow-2xl border border-base-200 overflow-hidden card-hover rounded-xl"
          >
            <figure className="overflow-hidden">
              <img
                src={getImageUrl(turf.images?.[0] || turf.sections?.[0]?.images?.[0]) || "https://placehold.co/400x240/166534/22c55e?text=Turf"}
                alt={turf.name}
                className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 badge badge-primary badge-lg shadow-md">
                ⭐ {turf.rating || "—"} ({turf.totalReviews || 0})
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl text-base-content">{turf.name}</h3>
              <p className="text-base-content/70">{turf.location}, {turf.city}</p>
            </div>
          </Link>
        ))}
      </div>
      {turfs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-base-content/60">No turfs found.</p>
          <Link to="/all-turfs" className="btn btn-ghost mt-4">Clear filters</Link>
        </div>
      )}
    </div>
  );
}
