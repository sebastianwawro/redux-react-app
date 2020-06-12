import React from 'react';
import {connect} from "react-redux";

const setGradesFilter = (filter) => {
    return {
        type: 'SET_GRADES_FILTER',
        filter
    };
};

const SwitchFilterLinkC = ({
    active,
    children,
    onClick
}) => {
    if (active) {
        return (<button className={'btn btn-info'}>{children}</button>);
    }

    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    return (<button className={'btn btn-secondary'} onClick={onClick}> {children} </button>);
};

const mapStateToLinkProps = (
    state,
    ownProps
) => {
    return {
        active:
            ownProps.filter === state.gradesFilter
    };
};

const mapDispatchToLinkProps = (
    dispatch,
    ownProps
) => {
    return {
        onClick: () => {
            dispatch(setGradesFilter(ownProps.filter));
        }
    };
};

const SwitchFilterLinkCC = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(SwitchFilterLinkC);

export const AvailableFilters = () => {
    return (
        <p>
            Filter grades:
            {' '}
            <SwitchFilterLinkCC filter='DISPLAY_ALL'>
                All
            </SwitchFilterLinkCC>
            {', '}
            <SwitchFilterLinkCC filter='DISPLAY_VALID'>
                Valid
            </SwitchFilterLinkCC>
            {', '}
            <SwitchFilterLinkCC filter='DISPLAY_INVALID'>
                Invalid
            </SwitchFilterLinkCC>
            {', '}
            <SwitchFilterLinkCC filter='DISPLAY_2'>
                2
            </SwitchFilterLinkCC>
            {', '}
            <SwitchFilterLinkCC filter='DISPLAY_2+'>
                2+
            </SwitchFilterLinkCC>
            {', '}
            <SwitchFilterLinkCC filter='DISPLAY_3'>
                3
            </SwitchFilterLinkCC>
            {', '}
            <SwitchFilterLinkCC filter='DISPLAY_3+'>
                3+
            </SwitchFilterLinkCC>
            {', '}
            <SwitchFilterLinkCC filter='DISPLAY_4'>
                4
            </SwitchFilterLinkCC>
            {', '}
            <SwitchFilterLinkCC filter='DISPLAY_4+'>
                4+
            </SwitchFilterLinkCC>
            {', '}
            <SwitchFilterLinkCC filter='DISPLAY_5'>
                5
            </SwitchFilterLinkCC>
            {'.'}
        </p>
    );
};