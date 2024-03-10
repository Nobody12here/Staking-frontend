import { Config } from "wagmi";
import { WriteContractMutateAsync } from "wagmi/query";
import { token_abi,token_address,contract_abi,contract_address } from "../contract";
import { parseUnits,formatEther } from "viem";


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
      await approveTokens({
        abi: token_abi,
        address: token_address,
        functionName: "approve",
        args: [contract_address, parseUnits(tokenAmount.toString(), 18)], // Remove the unnecessary BigInt conversion
      });
        
      await farmTokens({
        abi: contract_abi,
        address: contract_address,
        functionName: "farm",
        args: [parseUnits(tokenAmount.toString(), 18), selectedDuration],
      });
      console.log(farmError);
    } else {
      console.log("Please select a duration");
    }
  } else if (selectedPackage === "unlock") {
    await approveTokens({
      abi: token_abi,
      address: token_address,
      functionName: "approve",
      args: [contract_address, parseUnits(tokenAmount.toString(), 18)], // Remove the unnecessary BigInt conversion
    });
    await farmTokens({
      abi: contract_abi,
      address: contract_address,
      functionName: "farm",
      args: [parseUnits(tokenAmount.toString(), 18), 0],
    });
  }
}
async function readUserInformation(userInformation: Array<unknown>) {
  if(userInformation){
    const TotalTokenStaked = (userInformation[0] as bigint[]).reduce((a: bigint, b: bigint) => a + b, 0n);
    //add all the elements of total token staked
    console.log(formatEther( TotalTokenStaked));
  }
}
export { handleSubmit, readUserInformation};
