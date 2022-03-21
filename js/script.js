/*
1     Fetch request to fetch 12 random amployees from randomuser.me api
1.2   parses the response object to JSON object
1.3   fetches the result object from the parsed JSON response
1.4   `generateEmployees` function creates the HTML in index file from the fetched data
1.5   in case of failed requestes logs error message on to console
*/

fetch('https://randomuser.me/api/?results=12&nat=us&inc=name,email,phone,location,dob,picture&noinfo')  //1
  .then(response => response.json())              //1.2
  .then(dataObj => dataObj.results)               //1.3
  .then(data => generateEmployees(data))          //1.4
  .catch(error => console.log("oopsie", error));  //1.5

/*
1     'generateEmployees' function creates HTML to display employee cards from the JSON `data` parameter
2     'generateModal' function creates the HTML for the Modal window
*/

function generateEmployees(data){

  const grid = document.getElementById('gallery');

  for (var i = 0; i < data.length; i++) {

    let empName = `${data[i].name.first} ${data[i].name.last}`;
    let card = document.createElement('div');
    card.className = 'card';
    card.id = i + 1;
    card.setAttribute('onclick', `displayModal(event, 'card-${i+1}')`)
    grid.appendChild(card);

    let imgContainer = document.createElement('div');
    imgContainer.className = 'card-img-container';
    imgContainer.id = i + 1;
    card.appendChild(imgContainer);

    let img = document.createElement('img');
    img.className = 'card-img';
    img.src = data[i].picture.large;
    img.alt = name;
    imgContainer.appendChild(img);

    let textContainer = document.createElement('div');
    textContainer.className = 'card-info-container';
    card.appendChild(textContainer);

    let h3 = document.createElement('h3');
    h3.id = 'name';
    h3.className = 'card-name cap';
    h3.textContent = empName;
    textContainer.appendChild(h3);

    let para1 = document.createElement('p');
    para1.className = 'card-text';
    para1.textContent = data[i].email;
    textContainer.appendChild(para1);

    let para2 = document.createElement('p');
    para2.className = 'card-text cap';
    para2.textContent = data[i].location.city;
    textContainer.appendChild(para2);
  };
  generateModal(data)
}

function generateModal(data) {
  const overlay = document.getElementById('overlay');

  for (var i = 0; i < data.length; i++) {
    let empName = `${data[i].name.first} ${data[i].name.last}`;

    let card = document.createElement('div');
    card.className = 'modal hidden';
    card.id = 'card-' + (i + 1);
    overlay.prepend(card);

    let closer = document.createElement('button');
    closer.type = 'button'
    closer.id = 'modal-close-btn';
    closer.className = 'modal-close-btn';
    closer.setAttribute('onclick', `closer('card-${i + 1}')`);
    closer.innerHTML = '<strong>X</strong>';
    card.appendChild(closer);

    let modal = document.createElement('div');
    modal.className = 'modal-info-container';
    card.appendChild(modal);

    let img = document.createElement('img');
    img.className = 'modal-img';
    img.src = data[i].picture.large;
    img.alt = 'profile picture';
    modal.appendChild(img);

    let h3 = document.createElement('h3');
    h3.id = 'name';
    h3.className = 'modal-name cap';
    h3.textContent = empName;
    modal.appendChild(h3);

    let para1 = document.createElement('p');
    para1.className = 'modal-text';
    para1.textContent = data[i].email;
    modal.appendChild(para1);

    let para2 = document.createElement('p');
    para2.className = 'modal-text cap';
    para2.textContent = data[i].location.city;
    modal.appendChild(para2);

    let line = document.createElement('hr');
    modal.appendChild(line);

    let para3 = document.createElement('p');
    para3.className = 'modal-text';
    para3.textContent = data[i].phone;
    modal.appendChild(para3);

    let para4 = document.createElement('p');
    para4.className = 'modal-text';
    para4.textContent = `${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}`;
    modal.appendChild(para4);

    let para5 = document.createElement('p');
    para5.className = 'modal-text';
    para5.textContent = data[i].dob.date.slice(0, 10).replaceAll('-', '/');
    modal.appendChild(para5);
  };
}

/*
1     'displayModal' function will diplay the modal card for the employee the user clicks on
1.1   'returnNumb' function gets the employee number. this is used to set the modal navigation buttons.
1.2   Removes the hidden class from the modal overlay div.
1.3   Removes the hidden class from the modal employee card.
1.4   'naviArrows' function sets the navigation buttons for next and previous employee relative to the employee displayed
*/

function displayModal(event, aid) {                     //1
  let braid = returnNumb(aid);                          //1.1
  const overlay = document.getElementById('overlay');
  const cardy = document.getElementById(aid);

  overlay.classList.remove('hidden');                   //1.2
  cardy.classList.replace('hidden', 'show');            //1.3

  naviArrows(braid, aid);                               //1.4
}

/*
1     'naviArrows' function sets the navi arrows buttons everytime time the buttons are clicked to
      display the next and previous employee in the list
1.1   converts the x parameter to number
1.2   'xid' variable contains the current employee displayed equal to id parameter passed to the function
1.3   set the onclick attibute with `xWife` function to display the previous employee
1.4   sets the onclick attribute with `nxtWife` function to display the next employee
1.5   the conditional statement displays or hides next and previous navigation buttons when the displayed
      employee is either first or last in the list
*/

function naviArrows(x, id){                             //1
  let z = parseInt(x);                                  //1.1
  let xid = id;
  const left = document.getElementById('modal-prev');
  const right = document.getElementById('modal-next');
  let leftid = `card-${z - 1}`;
  let rightid = `card-${z + 1}`;
  left.setAttribute('onclick', `xWife('${leftid}', '${xid}')`)            //1.3
  right.setAttribute('onclick', `nxtWife('${rightid}', '${xid}')`)        //1.4

  if (z == 1) {
    left.classList.remove('btn');                                     //1.5
    left.classList.add('hidden');
  } else {
    left.classList.remove('hidden');
    left.classList.add('btn');
  }
  if (z == 12) {
    right.classList.add('hidden');
    right.classList.remove('btn');
  } else {
    right.classList.remove('hidden');
    right.classList.add('btn');
  }
}

/*
`returnNumb` function return the number at the end of the 6 or 7 character long string
*/

function returnNumb(str){
  if (str.length == 6) {
    let fstr = str.charAt(5);
    let numb = parseInt(fstr);
    return numb;
  }
  if (str.length == 7) {
    let fstr = str.slice(5);
    let numb = parseInt(fstr);
    return numb;
  }
}

/*
`xWife` function displays the previous employee
*/

function xWife(idx, idp) {
  let xid = idx;
  let pid = idp;
  let braid = returnNumb(xid);
  const outsite = document.getElementById(pid);
  const insite = document.getElementById(xid);

  outsite.style.animation = 'xmoveright 1s forward';
  insite.classList.replace('hidden', 'show');
  insite.style.animation = 'nxmoveright 1s forward';
  outsite.classList.replace('show', 'hidden');

  naviArrows(braid, xid)
}

/*
`nxtWife` function displays the next employee
*/

function nxtWife(idx, idp) {
  let nxid = idx;
  let pid = idp;
  let braid = returnNumb(nxid);
  const outsite = document.getElementById(pid);
  const insite = document.getElementById(nxid);
  console.log(outsite);
  outsite.style.animation = 'xmoveLeft 1s forward';
  insite.classList.replace('hidden', 'show');
  insite.style.animation = 'nxmoveLeft 1s forward';
  outsite.classList.replace('show', 'hidden');

  naviArrows(braid, nxid)
}

/*
`closer` function closes the modal window
*/

function closer(aid) {
  const overlay = document.getElementById('overlay');
  const cardy = document.getElementById(aid);
  cardy.classList.add('hidden');
  overlay.classList.add('hidden');
}

/*
Event listener addes to search input field which searches the employee list on keyup event or
as the user types the name
*/

searchbar = document.getElementById('searchbar');

searchbar.addEventListener('keyup', search);

/*
1     'search' function searches the name inputted bu the user in the employee list
1.1   using 'forEach' loop for the element containing name of the employee  is matched to user input
1.2   depending on whether the item in the loop contains the user search value the conditional statement
      add or removes hidden class to the parent element
*/

function search() {                                 //1
  let searchVal = searchbar.value.toLowerCase();
  const searchField = document.querySelectorAll('#gallery .card-name');

  searchField.forEach((item) => {                   //1.1
    let text = item.textContent;
    let child = item.parentNode;

    if (item.textContent.toLowerCase().search(searchVal) == -1) {         //1.2
      if(child.parentNode.classList.contains('hidden') == false) {
        child.parentNode.classList.add('hidden');
      }
    } else {
      if (child.parentNode.classList.contains('hidden'))
      child.parentNode.classList.remove('hidden');
    }
  })
}
