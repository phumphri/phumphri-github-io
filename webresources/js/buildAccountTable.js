function buildAccountTable() 
{
    //
    // Encode the user input as query parameters in a URL.
    var hostAndPort = location.host;
    var url = "http://" + hostAndPort + "/Accounts12/resources/accounts/all"
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
            st.value = "Account Table failed (404).  Bummer.";
            return;
        }
        
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200)
        {
            var responseText = request.responseText;
            
            try 
            {
                var jsonArray = JSON.parse(responseText);
            }
            catch (e)
            {
                st.value = "JSON.parse(resonseText) threw an error:  " + e.toString();
                return;
            }

            atd.style.height = ((screen.height) * 0.75) + "px";

            while (at1.hasChildNodes()) 
            {
                at1.removeChild(at1.lastChild);
            }

            var trHeadings = document.createElement("TR");
            
            var thCodeHeading = document.createElement("TH");
            var textNodeCodeHeading = document.createTextNode("Code");
            thCodeHeading.appendChild(textNodeCodeHeading);
            
            var thNameHeading = document.createElement("TH");
            var textNodePostHeading = document.createTextNode("Account Name");
            thNameHeading.appendChild(textNodePostHeading);
            
            trHeadings.appendChild(thCodeHeading);
            trHeadings.appendChild(thNameHeading);
            
            at1.appendChild(trHeadings);

            var accountCode = new Array();
            var accountName = new Array();
            
            var trTag = new Array();
            
            var tdCode = new Array();
            var tnCode = new Array();
            
            var tdName = new Array();
            var tnName = new Array();
            
            for (i in jsonArray)
            {
                var jsonObject = jsonArray[i];
                
                accountCode[i] = jsonObject.accountCode;
                
                accountName[i] = jsonObject.accountName;
                                
                trTag[i] = document.createElement("TR");
            
                tdCode[i] = document.createElement("TD");
                tnCode[i] = document.createTextNode(accountCode[i]);
                tdCode[i].appendChild(tnCode[i]);

                tdName[i] = document.createElement("TD");
                tnName[i] = document.createTextNode(accountName[i]);
                tdName[i].appendChild(tnName[i]);
            
            
                trTag[i].appendChild(tdCode[i]);
                trTag[i].appendChild(tdName[i]);
                trTag[i].setAttribute("class", "zebra");
                trTag[i].setAttribute("onclick", "selectAccount('" + accountCode[i] + "')");
            
                at1.appendChild(trTag[i]);
            }
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
        st.value = "Unsuccessful Account request:  " + request.readyState + "  " + request.status + ".  Call Patrick.";
    }
    
    request.open("GET", url, true);
    
    request.send(null);
}