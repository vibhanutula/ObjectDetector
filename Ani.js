img = "";
Status = "";
Objects = [];

function preload() {
    img = loadImage("Cat.jpg");
}

function setup() {
    canvas = createCanvas(650, 450);
    canvas.position(420, 150);

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("staus").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    Status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.log(error);
    }

    else {
        console.log(results);
        Objects = results;
    }
}

function draw() {
    image(img, 0, 0, 650, 450);

    if(Status != "") {
        for(i = 0; i < Objects.length; i++) {
            document.getElementById("staus").innerHTML = "Status: Objects Detected";

            fill("#023b11");
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percent + "%" , Objects[i].x + 30, Objects[i].y + 70);
            noFill();
            stroke("#023b11");
            rect(Objects[i].x + 20 , Objects[i].y , Objects[i].width + 20 , Objects[i].height + 100);
        }
    }
}
