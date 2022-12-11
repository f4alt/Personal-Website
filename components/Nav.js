import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="w-full bg-white shadow my-3">
            <div className="rounded justify-between px-4 mx-auto md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-1 md:py-3 md:block">
                    <Link href="/">
        <button className="text-2xl font-medium bg-dir text-white py-1 px-2 rounded-lg textx-sm">CJM</button>
      </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                              <div className={`menu ${navbar ? "hidden change" : ""}`}>
                                <div className="bar1"></div>
                                <div className="bar2"></div>
                                <div className="bar3"></div>
                              </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        <div className="sm:flex grid items-center gap-6">
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
                    </div>
                </div>
            </div>
        </nav>
    );
}