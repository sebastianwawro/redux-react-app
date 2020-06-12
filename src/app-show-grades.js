import React from 'react';
import {connect} from "react-redux";

const reviseGrade = (id) => {
    return {
        type: 'REVISE_GRADE',
        id
    };
};

const updateGrade = (id, grade, changeIsValid) => {
    if (changeIsValid) {
        return {
            type: 'REVISE_GRADE',
            id
        };
    }
    else {
        return {
            type: 'CHANGE_GRADE',
            id,
            grade
        };
    }
};

let StudentGradesListElement = ({
    onClickUpdateMe,
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
                <input ref={node => {inputGrade = node;}}
                       className={'form-control'}
                       value={grade}
                       onChange={
                           () => {
                               onClickUpdateMe(id, inputGrade.value, false);
                           }
                       }/>
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
                    onClickUpdateMe(id, grade, true);
                }}>Revise</button>
                {' '}
                <button
                    className={'btn btn-danger'}
                    onClick={() => {
                        onClickUpdateMe(id, grade, true);
                }}>Delete</button>
            </td>
        </tr>
    );
};


const StudentGradesListC = ({
    studentGrades,
    onClickUpdate
}) => {

    let helper;
    if (studentGrades) {
        helper = studentGrades.map(studentGrade => {
            return <StudentGradesListElement
                key={studentGrade.id}
                {...studentGrade}
                onClickUpdateMe={onClickUpdate}
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
        onClickUpdate: (id, grade, changeIsValid) => {
            //dispatch(reviseGrade(id));
            dispatch(updateGrade(id, grade, changeIsValid))
        }
    };
};

export const StudentGradesListCC = connect(
    mapStateToStudentGradeListProps,
    mapDispatchToStudentGradeListProps
)(StudentGradesListC);