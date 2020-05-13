import * as Joi from 'joi';
import { IDeploymentModel } from '@models/deployment';

class DeploymentValidation {

    createDeployments(params: IDeploymentModel[]): Joi.ValidationResult < IDeploymentModel[] > {

        const schema: Joi.Schema = Joi.object().keys({
            url: Joi.string().uri().required(),
            templateName: Joi.string().required(),
            version: Joi.string().required(),
            deployedAt: Joi.date() 
        });

        const schemas: Joi.Schema = Joi.array().items(schema);
        return Joi.validate(params, schemas);
    }

    deleteDeployments(params: {id: string}[]): Joi.ValidationResult < {id: string}[] > {
        const schemas: Joi.Schema = Joi.array().items(Joi.object().keys({ id: Joi.string().required()  }));
        return Joi.validate(params, schemas);
    }

}

export default new DeploymentValidation();