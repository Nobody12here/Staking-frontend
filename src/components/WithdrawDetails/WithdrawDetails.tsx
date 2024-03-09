import './WithdrawDetails.style.css'
function WithdrawDetails() {
  return (
    <>
      <table style={{color:"white"}}>
        <thead>
          <tr className='header'>
            
            <th>Profit</th>
            <th>Lockup</th>
            <th>Fees</th>
            <th>Locked on</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>$1000</td>
            <td>30 Days</td>
            <td>$20</td>
            <td>2024-03-06</td>
            <td>1000000000</td>
            <td>
              <button>Withdraw</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default WithdrawDetails;
