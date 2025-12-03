import Countdown from "@/components/Countdown";
import Navbar from "@/components/Navbar";
import { getProperties } from "@/lib/api/property";

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <>
      <Navbar />
      <main className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-3xl font-semibold text-green-600">
            Properties for Bidding
          </div>
          <a className="bg-green-600 text-white px-4 py-1 rounded" href="/">
            See More
          </a>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {properties.map((p) => (
            <div key={p.id} className="rounded shadow">
              <div className="relative">
                <div className="absolute top-2 left-2 text-white bg-green-600 px-2 py-1 rounded">
                  ⏳ <Countdown color={"home"} endsAt={p.ends_at} />
                </div>
                <img
                  src={p.image_url}
                  alt=""
                  className="h-48 w-full object-cover rounded-t"
                />
                <div className="flex justify-between items-center px-2 py-1">
                  <div className="font-semibold text-3xl text-gray-800">
                    ₹{p.current_price || p.starting_price}
                  </div>
                  <a
                    className="bg-green-600/75 hover:bg-green-600 text-white px-4 py-1 rounded"
                    href={`/property/${p.id}`}
                  >
                    Bid Now
                  </a>
                </div>
                <div className="px-4 py-2">
                  <div className="text-xl font-bold text-gray-600">
                    {p.title}
                  </div>
                  <div>{p.description}</div>
                  <div>{p.address}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
