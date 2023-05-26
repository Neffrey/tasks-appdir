import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-secondary to-accent p-24">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Tasks by Neffrey
        </h1>
        <p className="text-xl font-extrabold tracking-tight text-white">
          Just a quick little customizable task tracker
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/tasks">
            <button className="btn-primary btn rounded-md bg-primary-focus px-8 py-4 font-bold text-white hover:bg-primary">
              View Tasks
            </button>
          </Link>
          <Link href="/account">
            <button className="btn-primary btn rounded-md bg-primary-focus px-4 py-2 font-bold text-white hover:bg-primary">
              View My Account
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
