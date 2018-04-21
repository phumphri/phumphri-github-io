function selectAccount(accountCode) 
{
    var hostAndPort = location.host;
    //
    st.value = "Getting Account " + accountCode + ".  Please wait.";
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
    var url = "http://" + hostAndPort + "/Accounts12/resources/accounts/select/" + accountCode;
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
            st.value = "Could not find Account " + accuntCode + " (404).  Bummer.";
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
            
            ac.value = jsonObject.accountCode;    
            an.value = jsonObject.accountName;
            
            pn.value = jsonObject.payeeName;
            
            var tempTransactionAmount = jsonObject.accountAmount;
            ta.value = tempTransactionAmount.toLocaleString("en-US", { minimumFractionDigits: 2 });

            tm.value = jsonObject.accountMemo;

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
        st.value = "Unsuccessful request:  " + request.readyState + "  " + request.status + ".  Call Patrick.";
    }
    request.open("GET", url, true);
    request.send(null);

}