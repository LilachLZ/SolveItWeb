//

import './App.css';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Swal from 'sweetalert2'




function Current(game, highest, { handleResult }) {
    const games = {
        "plus": Plus,
        "minus": Minus,
        "multi": Multiple,
        "divide": Divide,
    };

    if (game in games) {
        return games[game](highest, { handleResult });
    } else if (game === 'random') {
        let list_games = ['plus', 'minus', 'multi', 'divide'];
        let random_item = list_games[Math.floor(Math.random() * list_games.length)];
        return games[random_item](highest, { handleResult });
    } else {
        return null;
    }
}


function Menu({ handleClick, resetScore }) {
    return (
        <div class="dropdown">
            <button class="dropbtn"></button>
                <div className="dropdown-content" dir="rtl">
                    <button className="menu-button" onClick={(event) => handleClick("plus")}>
                        {" "}
                        a + b{" "}
                    </button>
                    <button className="menu-button" onClick={(event) => handleClick("minus")}>
                        {" "}
                        a - b{" "}
                    </button>
                    <button className="menu-button" onClick={(event) => handleClick("multi")}>
                        {" "}
                        a x b{" "}
                    </button>
                    <button className="menu-button" onClick={(event) => handleClick("divide")}>
                        {" "}
                        a : b{" "}
                    </button>
                    <button className="menu-button" onClick={(event) => handleClick("random")}>
                        {" "}
                        אקראי{" "}
                </button>
                <Popup trigger={<button className="start-over" >התחלה מחדש</button>}>
                    <div>
                        <p>בטוח? לחיצה על אישור תחזיר אותך לשלב 1 עם 0 נקודות
                        </p>
                        <button onClick={resetScore} >אישור</button>
                    </div>
                    </Popup>
            </div>
        </div>
    );
}

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: "",
        };
    }

    handleAnswer = (event) => {
        if (event.charCode === 13) { this.result() }
        else {
            this.setState({
                answer: event.target.value
            });
        }
    };

    result = () => {
        this.props.handleResult(this.props.c === Number(this.state.answer), this.props.c)
        this.resetAnswerField('');
    };

    resetAnswerField = (response) => {
        this.setState({
            answer: response
        });
    };


    render() {
        return (
            <div>
                <label>
                    {" "}
                    {this.props.a} {this.props.sign} {this.props.b} = {""}
                </label>
                <input
                    name="c"
                    type="number"
                    value={this.state.answer}
                    onChange={this.handleAnswer}
                    onKeyPress={this.handleAnswer}
                />
                <br /> 
                <br />
                <button
                    className="check button"
                    onClick={this.result}
                >
                    בדיקה
                </button>
                
            </div>
        );
    }
    }


function Plus(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    var sign = "+";
    var c = a + b;

    return <Exercise a={a} b={b} sign={sign} c={c} handleResult={handleResult} />;
}


function Minus(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * a);
    var c = a - b;
    var sign = "-";

    return <Exercise a={a} b={b} sign={sign} c={c} handleResult={handleResult} />;
}

function Multiple(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    var sign = "X";
    var c = a * b;

    return <Exercise a={a} b={b} sign={sign} c={c} handleResult={handleResult} />;
}


function Divide(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest) + 1;
    let range_a = [...Array(a).keys()].map(i => i + 1);
    let b_list = range_a.filter(i => (a % i === 0));
    var b = b_list[Math.floor(Math.random() * b_list.length)];
    var sign = "/";
    var c = a / b;
    return <Exercise a={a} b={b} sign={sign} c={c} handleResult={handleResult} />;
}

const TrueAnswer = ({ changeScore }) => {
    Swal.fire({
        title: 'תשובה נכונה!',
        icon: 'success'
        });
    changeScore(1);
};

const FalseAnswer = (true_answer, { changeScore }) => {
    Swal.fire({
        title: 'טעות! התשובה הנכונה היא ' + true_answer,
        icon: 'error'
    })
    changeScore(-1);
};

function LevelUp(score) {
    let level = Math.floor(score / 15) + 1;
    if (level < 1) { return 1 }
    return level
}

function Highest(level) {
    return (level * 5) + 5;
}


function App() {
    const [game, setGame] = useState('random');

    const handleClick = (name) => { setGame(current => name); };

    const handleResult = (result, answer) => {
        result ?
            TrueAnswer({ changeScore })
            : FalseAnswer(answer,{ changeScore })
    };

    const storedValueAsNumber = Number(localStorage.getItem('score'));
    const firstScore = (Number.isInteger(storedValueAsNumber) ? storedValueAsNumber : 0);

    const [score, setScore] = useState(firstScore);
    const [level, setLevel] = useState(LevelUp(score));
    const [highest, setHighest] = useState(Highest(level));

    const changeScore = (num) => {
        setScore(current => current + num);
        setLevel(current => LevelUp(score));
        setHighest(current => Highest(level));
    };

    useEffect(() => {
        localStorage.setItem('score', String(score));
    }, [score]);

    const resetScore = () => {
        setScore(current => 0);
        setLevel(current => 1);
        setHighest(current => 10);
    };


    return (
        <div className="App">
            <div className="user-data" >
                <p> שלב: {level} </p>
                <p> נקודות: {score} </p>
            </div>
            <Menu handleClick={handleClick} resetScore={resetScore} />
            <div className="Game-zone" >
                {Current(game, highest, { handleResult })}
                <br />

            </div>
            
        </div>
    );
}
export default App;



/* TODO: 

demonstration for each game

let images = {
Ball: './'
}

User-Information = {

}
Add-d () {}
*/