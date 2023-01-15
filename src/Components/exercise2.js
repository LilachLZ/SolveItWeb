// JavaScript source code

import React from 'react';




let x = (highest) => { Math.floor(Math.random() * highest) };


function MultiNumbersExcercise(highest, { handleResult }) {
    let n = 3;
    let signs = ["+", "-", "X", ":"];
    var exercise = [];
    var len = n + n - 1;
    while (exercise.length < len) {
        switch (exercise.length) {
            case (exercise.length === len - 1):
                exercise.push(new x(highest));
            case (exercise.length % 2 != 0):
                exercise.push(signs[Math.floor(Math.random() * signs.length)]);
            default:
                exercise.push(new x(highest));
        }
    }
    var c = Solver(exercise);

    return <Exercise exercise={exercise} c={c} handleResult={handleResult} />;
}




function Plus(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    let sign = '+';
    var exercise = [a, sign, b];
    var c = Solver(exercise);


    return <Exercise exercise={exercise} c={c} handleResult={handleResult} />;
}



function Minus(highest, bdika, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * a);
    var sign = "-";
    let exercise = [a, sign, b]
    let c = a - b;


    return <Exercise exercise={exercise} c={c} bdika={bdika} handleResult={handleResult} />;
}

function Multiple(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest);
    var b = Math.floor(Math.random() * highest);
    var sign = "X";
    let exercise = [a, sign, b]
    let c = Solver(exercise);

    return <Exercise exercise={exercise} c={c} handleResult={handleResult} />;
}


function Divide(highest, { handleResult }) {
    var a = Math.floor(Math.random() * highest) + 1;
    let range_a = [...Array(a).keys()].map(i => i + 1);
    let b_list = range_a.filter(i => (a % i === 0));
    var b = b_list[Math.floor(Math.random() * b_list.length)];
    var sign = ":";
    let exercise = [a, sign, b]
    let c = Solver(exercise);

    return <Exercise exercise={exercise} c={c} handleResult={handleResult} />;
}

const games = {
    "plus": Plus,
    "minus": Minus,
    "multi": Multiple,
    "divide": Divide,
    "n_numbers": MultiNumbersExcercise,
};

export default games;
