import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import ForRentReservation from "../chain-info/contracts/ForRentTransactions.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import { constants, utils } from "ethers"
//import { Contract } from "@ethersproject/contracts"
import { Contract } from '@usedapp/core/node_modules/@ethersproject/contracts'
import networkMapping from "../chain-info/deployments/map.json"

export const useReserve = (tokenAddress: string) => {
    const { chainId } = useEthers()
    const { abi } = ForRentReservation

    const foRentReservationAddress = chainId ? networkMapping[String(chainId)]["ForRentReservation"][0] : constants.AddressZero
    const foRentReservationInterface = new utils.Interface(abi)
    const foRentReservationContract = new Contract(foRentReservationAddress, foRentReservationInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)
    // approve
    const { send: approveErc20Send, state: approveErc20State } =
        useContractFunction(erc20Contract, "approve", {
            transactionName: "Approve ERC20 transfer",
        })
    const approveAndReserve = (amount: string) => {
        setAmountToReserve(amount)
        return approveErc20Send(foRentReservationAddress, amount)
    }

    const { send: reserveSend, state: reserveState } =
        useContractFunction(foRentReservationContract, "reserve", {
            transactionName: "Stake tokens",
        })
    const [amountToReserve, setAmountToReserve] = useState("0")

    return { approveAndReserve, approveErc20State }
}