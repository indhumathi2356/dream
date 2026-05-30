const urlParams=new URLSearchParams(window.location.search);
document.getElementById("token").value=urlParams.get("token");
document.getElementById(".reset").addEventListener("sumbit",async(e)=>{
    e.preventDefault();
    const password=document.getElementById("password").value;
    const token=document.getElementById("token").value;
    const response=await fetch("http://localhost:5000/reset",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            token:token,
            password:password,
        })
    });
    const result=await response.text();
    document.getElementById("message").innerText=result;
});