import React, {useState} from 'react';
import Navbar from './Navbar';
import {FaComment, FaExclamationTriangle} from 'react-icons/fa';
import {MOCK_FEED} from "../logic/registerMocks";


export default function FeedView() {
    const [feed, setFeed] = useState(MOCK_FEED);
    const [newComments, setNewComments] = useState({});

    const handleAddComment = (postId) => {
      if (newComments[postId]?.trim()) {
        const updatedFeed = feed.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, { id: post.comments.length + 1, username: 'Olaf', text: newComments[postId] }]
            };
          }
          return post;
        });
        setFeed(updatedFeed);
        setNewComments(prev => ({ ...prev, [postId]: '' }));
      }
    };

    const handleCommentChange = (postId, value) => {
      setNewComments(prev => ({ ...prev, [postId]: value }));
    };

    const handleReportPost = (postId) => {
      alert(`Post ${postId} wurde gemeldet.`);
    };

    return (
      <div className="bg-gray-100 min-h-screen">

        {/* Lila Header-Leiste */}
        <div className="fixed top-0 left-0 right-0 h-12 bg-purple-600 text-white flex justify-center items-center font-bold z-50">
          Feed
        </div>

        <div className="pt-16 pb-16 mx-auto max-w-md">
          {/* Feed-Posts */}
          {feed.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md mb-4 p-4">

              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
                  <span className="font-bold">{post.username} wurde von Fred gelobt</span>
                </div>

                {/* Melden-Button (Warnsymbol) */}
                <button onClick={() => handleReportPost(post.id)} className="text-red-500 text-xl">
                  <FaExclamationTriangle />
                </button>
              </div>

              {/* Post Image */}
              <div className="mt-4">
                <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-lg"/>
              </div>

              {/* Caption */}
              <div className="mt-2 text-sm text-gray-700">
                <strong>{post.username}</strong> {post.caption}
              </div>

              {/* Comments & Kommentar Icon */}
              <div className="mt-4 flex justify-between items-center">
                <div>
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="text-sm text-gray-600 mb-1">
                      <strong>{comment.username}</strong> {comment.text}
                    </div>
                  ))}
                </div>

                {/* Kommentar Icon */}
                <FaComment className="text-purple-600 text-xl" />
              </div>

              {/* Kommentar-Eingabefeld für den jeweiligen Post */}
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Schreibe einen Kommentar..."
                  value={newComments[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-500"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  Senden
                </button>
              </div>
            </div>
          ))}

          {/* Navbar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-3 flex justify-around items-center z-50">
            <Navbar />
          </div>
        </div>
      </div>
    );
  }
