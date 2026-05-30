document.getElementById(".container").addEventListener("sumbit",async(e)=>{
    e.preventDefault();
    const email=document.getElementById("email").value;
    const response=await fetch("http://localhost:5000/forgot",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
        })
    });
    const result=await response.text();
    document.getElementById("message").innnerText=result;
});
