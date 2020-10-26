import React, { ChangeEvent } from 'react';
import { DropdownProps, TextAreaProps } from 'semantic-ui-react';

type TChangeFunction = (fieldName: string, value: string) => void;

//{(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => { onChange('country', data.value as string) }}

export class FormHelper {
    public static getOnInputChangeHandler(fieldName: string, onChangeFunction: TChangeFunction) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            onChangeFunction(fieldName, event.target.value);
        };
    }

    public static getOnSelectChangeHandler(fieldName: string, onChangeFunction: TChangeFunction) {
        return (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
            onChangeFunction(fieldName, data.value as string);
        };
    }

    public static getOnTextAreaChangeHandler(fieldName: string, onChangeFunction: TChangeFunction) {
        return (_event: React.SyntheticEvent<HTMLTextAreaElement, Event>, data: TextAreaProps) => {
            onChangeFunction(fieldName, data.value as string);
        };
    }
}