export default ({ params }: { params: { id: string } }) => {
  return (
    <>moment #{params.id}</>
  )
}