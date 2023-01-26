let groceryList = [];
let groceryListSimplfy = [];

function initialize() {
  const addButton = document.querySelector("#add1");
  addButton.addEventListener("click", add_element);
  const recordRemove = document.querySelector("#remove1");
  recordRemove.addEventListener("click", removeElementByName);
  const moveUpButtons = document.querySelector("#moveUp1");
  moveUpButtons.addEventListener("click", moveItemsUp);
  const moveDownButtons = document.querySelector("#moveDown1");
  moveDownButtons.addEventListener("click", moveItemsDown);
}
let add_element = () => {
  document.getElementById("list").value !== ""
    ? groceryList.push(document.getElementById("list").value)
    : alert("You can't enter anything empty or a duplicate");
  document.getElementById("list").value = "";
  findMatchingStrings(groceryList);
  display();
};
function findMatchingStrings(arr) {
  groceryListSimplfy = [];
  groceryList.sort(function (a, b) {
    var indexA = arr.indexOf(a);
    var indexB = arr.indexOf(b);
    if (indexA !== indexB) {
      return indexA - indexB;
    }
    return a.localeCompare(b);
  });
  var stringCount = {};
  for (var i = 0; i < arr.length; i++) {
    var string = arr[i].toLowerCase();
    if (!stringCount[string]) {
      stringCount[string] = 1;
    } else {
      stringCount[string]++;
    }
  }
  for (var key in stringCount) {
    groceryListSimplfy.push(stringCount[key] + " " + key);
  }
  return groceryListSimplfy;
}
function display() {
  const container = document.querySelector(".containerA"); // container div where items will be displayed
  container.textContent = "";
  for (let i = 0; i < groceryListSimplfy.length; i++) {
    const item = document.createElement("div"); // create a new div for each item
    item.innerHTML = "Item " + (i + 1) + ": " + groceryListSimplfy[i]; // set the content of the div to the current item
    item.classList.add("item");
    container.appendChild(item); // add the item div to the container
  }
}

let removeElementByName = () => {
  let name = document.getElementById("remove").value.toLowerCase();
  if (name !== "") {
    let index = -1;
    for (let i = 0; i < groceryList.length; i++) {
      if (groceryList[i].toLowerCase() === name) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      groceryList.splice(index, 1);
    }
  }
  document.getElementById("remove").value = "";
  findMatchingStrings(groceryList);
  display();
};

let selectedIndices = [];
function moveItemsUp() {
  let itemMoving = document.querySelectorAll("#moveUp")[0].value - 1;
  if (!selectedIndices.includes(itemMoving)) {
    selectedIndices.push(itemMoving);
  } else {
    let index = selectedIndices.indexOf(itemMoving);
    itemMoving = selectedIndices[index];
  }
  if (itemMoving != 0) {
    let tempElement = groceryList[itemMoving - 1];
    groceryList[itemMoving - 1] = groceryList[itemMoving];
    groceryList[itemMoving] = tempElement;
    selectedIndices[selectedIndices.indexOf(itemMoving)] = itemMoving - 1;
    document.querySelectorAll("#moveUp")[0].value = itemMoving;
  } else {
    alert("You have reached the top of the list");
  }
  findMatchingStrings(groceryList);
  display();
}
let selectedIndices1 = [];

function moveItemsDown() {
  let itemMoving = document.querySelectorAll("#moveDown")[0].value - 1;
  if (!selectedIndices1.includes(itemMoving)) {
    selectedIndices1.push(itemMoving);
  } else {
    let index = selectedIndices1.indexOf(itemMoving);
    itemMoving = selectedIndices1[index];
  }
  var toIndex = Number(itemMoving) + 1;
  if (toIndex < groceryList.length) {
    let tempElement = groceryList[toIndex];
    groceryList[toIndex] = groceryList[itemMoving];
    groceryList[itemMoving] = tempElement;
    selectedIndices1[selectedIndices1.indexOf(itemMoving)] = toIndex;
    document.querySelectorAll("#moveDown")[0].value = toIndex + 1;
  } else {
    alert("You have reached the end of the list");
  }
  findMatchingStrings(groceryList);
  display();
}
