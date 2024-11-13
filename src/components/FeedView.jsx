import React, {useState} from 'react';
import Navbar from './Navbar';
import {MOCK_FEED} from "../logic/registerMocks";
import HeaderBar from "./HeaderBar";
import SocialPost from "./Post";


export default function FeedView() {
    const [feed] = useState(MOCK_FEED);

    return (
      <div className="bg-gray-100 min-h-screen">
        <HeaderBar ClassName={"fixed"} title="Feed"/>

        <div className="pt-16 pb-16 mx-auto max-w-md">
          {/* Feed-Posts */}
          {feed.slice().reverse().map((post) => (
              <SocialPost className="gap-4" post={post}/>
          ))}

          {/* Navbar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-3 flex justify-around items-center z-50">
            <Navbar />
          </div>
        </div>
      </div>
    );
  }
