// JavaScript source code

import React from 'react';


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
                    onChange={this.handleAnswer}
                    onKeyPress={this.handleAnswer}
                />
                <br />
                <br />
                <button
                    className="check button"
                    onClick={this.result}
                >
                    check
                </button>

            </div>
        );
    }
}

function Solver(exercise) {
    let a = String(exercise[0]);
    let b = String(exercise[2]);
    let answer = eval([a, exercise[1], b].join(''));
    return answer;
}


function Random(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    let signs = ["+", "-", "X", ":"];
    var exercise = [a, signs[0], b];

    var c = Solver(exercise);

    return <Exercise exercise={exercise} c={c} handleResult={handleResult} />;
}


function Plus(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    let sign = '+';
    var c = a+b;

    var exercise = [a,' ' ,sign,' ', b];


    return <Exercise exercise={exercise} c={c} handleResult={handleResult} />;
}



function Minus(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * a);
    var c = a - b;
    var sign = "-";
    let exercise = [a, sign,b]

    return <Exercise exercise={exercise} c={c} handleResult={handleResult} />;
}

function Multiple(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    var sign = "X";
    var c = a * b;
    let exercise = [a, sign, b]

    return <Exercise exercise={exercise} c={c } handleResult={handleResult} />;
}


function Divide(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest) + 1;
    let range_a = [...Array(a).keys()].map(i => i + 1);
    let b_list = range_a.filter(i => (a % i === 0));
    var b = b_list[Math.floor(Math.random() * b_list.length)];
    var sign = ":";
    var c = a / b;
    let exercise = [a, sign, b]

    return <Exercise exercise={exercise} c={c} handleResult={handleResult} />;
}
const games = {
    "plus": Plus,
    "minus": Minus,
    "multi": Multiple,
    "divide": Divide,
    "random": Random
};
export default games;
