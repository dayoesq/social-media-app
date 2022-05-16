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
    errorText?: string;
    initialValue?: string;
    initialValid?: boolean;
    className?: string;
    label?: string;
    style?: React.CSSProperties;
    element: 'input' | 'textarea';
    validators?: Validator[];
    onInput: (id: string, value: string, isValid: boolean) => void;
    inputId?: string;
    backErrorText?: string;
    rows?: number;
    cols?: number;
}

export const Input: React.FC<IInput> = (props) => {
    const [inputState, dispatch] = useReducer<Reducer<any, any>>(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
    });

    const changeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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
        let isMounted = true;
        if (isMounted) {
            onInput(id, value, isValid);
        }
        return () => {
            isMounted = false;
        };
    }, [id, value, isValid, onInput]);

    let element;
    if (props.element.toLowerCase() === 'input') {
        element = (
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
        );
    } else if (props.element.toLowerCase() === 'textarea') {
        element = (
            <textarea
                id={props.id}
                cols={props.cols ? props.cols : 25}
                rows={props.rows ? props.rows : 5}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                className={props.className}
                style={props.style}
            />
        );
    }

    if (!element) {
        throw new Error('Element can only be input | textarea!');
    }

    return (
        <div
            className={`${classes.formControl} ${
                !inputState.isValid &&
                inputState.isTouched &&
                classes.invalidInput
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && (
                <p>{props.errorText}</p>
            )}
            {props.backErrorText && <p>{props.backErrorText}</p>}
        </div>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    errorText: PropTypes.string,
    initialValue: PropTypes.string,
    initialValid: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.object,
    element: PropTypes.oneOf(['input', 'textarea'] as const).isRequired,
    validators: PropTypes.array.isRequired,
    onInput: PropTypes.func.isRequired,
    backErrorText: PropTypes.string,
    rows: PropTypes.number,
    cols: PropTypes.number,
};
