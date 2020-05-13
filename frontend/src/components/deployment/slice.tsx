import { createSlice, DeepPartial } from "@reduxjs/toolkit";
import { IDeployment } from "../../types/models";
import { AppThunk } from "../../store/configStore";
import instance from "../../api";

interface DeploymentState {
  deployment: IDeployment[];
  fakeTimer?: boolean;
}

let initialState: DeploymentState = {
  deployment: [],
  fakeTimer: false
};



const DeploymentSlice = createSlice({
  name: 'deployment',
  initialState,
  reducers: {
    getDeploymentsSuccess: (state, action) => {
      state.deployment = action.payload;
      state.fakeTimer = false;
    },
    getDeploymentsInit: (state) => {
      state.fakeTimer = true;
    }
  }
})

export default DeploymentSlice.reducer;

export const { getDeploymentsSuccess, getDeploymentsInit } = DeploymentSlice.actions;

const mapResponseDeploymentToDeployment = async (data: any) => {
  const deployments: IDeployment[] = data.map((d: IDeployment & any) =>
    ({
      templateName: d.templateName,
      id: d._id,
      version: d.version,
      url: d.url,
      deployedAt: new Date(d.deployedAt)
    } as IDeployment))

    console.log(deployments)
  return deployments;
}

export const getDeployments = function (): AppThunk {
  return async dispatch => {
    try {
      const res = await instance.get("/deployments");
      dispatch(getDeploymentsSuccess(await mapResponseDeploymentToDeployment(res.data)));
    } catch (err) {
      // dispatch(loginError());
    }
  };
};

export const createDeployments = function (data: IDeployment): AppThunk {
  return async dispatch => {
    try {
      const res = await instance.post("/deployments", data);
      dispatch(getDeploymentsInit());
    } catch (err) {
      // dispatch(loginError());
    }
  };
};
export const deleteDeployments = function (id: string): AppThunk {
  return async dispatch => {
    try {
      const query = JSON.stringify({ids: id});
      const res = await instance.delete("/deployments", { params: { query } });
      dispatch(getDeployments())
    } catch (err) {
      // dispatch(loginError());
    }
  };
};