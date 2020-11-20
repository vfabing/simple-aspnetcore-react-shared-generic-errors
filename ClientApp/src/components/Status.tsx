import React from "react";
import { useAxios } from "../custom-hooks/useAxios";

const Status: React.FunctionComponent<{}> = (props) => {

    const axios = useAxios();

    const changeStatus = async (status: string) => {
        if (!axios) throw "Trying to call changeStatus with axios undefined";
        try {
            let result = await axios.post(`/weatherforecast/status/${status}`);
            console.debug("result", result);
        } catch (error) {
            console.error("error", error);
        }
    }

    return <><button onClick={() => changeStatus("New")}>Change to New</button></>;
}

export default Status;