import { IDeploymentModel } from "@models/deployment";
import { NextFunction, Request, Response } from "express";
import  DH from './handler'

export async function addDeployments(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {

        const body = req.body.length ? req.body : [req.body];
        const deployments = await DH.addDeployments(body);
        res.status(200).json(deployments);
    } catch (error) {
        throw {code: 400, message: error.message};
    }
}

export async function getDeployments(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const deployments = await DH.getDeployments();
        res.status(200).json(deployments);
    } catch (error) {
        throw {code: 400, message: error.message};
    }
}

export async function deleteDeployments(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        console.log(req.query)
        const { query } = req.query;
        if (!query) {
            throw new Error('Please send some id/s!');
        }
        let { ids } = JSON.parse(query as any);
        ids = ids.length && typeof ids !== 'string' ? ids.map( id => ({id}) ) : [{id: ids}];
        
        const deployments = await DH.deleteDeployments(ids);
        res.status(200).json(deployments);
    } catch (error) {
        throw {code: 400, message: error.message};
    }
}

