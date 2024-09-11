$(document).ready(function() {
    Survey.StylesManager.applyTheme("modern");

    var surveyJSON = {
        "pages": [
            {
                "name": "page1",
                "title": "Register",
                "elements": [
                    {
                        "type": "text",
                        "name": "bookedbyName",
                        "title": "Name",
                        "isRequired": true
                    },
                    {
                        "type": "text",
                        "name": "bookbyemail",
                        "title": "Email",
                        "isRequired": true
                    },
                    {
                        "type": "dropdown",
                        "name": "mentorName", 
                        "title": "Mentors",
                        "isRequired": true,
                        "choices": [] 
                    },
                    {
                        "type": "dropdown",
                        "name": "Slot", 
                        "title": "Slot",
                        "isRequired": true,
                        "choices": [] 
                    }
                ]
            }
        ]
    };

    var survey = new Survey.Model(surveyJSON);

    var mentorSettings = {
        "url": "https://apim.quickwork.co/employeelogin/Path14/v14/Pathh87",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "ApiKey": "I8VYdIv3Oj4vof91Af3kJKyor43DHS3W",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({})
    };

    $.ajax(mentorSettings).done(function(response) {
        console.log('Mentors API Response:', response);

        var mentorsList = response.mentorName || [];
        var mentorChoices = mentorsList.map(function(obj) {
            return { text: obj.text};
        });

        survey.getQuestionByName("mentorName").choices = mentorChoices;
        survey.render(); 

    }).fail(function(textStatus, errorThrown) {
        console.error('Error fetching mentor choices:', textStatus, errorThrown);
    });

    function sendDataToServer(survey) {
        console.log('Survey Data:', survey.data);
        alert("The results are: " + JSON.stringify(survey.data));

        $.ajax({
            url: "https://apim.quickwork.co/employeelogin/Path14/v14/Path20",
            data: JSON.stringify(survey.data),
            contentType: 'application/json;charset=utf-8',
            type: "POST",
            headers: { 'ApiKey': "I8VYdIv3Oj4vof91Af3kJKyor43DHS3W" },
            success: function(data) {
                alert(data.status);
            },
            error: function(textStatus, errorThrown) {
                console.error('Error sending survey data:', textStatus, errorThrown);
            }
        });
    }

    var container = document.createElement('div');
    container.id = "surveyContainer";
    document.body.appendChild(container);

    $("#surveyContainer").Survey({
        model: survey,
        onComplete: sendDataToServer
    });

    survey.onValueChanged.add(function(sender, options) {
        var newMentorName = survey.getQuestionByName("mentorName").value;

        var selectedMentor = { "mentorName": newMentorName };

        var slotSettings = {
            "url": "https://apim.quickwork.co/employeelogin/Path14/v14/Path56",
            "method": "POST",
            "headers": {
                "ApiKey": "I8VYdIv3Oj4vof91Af3kJKyor43DHS3W",
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(selectedMentor)
        };

        $.ajax(slotSettings).done(function(response) {
            console.log('Slots API Response:', response);

            var slots = response.newMentorsSlotList || [];
            survey.getQuestionByName("Slot").choices = slots;
            survey.render(); 

        }).fail(function(textStatus, errorThrown) {
            console.error('Error fetching slot choices:', textStatus, errorThrown);
        });
    });
});
