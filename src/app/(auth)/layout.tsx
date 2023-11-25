import '@/styles/globals.css'
import '@/styles/index.css'

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="
        min-h-[100vh]
        flex-1
        items-start
        grid
        md:grid-cols-[20rem_minmax(0,1fr)]
        lg:grid-cols-[22rem_minmax(0,1fr)]
        md:gap-8
        px-4
        sm:px-8
        md:pr-0
      "
    >{ children }</main>
  )
}