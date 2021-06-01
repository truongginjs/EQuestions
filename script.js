var questions = `
I always to make it count
You cherish those moment
I’ll take it to my grave
I’m playing this one close to the chest
I’m gonna keep it on the down low
I must say in hindsight, it was a happy moment I ever had
The jacket goes with anything
You lost me
You completely lost me there
Did I lose you ?
hello
`;

let questionIndexs = []

const dirFile = 'questions.txt';

const getRandomQuestion = (stringArr, num = 5) => {
    const max = stringArr.length
    if (!isNaN(num) && num < 1) num = max / 2
    const indexs = new Array(num)
    let index = 0;
    if(stringArr.length-questionIndexs.length<num) {
        return null;
    }
    while (index < num) {
        const v = Math.floor(Math.random() * max)
        if (questionIndexs.indexOf(v) < 0) {
            indexs.push(v)
            questionIndexs.push(v)
            index++;
        }
    }

    const result = indexs.map(i => stringArr[i])

    return result;
}

const getQuestions = () => {
    return questions.split('\n').filter(x => ['', null, ' '].indexOf(x) < 0);
};

const getQuestionsOld = async () => {
    let rs = [];
    try {
        const response = await fetch(dirFile)
        const text = await response.text()
        rs = text.split('\n').filter(x => ['', null, ' '].indexOf(x) < 0);
    } catch (e) {
        console.log(e)
    }
    return rs;
}

const click = async () => {
    const numOfQuestion = 5;
    const qs = getQuestions();
    // const qs = await getQuestions();
    const result = getRandomQuestion(qs, numOfQuestion)
    if(result==null) {
        alert("Library of question is Full!");
        return;
    }let i = 0;
    const text = result.map((x) => `<li class="list-group-item">${++i}. ${x}</li>`).join('')
    $('.content-data').html(text)
    $('#indexs').html(questionIndexs.join(', '));

}

$('#refresh-button').click(function (e) {
    e.preventDefault();
    click()
});
click()
