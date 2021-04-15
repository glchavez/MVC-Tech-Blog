const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();
  const postID = document.querySelector('#post-id').value.trim();

  if (content && postID) {
    const response = await fetch(`/api/comment/post/:id`, {
      method: 'POST',
      body: JSON.stringify({ content, postID }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create comment');
    }
  }
};


document
  .querySelector('.new-comment')
  .addEventListener('submit', commentFormHandler);