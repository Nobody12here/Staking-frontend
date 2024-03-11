import { FC, useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import WithdrawDetails from "../WithdrawDetails/WithdrawDetails";
import {
  contract_address,
  contract_abi,
  token_address,
  token_abi,
} from "../../contract.ts";
import { config } from "../../config/index.ts";
import {
  ConnectAndHowButtons,
  InputField,
  DurationDropdown,
  DisconnectAndSubmitButtons,
} from "../Input";
import "./StakingCard.style.css";

import { readUserInformation } from "../../utils/index.ts";
import { parseUnits } from "viem";
import { waitForTransactionReceipt } from "wagmi/actions";
interface WithdrawDetailsProps {
  userInformation: Array<unknown>;
}
const StakingDetails: FC<WithdrawDetailsProps> = ({ userInformation }) => {
  const [totalStaked, setTotalStaked] = useState<string>("0");
  useEffect(() => {
    readUserInformation(userInformation, setTotalStaked);
  }, [userInformation]);
  return (
    <div className="text2-container">
      <h5 className="t1 heading2">$BFM Crypto Staking</h5>
      <p className="t1 text2">Total in $BFM Staking</p>
      <h3 className="t1 total-amount">{totalStaked} $BFM</h3>
    </div>
  );
};

const Card: FC = (): JSX.Element => {
  const account = useAccount();
  const { writeContractAsync: approveTokens } = useWriteContract();
  const { writeContractAsync: farmTokens } = useWriteContract();
  const [userInformation, setUserInformation] = useState<unknown>(null);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
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
  }, [UserInformation.isLoading]);

  async function handleSubmit() {
    if (selectedPackage === "locked") {
      if (selectedDuration) {
        //First approve the tokens
        const hash = await approveTokens({
          abi: token_abi,
          address: token_address,
          functionName: "approve",
          args: [contract_address, parseUnits(tokenAmount.toString(), 18)], // Remove the unnecessary BigInt conversion
        });
        const wait = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        console.log(wait);

        try {
          await farmTokens({
            abi: contract_abi,
            address: contract_address,
            functionName: "farm",
            args: [parseUnits(tokenAmount.toString(), 18), selectedDuration],
          });
          alert("Staked successfully");
        } catch (error) {
          alert(error);
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
        const wait = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        console.log(wait);

        await farmTokens({
          abi: contract_abi,
          address: contract_address,
          functionName: "farm",
          args: [parseUnits(tokenAmount.toString(), 18), 0],
        });
        alert("Staked successfully");
      } catch (error) {
        alert(error);
      }
    }
  }

  const [selectedPackage, setSelectedPackage] = useState<"unlock" | "locked">(
    "unlock"
  );
  const [selectedDuration, setSelectedDuration] = useState<number | null>(14);
  const isAccountConnected = useAccount().isConnected;
  const [activeButton, setActiveButton] = useState<"Stake" | "Withdraw">(
    "Stake"
  );

  const handleButtonClick = (button: "Stake" | "Withdraw") => {
    setActiveButton(button);
  };

  console.log(activeButton);
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
          selectedPackage === "locked" && (
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
