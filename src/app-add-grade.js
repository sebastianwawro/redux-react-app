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
const AddStudentGradeC = ({ dispatch }) => {
    let inputIndexNumber;
    let inputGrade;

    return (
        <form className={'form-inline'}>
            <label>Index Number:</label>
            <input
                className={'form-control'}
                placeholder={'Type index number'}
                ref={node => {inputIndexNumber = node;}} />
            <span className={'col-sm-1'}> </span>
            <label>Grade:</label>
            <select
                className={'form-control'}
                ref={node => {inputGrade = node;}}>
                <option value={'0'}>Select Grade</option>
                <option value={'2'}>2</option>
                <option value={'2+'}>2+</option>
                <option value={'3'}>3</option>
                <option value={'3+'}>3+</option>
                <option value={'4'}>4</option>
                <option value={'4+'}>4+</option>
                <option value={'5'}>5</option>
            </select>
            <span className={'col-sm-1'}> </span>
            <button
                type={'button'}
                className={'btn btn-success'}
                onClick={() => {
                    if (inputIndexNumber.value.length !== 6) {
                        alert('Student Index Number must have exactly 6 digits!');
                    }
                    else if (isNaN(inputIndexNumber.value)) {
                        alert('Student Index Number must be a number!');
                    }
                    else {
                        dispatch(addStudentGrade(inputIndexNumber.value, inputGrade.value));
                        inputIndexNumber.value='';
                        inputGrade.value='0';
                    }
            }}>
                Add Student Grade
            </button>
        </form>
    );
};

export const AddStudentGradeCC = connect()(AddStudentGradeC);