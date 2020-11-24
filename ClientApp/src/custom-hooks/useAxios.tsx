
import React from "react";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { toast } from "react-toastify";

type AxiosContext = { axiosInstance?: AxiosInstance };
const initialContext: AxiosContext = { axiosInstance: undefined };
const AxiosReactContext = createContext<AxiosContext>(initialContext);

export enum ApiErrorCode {
    Unknown = "unknown",
    EntityNotFound = "entityNotFound",
    InvalidStatusChange = "invalidStatusChange"
}

export interface ProblemDetails {
    additionalDetails: any;
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    code?: ApiErrorCode;
}

// 1 component to define an Axios Instance in a Context
export const AxiosProvider: React.FunctionComponent<{ children: ReactNode }> = (props) => {

    const contextValue: AxiosContext = useMemo(() => {
        console.debug("initialize Axios");
        let axiosInstance = axios.create();

        axiosInstance.interceptors.response.use((response: AxiosResponse<any>) => {
            return response;
        }, (error) => {
            const problemDetails: ProblemDetails = error.response.data;
            console.debug("problemDetails", problemDetails);
            switch (problemDetails.code) {
                case ApiErrorCode.InvalidStatusChange:
                    toast.error(`Invalid Status Change! Allowed status: ${(problemDetails.additionalDetails.allowedStatus as string[]).join(', ')}`);
                    break;
                case ApiErrorCode.EntityNotFound:
                    toast.error("EntityNotFound!");
                    break;
                default:
                    // Do nothing and let specific custom business exception handling.
            }
            return Promise.reject(error);
        });

        return { axiosInstance };
    }, []);

    return (<AxiosReactContext.Provider value={contextValue}>
        {props.children}
    </AxiosReactContext.Provider>)
}

// 1 custom hook to access the Axios Instance from the Context

export const useAxios = () => useContext(AxiosReactContext).axiosInstance;