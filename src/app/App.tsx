import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import ReactDOM from "react-dom";
import React from "react";
import Example from "./Example"

type Card = {
    id: number;
    cwd: string;
    input: string;
    output: string;
};
// let cards: Array<Card> = [{id: 0, cwd: "", input: "", output: ""}];

// createCard().then((card) => {
//     cards.push(card);
//     cards = cards; // seems like this is necessary to trigger a re-render. TODO: find out why
// });

export default function () {

    const [cards, setCards] = useState<Card[]>([]);
    const [count, setCount] = useState(0);

    return (
        <main>
            <h1 className="bg-blue-100 text-blue-700 text-2xl text-center">Hello world!</h1>
            <button 
            onClick={() => {
                let newCard = {id: cards.length, cwd: "", input: "", output: ""}; 
                setCards([...cards, newCard]);
            }}
            className="border m-2 px-1 bg-solarized-red rounded-md">
                Add Card
            </button>

            <button 
            // onClick={() => {setCount(count + 2);}}
            onClick={() => setCount((count) => count + 1)}
            className="border m-2 px-1 bg-solarized-red rounded-md">
                Increment
            </button>

            <div>Count: {count}</div>
            <Cards cards={cards} count={count}/>
            <Example/>
        </main>
    );
};

function Cards(props) {
    return (
        <div>
            <div>prop count: {props.count}</div>
               {props.cards.map((card: Card) => (
                 <div key={card.id}>Card {card.id}</div>
             ))}
             
        </div>
    );
}

// class Cards extends React.Component {
//     render() {
//         return (
//             <div>
//               <h1>Hello, world!</h1>
//               {this.props.cards.map((card) => (
//                 <div key={card.id}>A card</div>
//             ))}
//             </div>
//           );
//     }
// }