

interface SkeletonInterface {
  className: string
}
const Skeleton = ({className=''}: SkeletonInterface) => {
  return (
    <section className="w-full">
      <div className={`h-10 animate-pulse ${className}`}></div>
    </section>
  )
}

export default Skeleton