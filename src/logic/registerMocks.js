import Avatar1 from "../assets/images/avatar-1.jpg";
import feedImage1 from "../assets/images/stairs-1.jpg";
import feedImage2 from "../assets/images/stairs-2.jpg";
import maxImage from '../assets/images/MaxRückwarts.webp';
import hansImage from '../assets/images/HansGuteHaltung.webp';
import sabineImage from '../assets/images/SabineCountingStairs.webp';
import peterZugig from '../assets/images/PeterZugig.webp';
import extremDead from '../assets/images/BrutalDead.webp';
import lisaQuiet from '../assets/images/LisaQuiet.webp';
import extremSafe from '../assets/images/ExtremSafe.webp';

export interface Post {
    id: string,
    username: string,
    byUser: string,
    avatar: URL,
    image: URL,
    caption: string,
    // eslint-disable-next-line no-use-before-define
    comments: Comment[]
}

export interface Comment {
    id: string,
    username: string,
    text: string
}

export const MOCK_FEED: Post[] = [
    {
        id: 1,
        username: 'Hans',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: hansImage,
        caption: 'Hans hat heute die Treppe mit guter Haltung erklommen! #Gesund #Rückrat #HandlaufBenutzt',
        comments: [
            {id: 1, username: 'Fred', text: 'Ich sehe da keine richtige Sicherheit Hans mit Handlauf ;('},
            {id: 2, username: 'Leo', text: 'Perfekte Haltung, Hans! Da merkt man deine stabile Figur'},
        ],
    },
    {
        id: 2,
        username: 'Peter',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: peterZugig,
        caption: 'Peter hat es geschafft, die Treppe ohne Pause zu nehmen. Sogar ab der Mitte sicherer als auf diesem Bild o_O #GefährlicherStart',
        comments: [
            {id: 1, username: 'Jürgen', text: 'Beeindruckend, Peter!'}
        ],
    },
    {
        id: 3,
        username: 'Maria',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'Maria hat auf jeder Stufe ihr Tempo gehalten – gleichmäßig und ruhig! #AufmerksamGewesen #HandyWeggesteckt',
        comments: [
            {id: 1, username: 'Sophie', text: 'Maria, das ist echte Konzentration!'},
            {id: 2, username: 'Lukas', text: 'Perfekte Balance, Maria!'},
        ],
    },
    {
        id: 4,
        username: 'Max',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: maxImage,
        caption: 'Max hat die Treppe rückwärts bewältigt – das ist Koordination!',
        comments: [
            {id: 1, username: 'Tina', text: 'Wow, Max – das ist Mut!'},
            {id: 2, username: 'Paul', text: 'Unkonventionell, aber beeindruckend!'},
            {id: 3, username: 'Lucas', text: 'Ihr seid doch gestört! DAS IST NICHT SICHER!'}
        ],
    },
    {
        id: 5,
        username: 'Lisa',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: lisaQuiet,
        caption: 'Lisa hat heute die Treppen extra leise genommen. Rücksichtsvoll! #AufmerksamGewesen #Ninja',
        comments: [
            {id: 1, username: 'Mara', text: 'Danke für deine Rücksicht, Lisa!'},
            {id: 2, username: 'Tom', text: 'Kaum gehört – toll!'},
        ],
    },
    {
        id: 6,
        username: 'Klaus',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'Klaus hat heute jede zweite Stufe genommen – was für ein Sprung! #GegenDasSystem',
        comments: [
            {id: 1, username: 'Ben', text: 'Energie pur, Klaus!'},
            {id: 2, username: 'Susi', text: 'Sportlich unterwegs!'},
        ],
    },
    {
        id: 7,
        username: 'Sabine',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: sabineImage,
        caption: 'Sabine hat jede Stufe gezählt. Ein Zeichen der Achtsamkeit! #AufmerksamGewesen',
        comments: [
            {id: 1, username: 'Martin', text: 'So fokussiert – das ist toll!'},
            {id: 2, username: 'Clara', text: 'Ein Schritt nach dem anderen – super, Sabine!'},
        ],
    },
    {
        id: 8,
        username: 'Lena',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: extremSafe,
        caption: 'Lena war die einzige die wirklich auf sich achtet! #AufmerksamGewesen #LangsamGelaufen #HandyWeggesteckt #HandlaufBenutzt',
        comments: [
            {id: 1, username: 'Anna', text: 'Top Leistung, Lena!'},
            {id: 2, username: 'Tom', text: 'Du bist das Vorbild für uns alle!'},
        ],
    },

    {
        id: 9,
        username: 'Erik',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: extremDead,
        caption: 'Erik ist die Treppe hinaufgegangen, ohne das Geländer anzufassen! #GegenDasSystem #Krankenhaus',
        comments: [
            {id: 1, username: 'Hannah', text: 'Oh nein Erik, was passiert dir denn da'},
            {id: 2, username: 'Leo', text: 'Das ist gefährlich Erik!'},
        ],
    },
    {
        id: 10,
        username: 'Marco',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'Marco ist die Treppe rückwärts gegangen – das nenne ich Geschick! #GegenDasSystem',
        comments: [
            {id: 1, username: 'Jana', text: 'Mutig, Marco!'},
            {id: 2, username: 'Tim', text: 'Wow, beeindruckend!'},
        ],
    },
    {
        id: 11,
        username: 'Sarah',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'Sarah hat heute jede zweite Stufe ausgelassen! #GegenDasSystem',
        comments: [
            {id: 1, username: 'Klara', text: 'Du springst wie ein Reh, Sarah!'},
            {id: 2, username: 'Paul', text: 'Sportlich, sportlich!'},
        ],
    },
    {
        id: 12,
        username: 'Tobias',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'Tobias hat seinen Kollegen geholfen, die Treppe sicher zu nehmen.',
        comments: [
            {id: 1, username: 'Lisa', text: 'Tolle Unterstützung, Tobias!'},
            {id: 2, username: 'Max', text: 'Ein echter Teamplayer!'},
        ],
    },
    {
        id: 13,
        username: 'Anna',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'Anna hat heute besonders leise die Treppe genommen.',
        comments: [
            {id: 1, username: 'Mia', text: 'So viel Rücksicht, Anna!'},
            {id: 2, username: 'Lukas', text: 'Das ist echt cool!'},
        ],
    },
    {
        id: 14,
        username: 'Jörg',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: feedImage2,
        caption: 'Jörg ist heute die Treppe im Dauerlauf hinauf!',
        comments: [
            {id: 1, username: 'Dennis', text: 'Wow, das ist Energie!'},
            {id: 2, username: 'Sara', text: 'Mega Leistung, Jörg!'},
        ],
    },
    {
        id: 15,
        username: 'Carla',
        byUser: 'Anonymous',
        avatar: Avatar1,
        image: feedImage1,
        caption: 'Carla hat jede Stufe genau gezählt. Konzentration pur!',
        comments: [
            {id: 1, username: 'Ronja', text: 'Tolle Fokussierung!'},
            {id: 2, username: 'Ben', text: 'Perfekte Achtsamkeit, Carla!'},
        ],
    }
];
