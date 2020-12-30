var refSentenceValue;
var mySentenceValue;
var output;
var algoReturn
$(document).ready(function () {
    main()
});

function main() {
    console.log("Initializtion")
}

function buttonClick() {

    // Get element values
    refSentence = $("#refSentence").val()
    otherSentences = $("#otherSentences").val()
    selectedWordIndex = $("#selectedWordIndex").val()
    output = $("#output")

    // Output HTML
    let myOutputHTML = "";

    // Get each sentence
    let eachSentence = otherSentences.split("\n")


    // Split the reference sentence
    let refSentenceArray = refSentence.split(" ")

    // Loop through other sentences
    for (let i = 0; i < eachSentence.length; i++) {
        // Split other sentence (one at a time)
        let otherSentenceArray = eachSentence[i].split(" ")

        // Send to the algo for detection
        myOutputHTML += consecutiveOrRemote(refSentenceArray, otherSentenceArray, parseInt(selectedWordIndex)) + "<br>"
    }
    //let otherSentenceArray = eachSentence[0].split(" ")
    //myOutputHTML += consecutiveOrRemote(refSentenceArray, otherSentenceArray, parseInt(selectedWordIndex)) + "<br>"

    output.html(myOutputHTML)

}

// Detects if a sentence has a change (remote or consecutive). Input: refSentenceArray: tokenized input sentence. sentenceArray: tokenized input sentence to compare to. selWordIndex: index of the selected word
function consecutiveOrRemote(refSentenceArray, sentenceArray, selWordIndex) {
    let isRemote = false
    let changed = []

    let myRet = ""

    // Detect changes in the sentence and note its indices
    for (let i = 0; i < refSentenceArray.length; i++) {
        try {
            if (refSentenceArray[i] == sentenceArray[i]) {
                changed.push(0)
            }
            else {
                changed.push(1)
            }
        }
        catch (e) {
            changed.push(1)
        }
    }

    // Detect if remote or not
    for (let i = selWordIndex + 1; i < changed.length - 1; i++) {
        if (changed[i] != changed[i + 1]) {
            isRemote = true
            break
        }
    }

    // Return the output before the sel word
    for (let i = 0; i < selWordIndex; i++) {
        myRet += "<span class='normal'>" + sentenceArray[i] + "</span> "
    }

    // Return the output after the sel word
    for (let i = selWordIndex; i < sentenceArray.length; i++) {
        if (refSentenceArray[i] == sentenceArray[i]) {
            myRet += "<span class='normal'>" + refSentenceArray[i] + "</span> "
        }
        else if (changed[i] == 1) {
            myRet += "<span class='bold'>" + sentenceArray[i] + "</span> "
        }
        else {
            myRet += "<span class='normal'>" + sentenceArray[i] + "</span> "
        }
    }

    if (isRemote) {
        myRet += "<span class='label'>--- REMOTE ----</span>"
    }
    else {
        myRet += "<span class='label'>--- CONSECUTIVE ----</span>"
    }

    myRet += "<br>" + changed + "<br>"

    return myRet

}