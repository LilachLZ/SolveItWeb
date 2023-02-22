import './App.css';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Popup from 'reactjs-popup';
import { evaluate } from 'mathjs';


function Solver(exercise) {
    let signs_dict = {
        "X": '*',
        ":": '/'
    };

    let fixed_list = [];
    for (let n of exercise) {
        switch (n) {
            case (n === '+'):
                fixed_list.push(n);
                break;
            case (n === '-'):
                fixed_list.push(n);
                break;
            case (n in signs_dict):
                fixed_list.push(signs_dict.keys[n]);
                break;
            default:
                fixed_list.push(String(n));
        }

    }

    let answer = evaluate(fixed_list.join(''));
    return answer;
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
        this.props.handleResult(Solver(this.props.exercise) === Number(this.state.answer), (Solver(this.props.exercise)));
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
                    {this.props.exercise} = {''}
                </label>
                <input
                    name="answer"
                    type="number"
                    value={this.state.answer}
                    onKeyPress={this.handleAnswer}
                    onChange={this.handleAnswer}
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
    let sign = '+';
    var exercise = [a, sign, b];

    return <Exercise exercise={exercise} handleResult={handleResult} />;
}


function Minus(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * a);
    var sign = "-";
    let exercise = [a, sign, b]

    return <Exercise exercise={exercise} handleResult={handleResult} />;
}


function Multiple(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    var sign = "X";
    let exercise = [a, sign, b]

    return <Exercise exercise={exercise} handleResult={handleResult} />;
}


function Divide(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest) + 1;
    let range_a = [...Array(a).keys()].map(i => i + 1);
    let b_list = range_a.filter(i => (a % i === 0));
    var b = b_list[Math.floor(Math.random() * b_list.length)];
    var sign = ":";
    let exercise = [a, sign, b]

    return <Exercise exercise={exercise} handleResult={handleResult} />;
}


function Current(game, highest, { handleResult }) {
    const games = {
        "plus": Plus,
        "minus": Minus,
        "multi": Multiple,
        "divide": Divide,
    };
    
    if (game in games) { return games[game](highest, { handleResult }) }
    else if (game === 'random') {
        let keys = Object.keys(games);
        const ran = Math.floor(Math.random() * keys.length);
        return games[keys[ran]](highest, { handleResult })
    }
    else { return null }
    ;
}


function Menu({ handleClick, resetScore }) {
    return (
        <div class="dropdown">
            <button class="dropbtn">תפריט</button>
                <div className="dropdown-content" dir="rtl">
                    <button onClick={(event) => handleClick("plus")}>
                        {" "}
                        a + b{" "}
                    </button>
                    <button onClick={(event) => handleClick("minus")}>
                        {" "}
                        a - b{" "}
                    </button>
                    <button onClick={(event) => handleClick("multi")}>
                        {" "}
                        a x b{" "}
                    </button>
                    <button onClick={(event) => handleClick("divide")}>
                        {" "}
                        a : b{" "}
                    </button>
                    <button onClick={(event) => handleClick("random")}>
                        {" "}
                        אקראי{" "}
                </button>
                
            </div>
        </div>
    );
}


const TrueAnswer = ({ changeScore }) => {
    Swal.fire({
        title: 'תשובה נכונה!',
        icon: 'success',
        confirmButtonText: 'תודה'
        });
    changeScore(1);
};

const FalseAnswer = (true_answer, { changeScore }) => {
    Swal.fire({
        title: 'טעות! התשובה הנכונה היא ' + true_answer,
        icon: 'error',
        confirmButtonText: 'המשך'
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
   

function UserInfo({ changeUser }) {
    const { value: username } = Swal.fire({
        input: 'text',
        inputLabel: 'שם',
        inputPlaceholder: 'שם או כינוי',
        confirmButtonText: 'התחלה'
    });
    if (username) {
        changeUser(username);
    }
}


function App() {
    const [game, setGame] = useState('random');
  
    const handleClick = (name) => { setGame(current => name); };

    const [username, setUsername] = useState('');

    const handleResult = (result, answer) => {
        result ?
            TrueAnswer({ changeScore })
            : FalseAnswer(answer,{ changeScore })
    };

    const storedUser = (username) => localStorage.getItem(username);
    const storedValueAsNumber = Number(storedUser[1]);
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
        localStorage.setItem(username, JSON.stringify([username,score]));
    }, [username,score]);

    const changeUser = (username) => {
        storedUser(username);
        setScore(current => Number(storedUser[1]));
        setLevel(current => LevelUp(score));
        setHighest(current => Highest(level));
    };

    return (
        <div className="App">
            <ul className="user-data" >
                <li>{UserInfo({ changeUser })}</li>
                <li> שלב: {level} </li>
                <li> נקודות: {score} </li>
                <Menu handleClick={handleClick} />
            </ul>

            <div className="Game-zone" >
                {Current(game, highest, { handleResult })}

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