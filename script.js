function test(){
    //Retriving data.....
    var uid=document.getElementById("username").value;
    var email=document.getElementById("Emailaddress").value;
    var uniroll=document.getElementById("uni").value;
    //storing data...
    var user=localStorage.setItem("uid",uid);
    var Eid=localStorage.setItem("email",email);
    var unir=localStorage.setItem("uniroll",uniroll);
    //Retriving Store data and using it for calculation
    var user=localStorage.getItem("uid",uid);
    var Eid=localStorage.getItem("email",email);
    var unir=localStorage.getItem("uniroll",uniroll);
}