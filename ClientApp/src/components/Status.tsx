import React from "react";
import { useAxios } from "../custom-hooks/useAxios";
import { WeatherForecastClient } from "../my-app-client";

const Status: React.FunctionComponent<{}> = (props) => {

    const axios = useAxios();

    const changeStatus = async (status: string) => {
        if (!axios) throw "Trying to call changeStatus with axios undefined";
        try {
            let client = new WeatherForecastClient(undefined, axios);
            let result = await client.status(status);
            console.debug("result", result);
        } catch (error) {
            console.error("error", error);
        }
    }

    return <><button onClick={() => changeStatus("New")}>Change to New</button></>;
}

export default Status;