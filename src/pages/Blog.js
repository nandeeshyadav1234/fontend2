// src/components/Blog.js
import React from 'react';
const blogData = [
    {
      id: 1,
      title: 'Exploring the Mountains',
      date: 'October 10, 2024',
      image: '/images/staff-1.jpg', // Ensure to have an image in the public/images folder
      description: 'Join us as we explore the stunning mountain ranges across the globe.',
    },
    {
      id: 2,
      title: 'A Journey through the Forest',
      date: 'October 15, 2024',
      image: '/images/staff-2.jpg',
      description: 'Experience the tranquility of the forest and its diverse wildlife.',
    },
    {
      id: 3,
      title: 'Seaside Adventures',
      date: 'October 20, 2024',
      image: '/images/staff-3.jpg',
      description: 'Discover the beauty of the seaside and the adventures it offers.',
    }
  ];
const Blog = () => {
  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="text-center">Recent Blog Posts</h2>
        <div className="row">
          {blogData.map((post) => (
            <div className="col-md-4 mb-4" key={post.id}>
              <div className="card">
                <img src={post.image} alt={post.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <p className="text-muted">{post.date}</p>
                  <a href="#" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
