import React from "react";
import {ethers} from "ethers";

class NftCollections extends React.Component<any, any> {

    constructor(props: {provider: ethers.providers.StaticJsonRpcProvider}){
        super(props);
        this.state = {
            collections: [],
            rarity : 6,
            page: 1,
            balance: 0,
            ethPrice: 0
        }
    }

    componentDidMount() {
        this.refreshBalance();
        this.getNftCollection();
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    refreshBalance(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };
        let url = "https://api.etherscan.io/api?module=account&action=balance&address=ADDRESS&tag=latest&apikey=API-KEY";
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(etherResponse => {
                this.setState({balance: etherResponse.result})
            })
        this.fetchEthPrice();
    }

    fetchEthPrice(){
        const requestOptions = {
            method: 'GET'
        };

        let url = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=API_KEY"
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(ethResponse => {
                this.setState({ethPrice: ethResponse.result.ethusd})
            })
    }

    getNftCollection(){
        // TODO : calling opensea API to fetch the nfts from a collection to fill collections state
    }

    render(){
        return (
            <div>
                <div style={{padding: "15px", margin: "auto", display: 'flex'}}>
                    Balance : <h2 style={{letterSpacing: "2px" , paddingRight: "10px", paddingLeft: "10px", marginTop: "-5px"}}>
                    {this.state.balance &&
                    Number(ethers.utils.formatEther(this.state.balance))
                        .toLocaleString('en-US', { maximumFractionDigits: 5 })
                    } </h2> Eth
                </div>
                <div style={{display: "flex"}}>
                    <div style={{padding: "15px", margin: "auto", display: 'flex', width: '50%'}}>
                        Eth price : <h2 style={{letterSpacing: "2px" , paddingRight: "10px", paddingLeft: "10px", marginTop: "-5px"}}>
                        {Number(this.state.ethPrice).toFixed(2)}</h2> USD
                    </div>
                    <div style={{padding: "15px", margin: "auto", display: 'flex', width: '50%'}}>
                        Total : <h2 style={{letterSpacing: "2px" , paddingRight: "10px", paddingLeft: "10px", marginTop: "-5px"}}>
                        {((Number(ethers.utils.formatEther(this.state.balance)) * Number(this.state.ethPrice)) ).toFixed(2)}€</h2>
                    </div>
                </div>

                <div style={{display:"flex"}}>
                    <div style={{padding: "15px", margin: "auto", width:"60%"}}>
                        {this.state.collections.length === 0 ? <div> NO nft </div> : this.state.collections.map((nft: any, index: any) => {
                            return <div key={index} style={{padding:"2px"}}>
                                <label> NFT [<label style={{color:"dodgerblue"}}>{nft.collection}</label>]</label>
                                <label> | NFT ID [<label style={{color:"dodgerblue"}}>{nft.nftId}</label>]</label>
                                <label> | on Market [<a target="_blank" href={nft.url} style={{color: "dodgerblue"}}> MarketPlace </a>]</label>
                                <label> | on Etherscan [<a target="_blank" href={nft.hash} style={{color: "dodgerblue"}}> </a>]</label>
                            </div>
                        })}
                    </div>
                </div>
            </div>

        )
    }
}

export default NftCollections;
