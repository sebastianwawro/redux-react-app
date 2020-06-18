import React from 'react';
import {connect} from "react-redux";

const gradeStringToInt = (grade) => {
    switch(grade) {
        case '2':
            return 2;
        case '2+':
            return 2.5;
        case '3':
            return 3;
        case '3+':
            return 3.5;
        case '4':
            return 4;
        case '4+':
            return 4.5;
        case '5':
            return 5;
    }
};

const gradeIntToString = (grade) => {
    switch(grade) {
        case 2:
            return '2';
        case 2.5:
            return '2+';
        case 3:
            return '3';
        case 3.5:
            return '3+';
        case 4:
            return '4';
        case 4.5:
            return '4+';
        case 5:
            return '5';
    }
};

const avgGradeToFinalGrade = (grade) => {
    let floor = Math.floor(grade);
    let def = grade-floor;
    if (def === 0) {
        return floor;
    }
    else if (def > 0 && def < 0.25) {
        return floor;
    }
    else if (def >= 0.25 && def < 0.75) {
        return floor+0.5;
    }
    else {
        return floor+1;
    }
};

let tmpCnt = 0;
const calcAvg = (studentGrades) => {
    return studentGrades
        .filter(g => g.isValid)
        .map(g => g.indexNumber)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(i => {
            let myGrades = studentGrades.filter(g => g.isValid && g.indexNumber === i).map(g => gradeStringToInt(g.grade));
            let average = myGrades.reduce((a, b) => a + b) / myGrades.length;
            return {
                id: tmpCnt++,
                indexNumber: i,
                avgGrade: average,
                finalGrade: gradeIntToString(avgGradeToFinalGrade(average))
            };
        });
};


const StudentAvgGradesListElement = ({
    indexNumber,
    avgGrade,
    finalGrade
}) => {
    return (
        <tr>
            <td>
                {indexNumber}
            </td>
            <td>
                {avgGrade}
            </td>
            <td>
                {finalGrade}
            </td>
        </tr>
    );
};


const StudentAvgGradesListC = ({
    studentGrades
}) => {

    let helper;
    if (studentGrades) {
        helper = studentGrades.map(studentGrade => {
            return <StudentAvgGradesListElement
                key={studentGrade.id}
                {...studentGrade}
            />;
        });
    }

    if (studentGrades.length > 0) {
        return <table className={'table'}>
            <thead>
            <tr>
                <th>Index Number</th>
                <th>Avg. Grade</th>
                <th>Final Grade</th>
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

const mapStateToStudentAvgGradeListProps = (
    state
) => {
    return {
        studentGrades: calcAvg(
            state.studentGradesReducer,
            state.gradesFilter
        )
    };
};

export const StudentAvgGradesListCC = connect(
    mapStateToStudentAvgGradeListProps
)(StudentAvgGradesListC);