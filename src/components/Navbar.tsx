"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const linkStyle = "text-center bg-blue;"

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black/25 backdrop-blur-sm text-white z-50">
      <div className="flex justify-between items-center h-full px-6 text-white md:px-8">
        <strong>My App</strong>
        <nav className="hidden md:flex items-center gap-6">
          <Link className={linkStyle} href="/">Home</Link>
          <Link className={linkStyle} href="/">Beach</Link>
          <Link className={linkStyle} href="/about">About</Link>
          <Link className={linkStyle} href="/">Contact</Link>
          <Link
            href="../login"
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded-full"
          >
            Get Started
          </Link>
        </nav>
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
      
      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-6 py-4 bg-white border-t">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/" onClick={() => setOpen(false)}>Contact</Link>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded-full text-center"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}
