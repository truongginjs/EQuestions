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
    const result = getRandomQuestion(qs, numOfQuestion);
    
    show.html(result.map(x=>{
        return `<p>${x}</p>`

    }))
    
    console.log(result)
}
click()