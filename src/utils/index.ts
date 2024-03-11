import { Config } from "wagmi";
import { WriteContractMutateAsync } from "wagmi/query";
import { token_abi,token_address,contract_abi,contract_address } from "../contract";
import { parseUnits,formatEther } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";


async function handleSubmit(
  farmError: any,
  approveTokens: WriteContractMutateAsync<Config, unknown>,
  farmTokens: WriteContractMutateAsync<Config, unknown>,
  tokenAmount: number,
  selectedDuration: number | null,
  selectedPackage: "unlock" | "locked"
) {
  if (selectedPackage === "locked") {
    if (selectedDuration) {
      //First approve the tokens
      const hash = await approveTokens({
        abi: token_abi,
        address: token_address,
        functionName: "approve",
        args: [contract_address, parseUnits(tokenAmount.toString(), 18)], // Remove the unnecessary BigInt conversion
      });
      const { data } = useWaitForTransactionReceipt({hash});
      console.log(data)
      
    try {
      await farmTokens({
        abi: contract_abi,
        address: contract_address,
        functionName: "farm",
        args: [parseUnits(tokenAmount.toString(), 18), selectedDuration],
      });
      alert("Staked successfully");
    } catch (error) {
      alert(error)
    }
  } else {
    console.log("Please select a duration");
  }
} else if (selectedPackage === "unlock") {
  
  try {
    const hash = await approveTokens({
      abi: token_abi,
      address: token_address,
      functionName: "approve",
      args: [contract_address, parseUnits(tokenAmount.toString(), 18)],
    });
    const { data } = useWaitForTransactionReceipt({hash});
      console.log(data)
      await farmTokens({
        abi: contract_abi,
        address: contract_address,
        functionName: "farm",
        args: [parseUnits(tokenAmount.toString(), 18), 0],
      });
      alert("Staked successfully");
    } catch (error) {
      alert(error)
    }
}
}
async function readUserInformation(userInformation: Array<unknown>,setTotalStaked: React.Dispatch<React.SetStateAction<string>>) {
  if(userInformation){
    const TotalTokenStaked = (userInformation[0] as bigint[]).reduce((a: bigint, b: bigint) => a + b, 0n);
    console.log(TotalTokenStaked);
    setTotalStaked(formatEther( TotalTokenStaked));
  }
}
export {  readUserInformation};
