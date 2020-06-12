import React from 'react';
import {connect} from "react-redux";

const reviseGrade = (id) => {
    return {
        type: 'REVISE_GRADE',
        id
    };
};

const changeGrade = (id, grade) => {
    return {
        type: 'CHANGE_GRADE',
        id,
        grade
    };
};

const deleteGrade = (id) => {
    return {
        type: 'DELETE_GRADE',
        id
    };
};

let StudentGradesListElement = ({
    onClickReviseMe,
    onClickChangeMe,
    onClickDeleteMe,
    id,
    indexNumber,
    grade,
    isValid
}) => {
    let inputGrade;
    return (
        <tr>
            <td style={{
                textDecoration: isValid ? 'none' : 'line-through'
            }}>{indexNumber}</td>
            <td style={{
                textDecoration: isValid ? 'none' : 'line-through'
            }}>
                <select
                    value={grade}
                    className={'form-control'}
                    placeholder={'Type grade'}
                    ref={node => {inputGrade = node;}}
                    onChange={
                        () => {
                            onClickChangeMe(id, inputGrade.value);
                        }
                    }>
                    <option value={'0'}>Select Grade</option>
                    <option value={'2'}>2</option>
                    <option value={'2+'}>2+</option>
                    <option value={'3'}>3</option>
                    <option value={'3+'}>3+</option>
                    <option value={'4'}>4</option>
                    <option value={'4+'}>4+</option>
                    <option value={'5'}>5</option>
                </select>
            </td>
            <td>
                <span style={{
                    display: isValid ? 'block' : 'none',
                    color: 'blue'
                }}>
                    Valid
                </span>
                <span style={{
                    display: !isValid ? 'block' : 'none',
                    color: 'red'
                }}>
                    Invalid
                </span>
            </td>
            <td>
                <button
                    className={'btn btn-primary'}
                    onClick={() => {
                    onClickReviseMe(id);
                }}>Revise</button>
                {' '}
                <button
                    className={'btn btn-danger'}
                    onClick={() => {
                        onClickDeleteMe(id);
                }}>Delete</button>
            </td>
        </tr>
    );
};


const StudentGradesListC = ({
    studentGrades,
    onClickRevise,
    onClickChange,
    onClickDelete
}) => {

    let helper;
    if (studentGrades) {
        helper = studentGrades.map(studentGrade => {
            return <StudentGradesListElement
                key={studentGrade.id}
                {...studentGrade}
                onClickReviseMe={onClickRevise}
                onClickChangeMe={onClickChange}
                onClickDeleteMe={onClickDelete}
            />;
        });
    }

    if (studentGrades.length > 0) {
        return <table className={'table'}>
            <thead>
            <tr>
                <th>Index Number</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            { helper }
            </tbody>
        </table>
    }
    else {
        return <p>There are no records yet!</p>
    }
};

const getGradesFiltered = (
    studentGrades,
    filter
) => {
    switch (filter) {
        case 'DISPLAY_ALL':
            return studentGrades;
        case 'DISPLAY_VALID':
            return studentGrades.filter(
                g => g.isValid
            );
        case 'DISPLAY_INVALID':
            return studentGrades.filter(
                g => !g.isValid
            );
        case 'DISPLAY_2':
            return studentGrades.filter(
                g => g.isValid && g.grade === '2'
            );
        case 'DISPLAY_2+':
            return studentGrades.filter(
                g => g.isValid && g.grade === '2,5'
            );
        case 'DISPLAY_3':
            return studentGrades.filter(
                g => g.isValid && g.grade === '3'
            );
        case 'DISPLAY_3+':
            return studentGrades.filter(
                g => g.isValid && g.grade === '3,5'
            );
        case 'DISPLAY_4':
            return studentGrades.filter(
                g => g.isValid && g.grade === '4'
            );
        case 'DISPLAY_4+':
            return studentGrades.filter(
                g => g.isValid && g.grade === '4,5'
            );
        case 'DISPLAY_5':
            return studentGrades.filter(
                g => g.isValid && g.grade === '5'
            );
        default:
            return studentGrades;
    }
};

const mapStateToStudentGradeListProps = (
    state
) => {
    return {
        studentGrades: getGradesFiltered(
            state.studentGradesReducer,
            state.gradesFilter
        )
    };
};

const mapDispatchToStudentGradeListProps = (
    dispatch
) => {
    return {
        onClickRevise: (id) => dispatch(reviseGrade(id)),
        onClickChange: (id, grade) => dispatch(changeGrade(id, grade)),
        onClickDelete: (id) => dispatch(deleteGrade(id))
    };
};

export const StudentGradesListCC = connect(
    mapStateToStudentGradeListProps,
    mapDispatchToStudentGradeListProps
)(StudentGradesListC);