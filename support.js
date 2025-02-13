function toggleAnswer(index) {
    const answers = document.querySelectorAll(".answer");
    if (answers[index].style.display === "none" || answers[index].style.display === "") {
        answers[index].style.display = "block";
    } else {
        answers[index].style.display = "none";
    }
}

const help=document.querySelector(".help");
const details=document.querySelector(".details");
setTimeout(()=>{
    help.style.display="block";
},0);

let sections=document.querySelectorAll('section');
window.onscroll =() =>{
    sections.forEach((section) => {
        let top=window.scrollY;
        let offset=section.offsetTop - 250 ;
        let height=section.offsetHeight;
        if(top >= offset && top < offset + height){
            section.classList.add ('show-animate');
        }
        //if you want to repeat the scrolling effect use this
        // else{
        //     section.classList.remove('show-animate');
        // }
})}

