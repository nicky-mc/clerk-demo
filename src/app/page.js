import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="rounded-full border border-solid border-pink-500"
          src="/fail.jpeg"
          alt="Trans-related theme image"
          width={180}
          height={180}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-pink-600 dark:text-white">
          <li className="mb-2">
            Start by exploring the challenges and triumphs of the trans
            community.
            <code className="bg-pink-100 dark:bg-blue-200 px-1 py-0.5 rounded font-semibold">
              Learning and support are key.
            </code>
          </li>
          <li>
            Join a movement that advocates for equal rights and visibility.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-400 text-white gap-2 hover:bg-blue-500 dark:hover:bg-blue-300 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://transequality.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="rounded"
              src="/globe.svg"
              alt="Globe icon"
              width={20}
              height={20}
            />
            Learn More
          </a>
          <a
            className="rounded-full border border-solid border-pink-400 transition-colors flex items-center justify-center hover:bg-pink-200 dark:hover:bg-pink-300 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://mermaidsuk.org.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support Trans Youth
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-blue-500"
          href="https://www.stonewall.org.uk/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Trans Rights Information
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-pink-500"
          href="https://www.glaad.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          GLAAD Trans Resources
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-blue-500"
          href="https://www.transgenderlegal.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Trans Legal Resources →
        </a>
      </footer>
    </div>
  );
}
