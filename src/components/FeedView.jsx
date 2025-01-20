import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import HeaderBar from "./HeaderBar";
import SocialPost from "./Post";
import ApiService from '../logic/apiService';
import {Post} from '../logic/collections';



export default function FeedView() {
    const apiService = ApiService;
    const [feed, setFeed] = useState([]);
    useEffect(function getFreshFeed() {
      try {
        const fetchedPosts = [];
        apiService.doRequestJson('/posts', 'GET').then(data => {  
            data.forEach(post => {
              fetchedPosts.push(new Post(post.id, post.timestamp, post.username, post.byUser, post.avatar, post.image, post.caption, post.comments))
              })
            setFeed(fetchedPosts)
        })
      }
      catch (error) {
        console.log(error)
      }
    }, [apiService]) 
    
    const returnFeed = feed.map((post) => (
      <SocialPost key={post.id} post={post}/>  
    )).reverse();
    

    return (
      <div className="bg-gray-100 min-h-screen">
        <HeaderBar ClassName={"fixed"} title="Feed"/>
      
        <div className="pt-16 pb-16 mx-auto max-w-md">
          {/* Feed-Posts */}
          <div className="space-y-4">
            {returnFeed}
          </div>

          {/* Navbar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-3 flex justify-around items-center z-50">
            <Navbar />
          </div>
        </div>
      </div>
    );
  }
