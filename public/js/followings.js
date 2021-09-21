const submitBtn = document.getElementById('submitBtn')
const user = document.getElementById('userName')
const user_Data =''
const row = document.getElementById('rows')
const loader = document.getElementById("loader")
var count=0

loader.style.display='none'
row.style.display='none'
function millionCheck(followers_count){
    if (followers_count<1000)
    {
        return 'Followers: '+followers_count
    }
    followers_count=followers_count/1000
    followers_count_before=followers_count.toString().split(".")[0]
    followers_count_after=followers_count.toString().split(".")[1]
    if (followers_count_before>=1000)
    {
        return 'Followers: '+followers_count_before/1000 + ' M'
    }
    else
    {
        return 'Followers: '+followers_count + ' K'
    }
}


function delete_div(){
    var iconBox = document.getElementsByClassName('align-items-stretch')
        if (iconBox){
            while(iconBox.length > 0){
                iconBox[0].remove()
            }
        }
}

function profileVerifiedCheck(value)
{
    if (value==true)
        return "images/twitter_verified.svg"
    return "images/dot.png"
}

submitBtn.addEventListener('click',async function submit(e){
    e.preventDefault()
    count+=1
    if (count>1)
    {
        delete_div();
    }
    // row1.style.display='none'
    // row2.style.display='none'
    // row3.style.display='none'
    row.style.display='flex'
    let userName = user.value
    if (userName==="")
    alert("Please fill the input properly")
    else{
        // loader.style.display='block'
        const res = await fetch("/searches",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                userName
            }),
        });
        const data = await res.json()
        if (data.length===0)
            alert('Profile Not Found')
        else{
            data.sort(function (a, b) {
                return b.followers_count-a.followers_count;
            });
            const userVal = data[0].id_str
            const res2 = await fetch("/following",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    userVal
                }),
            });
            const data3= await res2.json()
            if(data3.message=='Rate limit exceeded')
                alert('API limit exceeded. Please try after some time')
            else{
                if (data3.ids.length==0)
                    alert(userName+" is not Following Any other user")
                else{
                    alert("Got the Followings of "+data[0].name)
                    for (var i=0;i<data3.ids.length;i++)
                    {
                        const userID = data3.ids[i]
                        if(userID.toString().length < 14){
                            const res3 = await fetch("/findID",{
                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json",
                                },
                                body:JSON.stringify({
                                    userID
                                }),
                            });
                            const data2= await res3.json()
                            var align_items_stretch = document.createElement('div')
                            align_items_stretch.className='col-lg-4 col-md-6 d-flex align-items-stretch'
                
                            var icon_box = document.createElement('div')
                            icon_box.className='icon-box'
                
                            var icon = document.createElement('div')
                            icon.className='icon'
                
                            var profileImage = document.createElement('img')
                            profileImage.className='bx bxl-dribbble profileImage'
                
                            var title = document.createElement('h4')
                            title.className = 'title'
                
                            var verified = document.createElement('img')
                            verified.className = 'verified'
                
                            var screenName = document.createElement('p')
                            screenName.className = 'screenName'
                
                            var description = document.createElement('p')
                            description.className = 'description'
                
                            var Location = document.createElement('p')
                            Location.className = 'Location'
                
                            var Followers = document.createElement('p')
                            Followers.className = 'Followers'
                
                            var tweetOn = document.createElement('p')
                            tweetOn.className = 'tweetOn'
                
                            var latestTweet = document.createElement('a')
                            latestTweet.className='latestTweet'
                            latestTweet.target='_blank'
                
                
                            // append
                            icon.appendChild(profileImage)
                            icon_box.appendChild(icon)
                            icon_box.appendChild(title)
                            icon_box.appendChild(verified)
                            icon_box.appendChild(screenName)
                            icon_box.appendChild(description)
                            icon_box.appendChild(Location)
                            icon_box.appendChild(Followers)
                            icon_box.appendChild(tweetOn)
                            icon_box.appendChild(latestTweet)
                            
                            align_items_stretch.appendChild(icon_box)
                            row.appendChild(align_items_stretch)
                
                
                
                            //Putting Contents
                            verified.src = profileVerifiedCheck(data2[0].verified)
                            profileImage.src=data2[0].profile_image_url
                            title.innerText=data2[0].name
                            screenName.innerText='@'+data2[0].screen_name
                            description.innerText=data2[0].description
                            Location.innerText=data2[0].location
                            Followers.innerText=millionCheck(data2[0].followers_count)
                            try{
                                tweetOn.innerHTML = '<p style= "color:rgb(40, 0, 104)">Latest Tweet: <br>On:- '+data2[0].status.created_at+'<br></p>'
                                latestTweet.innerText =  data2[0].status.text
                                latestTweet.href=data2[0].status.entities.media[0].expanded_url
                            }
                            catch(err)
                            {
                                latestTweet.style.pointerEvents="none"
                                latestTweet.style.cursor="default"
                                latestTweet.href=''
                            }
                        }
                    }
                }
            }
        }
    }
})