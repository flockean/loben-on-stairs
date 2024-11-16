'use client'

import {useState} from 'react'
import {Upload as UploadIcon, User} from "lucide-react"
import Navbar from "./Navbar";
import Avatar1 from '../assets/images/avatar-1.jpg';
import type {Post} from "../logic/registerMocks";
import {MOCK_FEED} from "../logic/registerMocks";
import HeaderBar from "./HeaderBar";
import {useNavigate} from "react-router-dom";
import {UserService} from "../logic/userService";

// Mock user data
const MOCK_USERS = [
    { id: '1', name: 'Lucas', avatar: Avatar1 },
    { id: '2', name: 'Leo', avatar: Avatar1 },
    { id: '3', name: 'Andi', avatar: Avatar1 },
    { id: '4', name: 'Max', avatar: Avatar1 },
    { id: '5', name: 'Ronny', avatar: Avatar1 },
    { id: '6', name: 'Simon', avatar: Avatar1 },
    { id: '7', name: 'DerWildePeter', avatar: Avatar1 },
    { id: '8', name: 'Olaf', avatar: Avatar1 },
    { id: '9', name: 'HeiligerSprinterX', avatar: Avatar1 },
]

export default function UploadView() {
    const [step, setStep] = useState(1)
    const [selectedUser, setSelectedUser] = useState(null)
    const [caption, setCaption] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [mediaFile, setMediaFile] = useState(null)
    const [options, setOptions] = useState({
        attentive: false,
        slow: false,
        phoneAway: false,
        handrail: false,
    })
    const navigator = useNavigate()
    const userService = new UserService();


    const filteredUsers = MOCK_USERS.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.type.startsWith('image/') || file.type === 'image/gif') {
                setMediaFile(file)
                setStep(4)
            } else {
                alert('Please select an image or GIF file')
            }
        }
    }

    function addNewPostToFeed(newPost: Post) {
        const highestId = MOCK_FEED.reduce((maxId, post) => Math.max(maxId, post.id), 0);
        newPost.id = highestId + 1;
        let myHeaders = new Headers({
            "Content-Type": "application/json",
        });
        try {
            fetch("http://localhost:5000/createPost", {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    id: newPost.id,
                    username: newPost.username,
                    byUser: newPost.byUser,
                    comments: []
                })
            }).then(
                () => {
                    console.log("Post Created")
                }
            )
            fetch("http://localhost:5000/updateUser", {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify({
                    name: userService.getCurrentUser().name,
                    profile: userService.getCurrentUser().profile.lobe + 1
                })
            }).then(
                () => {
                    let currentUser = userService.getCurrentUser()
                    currentUser.profile.lobe++
                    userService.setCurrentUser(currentUser)
                    console.log("Stats Updated")
                }
            )
        } catch (err) {
            console.log(err)
            }
        MOCK_FEED.push(newPost);
    }

    const handleSubmit = async () => {
        var capOpts = ""
        if (options.slow){
            capOpts = capOpts + " #LangsamGelaufen"
        }
        if (options.phoneAway){
            capOpts = capOpts + " #HandyWeggesteckt"
        }
        if (options.handrail){
            capOpts = capOpts + " #HandlaufBenutzt"
        }
        if (options.attentive){
            capOpts = capOpts + " #Aufmerksam"
        }
        var newCaption = caption + capOpts

        let uploadPost: Post = {
            id: 0,
            username: selectedUser.name,
            byUser: userService.getCurrentUser().name,
            avatar: Avatar1,
            image: URL.createObjectURL(mediaFile),
            caption: newCaption,
            comments: []
        }

        addNewPostToFeed(uploadPost)
        navigator("/home")
        // Here you would implement the actual upload logic
        console.log(uploadPost)
        navigator("/home")
    }

    return (
        <div>
            {/* Header */}
            <div className="grid w-full mx-auto bg-white shadow-lg overflow-hidden">
                <HeaderBar title={`Upload ${step}`}/>


                {/* User Selection Bar */}
                <div
                    className="flex items-center gap-2 p-3 border-b cursor-pointer"
                    onClick={() => setStep(2)}
                >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {selectedUser ? (
                            <img src={selectedUser.avatar} alt="" className="w-8 h-8 rounded-full" />
                        ) : (
                            <User className="w-5 h-5 text-gray-500" />
                        )}
                    </div>
                    <span className="text-gray-500">
            {selectedUser ? selectedUser.name : 'Nutzer wählen...'}
          </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4">
                {step === 1 && (
                    <div className="space-y-4">
            <textarea
                className="w-full p-3 border rounded-lg resize-none min-h-[100px]"
                placeholder="Schreib was nettes..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
            />

                        <div className="space-y-2">
                            {[
                                { id: 'attentive', label: 'Aufmerksam gewesen' },
                                { id: 'slow', label: 'Langsam gelaufen' },
                                { id: 'phoneAway', label: 'Handy weggesteckt' },
                                { id: 'handrail', label: 'Handlauf genutzt' },
                            ].map(({ id, label }) => (
                                <label
                                    key={id}
                                    className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={options[id]}
                                        onChange={(e) => setOptions(prev => ({
                                            ...prev,
                                            [id]: e.target.checked
                                        }))}
                                        className="w-5 h-5"
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Suchen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        />

                        <div className="grid grid-cols-3 gap-4">
                            {filteredUsers.map(user => (
                                <button
                                    key={user.id}
                                    className="flex flex-col items-center gap-1 p-2"
                                    onClick={() => {
                                        setSelectedUser(user)
                                        setStep(3)
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
                                    </div>
                                    <span className="text-sm text-center">{user.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*,.gif"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <div className="text-gray-500">Click to upload</div>
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="aspect-video bg-gray-100 rounded-lg"></div>
                            <div className="aspect-video bg-gray-100 rounded-lg"></div>
                            <div className="aspect-video bg-gray-100 rounded-lg"></div>
                            <div className="aspect-video bg-gray-100 rounded-lg"></div>
                        </div>
                    </div>
                )}

                {step === 4 && mediaFile && (
                    <div className="space-y-4">
                        <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img
                                src={URL.createObjectURL(mediaFile)}
                                alt="Upload preview"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="fixed w-full bottom-20">
            <div className="p-4 flex justify-between">
                <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    className="px-4 py-2 border border-black rounded-lg bg-gray-100"
                >
                    Zurück
                </button>
                <button
                    onClick={() => {
                        if (step < 4) setStep(step + 1)
                        else handleSubmit()
                    }}
                    className="px-4 py-2 border border-black rounded-lg bg-gray-100"
                >
                    {step < 4 ? 'Weiter' : 'Post'}
                </button>
            </div>
        </div>
        <Navbar/>
        </div>
    )
}