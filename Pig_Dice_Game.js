
let scores, roundScore, activePlayer, dice,gamePlaying;

function gameInitialization(){   
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;

    document.getElementById("myAudio").pause();
    document.getElementById("myAudio").currentTime = 0;

    document.querySelector('.dice').style.display = 'none'; // Get the first element in the document with '...'

    document.getElementById('score_0').textContent = '0';
    document.getElementById('score_1').textContent = '0';
    document.getElementById('current_0').textContent = '0';
    document.getElementById('current_1').textContent = '0';

    document.getElementById('name_0').textContent = 'Player 1';
    document.getElementById('name_1').textContent = 'Player 2';

    document.querySelector('.player_0_panel').classList.remove('winner');
    document.querySelector('.player_1_panel').classList.remove('winner');
    document.querySelector('.player_0_panel').classList.remove('active');
    document.querySelector('.player_1_panel').classList.remove('active');
    document.querySelector('.player_0_panel').classList.add('active');
}
gameInitialization();

document.querySelector('.btn_roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1. Random number
        let dice = Math.floor(Math.random() * 6) + 1;
            
        // 2. Display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'; 
        diceDOM.src = 'image/dice-' + dice + '.png';

        // 3. Update the round score if the rolled number was NOT a one
        if(dice !== 1){
            // Add round score
            roundScore += dice;
            document.getElementById('current_' + activePlayer).textContent = roundScore;
        }else{
            nextPlayer();           
        }
    }   
});

document.querySelector('.btn_hold').addEventListener('click', function(){
    if(gamePlaying){
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.getElementById('score_' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= 50){
            document.getElementById('name_' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player_' + activePlayer + '_panel').classList.add('winner');
            document.querySelector('.player_' + activePlayer + '_panel').classList.remove('active');
            gamePlaying = false;
            // Musice would be played when one player wins the game
            document.getElementById("myAudio").play();
        }else{
            nextPlayer();
        }
    }
});
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current_0').textContent = '0';
    document.getElementById('current_1').textContent = '0';

    document.querySelector('.player_0_panel').classList.toggle('active');
    document.querySelector('.player_1_panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';  
}
//document.querySelector('.btn_new').addEventListener('click', gameInitialization);

//document.querySelector('#current_' + activePlayer).textContent = dice;
//document.querySelector('#current_' + activePlayer).innerHTML = '<em>'+ dice +'</em>'; // emphasized text
//let x = document.querySelector('#score_0').textContent;

