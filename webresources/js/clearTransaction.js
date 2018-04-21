function clearTransaction() 
{
    cn.value = "";  // Check Number
      
    var checkDateObject = new Date();
    var checkDateString = checkDateObject.toLocaleDateString();
    cd.value = checkDateString;  // Check Date
    
    var postDateObject = new Date();
    var postDateString = postDateObject.toLocaleDateString();
    pd.value = postDateString;  // Post Date
    
    ac.value = "";  // Account Code
    an.value = "";  // Account Name
    
    tc.value = "C";       // Transaction Code
    tn.value = "Credit";  // Transaction Name
    
    pn.value = "";  // Payee Name
    
    ta.value = "0.00";  // Transaction Amount
    
    tm.value = "";  // Transaction Memo
    
    a1.value = "";  // Address Line 1
    a2.value = "";  // Address Line 2
    a3.value = "";  // Address Line 3
    a4.value = "";  // Address Line 4
    a5.value = "";  // Address Line 5
    
    selectNextKeyValue();
    
    st.value = "Ready";
}