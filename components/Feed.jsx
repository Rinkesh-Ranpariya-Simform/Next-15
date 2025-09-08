'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';
import FeedSkeleton from './FeedSkeleton';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => (
        <PromptCard
          key={post.creator._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/prompt');

      if (!response.ok) {
        throw new Error('Failed to fetch prompts');
      }

      const data = await response.json();
      setAllPosts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = searchtext => {
    const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
    return allPosts.filter(
      item =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = e => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = tagName => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          disabled={loading}
        />
      </form>

      {/* Loading State */}
      {loading && <FeedSkeleton />}

      {/* Error State */}
      {error && !loading && (
        <div className='mt-16 flex-center'>
          <div className='bg-red-50 border border-red-200 rounded-md p-4'>
            <p className='text-red-600 text-center'>
              Failed to load prompts. Please try again.
            </p>
            <button
              onClick={fetchPosts}
              className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {searchText ? (
            <>
              {searchedResults.length > 0 ? (
                <PromptCardList
                  data={searchedResults}
                  handleTagClick={handleTagClick}
                />
              ) : (
                <div className='mt-16 flex-center'>
                  <p className='text-gray-500 text-center'>
                    No prompts found matching "{searchText}"
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {allPosts.length > 0 ? (
                <PromptCardList
                  data={allPosts}
                  handleTagClick={handleTagClick}
                />
              ) : (
                <div className='mt-16 flex-center'>
                  <p className='text-gray-500 text-center'>
                    No prompts available yet.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Feed;
