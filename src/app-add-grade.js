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
        <form className={'form-inline'}>
            <label>Index Number:</label>
            <input
                className={'form-control col-md-2'}
                placeholder={'Type index number'}
                ref={node => {inputIndexNumber = node;}} />
            <span className={'col-md-1'}> </span>
            <label>Grade:</label>
            <input
                className={'form-control col-md-2'}
                placeholder={'Type grade'}
                ref={node => {inputGrade = node;}} />
            <span className={'col-md-1'}> </span>
            <button
                className={'btn btn-success'}
                onClick={() => {
                dispatch(addStudentGrade(inputIndexNumber.value, inputGrade.value));
                inputIndexNumber.value='';
                inputGrade.value='';
            }}>
                Add Student Grade
            </button>
        </form>
    );
};

export const AddStudentGradeCC = connect()(AddStudentGradeC);