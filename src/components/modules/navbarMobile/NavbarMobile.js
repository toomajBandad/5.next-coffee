"use client";
import Link from "next/link";

export default function NavbarMobile({
  closeMenu,
  isLogin,
  isAdmin,
  navLinks,
  userPanelLinks,
}) {
  return (
    <div
      className="fixed inset-0 z-10 bg-white/30 lg:hidden"
      onClick={closeMenu}
    >
      <div
        className="absolute top-16 left-0 w-full px-6 py-8 bg-white border-t border-gray-200 shadow-xl rounded-t-xl transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col gap-4 text-gray-700 text-base font-medium">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              {label}
            </Link>
          ))}

          {!isLogin ? (
            <Link
              href="/login-register"
              onClick={closeMenu}
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Login / Register
            </Link>
          ) : (
            <>
              <div className="pt-4 border-t border-gray-200 text-sm text-gray-500 uppercase tracking-wide">
                Account
              </div>
              {userPanelLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  {label}
                </Link>
              ))}
            </>
          )}

          {isAdmin && (
            <>
              <div className="pt-4 border-t border-gray-200 text-sm text-gray-500 uppercase tracking-wide">
                Admin
              </div>
              <Link
                href="/adminPanel"
                onClick={closeMenu}
                className="px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Admin Panel
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}