const FormSkeleton = () => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <div className='animate-pulse'>
        <div className='h-12 bg-gray-300 rounded w-48 mb-4'></div>
        <div className='h-4 bg-gray-300 rounded w-full mb-2'></div>
        <div className='h-4 bg-gray-300 rounded w-3/4 mb-8'></div>

        <div className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
          <div>
            <div className='h-4 bg-gray-300 rounded w-32 mb-2'></div>
            <div className='h-32 bg-gray-300 rounded w-full'></div>
          </div>

          <div>
            <div className='h-4 bg-gray-300 rounded w-24 mb-2'></div>
            <div className='h-10 bg-gray-300 rounded w-full'></div>
          </div>

          <div className='flex-end mx-3 mb-5 gap-4'>
            <div className='h-10 bg-gray-300 rounded w-20'></div>
            <div className='h-10 bg-gray-300 rounded w-20'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSkeleton;
