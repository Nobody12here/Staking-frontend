import { formatEther } from "viem";


async function readUserInformations(
  userInformation: Array<unknown>,
  setTotalStaked: React.Dispatch<React.SetStateAction<string>>
) {
  if (userInformation) {
    console.log(userInformation)
    const TotalTokenStaked = (userInformation[0] as bigint[]).reduce(
      (a: bigint, b: bigint) => a + b,
      0n
    );
    console.log(TotalTokenStaked);
    setTotalStaked(formatEther(TotalTokenStaked));
  }
}

export { readUserInformations };
