import { useCallback, useReducer, Reducer } from 'react';
import { InputState } from '../components/shared/form-elements/Input/Input';
import { INPUT_CHANGE, SET_DATA } from '../utils/constants';

type FormState<F> = { inputs?: InputState<F>; isValid?: boolean };

type FormActions<F> =
    | { type: 'INPUT_CHANGE'; value: string; isValid: boolean; inputId: string }
    | { type: 'SET_DATA'; inputs: InputState<F>; formIsValid: boolean };

const formReducer = <F extends object>(
    state: FormState<F>,
    action: FormActions<F>
): FormState<F> => {
    switch (action.type) {
        case INPUT_CHANGE: {
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (state.inputs.hasOwnProperty(inputId)) {
                    if (inputId === action.inputId) {
                        if (!state.inputs[inputId as keyof InputState<F>]) {
                            continue;
                        } 
                        formIsValid = formIsValid && action.isValid;
                    } else {
                        formIsValid = formIsValid && state.inputs[inputId].isValid;
                    }
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            } as FormState<F>;
        }
        case SET_DATA:
            return {
                inputs: action.inputs,
                isValid: action.formIsValid,
            } as FormState<F>;
        default:
            return state;
    }
};

export const useForm = <F extends InputState<F>>(
    initialInputs: InputState<F>,
    initialFormValidity: boolean
): [
    FormState<F>,
    (id: string, value: string, isValid: boolean) => void,
    (inputData: string, formValidity: boolean) => void
] => {
    const formInitialValues: FormState<F> = {
        inputs: initialInputs,
        isValid: initialFormValidity,
    };
    const [formState, dispatch] = useReducer<
        Reducer<FormState<F>, FormActions<F>>
    >(formReducer, formInitialValues);

    const inputHandler = useCallback(
        (id: string = '', value: string = '', isValid: boolean = false) => {
            dispatch({
                type: INPUT_CHANGE,
                value: value,
                isValid: isValid,
                inputId: id,
            });
        },
        []
    );

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: SET_DATA,
            inputs: inputData,
            formIsValid: formValidity,
        });
    }, []);
    return [formState, inputHandler, setFormData];
};
