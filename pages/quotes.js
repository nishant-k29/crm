const axios = require('axios')
import { Formik, Form } from 'formik'
import quoteStyles from '../styles/Quote.module.css'
import MyTextInput from  '../FormControls/MyTextInput'
import MyMaskedTextInput from  '../FormControls/MyMaskedTextInput'
import MyDateInput from  '../FormControls/MyDateInput'
import MyTextArea from  '../FormControls/MyTextArea'
import {useContext} from 'react'
import {ItemsContext} from '../contexts/ItemsListArrayContext'
import ItemsList from '../components/ItemsList'
import CurrentDate, {currentLongDate} from '../components/CurrentDate'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const handlePrintQuote = async () => {
  try{
    const res = await axios.post('/api/generateQuotePdf')
    if(res.status === 200){
      window.open("/temp/quote.pdf")
    }

  }catch(err){
    alert(err)
  }
}

const quotes = () => {
  const [itemRowArray, setItemRowArray] = useContext(ItemsContext)
  return (
    <>
      <Formik
        initialValues={{
          quoteNumber: '',
          fullName: '',
          cName: '',
          streetAddress:'',
          city: '',
          state:'',
          zip: '',
          deliveryDate:'',
          pickupDate: '',
          instructions: '',
          note:'',
        }}

        onSubmit={ async (values, { setSubmitting, resetForm }) => {
          try{
            await sleep(500);
            // alert(JSON.stringify(values, null, 2))
            const res = await axios.post('/api/quote', { values, itemRowArray, currentLongDate })
            if(res.status === 200){
              // alert("Saved")
            }
          }catch(err){
            alert(err)
          }
        }}
      >
      {
        ({isSubmitting}) => (
          <Form>
          <div className={quoteStyles.section}>
            <div className={quoteStyles.container}>
              <div className={quoteStyles.section1}>
                <div className={quoteStyles.left}>
                  <h5>Customer Personal Details</h5>
                  <MyTextInput
                    label="Name"
                    name="fullName"
                    type="text"
                    autoComplete="off"
                  />
                  <MyTextInput
                    label="Company"
                    name="cName"
                    type="text"
                    autoComplete="off"
                  />
                </div>

                <div className={quoteStyles.right}>
                  <MyTextInput
                    label="Quote Number # "
                    name="quoteNumber"
                    type="text"
                    autoComplete="off"
                  />
                  <CurrentDate 
                    name="date"
                  />
                </div>
              </div>
              <div className={quoteStyles.section2}>
                <div className={quoteStyles.left}>
                  <h5>Delivery Details</h5>
                  <MyTextInput
                    label="Street Address"
                    name="streetAddress"
                    type="text"
                    autoComplete="off"
                  />
                  <MyTextInput
                    label="City"
                    name="city"
                    type="text"
                    autoComplete="off"
                  />
                  <MyTextInput
                    label="State"
                    name="state"
                    type="text"
                    autoComplete="off"
                  />
                  <MyMaskedTextInput
                    label="Zip Code"
                    name="zip"
                    mask="99999"
                    maskChar=" "
                    type='tel'
                    autoComplete="off"
                  />
                </div>
                <div className={quoteStyles.right}>
                  <MyDateInput
                    id="deliveryDate"
                    name="deliveryDate"
                    dateFormat="MMMM d, yyyy"
                    label="Delivery Date" 
                    autoComplete="off"
                  />
                  <MyDateInput
                    name="pickupDate"
                    dateFormat="MMMM d, yyyy"
                    label="Pickup Date"
                    autoComplete="off"
                  />
                  <MyTextArea
                    label="Customer Instructions"
                    name="instructions"
                    type="text"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className={quoteStyles.section5}>
                <ItemsList />
              </div>
              <hr />
              <div className={quoteStyles.section6}>
                <MyTextArea
                  label="Note"
                  name="note"
                  type="text"
                  className={quoteStyles.section6TextArea}
                />
              </div>
              <div className={quoteStyles.section7}>
                <button type="submit">Save</button>
                <button>Email</button>
                <button onClick={handlePrintQuote} type="button">Preview Quote</button>
                <button>Create Sales Order</button>
                <button type="reset">Clear</button>
              </div>
            </div>
          </div>
        </Form>
        )
      }
      </Formik>
    </>
  )
}

export default quotes