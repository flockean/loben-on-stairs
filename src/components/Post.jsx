import React, {useEffect, useState} from 'react';
import {Flag, Send, User} from 'lucide-react';
import UserService from "../logic/userService"
import ApiService from '../logic/apiService';
import { v4 as uuidv4 } from 'uuid';
import {Post} from '../logic/collections';




const SocialPost = ({ post }) => {
    const userService = UserService;
    const apiService = ApiService;

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (post && post.comments) {
            setComments(post.comments);
        }
    }, [post]);

    const handleReport = () => {
        alert(`Der Post mit der ID: ${post.id} mit seinen Kommentaren wurde gemeldet und wird vom Support überprüft.`)
    }

    function handleCaption(caption) {
        try {
            const hashtagRegex = /#(\w+)/g;
            // Teile den Text in Wörter und prüfe jedes Wort auf einen Hashtag
            const words = caption.split(' ');
            return words.map(word => {
                if (word.match(hashtagRegex)) {
                    // Wenn es ein Hashtag ist, gib ein JSX-Element zurück
                    return <span key={word} className="text-blue-500 underline">{word} </span>;
                } else {
                    // Ansonsten gib das Wort als Text zurück
                    return word + " ";
                }
            });
        } catch (error) {
            console.log(error);
            return caption;
    }}

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const newCommentObj = {
            id: uuidv4(),
            commentTimestamp: new Date().toISOString(),
            commentWriter: userService.getCurrentUser().name,
            comment: newComment.trim(),
        };
        const updatedPost = new Post(post.id, post.timestamp, post.username, post.byUser, post.avatar, post.image, post.caption, post.comments);
        updatedPost.comments.push(newCommentObj);
        setComments(updatedPost.comments);
        apiService.doRequestJson(`/post/${post.id}`, 'PUT', updatedPost).then((feedPost) => {
            setComments(feedPost.comments);
            setNewComment('');})
            .catch((error) => {
                console.error(error);
                alert('Fehler beim Kommentieren des Posts');
            }
        );
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-4">
            <div className="flex items-center space-x-4 p-4 border-b">
                <User
                    alt={post.username}
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                    <p className="text-m font-bold">{post.username} wurde von {post.byUser} gelobt</p>
                </div>
                <button onClick={handleReport} className="text-gray-500 hover:text-gray-700">
                    <Flag className="h-4 w-4"/>
                </button>
            </div>
            <div className="p-0">
                <img
                    src={post.image.toString()}
                    alt="Post image"
                    className="w-full object-cover"
                />
                <p className="p-2 text-sm">{handleCaption(post.caption)}</p>
            </div>
            <div className="flex flex-col gap-4 p-2 border-t">
                <div className="w-full space-y-2">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex flex-wrap gap-2 text-sm">
                            <span className="font-medium">{comment.commentWriter}:</span>
                            <span>{comment.comment}</span>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmitComment} className="flex w-full gap-2">
                    <input
                        type="text"
                        placeholder="Schreibe einen Kommentar..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Senden</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SocialPost;
