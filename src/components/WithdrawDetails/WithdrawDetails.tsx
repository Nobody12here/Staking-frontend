import { FC } from "react";
import { formatEther } from "viem";
import "./WithdrawDetails.style.css";
import { Config, useAccount, useWriteContract } from "wagmi";
import { contract_abi, contract_address } from "../../contract";
import { WriteContractMutateAsync } from "wagmi/query";
interface WithdrawDetailsProps {
  userInformation: Array<unknown>;
}
function unstake(index:number[],harvest:WriteContractMutateAsync<Config, unknown>){
  harvest({
    abi: contract_abi,
    address: contract_address,
    functionName: "harvest",
    args: [index],
  });
}
function convertUnixTime(unixTime: number) {
  const time = parseInt(unixTime.toString());
  const date = new Date(time * 1000);
  return date.toDateString();
}
function releaseTime(lockupDays: bigint, depositTime: number): string {
  const depositTimestamp = parseInt(depositTime.toString()) * 1000;
  const currentTime = Date.now();
  const releaseTimestamp = depositTimestamp + Number(lockupDays) *24*60*60*1000;

  const remainingTime = Math.max(releaseTimestamp - currentTime, 0);
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
  console.log(remainingDays);
  const releaseDate = new Date(releaseTimestamp);
  const formattedReleaseDate = releaseDate.toDateString();
  
  return remainingDays > 0 ? `${formattedReleaseDate}` : "Released";
}
const WithdrawDetails: FC<WithdrawDetailsProps> = ({ userInformation }) => {
  const {writeContractAsync:harvest} = useWriteContract();
  const {isConnected} = useAccount()
  if(isConnected === false) return (<div style={{color:"white",marginBottom:"24px"}}>Connect to wallet</div>)
  const renderWithdrawDetails = () => {
    const tokensStaked = userInformation[0] as Array<unknown>;
    const LockupTime = userInformation[1] as Array<unknown>;
    const DepositTime = userInformation[2] as Array<unknown>;
    const withdrawDetailsRows = [];

    for (let i = 0; i < tokensStaked.length; i++) {
      const tokenAmount = tokensStaked[i];
      const lockupTime = LockupTime[i] as bigint;
      const depositTime = DepositTime[i] as number;

      withdrawDetailsRows.push(
        <tr key={i}>
          <td>{formatEther(tokenAmount as bigint)}</td>
          <td>{releaseTime(lockupTime,depositTime)}</td>
          <td>{convertUnixTime(depositTime)}</td>
          <td>{formatEther(tokenAmount as bigint)}</td>
          <td>
          <button onClick={()=>{
            unstake([i],harvest)
          }} disabled={releaseTime(lockupTime,depositTime) === 'Released'?false:true}>Withdraw</button>
          </td>
        </tr>
      );
    }

    return withdrawDetailsRows;
  };

  return (
    <>
      <table style={{ color: "white" }}>
        <thead>
          <tr className="header">
            <th>Profit</th>
            <th>Release On</th>

            <th>Locked on</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderWithdrawDetails()}</tbody>
      </table>
    </>
  );
};

export default WithdrawDetails;
