import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { routerTransitionRight, shakeAnimate } from 'src/app/app.animation';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-receiver-crypto',
  templateUrl: './receiver-crypto.component.html',
  styleUrls: ['./receiver-crypto.component.css'],
  animations: [
    routerTransitionRight,
    shakeAnimate
  ]
})
export class ReceiverCryptoComponent implements OnInit {


  receiveBTC = false;
  receiveETH = false;
  receiveTether = false;
  receiveLTC = false;
  receiveMonero = false;
  receiveBCH = false;
  receiveRipple = false;
  receiveStellar = false;
  receiveMaker = false;
  receiveTrueUSD = false;
  receiveOmiseGo = false;
  receiveZilliqa = false;
  receiveBasicAttention = false;
  receiveHolo = false;


  receive = false;
  logo: string;
  serverURL: string;
  title: string;
  symbol: string;
  contract: string;

  receiverAddress: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private receiveDailogRef: MatDialogRef<ReceiverCryptoComponent>,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.serverURL = environment.currencyImage;
    if (data) {

      this.translate.setDefaultLang('en');

      // receive crypto
      this.receive = data.receive;
      this.logo = this.serverURL + data.logos;
      this.receiverAddress = data.addresss;
      this.title = data.titles;
      this.symbol = data.symbols;
      this.contract = data.contracts;
    }
  }

  ngOnInit() {
  }

  copyAddress(address: any) {
    const el = document.createElement('textarea');
    el.value = address;
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.snackBar.open
      ('Your address copied successfully!', 'X', { duration: 3000, panelClass: ['info-snackbar'], horizontalPosition: 'end' });
  }

  printAddress() {
    window.print();
  }

  shareOnGmail() {
    const mailSubject = `My ${this.title} address`;
    let url = '';
    url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=${mailSubject}&body=${this.receiverAddress}`;
    window.open(url, '_blank');
  }

  connectToExplorer(address: any) {
    let url = '';
    if (this.symbol === 'BTC') {
      url = `https://www.blockchain.com/btc/address/${address}`;
    }
    if (this.symbol === 'ETH') {
      url = `https://etherscan.io/address/${address}`;
    }
    if (this.symbol === 'USDT') {
      url = `https://omniexplorer.info/address/${address}`;
    }
    if (this.symbol === 'LTC') {
      url = `https://chain.so/address/LTC/${address}`;
    }
    if (this.symbol === 'XMR') {
      url = `https://monerohash.com/explorer/search?value=${address}`;
    }
    if (this.symbol === 'BCH') {
      url = `https://explorer.bitcoin.com/bch/address/${address}`;
    }
    if (this.symbol === 'XRP') {
      url = `https://bithomp.com/explorer/${address}`;
    }
    if (this.symbol === 'XLM') {
      url = `https://stellarchain.io/address/${address}`;
    }
    if (this.contract) {
      url = `https://etherscan.io/token/${this.contract}?a=${address}`;
    }
    window.open(url, '_blank');
  }




  closeDilaog() {
    this.receiveDailogRef.close();
  }

}
