// for testing: https://jsonplaceholder.typicode.com/users/1/posts
export interface IDeployment {
    url: string;
    templateName: string;
    version: string;
    id: string;
    deployedAt: Date;
}

export interface IDeploymentStoreState {
  items: IDeployment[] | null;
  error: any;
  loading: boolean;
}