const editFormHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#post-id').value.trim();
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (id && title && content) {
    const response = await fetch(`/api/posts/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard/:id');
    } else {
      alert('Failed to update post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard/:id');
    } else {
      console.log(id)
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.update-form')
  .addEventListener('submit', editFormHandler);

document
  .querySelector('.delete-post')
  .addEventListener('click', delButtonHandler);
