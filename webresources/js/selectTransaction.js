function selectTransaction(transactionID) 
{
    var hostAndPort = location.host;
    //
    st.value = "Getting Transaction " + transactionID + ".  Please wait.";
    //
    // If the browser does not support the XMLHttpRequest object, do nothing.
    if (!window.XMLHttpRequest)
    {
        st.value = "This browser does not support AJAX.  Try another.";
        return;
    }
    //   
    //
    // Encode the user input as query parameters in a URL.
    var url = "http://" + hostAndPort + "/Transactions12/resources/transactions/select/" + transactionID;
    //
    // Fetch the contents of that URL using the XMLHttpRequest object.
    var request = new XMLHttpRequest();
    if (!request)
    {
        st.value = "new XMLHttpRequest() returned null.  Call Patrick.";
        return;
    }
    //
    request.onreadystatechange = function ()
    {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 404)
        {
            st.value = "Could not find Transactio " + transactionID + " (404).  Bummer.";
            return;
        }
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200)
        {
            var responseText = request.responseText;
            try 
            {
                var jsonObject = JSON.parse(responseText);
            }
            catch (e)
            {
                st.value = "JSON.parse(resonseText) threw an error:  " + e.toString();
                return;
            }
            
            tk.value = jsonObject.transactionKey;
            cn.value = jsonObject.checkNumber;
                
            var checkDateLong = jsonObject.transactionDate;
            var checkDateObject = new Date(checkDateLong);
            var checkDateString = checkDateObject.toLocaleDateString();
            cd.value = checkDateString

            var postDateLong = jsonObject.postDate;
            var postDateObject = new Date(postDateLong);
            var postDateString = postDateObject.toLocaleDateString();
            pd.value = postDateString

            ac.value = jsonObject.accountCode;    
            an.value = jsonObject.accountName;
            
            tc.value = jsonObject.typeCode;
            tn.value = jsonObject.typeName;
            
            pn.value = jsonObject.payeeName;
            
            var tempTransactionAmount = jsonObject.transactionAmount;
            ta.value = tempTransactionAmount.toLocaleString("en-US", { minimumFractionDigits: 2 });

            tm.value = jsonObject.memo;

            a1.value = jsonObject.addressLine1;
            a2.value = jsonObject.addressLine2;
            a3.value = jsonObject.addressLine3;
            a4.value = jsonObject.addressLine4;
            a5.value = jsonObject.addressLine5;

            st.value = "Ready";
            
            return;
        }
        
        if (request.readyState == XMLHttpRequest.UNSENT)
        {
            return;
        }
        
        if (request.readyState == XMLHttpRequest.OPENED)
        {
            return;
        }
        
        if (request.readyState == XMLHttpRequest.HEADERS_RECEIVED)
        {
            return;
        }
        if (request.readyState == XMLHttpRequest.LOADING)
        {
            return;
        }
        st.value = "Unsuccessful NextKey request:  " + request.readyState + "  " + request.status + ".  Call Patrick.";
    }
    request.open("GET", url, true);
    request.send(null);

}