const currentLocation = location.href
const menuItem = document.querySelectorAll('.nav-link')


for (var i=0;i<menuItem.length;i++)
{
    if(menuItem[i].href === currentLocation )
    {
        menuItem[i].className='active'
    }
}
