import React from 'react';
import {connect} from "react-redux";

const reviseGrade = (id) => {
    return {
        type: 'REVISE_GRADE',
        id
    };
};

const StudentGradesListElement = ({
    onClick,
    indexNumber,
    grade,
    isValid
}) => (
    <tr onClick={onClick}
        style={{
            textDecoration: isValid ? 'none' : 'line-through'
        }}
    >
        <td>{indexNumber}</td>
        <td>{grade}</td>
    </tr>
);

const StudentGradesListC = ({
    studentGrades,
    onGradeClick
}) => {

    let helper;
    if (studentGrades) {
        helper = studentGrades.map(studentGrade => {
            return <StudentGradesListElement
                key={studentGrade.id}
                {...studentGrade}
                onClick={() => onGradeClick(studentGrade.id)}
            />;
        });
    }
    return <table>
        <thead>
            <tr>
                <th>Index Number</th>
                <th>Grade</th>
            </tr>
        </thead>
        <tbody>
            { helper }
        </tbody>
    </table>
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
                g => g.grade === '2'
            );
        case 'DISPLAY_2+':
            return studentGrades.filter(
                g => g.grade === '2,5'
            );
        case 'DISPLAY_3':
            return studentGrades.filter(
                g => g.grade === '3'
            );
        case 'DISPLAY_3+':
            return studentGrades.filter(
                g => g.grade === '3,5'
            );
        case 'DISPLAY_4':
            return studentGrades.filter(
                g => g.grade === '4'
            );
        case 'DISPLAY_4+':
            return studentGrades.filter(
                g => g.grade === '4,5'
            );
        case 'DISPLAY_5':
            return studentGrades.filter(
                g => g.grade === '5'
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
        onGradeClick: (id) => {
            dispatch(reviseGrade(id));
        }
    };
};

export const StudentGradesListCC = connect(
    mapStateToStudentGradeListProps,
    mapDispatchToStudentGradeListProps
)(StudentGradesListC);