const submit_btn = document.getElementById('submit_btn')

submit_btn.addEventListener('click',async(e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const subject = document.getElementById('subject').value
  const message = document.getElementById('message').value

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    const res = await fetch("/contact",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            'Accept': 'application/json'
        },
        body:JSON.stringify({
            name,email,subject,message
        }),
    });
    const data = await res.json()
    if(data.status==200){
      alert("Thanks for responding");
      window.location.reload()
      name="";email="";subject="";message=""
    }
    else if(data.status==422)
    {
      alert("Fill the form properly")
    }
    else{
        alert("Please try again. Some error occured")
    }
  }
  else{
    alert("You have entered an invalid email address!")
    return (false)
  }
})