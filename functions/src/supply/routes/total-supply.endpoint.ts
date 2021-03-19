import BigNumber from 'bignumber.js';

import { Request, Response } from 'express';
import { Endpoint, RequestType } from 'firebase-backend';

import { CAKE } from '../../contants/addresses';
import { getContract } from '../../utils/web3';

import bep20 from '../../abis/bep20.json';

const contract = getContract(bep20, CAKE);

const totalSupply = new Endpoint('totalSupply', RequestType.GET, async (req: Request, res: Response) => {
  const supply = await contract.methods.totalSupply().call();
  const number = new BigNumber(supply);
  
  return res.send({ total: number.dividedBy(new BigNumber(10).pow(18)).toNumber() });
});

export default totalSupply;
