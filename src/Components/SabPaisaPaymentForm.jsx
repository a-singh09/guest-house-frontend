import React, { useEffect, useState } from 'react';

const SabPaisaPaymentForm = () => {
    const [formData, setFormData] = useState({
        payerName: '',
        payerEmail: '',
        payerMobile: '',
        clientTxnId: '', 
        amount: '',
        amountType: 'INR', 
        clientCode: 'YOUR_CLIENT_CODE', 
        transUserName: 'YOUR_USERNAME',
        transUserPassword: 'YOUR_PASSWORD', 
        callbackUrl: 'YOUR_CALLBACK_URL', 
        channelId: 'W', 
    });
    const [responseData, setResponseData] = useState();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const encryptFormData = (formData) => {
        const {
            payerName, payerEmail, payerMobile, clientTxnId,
            amount, clientCode, transUserName, transUserPassword,
            callbackUrl, amountType
        } = formData;
        const encData = `payerName=${payerName.trim()}&payerEmail=${payerEmail.trim()}&payerMobile=${payerMobile.trim()}&clientTxnId=${clientTxnId.trim()}&amount=${amount.trim()}&amountType=${amountType.trim()}&clientCode=${clientCode.trim()}&transUserName=${transUserName.trim()}&transUserPassword=${transUserPassword.trim()}&callbackUrl=${callbackUrl.trim()}&udf1=NA&udf2=NA&udf3=NA&udf4=NA&udf5=NA&udf6=NA&udf7=NA&udf8=NA&udf9=NA&udf10=NA&udf11=NA&udf12=NA&udf13=NA&udf14=NA&udf15=NA&udf16=NA&udf17=NA&udf18=NA&udf19=NA&udf20=NA&programId=NA&mcc=NA&channelId=${formData.channelId.trim()}&transDate=NA`;
        return Encryptor.encrypt(authKey.trim(), authIV.trim(), encData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const encryptedData = encryptFormData(formData); 
        const requestBody = new URLSearchParams();
        requestBody.append('encData', encryptedData);
        requestBody.append('clientCode', formData.clientCode); 
        try {
            const response = await fetch('https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1', {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });
            const responseData = await response.json();
            setResponseData(responseData);
            console.log('Response from SabPaisa:', responseData);
            // Handle response accordingly
        } catch (error) {
            console.error('Error submitting data to SabPaisa:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="payerName" placeholder="Payer Name" value={formData.payerName} onChange={handleChange} required />
            <input type="email" name="payerEmail" placeholder="Email" value={formData.payerEmail} onChange={handleChange} required />
            <input type="tel" name="payerMobile" placeholder="Mobile Number" value={formData.payerMobile} onChange={handleChange} required />
            <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
            <select name="amountType" value={formData.amountType} onChange={handleChange}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
            </select>
            {/* Add other form fields as needed */}
            <button type="submit">Pay Now</button>
        </form>
    );
};

export default SabPaisaPaymentForm;
