

//Object with function properties (called methods when on an object) & //array properties

let thanksList = {
    thanks: [],

    addThanks: function(thankText) {
      this.thanks.push({
        thankText: thankText,
        completed: false
      });

    },

    changeThanks: function(position, thankText) {
      this.thanks[position].thankText = thankText;

    },

    deleteThanks: function(position) {
      this.thanks.splice(position, 1);

    },

    toggleCompleted: function(position) {
      let thanks = this.thanks[position];
      thanks.completed = !thanks.completed;

    },

    toggleAll: function() {
      let totalThanks = this.thanks.length;
      let completedThanks = 0;

      this.thanks.forEach(function(thank) {
        if(thank.completed === true){
          completedThanks++;
       }
     });

      this.thanks.forEach(function(thank){
        if(completedThanks === totalThanks) {
          thank.completed = false;
        } else{
          thank.completed = true;
        }
      });
  }
};

    let handlers = {
      addThanks: function() {
        let thankText = document.getElementById("addThanksTextInput");
         thanksList.addThanks(thankText.value);
         thankText.value = '';
         view.displayThanks();
       },
       changeThanks: function() {
        let position = document.getElementById("giveChangePositionNumber");
        let thankText = document.getElementById("changeThanksText");
        thanksList.changeThanks(position.valueAsNumber, thankText.value);
        position.value = '';
        thankText.value = '';
        view.displayThanks();
      },
      deleteThanks: function(position) {
       thanksList.deleteThanks(position);
       view.displayThanks();
     },
     toggleCompleted: function() {
       let position = document.getElementById("giveToggleCompletedPositionNumber");
      thanksList.toggleCompleted(position.valueAsNumber);
      position.value='';
      view.displayThanks();
    },
    toggleAll: function() {
         thanksList.toggleAll();
         view.displayThanks();
       }
    };

    let view = {
      displayThanks: function(){
        let thanksUl = document.querySelector('ul');
        thanksUl.innerHTML = '';

        thanksList.thanks.forEach(function(thank, position){
          let thanksLi = document.createElement('li');

          let thankTextWithCompletion = '';

          if (thank.completed === true) {
            thankTextWithCompletion = '(x) ' + thank.thankText + " ";
            } else {
              thankTextWithCompletion = '( ) ' + thank.thankText + " ";
          };

          thanksLi.id = position;
          thanksLi.textContent = thankTextWithCompletion;
          thanksLi.appendChild(this.createDeleteButton());
          thanksUl.appendChild(thanksLi);
        }, this);
      },
      createDeleteButton: function(){
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
      },
      setUpEventListeners: function(){
        var thanksUl = document.querySelector('ul');
        thanksUl.addEventListener('click', function(event){

          //Get element clicked
          let elementClicked = event.target;

          //Check if delete button
          if (elementClicked.className === 'deleteButton'){
            //Run handlers.deleteToDo(position)
            handlers.deleteThanks(parseInt(elementClicked.parentNode.id));
          }
        });
     }
   };

   view.setUpEventListeners();
