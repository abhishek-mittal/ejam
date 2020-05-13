import DeployementModel, { IDeploymentModel } from "@models/deployment";
import * as Joi from 'joi';
import DeploymentValidation from "./validations";

const deploymentHandler = {

    async getDeployments(): Promise< IDeploymentModel[] > {
        try {
            return await DeployementModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async addDeployments(body: IDeploymentModel[]): Promise< IDeploymentModel[] > {
        try {
            body = body.map( dep => ({...dep, deployedAt: new Date()}) as IDeploymentModel);

            const validate: Joi.ValidationResult < IDeploymentModel[] > = DeploymentValidation.createDeployments(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const documents = body.map( dep => new DeployementModel(dep) );
            const deployments = await DeployementModel.create(documents, {});
            return deployments;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async deleteDeployments(body: any[]): Promise< any > {
        try {
            console.log(body);
            const validate: Joi.ValidationResult < {id: string}[] > = DeploymentValidation.deleteDeployments(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const ids = [...body.map( ido => ido.id )];
            const deployments = await DeployementModel.deleteMany({ _id: { $in: [...ids]}}).lean();
            console.log(deployments)
            return deployments;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default deploymentHandler;