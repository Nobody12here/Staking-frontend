import { FC, useEffect, useState } from "react";
import { TransactionExecutionError, parseUnits } from "viem";
import {
  contract_abi,
  contract_address,
  token_abi,
  token_address,
} from "../../contract";
import { config } from "../../config/index.ts";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import WithdrawDetails from "../WithdrawDetails/WithdrawDetails";

import {
  ConnectAndHowButtons,
  InputField,
  DurationDropdown,
  DisconnectAndSubmitButtons,
} from "../Input";
import "./StakingCard.style.css";
import { readUserInformations } from "../../utils/index.ts";


interface WithdrawDetailsProps {
  userInformation: Array<unknown>;
}
const StakingDetails: FC<WithdrawDetailsProps> = ({ userInformation }) => {
  const [totalStaked, setTotalStaked] = useState<string>("0");
  useEffect(() => {
    readUserInformations(userInformation, setTotalStaked);
  }, [userInformation]);
  return (
    <div className="text2-container">
      <h5 className="t1 heading2">$BFM Crypto Staking</h5>
      <p className="t1 text2">Total Staked in $BFM Staking</p>
      <h3 className="t1 total-amount">{totalStaked} $BFM</h3>
    </div>
  );
};

const Card: FC = (): JSX.Element => {
  const account = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const { writeContractAsync: approveTokens } = useWriteContract();
  const { writeContractAsync: farmTokens } = useWriteContract();
 
  const [userInformation, setUserInformation] = useState<unknown>(null);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [selectedPackage, setSelectedPackage] = useState<"unlock" | "lock">(
    "unlock"
  );
  const [selectedDuration, setSelectedDuration] = useState<number | null>(14);
  const isAccountConnected = useAccount().isConnected;
  const [activeButton, setActiveButton] = useState<"Stake" | "Withdraw">(
    "Stake"
  );
  const UserInformation = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "UserInformation",
    args: [account.address],
  });
  
  
  useEffect(() => {
    if (!UserInformation.isLoading) {
      
      setUserInformation(UserInformation.data);
    }
    
  }, [UserInformation.isLoading,account.isConnected,account.address]);

  const handleButtonClick = (button: "Stake" | "Withdraw") => {
    setActiveButton(button);
  };
  async function handleSubmit(
    
  ) {
    if(loading){
      alert("Transaction in progress")
      return;
    }
    let duration = 0;
    let amountInWei = parseUnits(tokenAmount.toString(), 18);
    if (selectedPackage == "lock") {
      if (!selectedDuration) {
        throw new Error("Please select a duration");
        
      }
      duration = selectedDuration;
      
    }
    console.log(duration);
    try {
    setLoading(true);
    const hash = await approveTokens({
      abi: token_abi,
      address: token_address,
      functionName: "approve",
      args: [contract_address, amountInWei],
    });
    console.log("hash = ",hash)
    const wait =await waitForTransactionReceipt(config, {
      confirmations: 0,
      
      hash: hash,
    });
    console.log(wait)
    
      await farmTokens({
        abi: contract_abi,
        address: contract_address,
        functionName: "farm",
        args: [amountInWei, duration],
      });
      alert("Staked successfully");
      setLoading(false);
    } catch (error) {
      const e = error as TransactionExecutionError
      alert(e.details);


      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`main-container ${
          activeButton === "Withdraw" ? "withdraw-container" : ""
        } `}
      >
        <div className="button-container">
          <button
            className={`btn ${activeButton === "Stake" ? "active" : ""}`}
            onClick={() => handleButtonClick("Stake")}
          >
            Stake
          </button>
          <button
            className={`btn btn-withdraw ${
              activeButton === "Withdraw" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Withdraw")}
          >
            Withdraw
          </button>
        </div>

        {activeButton === "Stake" && (
          <StakingDetails userInformation={userInformation as Array<unknown>} />
        )}
        {activeButton === "Withdraw" && (
          <WithdrawDetails
            userInformation={userInformation as Array<unknown>}
          />
        )}

        {!isAccountConnected && <ConnectAndHowButtons />}
        {isAccountConnected && activeButton === "Stake" && (
          <InputField
            tokenAmount={tokenAmount}
            setTokenAmount={setTokenAmount}
            package={selectedPackage}
            setPackage={setSelectedPackage}
            
          />
        )}
        {isAccountConnected &&
          activeButton === "Stake" &&
          selectedPackage === "lock" && (
            <DurationDropdown
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
            />
          )}

        {isAccountConnected && activeButton === "Stake" && (
          <DisconnectAndSubmitButtons
            handleSubmit={() => {
              handleSubmit();
            }}
            />
            )}
            {loading && <div className="loading">Please wait...</div>}
      </div>
    </>
  );
};

const StakingCard: FC = () => {
  const account = useAccount();
  if (account.isConnected) {
    console.log("wallet connected with address:", account.address);
  }
  return (
    <>
      <div className="heading-container">
        <h3 className="text">
          <span className="bold-text">Seize Opportunities</span>, Grow Your
          Wealth Through $BFM Crypto Staking
        </h3>
      </div>
      <div className="card-container">
        <Card />
      </div>
    </>
  );
};

export default StakingCard;
