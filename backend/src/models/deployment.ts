import { db }  from "@config/connection";
import { Document, Schema } from 'mongoose';

const T = Schema.Types;

export interface IDeploymentModel extends Document {
    url: string;
    templateName: string;
    version: string;
    deployedAt: Date;
}

const DeploymentSchema: Schema<IDeploymentModel> = new Schema({
    url: {type: T.String, trim: true},
    templateName: { type: T.String, trim: true },
    version: { type: T.String, trim: true },
    deployedAt: {type: T.Date}
}, { collection: 'deploymentModel', versionKey: false, timestamps: true });

export default db.model < IDeploymentModel > ('UserModel', DeploymentSchema);