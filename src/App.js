import "./App.css";
import React, { useState } from "react";


function Current(game, { changeScore }, highest) {
    const games = [Plus, Minus, Multiple, Divide];

    if (game === "plus") {
        return games[0]({ changeScore }, highest);
    } else if (game === "minus") {
        return games[1]({ changeScore }, highest);
    } else if (game === "multi") {
        return games[2]({ changeScore }, highest);
    } else if (game === "divide") {
        return games[3]({ changeScore }, highest);
    } else if (game === 'random') {
        return games[Math.floor(Math.random() * games.length)]({ changeScore }, highest);
    } else {
        return null;
    }
}

function Menu({ handleClick }) {
    return (
        <div class="dropdown">
        <button class="dropbtn">תרגילים</button>
            <div className="dropdown-content" dir="rtl">
                <button className="button" onClick={(event) => handleClick("plus")}>
                    {" "}
                    a + b{" "}
                </button>
                <button className="button" onClick={(event) => handleClick("minus")}>
                    {" "}
                    a - b{" "}
                </button>
                <button className="button" onClick={(event) => handleClick("multi")}>
                    {" "}
                    a x b{" "}
                </button>
                <button className="button" onClick={(event) => handleClick("divide")}>
                    {" "}
                    a : b{" "}
                </button>
                <button className="button" onClick={(event) => handleClick("random")}>
                    {" "}
                    אקראי{" "}
                </button>
            </div>
        </div>
    );
}

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ""
        };
    }

    handleAnswer = (event) => {
        if (event.charCode === 13) { this.result(event) }
        else {
            this.setState({
                answer: event.target.value
            });
        }
    };

        result = (event) => {
            (this.props.c === Number(this.state.answer))
                ? this.TrueAnswer(event)
                : this.FalseAnswer(event)
        };

        clearAnswerField = () => {
            this.setState({
                answer: ""
            });
        };

        TrueAnswer = event => {
            alert("צדקת!");
            this.clearAnswerField();
            this.props.changeScore(1);
        };

        FalseAnswer = event => {
            alert("טעות. התשובה הנכונה היא " + this.props.c);
            this.clearAnswerField();
            this.props.changeScore(-1);
        };

        render() {
            return (
                <div>
                    <label>
                        {" "}
                        {this.props.a} {this.props.sign} {this.props.b} ={""}
                    </label>
                    <input
                        name="c"
                        type="number"
                        value={this.state.answer}
                        onChange={this.handleAnswer}
                        onKeyPress={this.handleAnswer}

                    />
                    <br /> <br />
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


function Plus({ changeScore }, highest) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    var sign = "+";
    var c = a + b;

    return <Exercise a={a} b={b} sign={sign} c={c} changeScore={changeScore} />;
}


function Minus({ changeScore }, highest) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * a);
    var c = a - b;
    var sign = "-";

    return <Exercise a={a} b={b} sign={sign} c={c} changeScore={changeScore} />;
}

function Multiple({ changeScore }, highest) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    var sign = "X";
    var c = a * b;

    return <Exercise a={a} b={b} sign={sign} c={c} changeScore={changeScore} />;
}


function Divide({ changeScore }, highest) {
    var a = Math.floor(Math.random() * highest) + 1;
    let range_a = [...Array(a).keys()].map(i => i + 1);
    let b_list = range_a.filter(i => (a % i === 0));
    var b = b_list[Math.floor(Math.random() * b_list.length)];
    var sign = "/";
    var c = a / b;
    return <Exercise a={a} b={b} sign={sign} c={c} changeScore={changeScore} />;
}

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

    const handleClick = (name) => {
        setGame(current => name);
    };

    const [score, setScore] = useState(0);
    const [highest, setHighest] = useState(10);
    const [level, setLevel] = useState(1);

    const changeScore = (num) => {
        setScore(current => current + num);
        setHighest(current => Highest(level));
        setLevel(current => LevelUp(score));
        };
    

    return (
        <div className="App">
            <header className="App-header">
                <h1>פתורותי</h1>
                <Menu handleClick={handleClick} />
                <p> שלב: {level} </p>
                <p> נקודות: {score} </p>
            </header>
            <br /> <br />
            <div className="Game-zone" >
                {Current(game, { changeScore }, highest)}
            </div>
        </div>
    );
}
export default App;


/* TODO: 

# make the hole thing preetier;
*/

/* TODO: 

# make the hole thing preetier;
# add enterkey to check
# yes/no popup
# save score
#make the input bigger

demonstration for each game

let images = {
Ball: './'
}
let Count = (highest) => {

}

User-Information = {

}
Add-d () {}
*/