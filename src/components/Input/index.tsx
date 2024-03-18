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
        <option value="180">6 months</option>
        <option value="365">12 months</option>
        <option value="540">18 months</option>
        <option value="720">24 months</option>
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
              Unlocked staking at 2.5%
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
