import './App.css';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Popup from 'reactjs-popup';


function Solver(exercise) {
    let signs_dict = {
        "X": '*',
        ":": '/'
    };

    let fixed_list = [];
    for (let n of exercise) {
        switch (n) {
            case (Number.isInteger(n)):
                fixed_list.push(String(n));
                break;
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
                break;
        }

    }

    let answer = eval(fixed_list.join(' '));
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
        this.props.handleResult(this.props.c === Number(this.state.answer), this.props.c);
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


function GenerateExercise2(word_sign, highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    let signs = {
        'plus': "+",
        'minus': "-",
        'multi': "X",
        'divide': ":"
    };

    let random_sign = Math.floor(Math.random() * signs.length);
    let sign = '';
    switch (word_sign) {
        case (word_sign in signs):
            sign = signs.keys[word_sign];
            break;
        default:
            sign = signs.keys[random_sign];
            break;
    }
    var exercise = [a, sign, b];

    var c = new Solver(exercise);

    return <Exercise exercise={exercise} c={c} handleResult={handleResult} />
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
                <button className="menu-button" onClick={(event) => handleClick('n_numbers')}> a + b + c </button>
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
                9
                {GenerateExercise2(game, highest, { handleResult })}

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