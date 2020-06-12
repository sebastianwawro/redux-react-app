import { StudentGrade } from './Student';

/*const studentGradeReducer = (studentGrade, action) =>{
    switch (action.type) {
        case 'ADD_GRADE':
            return new StudentGrade (action.id, action.indexNumber, action.grade, true);
        case 'CHANGE_GRADE':
            if (studentGrade.id !== action.id) {
                return studentGrade;
            }
            return new StudentGrade (studentGrade.id, studentGrade.indexNumber, action.grade, studentGrade.isValid);
        case 'REVISE_GRADE':
            if (studentGrade.id !== action.id) {
                return studentGrade;
            }
            return new StudentGrade (studentGrade.id, studentGrade.indexNumber, studentGrade.grade, !studentGrade.isValid);
        default:
            return studentGrade;
    }
};*/

const studentGradeReducer = (studentGrade, action) =>{
    switch (action.type) {
        case 'ADD_GRADE':
            return {
                id: action.id,
                indexNumber: action.indexNumber,
                grade: action.grade,
                isValid: true
            };
        case 'CHANGE_GRADE':
            if (studentGrade.id !== action.id) {
                return studentGrade;
            }
            return {
                id: studentGrade.id,
                indexNumber: studentGrade.indexNumber,
                grade: action.grade,
                isValid: studentGrade.isValid
            };
        case 'REVISE_GRADE':
            if (studentGrade.id !== action.id) {
                return studentGrade;
            }
            return {
                id: studentGrade.id,
                indexNumber: studentGrade.indexNumber,
                grade: studentGrade.grade,
                isValid: !studentGrade.isValid
            };
        default:
            return studentGrade;
    }
};

export const studentGradesReducer = (studentGrades = [], action) => {
    switch (action.type) {
        case 'ADD_GRADE':
            return [
                ...studentGrades,
                studentGradeReducer(undefined, action)
            ];
        case 'CHANGE_GRADE':
            return studentGrades.map(s => studentGradeReducer(s, action));
        case 'REVISE_GRADE':
            return studentGrades.map(s => studentGradeReducer(s, action));
        case 'DELETE_GRADE':
            return studentGrades.filter(s => s.id !== action.id);
        case 'TEST':
            if (studentGrades.length === 1) {
                return [];
            }
            else {
                return studentGrades.reduce((accumulator, studentGrade) => {
                    if (studentGrade.id !== action.id) {
                        return [
                            ...accumulator,
                            studentGrade
                        ];
                    }
                    else {
                        return accumulator;
                    }
                });
            }
        default:
            return studentGrades;
    }
};

export const gradesFilter = (
    filter = 'DISPLAY_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_GRADES_FILTER':
            //TODO: reject invalid filters
            return action.filter;
        default:
            return filter;
    }
};