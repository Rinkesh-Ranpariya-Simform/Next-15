import FeedSkeleton from '@components/FeedSkeleton';

const Loading = () => {
  return (
    <section className='w-full'>
      <div className='h-12 bg-gray-300 rounded w-48 mb-4 animate-pulse'></div>

      <div className='h-4 bg-gray-300 rounded w-full mb-2 animate-pulse'></div>
      <div className='h-4 bg-gray-300 rounded w-3/4 mb-8 animate-pulse'></div>

      <FeedSkeleton />
    </section>
  );
};

export default Loading;
