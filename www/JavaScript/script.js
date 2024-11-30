class StickyNote {
    constructor(posX, posY) {
        //posX, posY and contents are currently unused
        this.posX = posX;
        this.posY = posY;
        this.contents = "";

        //creating the note element
        this.element = document.createElement('div');
        this.element.className = 'sticky_note';
        this.element.style.transform = `translate(-50%, -6%)`
        this.element.innerHTML = 
        `
        <div class="bar"></div>
        <div class="pin">
            <div class="highlight"></div>
        </div>
        <textarea class="notes"> </textarea>
        <div class="options">
            <button class="icon" id="close" style="background-color: red;">X</button>
            <button class="icon" id="changeColorRed" style="background-color: lightcoral;"></button>
            <button class="icon" id="changeColorBlue" style="background-color: lightblue;"></button>
        </div>
        `;
        
        //adding functionality to the note
        let close = this.element.querySelector('#close');
        close.addEventListener('click', this.close.bind(this));

        
        let bar = this.element.querySelector('.bar');
        var showOptions = false;
        bar.addEventListener('click', () => {
            //moving selected note to stay on the top
            this.moveUp();
            this.showOptions(showOptions);
            showOptions = !showOptions;
        });

        document.body.appendChild(this.element);

        //note movement
        let pin = this.element.querySelector('.pin');
        pin.addEventListener('mousedown', (event) => {
            //moving selected note to stay on the top
            this.moveUp();
            this.managePin(pin);
        });

        
    } //end of constructor

    showOptions(showOptions) {
        let options = this.element.querySelector('.options');
        
        if (showOptions == false) 
            options.style.display = 'flex'; 
        else
            options.style.display = 'none';
    }

    managePin(pin) {
        //upinning the note Pin to signal note movement
        pin.style.width = '25px';
        pin.style.height = '25px';
        pin.style.top = '2px';
        pin.style.boxShadow = '0px 1px 10px 4px black';
        pin.querySelector('.highlight').style.left = '5px';
        pin.querySelector('.highlight').style.top = '4px';
        pin.querySelector('.highlight').style.width = '4px';
        pin.querySelector('.highlight').style.height = '4px';

        //moving the note, listener added to document 
        //to ALWAYS stay on top of the cursos
        document.addEventListener('mousemove', this.move);
        
        //pinning the note Pin back to its original position
        pin.addEventListener('mouseup', (event) => {
            pin.style.width = '18px';
            pin.style.height = '18px';
            pin.style.top = '5px';
            pin.style.boxShadow = '0px 1px 4px 1px black';
            pin.querySelector('.highlight').style.left = '4px';
            pin.querySelector('.highlight').style.top = '3px';
            pin.querySelector('.highlight').style.width = '3px';
            pin.querySelector('.highlight').style.height = '3px';
            
            document.removeEventListener('mousemove', this.move);
        });
    }

    move = (event) => {
        this.element.style.left = event.clientX + 'px';
        this.element.style.top = event.clientY + 'px';
    }

    moveUp() {
        //moving selected note to stay on the top
        this.element.style.zIndex = currentZIndex;
        currentZIndex++;
    }

    close() {
        this.element.remove();
    }

} //end of class StickyNote

function createNewNote() {
    let posX = 0;
    let posY = 0;
    //posX and posY currently unused
    var note = new StickyNote(posX, posY);
}

//this is needed to order the z-index of the notes
currentZIndex = 1;


