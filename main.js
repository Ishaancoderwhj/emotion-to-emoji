//https://teachablemachine.withgoogle.com/models/JEEntRvHw/

prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
png_quality:90

});

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';

    });


}

console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JEEntRvHw/model.json",modelloaded);

function modelloaded(){
    console.log("model loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction_1;
    speak_data_2="And the second prediction is "+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        document.getElementById("result_emotion_name").innerHTML=prediction_1;
        document.getElementById("result_emotion_name2").innerHTML=prediction_2;
        speak();

        if(prediction_1=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }

        if(prediction_1=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }

        if(prediction_1=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }

        if(prediction_2=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }

        if(prediction_2=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }

        if(prediction_2=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }

}