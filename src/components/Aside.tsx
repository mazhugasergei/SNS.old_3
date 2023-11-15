export default ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="max-md:hidden sticky top-14 z-49 w-full flex flex-col gap-4 pl-1 py-8">
      { children }
    </aside>
  )
}