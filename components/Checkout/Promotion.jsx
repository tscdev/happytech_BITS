import React, {useState} from 'react'
import Link from 'next/link'
import {Form} from 'react-bootstrap'
import CheckoutCart from './CheckoutCart'
import {useStateContext} from '../../context/StateContext'
import {toast} from 'react-hot-toast'

const PROMOTION = "WORLDCUP10"
const promo = 10;
const shipping_fee = 5

const Promotion = ({text, isEmpty}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [promoValue, setPromoValue] = useState('')
  const [checkPromo, setCheckPromo] = useState(false);
  const [isError, setIsError] = useState(true)
  const {cartItems, totalPrice} = useStateContext()


  //Check Promo
  const handlePromo = () => {
    if (promoValue !== PROMOTION) {
      setIsError(false)
      setCheckPromo(false)
      toast.error(`There is no ${promoValue} promotion`)
    }else{
      toast.success(`You have added your promotion ${PROMOTION}`)
      setCheckPromo(true)
      setIsError(true)
    }
  }

  //Calculate final price without promo
  const finalPrice = () => {
    let FINAL_PRICE_WITH_OUT_TAX = 0
    let FINAL_PRICE = 0
    if(checkPromo){
      FINAL_PRICE_WITH_OUT_TAX = totalPrice + shipping_fee - promo
    }else{
      FINAL_PRICE_WITH_OUT_TAX = totalPrice + shipping_fee
    }

    FINAL_PRICE = FINAL_PRICE_WITH_OUT_TAX + (FINAL_PRICE_WITH_OUT_TAX * 0.08)
    
    return FINAL_PRICE
  }

  return (
    <div className='container'>
      <div className='header-checkout'>
        <h2>Checkout</h2>
      </div>
      {isEmpty? (
        <>
        <div className='promo-box'>
          <p>{text}</p>
        </div>
        <Link href= './'>
          <button className='btn btn-secondary mt-4 fs-5 text'>Continue Shopping</button>
        </Link>
        </>
      ) : (
        <>
        <div className='row gap-3'>
          {/* Left section */}
          <div className='info-container px-5 border border-2 col-12 col-xxl-6'>
            <h3>Shipping Information</h3>
            <Form className='needs-validation'>
              <div className='form-floating py-2'>
                <input className='form-control' 
                required
                type="text" 
                placeholder='' 
                value={name} 
                onChange={(e) => setName(e.target.value)} />
                <label className='fs-5 text'>Full Name</label>
              </div>
              <div className='form-floating py-2'>
                <input className='form-control' 
                type="email" 
                placeholder='' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required />
                <label className='fs-5 text'>Email</label>
              </div>

              <div className='form-floating py-2'>
                <input className='form-control' 
                type="number" 
                placeholder='' 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required />
                <label className='fs-5 text'>Phone</label>
              </div>

              <div className='form-floating py-2'>
                <input className='form-control' 
                type="text" 
                placeholder='' 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required />
                <label className='fs-5 text'>Address</label>
              </div>
              <div className='form-floating py-2'>
                <input className='form-control' 
                type="text" 
                placeholder='' 
                value={note} 
                onChange={(e) => setNote(e.target.value)} />
                <label className='fs-5 text'>Note (Optional)</label>
              </div>
              <div>
                <button className='btn btn-secondary mt-2 px-2'>Check out</button>
              </div>
            </Form>
          </div>
          {/* Right section */}
          <div className='promo-box border border-2 col'>
            <div className='checkout-cart-container p-3'>
              <CheckoutCart cartItems={cartItems} />
            </div>
            <hr />
            <div className='row'>
              <div className='form-floating col-lg-9 mt-2'>
                  <input className= {`form-control ${isError? '': 'form-alert'}`}
                    type="text" 
                    placeholder='' 
                    value={promoValue} 
                    onChange={(e) => setPromoValue(e.target.value)} />
                  <label className='fs-5 text mx-3'>Promotion</label>
              </div>
              <div className='col py-2'>
                <button className='btn btn-secondary mt-2 px-4 py-2 fs-5 text' onClick={handlePromo}>Apply</button>
              </div>
              {!isError?(
              <p className='fs-5 text-danger pl-2 pt-2'>* This promotion is not exist</p>) : null}
            </div>
            {/* Total */}
            <hr />
            <div className='d-flex justify-content-between'>
              <h4 className='fs-4 text-secondary'>Total Products Price:</h4>
              <p>{totalPrice.toFixed(2)}$</p>
            </div>
            <div className='d-flex justify-content-between'>
              <h4 className='fs-4 text-secondary'>Shipping Fee:</h4>
              <p>{shipping_fee}.00$</p>
            </div>
            {checkPromo? (
              <div className='d-flex justify-content-between'>
                <h4 className='fs-4 text-secondary'>Promotion:</h4>
                <p className='text-danger'>-{promo}.00$</p>
              </div>
            ):null}
            <div className='d-flex justify-content-between'>
              <h4 className='fs-4 text-secondary'>Tax:</h4>
              <p>8%</p>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h4 className='fs-4 text-'>Total Payment:</h4>
              <p>{finalPrice().toFixed(2)}</p>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default Promotion