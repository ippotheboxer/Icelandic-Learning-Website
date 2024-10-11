const matches = {
    '🍎': 'epli',
    '🍐': 'pera',
    '🍌': 'banani',
    '🍊': 'appelsína',
    '🍋': 'sítróna',
    '🍓': 'jarðarber',
    '🍇': 'vínber',
    '🍒': 'kirsuber'
 }

const emojis = ["🍎", "🍎", "🍐", "🍐", "🍌", "🍌", "🍊", "🍊", "🍋", "🍋", "🍓", "🍓", "🍇", "🍇", "🍒", "🍒"]

var shuf_emojis = emojis.sort(() => (Math.random() > .5)  ? 2:-1);
for (let i=0; i<emojis.length ;i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuf_emojis[i]

    box.onclick = function() {
        this.classList.add('boxOpen');
        setTimeout(function(){
            if(document.querySelectorAll('.boxOpen').length > 1){
                if(document.querySelectorAll('.boxOpen')[0].innerHTML === document.querySelectorAll('.boxOpen')[1].innerHTML) {
                    document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch');
                    document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch');

                    let fruitEmoji = document.querySelectorAll('.boxOpen')[0].innerHTML;
                    if (fruitEmoji in matches) {
                        let fruitName = matches[fruitEmoji];
                        updateH2(fruitName);
                        playSoundMatch(fruitName);
                    } else {
                        console.log("Error with fruit name.")
                    }

                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');

                    if(document.querySelectorAll('.boxMatch').length == emojis.length) {
                        document.querySelector('h1').innerText = 'Well done!';
                    }
                    } else {
                        document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                        document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');
                    }
                }
        },500)
        document.querySelector('h2').innerText = 'Find more pairs!';
    }
    document.querySelector('.game').appendChild(box);
}

function playSoundMatch(fruitEmoji) {
    var audio = new Audio("public/audio/" + fruitEmoji + ".ogg");
    audio.play();
}

function updateH2(fruitName) {
    document.querySelector('h2').innerText = fruitName;
}
