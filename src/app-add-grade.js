import React from 'react';
import {connect} from "react-redux";

let nextGradeId = 0;
const addStudentGrade = (indexNumber, grade) => {
    return {
        type: 'ADD_GRADE',
        id: nextGradeId++,
        indexNumber,
        grade
    };
};

//TODO: check if index not empty
//TODO: check if grade is valid
//TODO: C - component
//TODO: CC - connected component
let AddStudentGradeC = ({ dispatch }) => {
    let inputIndexNumber;
    let inputGrade;

    return (
        <div>
            <input ref={node => {inputIndexNumber = node;}} />
            <input ref={node => {inputGrade = node;}} />
            <button onClick={() => {
                dispatch(addStudentGrade(inputIndexNumber.value, inputGrade.value));
                inputIndexNumber.value='';
                inputGrade.value='';
            }}>
                Add Student Grade
            </button>
        </div>
    );
};

export const AddStudentGradeCC = connect()(AddStudentGradeC);