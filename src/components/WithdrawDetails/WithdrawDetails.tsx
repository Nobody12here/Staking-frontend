import { FC, useState } from "react";
import { TransactionExecutionError, formatEther } from "viem";
import "./WithdrawDetails.style.css";
import { Config, useAccount, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { contract_abi, contract_address } from "../../contract";
import { WriteContractMutateAsync } from "wagmi/query";
import { config } from "../../config";

interface WithdrawDetailsProps {
  userInformation: Array<unknown>;
}
interface StakingAllocations {
  [days: string]: number;
}
//better to store this offline
//this is the staking allocation changes this according to the updated values
const stakingAllocations: StakingAllocations = {
  "0": 2500000000,
  "180": 5000000000,
  "365": 7000000000,
  "540": 8500000000,
  "720": 10000000000,
};
async function unstake(
  index: number[],
  harvest: WriteContractMutateAsync<Config, unknown>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean
) {
  if (loading) {
    alert("Transaction in progress")
    return;
  }
  try {
    setLoading(true);
    const tx = await harvest({
      abi: contract_abi,
      address: contract_address,
      functionName: "harvest",
      args: [index],
    });
    waitForTransactionReceipt(config, {
      hash: tx,
    });
    setLoading(false);
  } catch (error) {
    const e = error as TransactionExecutionError;
    console.error("Error while harvesting", error);
    alert(e.details);
    setLoading(false);
  }
}

function getDaysPassed(unixTime: bigint) {
  const time = parseInt(unixTime.toString());
  const currentTime = Date.now() / 1000;
  const diff = currentTime - time;
  const daysPassed = Math.floor(diff / 86400);
  return daysPassed;
}
function calculateReward(
  depositTime: bigint,
  lockupDays: bigint,
  tokensStaked: bigint
) {
  const days = lockupDays.toString();
  let reward =
    (parseInt(formatEther(tokensStaked)) * stakingAllocations[days]) /
    10 ** 9 /
    100;
  if (days == "0") {
    const days = getDaysPassed(depositTime);
    reward = days * reward;
  }

  return reward;
}
function releaseTime(lockupDays: bigint, depositTime: bigint): string {
  const depositTimestamp = parseInt(depositTime.toString()) * 1000;
  const currentTime = Date.now();
  const releaseTimestamp =
    depositTimestamp + Number(lockupDays) * 24 * 60 * 60 * 1000;

  const remainingTime = Math.max(releaseTimestamp - currentTime, 0);
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
  console.log(remainingDays);
  const releaseDate = new Date(releaseTimestamp);
  const formattedReleaseDate = releaseDate.toDateString();

  return remainingDays > 0 ? `${formattedReleaseDate}` : "Released";
}
const WithdrawDetails: FC<WithdrawDetailsProps> = ({ userInformation }) => {
  const [loading, setLoading] = useState(false);
  const { writeContractAsync: harvest } = useWriteContract();
  const { isConnected } = useAccount();
  if (isConnected === false)
    return (
      <div style={{ color: "white", marginBottom: "24px", marginTop: "24px" }}>
        Please connect wallet
      </div>
    );
  const renderWithdrawDetails = () => {
    const tokensStaked = userInformation[0] as Array<unknown>;
    const LockupDays = userInformation[1] as Array<unknown>;
    const DepositTime = userInformation[2] as Array<unknown>;
    const withdrawDetailsRows = [];

    for (let i = 0; i < tokensStaked.length; i++) {
      const tokenAmount = tokensStaked[i] as bigint;
      const lockupDays = LockupDays[i] as bigint;
      const depositTime = DepositTime[i] as bigint;
      console.log("lockupDays", lockupDays);
      withdrawDetailsRows.push(
        <tr key={i}>
          <td>
            {parseInt(formatEther(tokenAmount)) +
              calculateReward(depositTime, lockupDays, tokenAmount)}
          </td>
          <td>{calculateReward(depositTime, lockupDays, tokenAmount)}</td>
          <td>{releaseTime(lockupDays, depositTime)}</td>

          <td>{formatEther(tokenAmount)}</td>
          <td>
            <button
              onClick={() => {
                unstake([i], harvest, setLoading, loading);
              }}
              disabled={
                releaseTime(lockupDays, depositTime) === "Released"
                  ? false
                  : true
              }
            >
              Withdraw
            </button>
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
            <th>Withdrawable Amount</th>
            <th>Profit</th>
            <th>Release On</th>
            <th>Staked</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderWithdrawDetails()}</tbody>
      </table>
    </>
  );
};

export default WithdrawDetails;
