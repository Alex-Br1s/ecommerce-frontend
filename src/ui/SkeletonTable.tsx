
import Skeleton from './Skeleton'

const SkeletonTable = () => {
  return (
    <div className='w-full flex p-4 gap-x-5'>


      {/* Otras columnas: Esqueletos rectangulares con ancho fijo */}
      <div className='flex flex-col gap-y-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className='flex gap-x-4'>
            {/* Añade varias columnas rectangulares por fila */}
            <Skeleton className='dark:bg-[#272727] h-10 w-20 max-w-56 sm:w-56 xs:w-28 rounded-md' />
            <Skeleton className='dark:bg-[#272727] h-10 w-20 max-w-56 sm:w-56 xs:w-28 rounded-md' />
            <Skeleton className='dark:bg-[#272727] h-10 w-20 max-w-56 sm:w-56 xs:w-28 rounded-md' />
            <div className='flex items-center gap-x-2'>
              <Skeleton className='dark:bg-[#272727] h-5 w-5 rounded-full' />
              <Skeleton className='dark:bg-[#272727] h-5 w-5 rounded-full' />
              <Skeleton className='dark:bg-[#272727] h-5 w-5 rounded-full' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;
