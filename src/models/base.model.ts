export interface IBaseModel {
    // to transform model to server-side models (json)
    toDto(): {[key: string]: any};
}