import { useEthers } from "@usedapp/core"
import { constants } from "ethers"
import helperConfig from "../../helper-config.json"
import networkMapping from "../../chain-info/deployments/map.json"
import { Button, Input } from "@material-ui/core"
import { useReserve } from "../../hooks"
import { utils } from "ethers"

export const ReserveForm = () => {
    const { chainId, error } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    let stringChainId = String(chainId)
    const drtTokenAddress = chainId ? networkMapping[stringChainId]["DRTToken"][0] : constants.AddressZero

    const { approveAndReserve, approveErc20State } = useReserve(drtTokenAddress)
    const handleReserveSubmit = () => {
        const amountAsWei = utils.parseEther("20")
        return approveAndReserve(amountAsWei.toString())
    }

    return (
        <>
            <Button
                onClick={handleReserveSubmit}
                variant="contained"
                color="primary"
                size="small">
                Reserve
            </Button>
        </>
    )
}