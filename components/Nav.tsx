import Link from "next/link";

const Nav = () => {
  return (
    <nav className="top-0 fixed flex justify-between items-center bg-primary px-8 w-full h-16">
      <h1 className="font-bold text-foreground text-xl">Animal Shelter</h1>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-muted-foreground hover:text-muted transition-colors"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-muted-foreground hover:text-muted transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-muted-foreground hover:text-muted transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
