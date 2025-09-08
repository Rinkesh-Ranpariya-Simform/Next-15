const PromptCardSkeleton = () => {
  return (
    <div className='prompt_card animate-pulse'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <div className='w-10 h-10 rounded-full bg-gray-300'></div>
          <div className='flex flex-col'>
            <div className='h-4 bg-gray-300 rounded w-20 mb-2'></div>
            <div className='h-3 bg-gray-300 rounded w-16'></div>
          </div>
        </div>
        <div className='w-5 h-5 bg-gray-300 rounded'></div>
      </div>

      <div className='my-4 space-y-2'>
        <div className='h-4 bg-gray-300 rounded w-full'></div>
        <div className='h-4 bg-gray-300 rounded w-3/4'></div>
        <div className='h-4 bg-gray-300 rounded w-1/2'></div>
      </div>

      <div className='h-6 bg-gray-300 rounded w-20 mt-3'></div>
    </div>
  );
};

const FeedSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => ({
    id: `skeleton-${Date.now()}-${index}`,
  }));

  return (
    <div className='mt-16 prompt_layout'>
      {skeletonItems.map(item => (
        <PromptCardSkeleton key={item.id} />
      ))}
    </div>
  );
};

export default FeedSkeleton;
