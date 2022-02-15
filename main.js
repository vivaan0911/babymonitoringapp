song="";
objects=[];
status1="";

function preload(){
    song = loadSound("alarm.mp3");
}

function setup(){
    canvas= createCanvas(640,420);
    canvas.center();

    video= createCapture(VIDEO);
    video.size(640,420);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Detecting Objects";
}

function modelLoaded(){
    console.log("model loaded");
    status1= true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects= results;
}

function draw(){
    image(video, 0, 0, 640, 420);

    if(status1 != ""){

        r=random(255);
        g=random(255);
        b=random(255);

        objectDetector.detect(video, gotResults);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML= "Objects Detected";
            fill(r,g,b);
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("baby_found").innerHTML= "Baby Found";
                song.stop();
            } else{
                document.getElementById("baby_found").innerHTML= "Baby Not Found";
                song.play();
            }
        }
    }
}