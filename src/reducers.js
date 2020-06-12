const isValidGrade = (grade) => {
    switch (grade) {
        case '2':
        case '2+':
        case '3':
        case '3+':
        case '4':
        case '4+':
        case '5':
            return true;
        default:
            return false;
    }
};

const studentGradeReducer = (studentGrade, action) =>{
    switch (action.type) {
        case 'ADD_GRADE':
            return {
                id: action.id,
                indexNumber: action.indexNumber,
                grade: action.grade,
                isValid: isValidGrade(action.grade)
            };
        case 'CHANGE_GRADE':
            if (studentGrade.id !== action.id) {
                return studentGrade;
            }
            return {
                id: studentGrade.id,
                indexNumber: studentGrade.indexNumber,
                grade: action.grade,
                isValid: isValidGrade(action.grade)
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
            switch (action.filter) {
                case 'DISPLAY_ALL':
                case 'DISPLAY_VALID':
                case 'DISPLAY_INVALID':
                case 'DISPLAY_2':
                case 'DISPLAY_2+':
                case 'DISPLAY_3':
                case 'DISPLAY_3+':
                case 'DISPLAY_4':
                case 'DISPLAY_4+':
                case 'DISPLAY_5':
                    return action.filter;
                default:
                    alert('Blocked attempt to set invalid filter: ' + action.filter);
                    return filter;
            }
        default:
            return filter;
    }
};