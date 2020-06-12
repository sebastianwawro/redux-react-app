import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { studentGradesReducer, gradesFilter } from './reducers';
import { AddStudentGradeCC } from './app-add-grade';
import { StudentGradesListCC } from './app-show-grades';
import { AvailableFilters } from './app-filter-grades';

const studentGradesReducers = combineReducers({
    studentGradesReducer,
    gradesFilter
});

const StudentGradesApp = () => (
    <div>
        <h1>Student Grades App</h1>
        <AddStudentGradeCC />
        <StudentGradesListCC />
        <AvailableFilters />
    </div>
);

ReactDOM.render(
    <Provider store={createStore(studentGradesReducers)}>
        <StudentGradesApp />
    </Provider>,
    document.getElementById('root')
);