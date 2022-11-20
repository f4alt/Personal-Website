import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center py-3 pl-4">
      <Link href="/">
        <button className="text-2xl font-medium bg-dir text-white py-1 px-2 rounded-lg textx-sm">CJM</button>
      </Link>
      <ul className="flex items-center gap-10">
          <div className="flex items-center gap-6">
            <Link href="/about">
              <button className="font-medium bg-dir text-white py-2 px-4 rounded-lg textx-sm">
                About
              </button>
            </Link>
            <Link href="/contact">
              <button className="font-medium bg-dir text-white py-2 px-4 rounded-lg textx-sm">
                Contact
              </button>
            </Link>
            <Link href="/projects">
              <button className="font-medium bg-dir text-white py-2 px-4 rounded-lg textx-sm">
                Projects
              </button>
            </Link>
          </div>
      </ul>
    </nav>
  );
}