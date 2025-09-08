'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import FormSkeleton from '@components/FormSkeleton';

function UpdatePromptContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/prompt/${promptId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch prompt details');
        }

        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error('Error fetching prompt details:', error);
      } finally {
        setLoading(false);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert('Missing PromptId!');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {loading ? (
        <FormSkeleton />
      ) : (
        <Form
          type='Edit'
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      )}
    </>
  );
}

export default function UpdatePrompt() {
  return (
    <Suspense>
      <UpdatePromptContent />
    </Suspense>
  );
}
