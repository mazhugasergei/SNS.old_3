export default ({ params }: { params: { id: string, code: string } }) => {
  const { id, code } = params
  
  return (<>
    <div>{ typeof id }</div>
    <div>{ typeof code }</div>
  </>)
}