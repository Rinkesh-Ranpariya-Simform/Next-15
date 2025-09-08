import FeedSkeleton from '@components/FeedSkeleton';

const Loading = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share{' '}
        <span className='orange_gradient text-center'>Prompts</span>
      </h1>

      <p className='desc text-center'>
        Promptopia is prompting tool for modern world to discover, create and
        share creative prompts
      </p>

      <section className='feed'>
        <form className='relative w-full flex-center'>
          <div className='search_input peer animate-pulse bg-gray-200 h-12 rounded-md'></div>
        </form>

        <FeedSkeleton />
      </section>
    </section>
  );
};

export default Loading;
