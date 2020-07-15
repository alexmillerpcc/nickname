let names = [];
let input;
let fileload;
let display;
let instruction;
let button;
let randomName;
let keepButton;
let newButton;
let nameDisplay;
let index;
let saveDisplay;
let saveButton;
let butBool;

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  //background(220);
  
  fileload = createFileInput(fileLoaded);
  fileload.position(20,0);
  
  display = createElement('h2', "Character Name Loader");
  display.position(20, 120);
  
  instruction = createElement('h2', "Load a file /\\ or start new \\/");
  instruction.position(20, 20);
  
  input = createInput();
  input.position(20, display.y+70);
  
  button = createButton('Add Name');
  button.position(input.x + input.width, input.y);
  button.mousePressed(addName);
  
  nameDisplay = createElement('h2', "Hit New for a Random Name");
  nameDisplay.position(20, input.y+50);
  
  randomName = createInput();
  randomName.position(20, nameDisplay.y+70);
  
  newButton = createButton('New');
  newButton.position(randomName.x + randomName.width, randomName.y);
  newButton.mousePressed(pullNewName);
  
  keepButton = createButton('Keep');
  keepButton.position(newButton.x + newButton.width, newButton.y);
  keepButton.mousePressed(keepName);
  
  saveDisplay = createElement('h2', "Click to Save your List");
  saveDisplay.position(20, randomName.y+50);
  
  saveButton = createButton('Save');
  saveButton.position(20, saveDisplay.y+50);
  saveButton.mousePressed(saveFile);
  
}

function draw() {   
  noLoop();
}

function pullRandomNum(){
  num = random(0,names.length);
  num = floor(num);
  return num;
}

function arraySwapNPull(idx){
  tempVal = names[(names.length - 1)];
  names[(names.length - 1)] = names[idx];
  names[idx] = tempVal;
  names = shorten(names);
}

function printArray(){
  for(let i=0; i<names.length;i++){
     print(names[i]);  
   }
  print('\n');
}

function fileLoaded(data){
  if (data.type == "text"){
    names = split(data.data, '\n');
    shorten(names);
    instruction.html(data.name + " successfully loaded.");
    butBool = 1;
  } else {
    instruction.html("Incorrect file type.");
  }
  
}

function addName(){
  let name = input.value();
  append(names, name);
  print(names);
  display.html(name + ' added to the list.');
  input.value('');
  if (!butBool){
    instruction.html("New list started.");
  }
}

function pullNewName(){
  index = pullRandomNum();
  randomName.value(names[index]);
  print(index);
}

function keepName(){
  nameDisplay.html(names[index] + ' pulled from the list.');
  arraySwapNPull(index);
  randomName.value('');  
}

function saveFile(){
  saveStrings(names, 'names.txt');
}