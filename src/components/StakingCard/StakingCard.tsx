import { Dispatch, FC } from "react";
import { useState } from "react";
import "./StakingCard.style.css";
import "./InputForm.style.css";
import { useAccount } from "wagmi";
import WithdrawDetails from "../WithdrawDetails/WithdrawDetails";


interface InputFieldProps {
  package: "unlock" | "locked";
  setPackage: React.Dispatch<React.SetStateAction<"unlock" | "locked">>;
}



const StakingDetails: FC = () => {
  return (
    <div className="text2-container">
      <h5 className="t1 heading2">$BFM Crypto Staking</h5>
      <p className="t1 text2">Total in $BFM Staking</p>
      <h3 className="t1 total-amount">0 $BFM</h3>
    </div>
  );
};

const DurationDropdown: FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const handleDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDuration(parseInt(event.target.value));
  };
  return (
    <div className="dropdown-container">
      <label className="dropdown-label" htmlFor="duration">
        Select Duration
      </label>
      <select
        className="dropdown"
        id="duration"
        value={selectedDuration || ""}
        onChange={handleDurationChange}
      >
        
        <option value="3"><span>3 months </span>
        <span>6.2%APY </span>
        </option>
        <option value="9">9 months</option>
        <option value="12">12 months</option>
        <option value="15">15 months</option>
        <option value="18">18 months</option>
        <option value="24">24 months</option>
      </select>
    </div>
  );
};

const ConnectAndHowButtons: FC = () => {
  return (
    <div className="btn2-container">
      <button className="btn2 btn-how">How to Stake</button>
      <w3m-button size="md" balance="hide" />
    </div>
  );
};
const InputField: FC<InputFieldProps> = (props): JSX.Element => {
  console.log(props);

  const setSelectedPackage = props.setPackage;
  const selectedPackage = props.package;
  const handlePackageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPackage(event.target.value as "unlock" | "locked");
  };
  return (
    <>
      <div className="input-container">
        <label className="token-inp-label" htmlFor="token-amount">
          Please add an amount to stake
        </label>
        <input className="token-inp" name="token-amount" type="number" />
      </div>

      <div className="packages-container">
        <p className="packages-heading">Packages</p>

        <div className="package-radio-container">
          <div>
            <input
              type="radio"
              name="package"
              id="unlock"
              value={"unlock"}
              checked={selectedPackage === "unlock"}
              onChange={handlePackageChange}
            />
            <label className="label" htmlFor="package1">
              Unlocked staking 0.02% APY
            </label>
          </div>

          <div>
            <input
              type="radio"
              name="package"
              id="locked"
              value={"locked"}
              checked={selectedPackage === "locked"}
              onChange={handlePackageChange}
            />
            <label className="label" htmlFor="package2">
              Locked Staking
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
const Card: FC = (): JSX.Element => {
  const [selectedPackage, setSelectedPackage] = useState<"unlock" | "locked">(
    "unlock"
  );
  const account = useAccount();
  const [activeButton, setActiveButton] = useState<"Stake" | "Withdraw">(
    "Stake"
  );

  const handleButtonClick = (button: "Stake" | "Withdraw") => {
    setActiveButton(button);
  };

  const isAccountConnected = account.isConnected;
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
        {activeButton === "Withdraw" && <WithdrawDetails />}

        {!isAccountConnected && <ConnectAndHowButtons />}
        {isAccountConnected && activeButton === "Stake" && (
          <InputField
            package={selectedPackage}
            setPackage={setSelectedPackage}
          />
        )}
        {isAccountConnected && activeButton === "Stake" && selectedPackage === "locked" && <DurationDropdown />}
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
