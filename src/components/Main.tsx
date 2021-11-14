/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"

import { Rent } from "./rent"

export type Token = {
    image: string
    address: string
    name: string
}

export const Main = () => {
    return (<>
        <h1>Drental application</h1>
        < Rent />
    </>)
}