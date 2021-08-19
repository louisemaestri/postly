import { get, set } from "lodash";
import { deepKeys } from "./keys";

export const schemaToModel = <TSchema, TModel> (schema: TSchema, model: TModel ): TModel => {
    for (const field of deepKeys(model)) {
        const value = get(schema, field, null);

        if (value) {
            set(schema, field, value);
        }
    }

    return model;
}

export const modelToSchema = <TModel, TSchema> (model: TModel, schema: TSchema): TSchema => {
    return schemaToModel(model, schema);
}