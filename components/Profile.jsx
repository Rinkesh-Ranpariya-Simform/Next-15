import PromptCard from './PromptCard';
import FeedSkeleton from './FeedSkeleton';

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  loading = false,
}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>

      <p className='desc text-left'>{desc}</p>

      {loading ? (
        <FeedSkeleton />
      ) : (
        <>
          {data.length > 0 ? (
            <div className='mt-10 prompt_layout'>
              {data.map((post, index) => (
                <PromptCard
                  post={post}
                  handleEdit={() => handleEdit && handleEdit(post)}
                  handleDelete={() => handleDelete && handleDelete(post)}
                />
              ))}
            </div>
          ) : (
            <div className='mt-10 flex-center'>
              <p className='text-gray-500 text-center'>
                No prompts found. Create your first prompt to get started!
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Profile;
