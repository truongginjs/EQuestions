var questions = [];

let questionIndexs = []

const dirFile = 'questions.txt';

const getRandomQuestion = (stringArr, num = 5) => {
    const max = stringArr.length
    if (!isNaN(num) && num < 1) num = max / 2
    const indexs = new Array(num)
    let index = 0;
    if (stringArr.length - questionIndexs.length < num) {
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

const getQuestionsLocal = () => {
    return questions.split('\n')
        .filter(x => ['', null, ' '].indexOf(x) < 0)
        .map(x => x.split('#'));
};

const getQuestions = async () => {
    let rs = [];
    try {
        const response = await fetch(dirFile)
        const text = await response.text()
        const t = text.split('\n').filter(x => ['', null, ' '].indexOf(x) < 0);
        rs = t
            .map(x => x.split('#'));
    } catch (e) {
        console.log(e)
    }
    return rs;
}

const click = async () => {
    const numOfQuestion = 5;
    if(questions.length === 0)
        questions = await getQuestions();
        
    // const qs = await getQuestions();
    const result = getRandomQuestion(questions, numOfQuestion)
    if (result == null) {
        alert("Library of question is Full!");
        return;
    } let i = 0;
    const text = result.map((x) => {
        i++;
        return `
        <li class="list-group-item" type="button" 
        data-toggle="collapse" data-target="#CollapseAns${i}" 
        aria-expanded="false" aria-controls="CollapseAns${i}">${i}. ${x[0]}</li>
        <div class="collapse" id="CollapseAns${i}">
            <div class="card card-body" data-toggle="tooltip" data-placement="bottom" title="${x.length >= 3 ? x[2] : x.length >= 2 ? x[1] : x[0]}">
                <div class="font-italic text-success">
                ${x.length >= 2 ? x[1] : x[0]}
                </div>
            </div>
        </div>
        `
    }).join('')
    $('.content-data').html(text)
    $('#indexs').html(questionIndexs.join(', '));

}

$('#refresh-button').click(function (e) {
    e.preventDefault();
    click()
});

$('#reload-button').click(function (e) {
    e.preventDefault();
    questionIndexs = []
    $('#indexs').html('');
});
click()
