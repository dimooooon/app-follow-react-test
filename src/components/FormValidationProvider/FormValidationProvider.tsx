import React, { ReactNode, useState, useCallback, useContext } from 'react';

import { TValidationFunction, ValidationHelper } from '../../helpers/validation.helper';

interface IFormValidationProviderProps {
    children: ReactNode;
}

export interface IValidationError {
    message: string | null;
    isVisible: boolean;
}

type TValidationErrorsMap = {[key: string]: IValidationError};

interface IFormValidationContext {
    validate: (fieldName: string, value: string, validators: TValidationFunction[]) => void,
    hasErrors: () => boolean,
    showAllErrors: () => void,
    clearFieldError: (fieldName: string) => void,
    errors: TValidationErrorsMap,
}

const FormValidationContext = React.createContext({} as IFormValidationContext);

export function useFormValidation(): IFormValidationContext {
    return useContext(FormValidationContext);
}

export function FormValidationProvider(props: IFormValidationProviderProps) {
    const [errors, setErrors] = useState({} as {[key: string]: IValidationError});

    function hasErrors(): boolean {
        return !!Object.keys(errors).map(key => errors[key]).filter(item => item && item.message).length;
    }

    const showAllErrors = useCallback((): void => {
        const newErrors = {} as TValidationErrorsMap;

        Object.keys(errors).forEach((key: string) => {
            if (errors[key] && errors[key].message) {
                newErrors[key] = {
                    message: errors[key].message,
                    isVisible: true,
                };
            }
        });

        setErrors({
            ...errors,
            ...newErrors,
        });
    }, [errors]);

    function clearFieldError(fieldName: string): void {
        setErrors({
            ...errors,
            [fieldName]: {
                ...errors[fieldName],
                isVisible: false,
            },
        });
    }

    const validate = useCallback((fieldName: string, value: string, validators: TValidationFunction[]) => {
        setErrors(prev => {
            return {
                ...prev,
                [fieldName]: {
                    message: ValidationHelper.validate(value, validators),
                    isVisible: prev[fieldName] ? prev[fieldName].isVisible : false,
                } as IValidationError,
            } as {[key: string]: IValidationError};
        });
    }, []);

    return (
        <FormValidationContext.Provider value={{ errors, hasErrors, validate, showAllErrors, clearFieldError }}>
            {props.children}
        </FormValidationContext.Provider>
    );
}
