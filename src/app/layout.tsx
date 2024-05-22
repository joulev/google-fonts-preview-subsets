import "~/app/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-100 font-sans text-zinc-700 antialiased dark:bg-zinc-900 dark:text-zinc-300">
        {children}
      </body>
    </html>
  );
}
