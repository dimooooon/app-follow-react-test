import { isEuMember } from 'is-eu-member';
import { whereCountry } from 'iso-3166-1';
import { checkVAT, countries } from 'jsvat';

type TValidationResult = string | null;
export type TValidationFunction = (value: string, message?: string) => TValidationResult;

export class ValidationHelper {
    public static validate(value: string, validators: TValidationFunction[], params?: {[key: string]: string}): TValidationResult {
        let result: string | null = null;

        for(let i = 0; i < validators.length; i++) {
            result = validators[i](value);

            if (result) {
                break;
            }
        }

        return result;
    }

    public static requiredValidator(value: string, message: string = 'Required'): TValidationResult {
        return !!value ? null : message;
    }

    public static nameValidator(value: string, message: string = 'It should contain at least two words with two alphabetic chars'): TValidationResult {
        if (!value || value.match(/[A-Za-z]{2,} +[A-Za-z]{2,}/)) {
            return null;
        }

        return message;
    }

    public static minLengthValidator(length: number): TValidationFunction {
        return function minLengthValidator(value: string, message: string = `Length must be greater than or equal to ${length} chars`): TValidationResult {
            if (!value) {
                return null;
            }

            return value.length >= length ? null : message;
        };
    }

    public static euCountryValidator(value: string, message: string = 'That\'s not an EU country'): TValidationResult {
        if (!value) {
            return null;
        }

        const country = whereCountry(value);

        if (!country) {
            return message;
        }

        return isEuMember(country.alpha2) ? null : message;
    }

    public static vatValidator(value: string, message: string = 'Incorrect VAT ID'): TValidationResult {
        const result = checkVAT(value);

        debugger;

        return result.isValid ? null : message;
    }
}
