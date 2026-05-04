const countries = [
  {
    name: "India",
    rules: [
      {
        title: "Speed Limits",
        description: "Speed limits vary by area such as highways and cities.",
        reason: "Prevents accidents and ensures road safety.",
        penalty: "₹1000 fine",
        example: "Driving above 80 km/h in city areas.",
        image: "https://source.unsplash.com/800x400/?highway"
      },
      {
        title: "Helmet Rule",
        description: "Helmet is mandatory for riders.",
        reason: "Protects from head injuries.",
        penalty: "₹500 fine",
        example: "Riding without helmet.",
        image: "https://source.unsplash.com/800x400/?helmet"
      }
    ]
  },
  {
    name: "USA",
    rules: [
      {
        title: "Seat Belt Rule",
        description: "Seat belt is compulsory for all passengers.",
        reason: "Reduces fatal injuries.",
        penalty: "$50 fine",
        example: "Driving without seatbelt.",
        image: "https://source.unsplash.com/800x400/?car"
      }
    ]
  },
  {
    name: "Japan",
    rules: [
      {
        title: "Strict Lane Discipline",
        description: "Drivers must strictly follow lane rules.",
        reason: "Ensures smooth traffic flow.",
        penalty: "Heavy fine",
        example: "Lane switching without signal.",
        image: "https://source.unsplash.com/800x400/?traffic"
      }
    ]
  }
];

export default countries;