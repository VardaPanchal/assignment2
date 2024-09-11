const json = {
  "title": "demo",
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "title": "Register",
      "elements": [
        {
          "type": "text",
          "name": "bookedbyName",
          "title": "name",
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
          "isRequired": true
        },
        {
          "type": "dropdown",
          "name": "Slot",
          "title": "Slot",
          "isRequired": true
        }
      ]
    }
  ]
}