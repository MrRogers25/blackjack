(function($) {
  $(function() {
    $('#run').on('click', function(){
      $('#data').empty();
      var multiArray = [];
      for (var i = 2; i <= 11; i++) {
        multiArray[i] = [];
      }
      for (var i = 2; i <= 11; i++) {
        for (var j = 4; j <= 20; j++) {
          if (j >= 17){multiArray[i][j] = 'stand';}
          else if ((j >= 13) && (i <= 6)){multiArray[i][j] = 'stand';}
          else if ((j == 12) && ((i <= 6) && (i >= 4))){multiArray[i][j] = 'stand';}
          else {multiArray[i][j] = 'hit';}
        }
      }
      $('#table').empty();
      var table = $('#table');
      var row, cell;
      for(var j=4; j<= 20; j++){
          row = $( '<tr />' );
          table.append( row );
          for(var i=2; i<= 11; i++){
              cell = $('<td>'+multiArray[i][j]+'</td>')
              row.append( cell );
          }
      }
      
      var bankroll = $('#bankroll').val();
      bankroll
      var bet = $('#bet').val();
      $('#data').append('<div>'+bankroll+'</div>');
      var dealerWins = 0;
      var playerWins = 0;
      var x = 0;
      while(x < 1){
        var blackjack = {deck: [], deckIndex: 0, dealer: {cards: [], total: 0}, gambler: {cards: [], total: 0}}
        blackjack.deck = shuffleDeck();
        $('#data').append('<div>'+blackjack.deck+'</div>');

        //index where the dealer will shuffle and start a new deck, between 34-44
        var reshuffleIndex = Math.floor(Math.random() * 11) + 34; 
        
        while(blackjack.deckIndex <= 0){
          blackjack.dealer = {cards: [], total: 0};
          blackjack.gambler = {cards: [], total: 0};
          dealCard(blackjack, blackjack.gambler);
          $('#data').append('<div>playerArray: '+blackjack.gambler.cards+'</div>');
          dealCard(blackjack, blackjack.dealer);
          $('#data').append('<div>dealerArray: '+blackjack.dealer.cards+'</div>');
          dealCard(blackjack, blackjack.gambler);
          $('#data').append('<div>playerArray: '+blackjack.gambler.cards+'</div>');
          if(blackjack.gambler.total == 21){
            $('#data').append('<div>PLAYER BLACKJACK!!</div>');
            continue;
          }
          var decision = getDecision(multiArray, blackjack.dealer.total, blackjack.gambler.total);
          $('#data').append('<div>decision: '+decision+'</div>');
          if(decision == 'hit'){
            dealCard(blackjack, blackjack.gambler);
            $('#data').append('<div>playerArray: '+blackjack.gambler.cards+'</div>');
            decision = getDecision(multiArray, blackjack.dealer.total, blackjack.gambler.total);
          }
          dealCard(blackjack, blackjack.dealer);
          if(blackjack.dealer.total == 21){
            $('#data').append('<div>playerArray: '+blackjack.gambler.cards+'</div>');
            $('#data').append('<div>dealerArray: '+blackjack.dealer.cards+'</div>');
            $('#data').append('<div>DEALER BLACKJACK!!</div>');
            continue;
          }
          
          $('#data').append('<div>playerArray: '+blackjack.gambler.cards+'</div>');
          $('#data').append('<div>dealerArray: '+blackjack.dealer.cards+'</div>');
        }
        
        x++;
      }
    });

    function shuffleDeck(){
      var deck = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11];
      var deckLength = $(deck).length;
      for(var i = deckLength - 1 ; i > 0 ; i--){
        var n = Math.floor(Math.random() * (i + 1));
        var temp = deck[n];
        deck[n] = deck[i];
        deck[i] = temp;
      }
      return deck;
    }
      
    function getDecision(multiArray, dealerHand, playerHand){
      var decision;
      if(multiArray[dealerHand][playerHand] !== undefined){
        decision = multiArray[dealerHand][playerHand];
      }
      else{
        decision = 'stand';
      }
      return decision;
    }

    function dealCard(blackjack, player){
      player.total = player.total + blackjack.deck[blackjack.deckIndex];
      player.cards.push(blackjack.deck[blackjack.deckIndex]);
      blackjack.deckIndex++;
    }
  }); 
})(jQuery); 