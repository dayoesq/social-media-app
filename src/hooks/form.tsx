import { useCallback, useReducer, Reducer } from 'react';
import { InputState } from '../components/shared/form-elements/Input/Input';

type FormState = { inputs?: InputState; isValid?: boolean };

type FormActions =
    | { type: 'INPUT_CHANGE'; value: string; isValid: boolean; inputId: string }
    | { type: 'SET_DATA'; inputs: InputState; formIsValid: boolean };

const formReducer = (state: FormState, action: FormActions): FormState => {
    switch (action.type) {
        case 'INPUT_CHANGE': {
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    if (!state.inputs[inputId as keyof InputState]) {
                        continue;
                    }
                    formIsValid = formIsValid && action.isValid;
                }
                formIsValid = formIsValid && state.inputs.isValid;
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
            } as FormState;
        }
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid,
            } as FormState;
        default:
            return state;
    }
};

export const useForm = (
    initialInputs: InputState,
    initialFormValidity: boolean
): [
    FormState,
    (id: string, value: string, isValid: boolean) => void,
    (inputData: string, formValidity: boolean) => void
] => {
    const formInitialValues: FormState = {
        inputs: initialInputs,
        isValid: initialFormValidity,
    };
    const [formState, dispatch] = useReducer<Reducer<FormState, FormActions>>(
        formReducer,
        formInitialValues
    );

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity,
        });
    }, []);
    return [formState, inputHandler, setFormData];
};
