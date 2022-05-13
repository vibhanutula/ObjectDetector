img = "";
Status = "";
Objects = [];

function preload() {
    img = loadImage("StudyTab.jpg");
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

            fill("#0d00ff");
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percent + "%" , Objects[i].x - 143 , Objects[i].y );
            noFill();
            stroke("#0d00ff");
            rect(Objects[i].x - 280 , Objects[i].y - 120 , Objects[i].width , Objects[i].height);
        }
    }
}
