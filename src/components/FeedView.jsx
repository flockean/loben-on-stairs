import React, { useState } from 'react';
import Navbar from './Navbar';
import Avatar1 from '../assets/images/avatar-1.jpg';
import feedImage1 from '../assets/images/stairs-1.jpg';
import feedImage2 from '../assets/images/stairs-2.jpg';
import { FaExclamationTriangle, FaComment} from 'react-icons/fa';
import HeaderBar from "./HeaderBar";

const MOCK_FEED = [
    {
      id: 1,
      username: 'Hans',
      avatar: Avatar1,
      image: feedImage1,
      caption: 'hat heute die Treppe mit guter Haltung erklommen!',
      comments: [
        { id: 1, username: 'Fred', text: 'Das Rückgrat bleibt gesund – weiter so, Hans!' },
        { id: 2, username: 'Leo', text: 'Perfekte Haltung, Hans! Das motiviert.' },
      ],
    },
    {
      id: 2,
      username: 'Peter',
      avatar: Avatar1,
      image: feedImage2,
      caption: 'hat es geschafft, die Treppe ohne Pause zu nehmen.',
      comments: [
        { id: 1, username: 'Jürgen', text: 'Beeindruckend, Peter!' },
        { id: 2, username: 'Simon', text: 'Das nenne ich Ausdauer!' },
      ],
    },
    {
      id: 3,
      username: 'Maria',
      avatar: Avatar1,
      image: feedImage1,
      caption: 'hat auf jeder Stufe ihr Tempo gehalten – gleichmäßig und ruhig!',
      comments: [
        { id: 1, username: 'Sophie', text: 'Maria, das ist echte Konzentration!' },
        { id: 2, username: 'Lukas', text: 'Perfekte Balance, Maria!' },
      ],
    },
    {
      id: 4,
      username: 'Max',
      avatar: Avatar1,
      image: feedImage2,
      caption: 'hat die Treppe rückwärts bewältigt – das ist Koordination!',
      comments: [
        { id: 1, username: 'Tina', text: 'Wow, Max – das ist Mut!' },
        { id: 2, username: 'Paul', text: 'Unkonventionell, aber beeindruckend!' },
      ],
    },
    {
      id: 5,
      username: 'Lisa',
      avatar: Avatar1,
      image: feedImage1,
      caption: 'hat heute die Treppen extra leise genommen. Rücksichtsvoll!',
      comments: [
        { id: 1, username: 'Mara', text: 'Danke für deine Rücksicht, Lisa!' },
        { id: 2, username: 'Tom', text: 'Kaum gehört – toll!' },
      ],
    },
    {
      id: 6,
      username: 'Klaus',
      avatar: Avatar1,
      image: feedImage2,
      caption: 'hat heute jede zweite Stufe genommen – was für ein Sprung!',
      comments: [
        { id: 1, username: 'Ben', text: 'Energie pur, Klaus!' },
        { id: 2, username: 'Susi', text: 'Sportlich unterwegs!' },
      ],
    },
    {
      id: 7,
      username: 'Sabine',
      avatar: Avatar1,
      image: feedImage1,
      caption: 'hat jede Stufe gezählt. Ein Zeichen der Achtsamkeit!',
      comments: [
        { id: 1, username: 'Martin', text: 'So fokussiert – das ist toll!' },
        { id: 2, username: 'Clara', text: 'Ein Schritt nach dem anderen – super, Sabine!' },
      ],
    },
    {
        id: 8,
        username: 'Lena',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'hat heute zwei Stockwerke ohne Pause geschafft!',
        comments: [
          { id: 1, username: 'Anna', text: 'Top Leistung, Lena!' },
          { id: 2, username: 'Tom', text: 'Das ist Ausdauer pur!' },
        ],
      },
      {
        id: 9,
        username: 'Marco',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'ist die Treppe rückwärts gegangen – das nenne ich Geschick!',
        comments: [
          { id: 1, username: 'Jana', text: 'Mutig, Marco!' },
          { id: 2, username: 'Tim', text: 'Wow, beeindruckend!' },
        ],
      },
      {
        id: 10,
        username: 'Sarah',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'hat heute jede zweite Stufe ausgelassen!',
        comments: [
          { id: 1, username: 'Klara', text: 'Du springst wie ein Reh, Sarah!' },
          { id: 2, username: 'Paul', text: 'Sportlich, sportlich!' },
        ],
      },
      {
        id: 11,
        username: 'Tobias',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'Tobias hat seinen Kollegen geholfen, die Treppe sicher zu nehmen.',
        comments: [
          { id: 1, username: 'Lisa', text: 'Tolle Unterstützung, Tobias!' },
          { id: 2, username: 'Max', text: 'Ein echter Teamplayer!' },
        ],
      },
      {
        id: 12,
        username: 'Anna',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'hat heute besonders leise die Treppe genommen.',
        comments: [
          { id: 1, username: 'Mia', text: 'So viel Rücksicht, Anna!' },
          { id: 2, username: 'Lukas', text: 'Das ist echt cool!' },
        ],
      },
      {
        id: 13,
        username: 'Jörg',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'ist heute die Treppe im Dauerlauf hinauf!',
        comments: [
          { id: 1, username: 'Dennis', text: 'Wow, das ist Energie!' },
          { id: 2, username: 'Sara', text: 'Mega Leistung, Jörg!' },
        ],
      },
      {
        id: 14,
        username: 'Carla',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'hat jede Stufe genau gezählt. Konzentration pur!',
        comments: [
          { id: 1, username: 'Ronja', text: 'Tolle Fokussierung!' },
          { id: 2, username: 'Ben', text: 'Perfekte Achtsamkeit, Carla!' },
        ],
      },
      {
        id: 15,
        username: 'Frank',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'hat die Treppe im langsamen, gleichmäßigen Tempo genommen.',
        comments: [
          { id: 1, username: 'Susi', text: 'Genau richtig für die Gelenke!' },
          { id: 2, username: 'Tom', text: 'Vorbildlich, Frank!' },
        ],
      },
      {
        id: 16,
        username: 'Lara',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'hat heute beim Treppensteigen gelächelt!',
        comments: [
          { id: 1, username: 'Nina', text: 'Das macht allen den Tag besser!' },
          { id: 2, username: 'Jan', text: 'Positive Energie, Lara!' },
        ],
      },
      {
        id: 17,
        username: 'Erik',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'ist die Treppe hinaufgegangen, ohne das Geländer anzufassen!',
        comments: [
          { id: 1, username: 'Hannah', text: 'Was für ein Gleichgewichtssinn!' },
          { id: 2, username: 'Leo', text: 'Beeindruckend, Erik!' },
        ],
      },
      {
        id: 18,
        username: 'Julia',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'hat auf jeder Treppenstufe kurz innegehalten.',
        comments: [
          { id: 1, username: 'Paul', text: 'Achtsamkeit pur!' },
          { id: 2, username: 'Lisa', text: 'Das ist innere Ruhe, Julia!' },
        ],
      },
      {
        id: 19,
        username: 'Philipp',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'Philipp hat heute die Treppe zwei Stufen auf einmal genommen.',
        comments: [
          { id: 1, username: 'Max', text: 'So viel Energie, Philipp!' },
          { id: 2, username: 'Mira', text: 'Starke Leistung!' },
        ],
      },
      {
        id: 20,
        username: 'Tina',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'hat es geschafft, die Treppe im Zickzack zu nehmen!',
        comments: [
          { id: 1, username: 'Sina', text: 'Das erfordert Koordination!' },
          { id: 2, username: 'Lukas', text: 'Kreativ, Tina!' },
        ],
      },
      {
        id: 21,
        username: 'Sebastian',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'hat heute die Treppe besonders zügig erklommen!',
        comments: [
          { id: 1, username: 'Anna', text: 'Super Geschwindigkeit!' },
          { id: 2, username: 'Markus', text: 'Respekt, Sebastian!' },
        ],
      },
      {
        id: 22,
        username: 'Sven',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'ist die Treppe mit schwerem Rucksack gestiegen. Respekt!',
        comments: [
          { id: 1, username: 'Paul', text: 'Ganz schön anstrengend, Sven!' },
          { id: 2, username: 'Maria', text: 'Tolles Training!' },
        ],
      },
      {
        id: 23,
        username: 'Nina',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'hat heute ihren Kollegen zum Treppensteigen motiviert!',
        comments: [
          { id: 1, username: 'Mara', text: 'Was für ein Teamgeist!' },
          { id: 2, username: 'Oliver', text: 'Große Klasse, Nina!' },
        ],
      },
      {
        id: 24,
        username: 'Oliver',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'hat jede Stufe mit Bedacht genommen. Vorbildlich!',
        comments: [
          { id: 1, username: 'Mona', text: 'Achtsamkeit pur!' },
          { id: 2, username: 'Lara', text: 'Perfekte Technik!' },
        ],
      },
      {
        id: 25,
        username: 'Linda',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'hat sich für jede Etage ein Ziel gesetzt!',
        comments: [
          { id: 1, username: 'Ella', text: 'Das ist Motivation!' },
          { id: 2, username: 'Karl', text: 'Tolle Idee, Linda!' },
        ],
      },
      {
        id: 26,
        username: 'Kurt',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'hat bei jedem Stockwerk einmal tief durchgeatmet.',
        comments: [
          { id: 1, username: 'Rita', text: 'Richtig gute Atemtechnik!' },
          { id: 2, username: 'Ben', text: 'Das hält fit, Kurt!' },
        ],
      },
      {
        id: 27,
        username: 'Sophia',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'hat die Treppe mit einem fröhlichen Pfeifen erklommen.',
        comments: [
          { id: 1, username: 'Leon', text: 'Musik für die Ohren!' },
          { id: 2, username: 'Eva', text: 'Das macht gute Laune!' },
        ],
      },
];


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
        <HeaderBar style="fixed" title="Feed"/>

        <div className="pt-16 pb-16 mx-auto max-w-md">
          {/* Feed-Posts */}
          {feed.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md mb-4 p-4">

              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
                  <span className="font-bold">{post.username} hat Fred gelobt</span>
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
