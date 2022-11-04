import React, {useEffect} from "react";
import "@fontsource/inter";
import NftCollections from "./nft-collections";

export default function App() {


  useEffect(() => {

  }, []);

  return (
      <div>
          <div style={{paddingLeft: "15px", paddingRight: "15px", margin: "0",display: "flex", justifyContent: "space-between"}}>
              <span>
                  <h3>OpenSea Collections Aggregation</h3>
              </span>
              <span>
                  <a target="_blank" href={"https://opensea.io/fr/account"} style={{color: "dodgerblue"}}> <h3>Inventory</h3> </a>
              </span>
          </div>
          <hr/>
        <div style={{padding: "15px", margin: "auto"}}>
          <NftCollections/>
        </div>
      </div>
  )
}