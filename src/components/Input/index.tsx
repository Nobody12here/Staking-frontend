import { FC } from "react";
import "./InputForm.style.css";
interface SubmitButton {
  handleSubmit: () => void;
}
interface DurationFieldProps {
  selectedDuration: number | null;
  setSelectedDuration: React.Dispatch<React.SetStateAction<number | null>>;
}
interface InputFieldProps {
  tokenAmount: number;
  setTokenAmount: React.Dispatch<React.SetStateAction<number>>;
  package: "unlock" | "lock";
  setPackage: React.Dispatch<React.SetStateAction<"unlock" | "lock">>;
}
const DurationDropdown: FC<DurationFieldProps> = ({
  selectedDuration,
  setSelectedDuration,
}) => {
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
        <option value="90">3 months (Monthly 1.2%)</option>
        <option value="180">6 months (Monthly 2%)</option>
        <option value="365">12 months (Monthly 3.5%)</option>
        <option value="540">18 months (Monthly 5%)</option>
        <option value="720">24 months (Monthly 7%)</option>
      </select>
    </div>
  );
};

const ConnectAndHowButtons: FC = () => {
  return (
    <div className="btn2-container">
      <button className="btn2 btn-how" onClick={()=>{window.open("https://coal-salary-0f7.notion.site/How-to-stake-BFM-tokens-88a761957cfe497d83efc301517c2865?pvs=25")}}>How to Stake</button>
      <w3m-button size="md" balance="hide" />
    </div>
  );
};
const DisconnectAndSubmitButtons: FC<SubmitButton> = ({ handleSubmit }) => {
  return (
    <div className="btn2-container">
      <w3m-button size="md" balance="hide" />
      <button className="stake" onClick={handleSubmit}>
        Stake
      </button>
    </div>
  );
};
const InputField: FC<InputFieldProps> = (props): JSX.Element => {
  const tokenAmount = props.tokenAmount;
  const setTokenAmount = props.setTokenAmount;
  const setSelectedPackage = props.setPackage;
  const selectedPackage = props.package;
  const handlePackageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPackage(event.target.value as "unlock" | "lock");
  };
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTokenAmount(event.target.value as unknown as number);
    console.log("tokenAmount = ", tokenAmount);
  }

  return (
    <>
      <div className="input-container">
        <label className="token-inp-label" htmlFor="token-amount">
          Please add an amount to stake
        </label>
        <input
          className="token-inp"
          value={tokenAmount}
          name="token-amount"
          type="number"
          onChange={handleInputChange}
        />
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
              Unlocked staking at 1%
            </label>
          </div>

          <div>
            <input
              type="radio"
              name="package"
              id="lock"
              value={"lock"}
              checked={selectedPackage === "lock"}
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
export {
  InputField,
  DurationDropdown,
  ConnectAndHowButtons,
  DisconnectAndSubmitButtons,
};
