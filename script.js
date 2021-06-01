const show = $('.content-data')
const dirFile = 'questions.txt';
const getRandomQuestion = (stringArr, num = 5) => {
    const max = stringArr.length
    if (!isNaN(num) && num < 1) num = max / 2
    const indexs = new Array(num)
    let index = 0;
    while (index < num) {
        const v = Math.floor(Math.random() * max)
        if (indexs.indexOf(v) < 0) {
            indexs.push(v)
            index++;
        }
    }

    const result = indexs.map(i => stringArr[i])

    return result;
}

const getQuestions = async () => {
    let questions = [];
    try{
        const response = await fetch(dirFile)
        const text = await response.text()
        questions = text.split('\n').filter(x=>['',null,' '].indexOf(x)<0);
    }catch(e){
        console.log(e)
    }
    return questions;
}

const click =async()=>{
    const numOfQuestion = 5;
    const qs = await getQuestions();
    const result = getRandomQuestion(qs, numOfQuestion)
    let i =0;
    const text = result.map((x)=>`<li class="list-group-item">${++i}. ${x}</li>`).join('')
//     let text = `<div class="card" style="width: 18rem;">
//     <h4 class="card-title">5 Questions English Everyday</h4>
//     <img class="card-img-top" src="/resources/card-img.jpg" alt="Card image cap">
//     <ul class="list-group list-group-flush">
//     ${t}
//     </ul>
//   </div>`
    show.html(text)
}
click()

$('#refresh-button').click(function (e) { 
    e.preventDefault();
    click()
});