import React, { useReducer, useEffect, Reducer } from 'react';
import PropTypes from 'prop-types';

import { Validator } from '../../../../utils/validators';
import { validate } from '../../../../utils/validators';
import { CHANGE, TOUCH } from '../../../../utils/constants';

import classes from './Input.module.scss';

export type InputState<F> = {
    [K in keyof F]: {
        value: any;
        isValid: boolean;
        isTouched?: boolean;
    };
};

type Actions =
    | { type: 'CHANGE'; val: string; validators: Validator[] }
    | { type: 'TOUCH' };

const inputReducer = <F extends InputState<F>>(
    state: InputState<F>,
    action: Actions
) => {
    switch (action.type) {
        case CHANGE:
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case TOUCH:
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

export interface IInput {
    id?: string;
    type?: string;
    placeholder?: string;
    errorText?: null | string;
    initialValue?: null | string;
    initialValid?: null | boolean;
    className?: string;
    label?: string | null;
    style?: React.CSSProperties;
    element: string;
    validators: Validator[];
    onInput: (id: string, value: string, isValid: boolean) => void;
    inputId?: string;
}

const Input: React.FC<IInput> = (props) => {
    const [inputState, dispatch] = useReducer<Reducer<any, any>>(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: CHANGE,
            val: e.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({ type: TOUCH });
    };

    const { id = '', onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const element =
        props.element === 'input' ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                className={props.className}
                style={props.style}
            />
        ) : (
            ''
        );
    return (
        <div className={`${classes.formControl} ${!inputState.isValid && inputState.isTouched && classes.formControl}` }  >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && (
                <p style={{color: 'red'}}>{props.errorText}</p>
            )}
        </div>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    errorText: PropTypes.string,
    initialValue: PropTypes.string,
    initialValid: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    element: PropTypes.string.isRequired,
    validators: PropTypes.array.isRequired,
    onInput: PropTypes.func.isRequired,
};

export default Input;
