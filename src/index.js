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
    <div className={'container'}>
        <h1>Student Grades App</h1>
        <hr/>
        <AddStudentGradeCC />
        <hr/>
        <StudentGradesListCC />
        <hr/>
        <AvailableFilters />
        <hr/>
        <p>
            App usage:<br/>
            -> type index number and grade and click button 'Add Student Grade' to add grade<br/>
            -> to change grade just type it in right input - it will be autosaved<br/>
            -> to revise grade to invalid/valid click 'Revise' button<br/>
            -> to filter grades use button beneath the table<br/>
            -> to delete grade click 'Delete' button<br/>
        </p>
    </div>
);

ReactDOM.render(
    <Provider store={createStore(studentGradesReducers)}>
        <StudentGradesApp />
    </Provider>,
    document.getElementById('root')
);