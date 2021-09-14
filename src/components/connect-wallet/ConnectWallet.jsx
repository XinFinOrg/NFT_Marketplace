import React from 'react';
import app from '../../app';
import { XdcConnect, GetNativeBalance, Connect } from "xdc-connect";

const ConnectWallet = () => {

const handleAddressChange = async(walletLoaded)  => {
if (walletLoaded.connected) {
	app.xdc3.setXinPay(walletLoaded.loader === 'xinpay');
    app.xdc3.setNewUser(walletLoaded);
    app.xdc3.setCurrentBalance(GetNativeBalance());
}
};

return (
  <div>
        <XdcConnect
            btnClass="btn btn-warning"
            btnName="Click To Connect Wallet"
			onClick={()=>Connect()}
		    onConnect={(wallet) => handleAddressChange(wallet)}
        />  
 </div>
);
};
export default ConnectWallet;