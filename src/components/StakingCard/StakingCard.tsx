import { FC, useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import WithdrawDetails from "../WithdrawDetails/WithdrawDetails";
import { contract_address, contract_abi } from "../../contract.ts";
import {
  ConnectAndHowButtons,
  InputField,
  DurationDropdown,
  DisconnectAndSubmitButtons,
} from "../Input";
import "./StakingCard.style.css";
import { handleSubmit, readUserInformation } from "../../utils/index.ts";

const StakingDetails: FC = () => {
  return (
    <div className="text2-container">
      <h5 className="t1 heading2">$BFM Crypto Staking</h5>
      <p className="t1 text2">Total in $BFM Staking</p>
      <h3 className="t1 total-amount">0 $BFM</h3>
    </div>
  );
};

const Card: FC = (): JSX.Element => {
  const account = useAccount();
  const { writeContractAsync: approveTokens } = useWriteContract();
  const { writeContractAsync: farmTokens, error: farmError } =
    useWriteContract();
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
  readUserInformation(userInformation as Array<unknown>);
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

        {activeButton === "Stake" && <StakingDetails />}
        {activeButton === "Withdraw" && <WithdrawDetails userInformation={userInformation as Array<unknown>} />}

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
              handleSubmit(
                farmError,
                approveTokens,
                farmTokens,
                tokenAmount,
                selectedDuration,
                selectedPackage
              );
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
