import Link from "next/link";
import "./globals.css";

const Home = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h2 className="text-3xl mb-4">Inventory Management Software</h2>
      <Link href="/dashboard/home/overview">
        <a>View Dashboard</a> {/* Explicit <a> for clarity in the Link */}
      </Link>
    </div>
  );
};

export default Home;
