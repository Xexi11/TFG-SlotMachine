import { parseEther } from "ethers/lib/utils";
import { casino_abis } from "./abis";
import { casino_addres } from "./address";
import useContracts from "./useContracts";

export const useCasino = () => {
  const { getContract } = useContracts();

  const getCasinoContract = async () => {
    return await getContract(casino_addres, casino_abis);
  };

  const takeTokens = async (tokens_Number) => {
    const casino_recent = await getCasinoContract();
    let tokensinPhantom = tokens_Number / 100;
    let tokens = await casino_recent.buyTokens(
      parseEther(tokens_Number.toString()),
      { value: parseEther(tokensinPhantom.toString()) }
    );
    await tokens.wait();
  };

  const withdrawTokens = async (tokensToWithdraw) => {
    const casino_recent = await getCasinoContract();
    let tokens = await casino_recent.withdrawAlltokens(
      parseEther(tokensToWithdraw.toString())
    );
    await tokens.wait();
  };

  return {
    getCasinoContract,
    withdrawTokens,
    takeTokens,
  };
};
