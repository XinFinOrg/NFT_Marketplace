import { action, computed, makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from "uuid";
import BigNumber from "bignumber.js";
import app from '../../app';
import xdc3 from 'xdc3';
import { postForSaleTransaction } from '../../utils/helpers/xdc3';

export interface IXDC3Store {
  address: string;
  chainId: number;
  balance: BigNumber;
  isXinPay: boolean;
  x3: xdc3;
}
export class XDC3Store implements IXDC3Store {
  id = uuidv4();
  address = '';
  isXinPay = false;
  chainId = 50;
  x3 = new xdc3();
  balance = new BigNumber(0);

  constructor() {
    makeAutoObservable(this);
  }

  @computed convertXDCToWEI = (ethToConvert: string): string => {
    return this.x3.utils.toWei(ethToConvert);
  }
  @computed convertWEIToXDC = (weiToConvert: string): string => {
    return this.x3.utils.fromWei(weiToConvert);
  }
  @action setCurrentBalance = async (balanceToSet: BigNumber): Promise<void> => {
    this.balance = balanceToSet;
  }
  @action setNewUser = (walletLoaded: Record<string, any>): void => {
    this.address = walletLoaded.address;
    this.chainId = walletLoaded.chainId;
    app.nft.loadAllNFTs();
  }
  @action handleDisconnect = (): void => {
    this.address = "";
  }
  @action setXinPay = (newValue: boolean): void => {
    this.isXinPay = newValue;
  }
  @computed isConnected = (): boolean => {
    return this.address.length > 0;
  }
  @action postForSale = async (): Promise<void> => {
    await postForSaleTransaction();
  }
}

export const xdc3Store = new XDC3Store();

