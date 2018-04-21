function selectTransactionName() 
{
    switch(tc.value)
    {
        case "C":
            tn.value = "Credit";
            break;
        case "D":
            tn.value = "Debit";
            break;
        case "V":
            tn.value = "Void";
            break;
        case "X":
            tn.value = "Deleted";
            break;
        default:
            st.value = "Invalid Transaction Code:  " + tc.value;
            tn.value = "Void";
            break;
    }
}