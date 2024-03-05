import { FC } from 'react';
import './StakingCard.style.css'
const Card:FC=():JSX.Element=>{
    return(
        <>
            <div className='main-container'>
                <div className='button-container'>
                    <button className='btn'>Stake</button>
                    <button className='btn btn-withdraw'>Withdraw</button>
                </div>
                <div className='text2-contaier'>
                    <h5 className='t1 heading2'>$BFM Crypto Staking</h5>
                    <p className='t1 text2'>Total in $BFM Staking</p>
                    <h3  className='t1 total-amount'>0 $BFM</h3>
                </div>
                <div className='btn2-container'>
                    <button className='btn2 btn-how'>How to Stake</button>
                    <button className='btn2 btn-buy'>Connect Wallet</button>
                </div>
            </div>
        </>
    )
}

const StakingCard:FC = ()=> {
  return (
    <>
      <div className="heading-container">
        <h3 className='text'>
          <span className='bold-text'>Seize Opportunities</span>
          , Grow Your Wealth Through $BFM Crypto
          Staking
        </h3>
      </div>
      <div className='card-container'>
        <Card/>
      </div>
      
    </>
  );
}

export default StakingCard;
